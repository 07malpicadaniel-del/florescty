'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AppContentState, 
  BiweeklyEdition, 
  ForumPost, 
  PlantProfile, 
  SiteSettings, 
  PostCategory 
} from '../types';
import { INITIAL_CONTENT } from '../data/initialContent';

interface ContentContextType {
  content: AppContentState;
  activeTab: 'inicio' | 'foro' | 'especies' | 'acerca-de';
  setActiveTab: (tab: 'inicio' | 'foro' | 'especies' | 'acerca-de') => void;
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

  // Actions
  updateCurrentEdition: (edition: BiweeklyEdition) => void;
  updateSiteSettings: (settings: SiteSettings) => void;
  createPost: (post: {
    title: string;
    content: string;
    category: PostCategory;
    imageUrl?: string;
    authorName?: string;
    isCurator?: boolean;
    scientificName?: string;
    watering?: string;
    light?: string;
  }) => void;
  editPost: (id: string, updated: Partial<ForumPost>) => void;
  deletePost: (id: string) => void;
  togglePinPost: (id: string) => void;
  likePost: (id: string) => void;
  addComment: (postId: string, text: string, authorName?: string, isCurator?: boolean) => void;
  addPlantToEncyclopedia: (plant: Omit<PlantProfile, 'id'>) => void;
  resetToDefaults: () => void;
  exportContentBackup: () => void;
  importContentBackup: (jsonData: string) => boolean;
}

const STORAGE_KEY = 'jardin_secreto_content_v2';
const THEME_KEY = 'jardin_secreto_theme';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<AppContentState>(INITIAL_CONTENT);
  const [activeTab, setActiveTab] = useState<'inicio' | 'foro' | 'especies' | 'acerca-de'>('inicio');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<PlantProfile | null>(null);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

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
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      }

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.currentEdition && parsed.posts) {
          // Verify posts only contain Constanza or update avatar
          setContent(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, []);

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

  // Save to LocalStorage whenever content changes
  const saveContent = (newContent: AppContentState) => {
    setContent(newContent);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
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

  const createPost = (data: {
    title: string;
    content: string;
    category: PostCategory;
    imageUrl?: string;
    authorName?: string;
    isCurator?: boolean;
    scientificName?: string;
    watering?: string;
    light?: string;
  }) => {
    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: data.title,
      content: data.content,
      category: data.category,
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80',
      author: {
        name: content.siteSettings.curatorName,
        role: content.siteSettings.curatorRole,
        avatar: content.siteSettings.curatorAvatar,
        isCurator: true
      },
      createdAt: 'Publicación de la Quincena',
      fortnightTag: `Edición #${content.currentEdition.editionNumber}`,
      likes: 1,
      views: 10,
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

  const editPost = (id: string, updatedFields: Partial<ForumPost>) => {
    const updatedPosts = content.posts.map(p => {
      if (p.id === id) {
        return { ...p, ...updatedFields };
      }
      return p;
    });
    const updated: AppContentState = {
      ...content,
      posts: updatedPosts,
      lastUpdated: new Date().toISOString()
    };
    saveContent(updated);
    if (selectedPost && selectedPost.id === id) {
      setSelectedPost({ ...selectedPost, ...updatedFields });
    }
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

  const addComment = (postId: string, text: string, authorName?: string, isCurator?: boolean) => {
    if (!text.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: authorName || content.siteSettings.curatorName,
      avatar: isCurator ? content.siteSettings.curatorAvatar : '/wix-assets/acerca_1.jpg',
      createdAt: 'Hace un momento',
      content: text.trim(),
      isCurator: !!isCurator
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

  const addPlantToEncyclopedia = (plant: Omit<PlantProfile, 'id'>) => {
    const newPlant: PlantProfile = {
      ...plant,
      id: `enc-${Date.now()}`
    };
    const updated: AppContentState = {
      ...content,
      plantsEncyclopedia: [newPlant, ...content.plantsEncyclopedia],
      lastUpdated: new Date().toISOString()
    };
    saveContent(updated);
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
    downloadAnchor.setAttribute('download', `jardin-secreto-cuaderno-${new Date().toISOString().slice(0, 10)}.json`);
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
        updateCurrentEdition,
        updateSiteSettings,
        createPost,
        editPost,
        deletePost,
        togglePinPost,
        likePost,
        addComment,
        addPlantToEncyclopedia,
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
