'use client';

import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  X, 
  PlusCircle, 
  ImageIcon, 
  Sparkles, 
  Droplet, 
  Sun, 
  Leaf,
  Flower2,
  UserCheck
} from 'lucide-react';

const CATEGORIES = [
  'Flores y Cuidados',
  'Plantas de Casa',
  'Suculentas',
  'Consejos de Riego',
  'Diario de Jardín'
];

const PRESET_IMAGES = [
  { label: 'Orquídea', url: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Monstera', url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Suculentas', url: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Flores Silvestres', url: '/wix-assets/acerca_1.jpg' },
  { label: 'Lámina Floral', url: '/wix-assets/acerca_2.jpg' }
];

export default function NewPostModal() {
  const { isNewPostModalOpen, setIsNewPostModalOpen, createPost } = useContent();

  const [title, setTitle] = useState('');
  const [contentBody, setContentBody] = useState('');
  const [category, setCategory] = useState<string>('Flores y Cuidados');
  const [imageUrl, setImageUrl] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [watering, setWatering] = useState('');
  const [light, setLight] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  if (!isNewPostModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !contentBody.trim()) return;

    createPost({
      title: title.trim(),
      content: contentBody.trim(),
      category,
      imageUrl: imageUrl.trim() || undefined,
      scientificName: scientificName.trim() || undefined,
      watering: watering.trim() || undefined,
      light: light.trim() || undefined,
    });

    // Reset form
    setTitle('');
    setContentBody('');
    setImageUrl('');
    setScientificName('');
    setWatering('');
    setLight('');
    setIsNewPostModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-garden-darkCard rounded-3xl shadow-2xl border border-garden-thistle dark:border-garden-darkBorder overflow-hidden flex flex-col max-h-[92vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-garden-darkPurple text-white flex items-center justify-between border-b border-garden-darkBorder">
          <div className="flex items-center gap-2.5">
            <Flower2 className="w-5 h-5 text-garden-amethyst" />
            <h3 className="font-serif text-2xl font-bold">
              Nueva Publicación
            </h3>
          </div>
          <button
            onClick={() => setIsNewPostModalOpen(false)}
            className="p-1.5 rounded-lg text-garden-thistle hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4">
          {/* Anonymous Publication Note (No Constanza name) */}
          <div className="bg-garden-cream dark:bg-garden-darkBg p-3.5 rounded-2xl border border-garden-thistle/80 dark:border-garden-darkBorder flex items-center gap-3 text-xs">
            <div className="w-8 h-8 rounded-full bg-garden-amethyst/20 dark:bg-garden-amethyst/30 flex items-center justify-center text-garden-amethyst shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-garden-darkPurple dark:text-garden-thistle block">
                Publicación Anónima
              </span>
              <span className="text-[11px] text-garden-olive font-medium">
                Tu publicación se compartirá de forma anónima con la comunidad del jardín.
              </span>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
              Categoría
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-sm p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder focus:outline-none focus:ring-2 focus:ring-garden-amethyst"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
              Título de la Publicación *
            </label>
            <input
              type="text"
              placeholder="Ej: Consejos para cuidar orquídeas en invierno"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-sm p-3 rounded-xl border border-garden-thistle dark:border-garden-darkBorder focus:outline-none focus:ring-2 focus:ring-garden-amethyst font-serif text-base"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
              Contenido *
            </label>
            <textarea
              rows={4}
              placeholder="Escribe tus consejos, dudas o experiencias sobre las plantas..."
              value={contentBody}
              onChange={(e) => setContentBody(e.target.value)}
              className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-sm p-3 rounded-xl border border-garden-thistle dark:border-garden-darkBorder focus:outline-none focus:ring-2 focus:ring-garden-amethyst resize-none leading-relaxed"
              required
            />
          </div>

          {/* Image URL with Preset Quick Buttons */}
          <div>
            <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1 flex items-center justify-between">
              <span>Fotografía o Imagen (URL)</span>
              <span className="text-garden-darkPurple/60 dark:text-garden-thistle/60 font-normal">Opcional</span>
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... o /wix-assets/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-xs p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder focus:outline-none focus:ring-1 focus:ring-garden-amethyst"
            />
            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span className="text-[10px] text-garden-darkPurple/60 dark:text-garden-thistle/60">Sugerencias:</span>
              {PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className="text-[11px] bg-garden-thistle/40 dark:bg-garden-darkBorder hover:bg-garden-thistle text-garden-darkPurple dark:text-garden-thistle px-2 py-0.5 rounded-md border border-garden-thistle dark:border-garden-darkBorder transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Botanical Specs */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs text-garden-amethyst hover:text-garden-darkPurple dark:hover:text-white font-semibold flex items-center gap-1"
            >
              <span>{showAdvanced ? '− Ocultar datos de cuidado' : '+ Agregar datos de cuidado (Especie, Riego, Luz)'}</span>
            </button>

            {showAdvanced && (
              <div className="mt-3 p-4 bg-garden-cream dark:bg-garden-darkBg rounded-2xl border border-garden-thistle/80 dark:border-garden-darkBorder grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-garden-darkPurple dark:text-garden-thistle mb-1">
                    Especie
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Orquídea"
                    value={scientificName}
                    onChange={(e) => setScientificName(e.target.value)}
                    className="w-full bg-white dark:bg-garden-darkCard dark:text-white text-garden-darkPurple text-xs p-2 rounded-lg border border-garden-thistle dark:border-garden-darkBorder"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-garden-darkPurple dark:text-garden-thistle mb-1">
                    Riego
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Cada 8 días"
                    value={watering}
                    onChange={(e) => setWatering(e.target.value)}
                    className="w-full bg-white dark:bg-garden-darkCard dark:text-white text-garden-darkPurple text-xs p-2 rounded-lg border border-garden-thistle dark:border-garden-darkBorder"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-garden-darkPurple dark:text-garden-thistle mb-1">
                    Luz
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Mucha luz natural"
                    value={light}
                    onChange={(e) => setLight(e.target.value)}
                    className="w-full bg-white dark:bg-garden-darkCard dark:text-white text-garden-darkPurple text-xs p-2 rounded-lg border border-garden-thistle dark:border-garden-darkBorder"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-garden-thistle/60 dark:border-garden-darkBorder flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsNewPostModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-garden-darkPurple/70 dark:text-garden-thistle/70 hover:text-garden-darkPurple dark:hover:text-white rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-garden-olive hover:bg-garden-calPoly text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publicar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
