'use client';

import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  X, 
  Pin, 
  Trash2, 
  Share2, 
  Sun, 
  Droplet,
  Crown
} from 'lucide-react';

// Helper to format botanical post content with beautiful editorial typography
function FormattedBotanicalArticle({ content }: { content: string }) {
  if (!content) return null;

  const sections = content.split(/\n\s*\n/);

  return (
    <div className="space-y-6 text-garden-darkPurple/90 dark:text-garden-thistle font-serif text-base sm:text-lg leading-relaxed">
      {sections.map((section, sIdx) => {
        const lines = section.trim().split('\n');
        const firstLine = lines[0];

        // Check if section starts with numbered title like "1. Orquídea mariposa (Phalaenopsis)"
        const numMatch = firstLine.match(/^(\d+)\.\s+(.+)$/);

        if (numMatch) {
          const num = numMatch[1];
          const title = numMatch[2];
          const remainingLines = lines.slice(1);

          return (
            <div 
              key={sIdx} 
              className="pt-5 border-t border-garden-thistle/70 dark:border-garden-darkBorder/80 first:pt-0 first:border-0 space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-garden-thistle/80 dark:bg-garden-darkBorder text-garden-darkPurple dark:text-white font-sans font-bold text-sm flex items-center justify-center shrink-0 shadow-sm border border-garden-amethyst/40">
                  {num}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-garden-darkPurple dark:text-white leading-snug">
                  {title}
                </h3>
              </div>

              {remainingLines.map((line, lIdx) => renderArticleLine(line, lIdx))}
            </div>
          );
        }

        // Standard paragraph or list section
        return (
          <div key={sIdx} className="space-y-2.5">
            {lines.map((line, lIdx) => renderArticleLine(line, lIdx))}
          </div>
        );
      })}
    </div>
  );
}

function renderArticleLine(line: string, idx: number) {
  const trimmed = line.trim();
  if (!trimmed) return null;

  // Bullet points
  if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
    const raw = trimmed.replace(/^[-•]\s*/, '');
    const colonIdx = raw.indexOf(':');

    if (colonIdx > 0 && colonIdx < 35) {
      const label = raw.substring(0, colonIdx).trim();
      const value = raw.substring(colonIdx + 1).trim();

      return (
        <div key={idx} className="flex items-start gap-2.5 my-2 pl-2 sm:pl-3">
          <span className="w-2 h-2 rounded-full bg-garden-amethyst shrink-0 mt-2.5" />
          <div className="text-sm sm:text-base leading-relaxed">
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-garden-darkPurple dark:text-white bg-garden-thistle/50 dark:bg-garden-darkBorder px-2 py-0.5 rounded-md mr-1.5 border border-garden-thistle dark:border-garden-darkBorder inline-block">
              {label}
            </span>
            <span className="text-garden-darkPurple/90 dark:text-garden-thistle">
              {value}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div key={idx} className="flex items-start gap-2.5 my-1.5 pl-2 sm:pl-3">
        <span className="w-2 h-2 rounded-full bg-garden-amethyst shrink-0 mt-2.5" />
        <span className="text-sm sm:text-base text-garden-darkPurple/90 dark:text-garden-thistle leading-relaxed">
          {raw}
        </span>
      </div>
    );
  }

  return (
    <p key={idx} className="leading-relaxed">
      {trimmed}
    </p>
  );
}

export default function PostDetailModal() {
  const { 
    selectedPost, 
    setSelectedPost, 
    deletePost, 
    togglePinPost 
  } = useContent();

  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedPost) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div 
      onClick={() => setSelectedPost(null)}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn cursor-pointer"
    >
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-garden-darkCard rounded-3xl shadow-2xl border border-garden-thistle dark:border-garden-darkBorder overflow-hidden flex flex-col max-h-[92vh] transition-colors cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Controls */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-garden-darkCard/95 backdrop-blur-md px-6 py-4 border-b border-garden-thistle/80 dark:border-garden-darkBorder flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {selectedPost.isAdmin && (
              <span className="bg-garden-darkPurple text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-garden-amethyst/40">
                <Crown className="w-3 h-3 text-garden-amethyst" />
                Autor / Admin
              </span>
            )}
            <span className="bg-garden-thistle/50 dark:bg-garden-darkBg text-garden-darkPurple dark:text-garden-thistle text-xs font-semibold px-3 py-1 rounded-full border border-garden-thistle dark:border-garden-darkBorder">
              {selectedPost.category}
            </span>
            <span className="text-xs text-garden-darkPurple/60 dark:text-garden-thistle/60 font-mono">
              {selectedPost.fortnightTag}
            </span>
            {selectedPost.pinned && (
              <span className="bg-garden-amethyst text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Pin className="w-3 h-3 fill-current" />
                Fijada
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => togglePinPost(selectedPost.id)}
              className="cursor-pointer p-2 rounded-xl text-garden-darkPurple/70 dark:text-garden-thistle/70 hover:text-garden-amethyst hover:bg-garden-thistle/30 transition-colors"
              title={selectedPost.pinned ? 'Desfijar' : 'Fijar publicación'}
            >
              <Pin className={`w-4 h-4 ${selectedPost.pinned ? 'fill-current text-garden-amethyst' : ''}`} />
            </button>

            <button
              type="button"
              onClick={() => {
                if (confirm('¿Deseas retirar esta publicación?')) {
                  deletePost(selectedPost.id);
                }
              }}
              className="cursor-pointer p-2 rounded-xl text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Eliminar publicación"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="cursor-pointer p-2 rounded-xl text-garden-darkPurple/70 dark:text-garden-thistle/70 hover:text-garden-darkPurple dark:hover:text-white hover:bg-garden-thistle/30 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Post Header: Anonymous info */}
          <div className="flex items-center gap-3.5">
            <img
              src={selectedPost.author.avatar || '/logo.png'}
              alt={selectedPost.author.name}
              className="w-12 h-12 rounded-full object-cover border border-garden-thistle dark:border-garden-darkBorder shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-garden-darkPurple dark:text-white text-base">
                  {selectedPost.author.name}
                </h4>
                {selectedPost.isAdmin && (
                  <span className="bg-garden-darkPurple text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-garden-amethyst/40">
                    Autor / Admin
                  </span>
                )}
                {selectedPost.id.startsWith('post-ia-') && (
                  <span className="bg-garden-thistle/70 dark:bg-garden-darkBg text-garden-darkPurple dark:text-garden-thistle text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-garden-amethyst/30">
                    Publicación Automática
                  </span>
                )}
              </div>
              <p className="text-xs text-garden-darkPurple/60 dark:text-garden-thistle/60">
                {selectedPost.createdAt} · El Jardín Secreto
              </p>
            </div>
          </div>

          {/* Post Title */}
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-garden-darkPurple dark:text-white leading-snug">
            {selectedPost.title}
          </h2>

          {/* Botanical Meta Specs if available */}
          {selectedPost.plantDetails && (
            <div className="bg-garden-cream dark:bg-garden-darkBg border border-garden-thistle/80 dark:border-garden-darkBorder rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {selectedPost.plantDetails.scientificName && (
                <div className="space-y-0.5">
                  <span className="text-garden-darkPurple/60 dark:text-garden-thistle/60 font-medium">Especie:</span>
                  <p className="font-serif italic font-semibold text-garden-darkPurple dark:text-garden-thistle">
                    {selectedPost.plantDetails.scientificName}
                  </p>
                </div>
              )}
              {selectedPost.plantDetails.light && (
                <div className="flex items-center gap-2 text-garden-darkPurple dark:text-garden-thistle">
                  <Sun className="w-4 h-4 text-garden-amethyst shrink-0" />
                  <span><strong>Luz:</strong> {selectedPost.plantDetails.light}</span>
                </div>
              )}
              {selectedPost.plantDetails.watering && (
                <div className="flex items-center gap-2 text-garden-darkPurple dark:text-garden-thistle">
                  <Droplet className="w-4 h-4 text-garden-amethyst shrink-0" />
                  <span><strong>Riego:</strong> {selectedPost.plantDetails.watering}</span>
                </div>
              )}
            </div>
          )}

          {/* Post Body Image */}
          {selectedPost.imageUrl && (
            <div className="rounded-2xl overflow-hidden bg-garden-thistle/30 dark:bg-garden-darkBg max-h-96 w-full border border-garden-thistle/60 dark:border-garden-darkBorder">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Post Content */}
          <FormattedBotanicalArticle content={selectedPost.content} />

          {/* Post Footer Actions */}
          <div className="pt-4 border-t border-garden-thistle/60 dark:border-garden-darkBorder flex items-center justify-between">
            <button
              type="button"
              onClick={handleShare}
              className="cursor-pointer inline-flex items-center gap-1.5 text-garden-darkPurple/80 dark:text-garden-thistle hover:text-garden-darkPurple dark:hover:text-white px-3.5 py-2 rounded-xl text-xs font-medium border border-garden-thistle dark:border-garden-darkBorder bg-garden-thistle/30 dark:bg-garden-darkBg hover:bg-garden-thistle/50 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-garden-amethyst" />
              <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir artículo'}</span>
            </button>

            <span className="text-xs text-garden-darkPurple/60 dark:text-garden-thistle/60 font-serif italic">
              El Jardín Secreto · Blog Botánico
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
