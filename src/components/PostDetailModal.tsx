'use client';

import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  X, 
  Heart, 
  MessageSquare, 
  Send, 
  Pin, 
  Trash2, 
  Share2, 
  Sun, 
  Droplet
} from 'lucide-react';

export default function PostDetailModal() {
  const { 
    selectedPost, 
    setSelectedPost, 
    likePost, 
    addComment, 
    deletePost, 
    togglePinPost 
  } = useContent();

  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedPost) return null;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addComment(
      selectedPost.id, 
      commentText, 
      commentAuthor.trim() || 'Lector del Jardín'
    );

    setCommentText('');
    setCommentAuthor('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-garden-darkCard rounded-3xl shadow-2xl border border-garden-thistle dark:border-garden-darkBorder overflow-hidden flex flex-col max-h-[92vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Controls */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-garden-darkCard/95 backdrop-blur-md px-6 py-4 border-b border-garden-thistle/80 dark:border-garden-darkBorder flex items-center justify-between">
          <div className="flex items-center gap-2">
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
              onClick={() => togglePinPost(selectedPost.id)}
              className="p-2 rounded-xl text-garden-darkPurple/70 dark:text-garden-thistle/70 hover:text-garden-amethyst hover:bg-garden-thistle/30 transition-colors"
              title={selectedPost.pinned ? 'Desfijar' : 'Fijar publicación'}
            >
              <Pin className={`w-4 h-4 ${selectedPost.pinned ? 'fill-current text-garden-amethyst' : ''}`} />
            </button>

            <button
              onClick={() => {
                if (confirm('¿Deseas retirar esta publicación?')) {
                  deletePost(selectedPost.id);
                }
              }}
              className="p-2 rounded-xl text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Eliminar publicación"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSelectedPost(null)}
              className="p-2 rounded-xl text-garden-darkPurple/70 dark:text-garden-thistle/70 hover:text-garden-darkPurple dark:hover:text-white hover:bg-garden-thistle/30 transition-colors ml-1"
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
              <h4 className="font-bold text-garden-darkPurple dark:text-white text-base">
                {selectedPost.author.name}
              </h4>
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
          <div className="text-garden-darkPurple/90 dark:text-garden-thistle text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal font-serif">
            {selectedPost.content}
          </div>

          {/* Post Footer Actions */}
          <div className="pt-4 border-t border-garden-thistle/60 dark:border-garden-darkBorder flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => likePost(selectedPost.id)}
                className="inline-flex items-center gap-2 bg-garden-thistle/40 dark:bg-garden-darkBg hover:bg-garden-thistle text-garden-darkPurple dark:text-garden-thistle px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                <Heart className="w-4 h-4 fill-garden-amethyst text-garden-amethyst" />
                <span>{selectedPost.likes} Me gusta</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-garden-darkPurple/70 dark:text-garden-thistle/70 hover:text-garden-darkPurple dark:hover:text-white px-3 py-2 rounded-xl text-xs font-medium border border-garden-thistle dark:border-garden-darkBorder transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir'}</span>
              </button>
            </div>

            <span className="text-xs text-garden-darkPurple/60 dark:text-garden-thistle/60 font-serif">
              {selectedPost.comments.length} comentarios
            </span>
          </div>

          {/* Comments Section */}
          <div className="pt-6 border-t border-garden-thistle/60 dark:border-garden-darkBorder space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-garden-darkPurple dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-garden-amethyst" />
                Comentarios
              </h3>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {selectedPost.comments.map((comm) => (
                <div
                  key={comm.id}
                  className="p-4 rounded-2xl border bg-garden-cream/60 dark:bg-garden-darkBg border-garden-thistle/60 dark:border-garden-darkBorder transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={comm.avatar || '/logo.png'}
                        alt={comm.author}
                        className="w-8 h-8 rounded-full object-cover border border-garden-thistle dark:border-garden-darkBorder"
                      />
                      <div>
                        <span className="font-semibold text-xs text-garden-darkPurple dark:text-garden-thistle">
                          {comm.author}
                        </span>
                        <span className="text-[10px] text-garden-darkPurple/60 dark:text-garden-thistle/60 block">
                          {comm.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-garden-darkPurple/90 dark:text-garden-thistle leading-relaxed pl-10 font-serif">
                    {comm.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleSubmitComment} className="bg-garden-cream dark:bg-garden-darkBg p-4 rounded-2xl border border-garden-thistle/80 dark:border-garden-darkBorder space-y-3">
              <span className="font-medium text-xs text-garden-darkPurple dark:text-garden-thistle block font-serif text-sm">
                Dejar un comentario:
              </span>

              <input
                type="text"
                placeholder="Tu nombre (opcional)..."
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="w-full bg-white dark:bg-garden-darkCard dark:text-white text-garden-darkPurple text-xs px-3 py-2 rounded-xl border border-garden-thistle dark:border-garden-darkBorder focus:outline-none focus:ring-1 focus:ring-garden-amethyst"
              />

              <textarea
                rows={3}
                placeholder="Escribe tu comentario o consejo..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-white dark:bg-garden-darkCard dark:text-white text-garden-darkPurple text-xs sm:text-sm p-3 rounded-xl border border-garden-thistle dark:border-garden-darkBorder focus:outline-none focus:ring-2 focus:ring-garden-amethyst resize-none"
                required
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="inline-flex items-center gap-2 bg-garden-olive hover:bg-garden-calPoly disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publicar Comentario</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
