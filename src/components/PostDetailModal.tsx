'use client';

import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  X, 
  Heart, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  Pin, 
  Trash2, 
  Share2, 
  Sun, 
  Droplet,
  Flower2
} from 'lucide-react';

export default function PostDetailModal() {
  const { 
    selectedPost, 
    setSelectedPost, 
    likePost, 
    addComment, 
    deletePost, 
    togglePinPost,
    content 
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
      commentAuthor.trim() || 'Lector del Jardín',
      false
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-darkGarden-900 rounded-3xl shadow-2xl border border-botanical-200 dark:border-botanical-800 overflow-hidden flex flex-col max-h-[92vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Controls */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-darkGarden-900/95 backdrop-blur-md px-6 py-4 border-b border-botanical-100 dark:border-botanical-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-botanical-100 dark:bg-darkGarden-800 text-botanical-900 dark:text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-botanical-200 dark:border-botanical-700">
              {selectedPost.category}
            </span>
            <span className="text-xs text-botanical-500 dark:text-botanical-400 font-mono">
              {selectedPost.fortnightTag}
            </span>
            {selectedPost.pinned && (
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300/40">
                <Pin className="w-3 h-3 fill-current" />
                Fijada
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => togglePinPost(selectedPost.id)}
              className="p-2 rounded-xl text-botanical-600 dark:text-botanical-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-botanical-50 dark:hover:bg-darkGarden-800 transition-colors"
              title={selectedPost.pinned ? 'Desfijar' : 'Fijar publicación'}
            >
              <Pin className={`w-4 h-4 ${selectedPost.pinned ? 'fill-current text-emerald-600' : ''}`} />
            </button>

            <button
              onClick={() => {
                if (confirm('¿Deseas retirar esta publicación del cuaderno?')) {
                  deletePost(selectedPost.id);
                }
              }}
              className="p-2 rounded-xl text-botanical-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Eliminar publicación"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSelectedPost(null)}
              className="p-2 rounded-xl text-botanical-600 dark:text-botanical-300 hover:text-botanical-950 dark:hover:text-white hover:bg-botanical-100 dark:hover:bg-darkGarden-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Post Header: Constanza Pimentel info */}
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={selectedPost.author.avatar || '/wix-assets/acerca_1.jpg'}
                alt={selectedPost.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/50"
              />
              <span className="absolute -bottom-1 -right-1 bg-emerald-700 text-white rounded-full p-0.5">
                <CheckCircle className="w-3.5 h-3.5 fill-current" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-botanical-950 dark:text-white text-base">
                  {selectedPost.author.name}
                </h4>
                <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  Curadora
                </span>
              </div>
              <p className="text-xs text-botanical-600 dark:text-botanical-400">
                {selectedPost.author.role} · {selectedPost.createdAt}
              </p>
            </div>
          </div>

          {/* Post Title */}
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-botanical-950 dark:text-emerald-50 leading-snug">
            {selectedPost.title}
          </h2>

          {/* Botanical Meta Specs if available */}
          {selectedPost.plantDetails && (
            <div className="bg-botanical-50 dark:bg-darkGarden-850 border border-botanical-200/80 dark:border-botanical-800 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {selectedPost.plantDetails.scientificName && (
                <div className="space-y-0.5">
                  <span className="text-botanical-500 dark:text-botanical-400 font-medium">Familia / Especie:</span>
                  <p className="font-serif italic font-semibold text-botanical-950 dark:text-emerald-200">
                    {selectedPost.plantDetails.scientificName}
                  </p>
                </div>
              )}
              {selectedPost.plantDetails.light && (
                <div className="flex items-center gap-2 text-botanical-800 dark:text-botanical-200">
                  <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                  <span><strong>Luz:</strong> {selectedPost.plantDetails.light}</span>
                </div>
              )}
              {selectedPost.plantDetails.watering && (
                <div className="flex items-center gap-2 text-botanical-800 dark:text-botanical-200">
                  <Droplet className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span><strong>Riego:</strong> {selectedPost.plantDetails.watering}</span>
                </div>
              )}
            </div>
          )}

          {/* Post Body Image */}
          {selectedPost.imageUrl && (
            <div className="rounded-2xl overflow-hidden bg-botanical-100 dark:bg-darkGarden-800 max-h-96 w-full shadow-inner">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Post Content */}
          <div className="text-botanical-900 dark:text-botanical-100 text-base leading-relaxed whitespace-pre-line font-normal">
            {selectedPost.content}
          </div>

          {/* Post Footer Actions */}
          <div className="pt-4 border-t border-botanical-100 dark:border-botanical-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => likePost(selectedPost.id)}
                className="inline-flex items-center gap-2 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-700 dark:text-rose-300 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>{selectedPost.likes} Me gusta</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-botanical-600 dark:text-botanical-300 hover:text-botanical-900 dark:hover:text-white px-3 py-2 rounded-xl text-xs font-medium border border-botanical-200 dark:border-botanical-700 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir'}</span>
              </button>
            </div>

            <span className="text-xs text-botanical-500 dark:text-botanical-400">
              {selectedPost.comments.length} comentarios
            </span>
          </div>

          {/* Comments Section */}
          <div className="pt-6 border-t border-botanical-100 dark:border-botanical-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-botanical-950 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Comentarios & Notas Botánicas
              </h3>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {selectedPost.comments.map((comm) => (
                <div
                  key={comm.id}
                  className="p-4 rounded-2xl border bg-botanical-50/60 dark:bg-darkGarden-850 border-botanical-200/80 dark:border-botanical-800 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={comm.avatar || '/wix-assets/acerca_1.jpg'}
                        alt={comm.author}
                        className="w-8 h-8 rounded-full object-cover border border-botanical-300 dark:border-botanical-700"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs text-botanical-950 dark:text-emerald-100">
                            {comm.author}
                          </span>
                          {comm.isCurator && (
                            <span className="bg-emerald-700 text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                              Curadora
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-botanical-500 dark:text-botanical-400">
                          {comm.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-botanical-900 dark:text-botanical-200 leading-relaxed pl-10">
                    {comm.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleSubmitComment} className="bg-botanical-50 dark:bg-darkGarden-850 p-4 rounded-2xl border border-botanical-200 dark:border-botanical-800 space-y-3">
              <span className="font-medium text-xs text-botanical-800 dark:text-botanical-200 block">
                Dejar un comentario en esta publicación:
              </span>

              <input
                type="text"
                placeholder="Tu nombre..."
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="w-full bg-white dark:bg-darkGarden-900 dark:text-white text-botanical-950 text-xs px-3 py-2 rounded-xl border border-botanical-200 dark:border-botanical-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />

              <textarea
                rows={3}
                placeholder="Escribe tu reflexión o pregunta sobre esta flor o planta..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-white dark:bg-darkGarden-900 dark:text-white text-botanical-950 text-xs sm:text-sm p-3 rounded-xl border border-botanical-200 dark:border-botanical-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                required
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm"
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
