'use client';

import React from 'react';
import { ForumPost } from '../types';
import { useContent } from '../context/ContentContext';
import { 
  Heart, 
  MessageSquare, 
  Eye, 
  Pin, 
  Sun, 
  Droplet,
  Flower2,
  Sparkles
} from 'lucide-react';

interface ForumPostCardProps {
  post: ForumPost;
}

export default function ForumPostCard({ post }: ForumPostCardProps) {
  const { setSelectedPost, likePost } = useContent();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    likePost(post.id);
  };

  const isAIGenerated = post.id.startsWith('post-ia-');

  return (
    <article
      onClick={() => setSelectedPost(post)}
      className={`group relative bg-white dark:bg-garden-darkCard rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between ${
        post.pinned 
          ? 'border-garden-amethyst/70 shadow-md ring-1 ring-garden-amethyst/30 bg-gradient-to-br from-white to-garden-thistle/20 dark:from-garden-darkCard dark:to-garden-darkBg' 
          : 'border-garden-thistle/80 dark:border-garden-darkBorder hover:border-garden-amethyst shadow-soft hover:shadow-lifted'
      }`}
    >
      {/* Top Strip for Pinned post */}
      {post.pinned && (
        <div className="bg-garden-darkPurple text-garden-thistle text-[11px] font-semibold px-4 py-1 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-serif">
            <Pin className="w-3.5 h-3.5 fill-current text-garden-amethyst" />
            Publicación Destacada
          </span>
          <span className="text-garden-thistle/70 text-[10px] uppercase tracking-wider">Fijada</span>
        </div>
      )}

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        {/* Author Header & Badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={post.author.avatar || '/logo.png'}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border border-garden-thistle dark:border-garden-darkBorder group-hover:scale-105 transition-transform"
              />
              {isAIGenerated && (
                <span 
                  className="absolute -bottom-1 -right-1 bg-garden-darkPurple text-garden-thistle rounded-full p-0.5 border border-garden-amethyst" 
                  title="Publicación Automática"
                >
                  <Sparkles className="w-3 h-3 text-garden-amethyst" />
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-sm text-garden-darkPurple dark:text-garden-thistle">
                  {post.author.name}
                </span>
                {isAIGenerated && (
                  <span className="bg-garden-thistle/70 dark:bg-garden-darkBg text-garden-darkPurple dark:text-garden-thistle text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-garden-amethyst/30">
                    Publicación Automática
                  </span>
                )}
              </div>
              <div className="text-[11px] text-garden-darkPurple/60 dark:text-garden-thistle/60 flex items-center gap-2">
                <span>{post.createdAt}</span>
                <span>•</span>
                <span className="text-garden-olive font-medium">{post.fortnightTag}</span>
              </div>
            </div>
          </div>

          {/* Category Tag */}
          <span className="shrink-0 bg-garden-thistle/50 dark:bg-garden-darkBg text-garden-darkPurple dark:text-garden-thistle border border-garden-thistle dark:border-garden-darkBorder text-[11px] font-medium px-2.5 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        {/* Post Title & Text */}
        <div className="space-y-2">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-garden-darkPurple dark:text-white group-hover:text-garden-amethyst transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
          <p className="text-sm text-garden-darkPurple/80 dark:text-garden-thistle/80 line-clamp-3 leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Botanical Mini Chips if present */}
        {post.plantDetails && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            {post.plantDetails.scientificName && (
              <span className="italic text-garden-darkPurple/80 dark:text-garden-thistle/80 bg-garden-thistle/30 dark:bg-garden-darkBg px-2 py-0.5 rounded border border-garden-thistle/60 dark:border-garden-darkBorder font-serif">
                {post.plantDetails.scientificName}
              </span>
            )}
            {post.plantDetails.watering && (
              <span className="inline-flex items-center gap-1 text-garden-olive dark:text-garden-thistle bg-garden-thistle/20 dark:bg-garden-darkBg px-2 py-0.5 rounded border border-garden-thistle/60 dark:border-garden-darkBorder">
                <Droplet className="w-3 h-3 text-garden-amethyst" />
                {post.plantDetails.watering}
              </span>
            )}
            {post.plantDetails.light && (
              <span className="inline-flex items-center gap-1 text-garden-olive dark:text-garden-thistle bg-garden-thistle/20 dark:bg-garden-darkBg px-2 py-0.5 rounded border border-garden-thistle/60 dark:border-garden-darkBorder">
                <Sun className="w-3 h-3 text-garden-amethyst" />
                {post.plantDetails.light}
              </span>
            )}
          </div>
        )}

        {/* Image thumbnail if attached */}
        {post.imageUrl && (
          <div className="relative h-48 w-full rounded-xl overflow-hidden bg-garden-thistle/30 dark:bg-garden-darkBg border border-garden-thistle/50 dark:border-garden-darkBorder">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
          </div>
        )}
      </div>

      {/* Footer / Interaction Bar */}
      <div className="px-5 sm:px-6 py-3 bg-garden-cream/80 dark:bg-garden-darkBg border-t border-garden-thistle/60 dark:border-garden-darkBorder flex items-center justify-between text-xs text-garden-darkPurple/70 dark:text-garden-thistle/70">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleLike}
            className="cursor-pointer flex items-center gap-1.5 hover:text-garden-amethyst transition-colors group/btn"
            title="Me gusta"
          >
            <Heart className="w-4 h-4 group-hover/btn:scale-110 text-garden-amethyst transition-transform" />
            <span className="font-semibold">{post.likes}</span>
          </button>

          <span className="flex items-center gap-1.5 text-garden-darkPurple/70 dark:text-garden-thistle/70">
            <MessageSquare className="w-4 h-4 text-garden-amethyst" />
            <span>{post.comments.length} comentarios</span>
          </span>

          <span className="flex items-center gap-1.5 text-garden-darkPurple/50 dark:text-garden-thistle/50 hidden sm:flex">
            <Eye className="w-3.5 h-3.5" />
            <span>{post.views}</span>
          </span>
        </div>

        <span className="text-garden-amethyst font-semibold group-hover:translate-x-0.5 transition-transform font-serif">
          Leer nota →
        </span>
      </div>
    </article>
  );
}
