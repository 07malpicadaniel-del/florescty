'use client';

import React from 'react';
import { ForumPost } from '../types';
import { useContent } from '../context/ContentContext';
import { 
  Heart, 
  MessageSquare, 
  Eye, 
  Pin, 
  CheckCircle, 
  Calendar, 
  Sparkles,
  Sun,
  Droplet,
  Tag
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

  return (
    <article
      onClick={() => setSelectedPost(post)}
      className={`group relative bg-white rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between ${
        post.pinned 
          ? 'border-emerald-500/50 shadow-md ring-1 ring-emerald-500/20 bg-gradient-to-br from-white to-botanical-50/40' 
          : 'border-botanical-200/70 hover:border-botanical-400/80 shadow-soft hover:shadow-lifted'
      }`}
    >
      {/* Top Strip for Pinned post */}
      {post.pinned && (
        <div className="bg-gradient-to-r from-emerald-600 to-botanical-800 text-white text-[11px] font-semibold px-4 py-1 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Pin className="w-3.5 h-3.5 fill-current" />
            Publicación Destacada de la Quincena
          </span>
          <span className="text-emerald-200 text-[10px] uppercase tracking-wider">Fijado</span>
        </div>
      )}

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        {/* Author Header & Badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-botanical-200 group-hover:border-botanical-500 transition-colors"
              />
              {post.author.isCurator && (
                <span 
                  className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5" 
                  title="Curadora Oficial"
                >
                  <CheckCircle className="w-3 h-3 fill-current" />
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-sm text-botanical-950">
                  {post.author.name}
                </span>
                {post.author.isCurator && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider">
                    Curadora
                  </span>
                )}
              </div>
              <div className="text-[11px] text-botanical-600 flex items-center gap-2">
                <span>{post.createdAt}</span>
                <span>•</span>
                <span className="text-botanical-500 font-mono">{post.fortnightTag}</span>
              </div>
            </div>
          </div>

          {/* Category Tag */}
          <span className="shrink-0 bg-botanical-100/80 text-botanical-900 border border-botanical-300/40 text-[11px] font-medium px-2.5 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        {/* Post Title & Text */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-botanical-950 group-hover:text-emerald-700 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-botanical-800 line-clamp-3 leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Botanical Mini Chips if present */}
        {post.plantDetails && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            {post.plantDetails.scientificName && (
              <span className="italic text-botanical-700 bg-botanical-50 px-2 py-0.5 rounded border border-botanical-200">
                {post.plantDetails.scientificName}
              </span>
            )}
            {post.plantDetails.watering && (
              <span className="inline-flex items-center gap-1 text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                <Droplet className="w-3 h-3 text-cyan-600" />
                {post.plantDetails.watering}
              </span>
            )}
            {post.plantDetails.light && (
              <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                <Sun className="w-3 h-3 text-amber-600" />
                {post.plantDetails.light}
              </span>
            )}
          </div>
        )}

        {/* Image thumbnail if attached */}
        {post.imageUrl && (
          <div className="relative h-48 w-full rounded-xl overflow-hidden bg-botanical-100">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>
        )}
      </div>

      {/* Footer / Interaction Bar */}
      <div className="px-5 sm:px-6 py-3 bg-botanical-50/50 border-t border-botanical-100 flex items-center justify-between text-xs text-botanical-700">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 hover:text-rose-600 transition-colors group/btn"
            title="Me gusta"
          >
            <Heart className="w-4 h-4 group-hover/btn:scale-110 text-rose-500 transition-transform" />
            <span className="font-semibold">{post.likes}</span>
          </button>

          <span className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors">
            <MessageSquare className="w-4 h-4 text-botanical-600" />
            <span>{post.comments.length} respuestas</span>
          </span>

          <span className="flex items-center gap-1.5 text-botanical-500 hidden sm:flex">
            <Eye className="w-3.5 h-3.5" />
            <span>{post.views}</span>
          </span>
        </div>

        <span className="text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform">
          Ver discusión →
        </span>
      </div>
    </article>
  );
}
