'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AppContentState, 
  BiweeklyEdition, 
  ForumPost, 
  PlantProfile, 
  SiteSettings 
} from '../types';
import { INITIAL_CONTENT } from '../data/initialContent';

export type ActiveTab = 'inicio' | 'publicaciones' | 'publicaciones-admin' | 'plantas' | 'acerca-de';

interface ContentContextType {
  content: AppContentState;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isEditorOpen: boolean;
  openEditor: () => void;
  closeEditor: () => void;
  selectedPost: ForumPost | null;
  setSelectedPost: (post: ForumPost | null) => void;
  selectedPlant: PlantProfile | null;
  setSelectedPlant: (plant: PlantProfile | null) => void;
  isNewPostModalOpen: boolean;
  setIsNewPostModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  
  // Theme Dark/Light
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // AI Groq Generation
  isGeneratingAI: boolean;
  generateAIPost: (force?: boolean) => Promise<boolean>;

  // Actions
  updateCurrentEdition: (edition: BiweeklyEdition) => void;
  updateSiteSettings: (settings: SiteSettings) => void;
  createPost: (post: {
    title: string;
    content: string;
    category: string;
    imageUrl?: string;
    scientificName?: string;
    watering?: string;
    light?: string;
    isAdmin?: boolean;
  }) => void;
  deletePost: (id: string) => void;
  togglePinPost: (id: string) => void;
  likePost: (id: string) => void;
  addComment: (postId: string, text: string, authorName?: string) => void;
  resetToDefaults: () => void;
  exportContentBackup: () => void;
  importContentBackup: (jsonData: string) => boolean;
}

const STORAGE_KEY = 'jardin_secreto_content_v7';
const THEME_KEY = 'jardin_secreto_theme_v3';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<AppContentState>(INITIAL_CONTENT);
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<PlantProfile | null>(null);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }

      // Check current or prior localStorage keys
      const saved = 
        localStorage.getItem(STORAGE_KEY) || 
        localStorage.getItem('jardin_secreto_content_v5') ||
        localStorage.getItem('jardin_secreto_content_v4');

      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.posts && Array.isArray(parsed.posts)) {
          // Keep only user-created posts (e.g. post-173... or post-ia-...) that are not legacy default posts
          const legacyIds = new Set(['post-1', 'post-2', 'post-3', 'post-4', 'post-5']);
          const initialIds = new Set(INITIAL_CONTENT.posts.map(p => p.id));
          const userCustomPosts = parsed.posts.filter((p: ForumPost) => !initialIds.has(p.id) && !legacyIds.has(p.id));

          // Merge any updated likes/comments for current initial posts
          const mergedInitialPosts = INITIAL_CONTENT.posts.map(initPost => {
            const savedMatch = parsed.posts.find((p: ForumPost) => p.id === initPost.id);
            if (savedMatch) {
              return {
                ...initPost,
                likes: Math.max(initPost.likes, savedMatch.likes || 0),
                pinned: savedMatch.pinned !== undefined ? savedMatch.pinned : initPost.pinned,
                comments: savedMatch.comments && savedMatch.comments.length > initPost.comments.length 
                  ? savedMatch.comments 
                  : initPost.comments
              };
            }
            return initPost;
          });

          setContent({
            ...INITIAL_CONTENT,
            ...parsed,
            plantsEncyclopedia: INITIAL_CONTENT.plantsEncyclopedia,
            posts: [...userCustomPosts, ...mergedInitialPosts]
          });
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, []);

  // Automated Groq trigger for Wednesday / Thursday (and test for today)
  useEffect(() => {
    const checkAndTriggerGroq = async () => {
      const todayStr = new Date().toISOString().slice(0, 10);
      const dayOfWeek = new Date().getDay(); // 3 = Miércoles, 4 = Jueves
      const isWedOrThu = dayOfWeek === 3 || dayOfWeek === 4;

      // Only run auto-generation if not generated yet today, and it's Wed/Thu (or first test if user hasn't generated)
      const lastGenDate = content.lastAIPostDate;
      if (isWedOrThu && lastGenDate !== todayStr) {
        await generateAIPost(false);
      }
    };

    const timer = setTimeout(() => {
      checkAndTriggerGroq();
    }, 2000);

    return () => clearTimeout(timer);
  }, [content.lastAIPostDate]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    try {
      localStorage.setItem(THEME_KEY, nextTheme);
    } catch (e) {}

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const saveContent = (newContent: AppContentState) => {
    setContent(newContent);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  };

  // Generate publication using Groq API
  const generateAIPost = async (force: boolean = false): Promise<boolean> => {
    try {
      setIsGeneratingAI(true);
      const res = await fetch('/api/groq-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ force })
      });

      if (!res.ok) {
        throw new Error('No se pudo generar con Groq');
      }

      const data = await res.json();
      if (data && data.post) {
        const todayStr = new Date().toISOString().slice(0, 10);
        const updatedPosts = [data.post, ...content.posts];
        const updated: AppContentState = {
          ...content,
          posts: updatedPosts,
          lastAIPostDate: todayStr,
          lastUpdated: new Date().toISOString()
        };
        saveContent(updated);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error generating AI post:', err);
      return false;
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const updateCurrentEdition = (edition: BiweeklyEdition) => {
    const updated: AppContentState = {
      ...content,
      currentEdition: edition,
      lastUpdated: new Date().toISOString()
    };
    saveContent(updated);
  };

  const updateSiteSettings = (settings: SiteSettings) => {
    const updated: AppContentState = {
      ...content,
      siteSettings: settings,
      lastUpdated: new Date().toISOString()
    };
    saveContent(updated);
  };

  // Create post anonymously (separated into Publicaciones de Admin when isAdmin is true)
  const createPost = (data: {
    title: string;
    content: string;
    category: string;
    imageUrl?: string;
    scientificName?: string;
    watering?: string;
    light?: string;
    isAdmin?: boolean;
  }) => {
    const isAdminPost = Boolean(data.isAdmin);
    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: data.title,
      content: data.content,
      category: data.category,
      isAdmin: isAdminPost,
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80',
      author: isAdminPost
        ? {
            name: 'Autor del Jardín',
            role: 'Admin',
            avatar: '/logo.png',
            isCurator: true,
          }
        : {
            name: 'Cultivador Anónimo',
            avatar: '/logo.png'
          },
      createdAt: 'Publicado hoy',
      fortnightTag: isAdminPost ? 'Publicación de Admin' : `Edición #${content.currentEdition.editionNumber}`,
      likes: 1,
      views: 12,
      pinned: false,
      plantDetails: data.scientificName ? {
        scientificName: data.scientificName,
        watering: data.watering,
        light: data.light,
      } : undefined,
      comments: []
    };

    const updated: AppContentState = {
      ...content,
      posts: [newPost, ...content.posts],
      lastUpdated: new Date().toISOString()
    };
    saveContent(updated);
  };

  const deletePost = (id: string) => {
    const updatedPosts = content.posts.filter(p => p.id !== id);
    const updated: AppContentState = {
      ...content,
      posts: updatedPosts,
      lastUpdated: new Date().toISOString()
    };
    saveContent(updated);
    if (selectedPost && selectedPost.id === id) {
      setSelectedPost(null);
    }
  };

  const togglePinPost = (id: string) => {
    const updatedPosts = content.posts.map(p => {
      if (p.id === id) {
        return { ...p, pinned: !p.pinned };
      }
      return p;
    });
    const updated: AppContentState = {
      ...content,
      posts: updatedPosts,
      lastUpdated: new Date().toISOString()
    };
    saveContent(updated);
  };

  const likePost = (id: string) => {
    const updatedPosts = content.posts.map(p => {
      if (p.id === id) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    });
    const updated: AppContentState = {
      ...content,
      posts: updatedPosts
    };
    saveContent(updated);
    if (selectedPost && selectedPost.id === id) {
      setSelectedPost({ ...selectedPost, likes: selectedPost.likes + 1 });
    }
  };

  const addComment = (postId: string, text: string, authorName?: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: authorName || 'Lector del Jardín',
      avatar: '/logo.png',
      createdAt: 'Hace un momento',
      content: text.trim()
    };

    const updatedPosts = content.posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    });

    const updated: AppContentState = {
      ...content,
      posts: updatedPosts
    };
    saveContent(updated);

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({
        ...selectedPost,
        comments: [...selectedPost.comments, newComment]
      });
    }
  };

  const resetToDefaults = () => {
    saveContent(INITIAL_CONTENT);
    setSelectedPost(null);
    setSelectedPlant(null);
  };

  const exportContentBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `jardin-secreto-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importContentBackup = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.currentEdition && parsed.siteSettings && parsed.posts) {
        saveContent(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        activeTab,
        setActiveTab,
        isEditorOpen,
        openEditor: () => setIsEditorOpen(true),
        closeEditor: () => setIsEditorOpen(false),
        selectedPost,
        setSelectedPost,
        selectedPlant,
        setSelectedPlant,
        isNewPostModalOpen,
        setIsNewPostModalOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        theme,
        toggleTheme,
        isGeneratingAI,
        generateAIPost,
        updateCurrentEdition,
        updateSiteSettings,
        createPost,
        deletePost,
        togglePinPost,
        likePost,
        addComment,
        resetToDefaults,
        exportContentBackup,
        importContentBackup
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
