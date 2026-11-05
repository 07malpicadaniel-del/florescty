'use client';

import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { PostCategory } from '../types';
import { 
  X, 
  PlusCircle, 
  ImageIcon, 
  Sparkles, 
  Droplet, 
  Sun, 
  Leaf,
  Flower2
} from 'lucide-react';

const CATEGORIES: PostCategory[] = [
  'Cuidado y Riego',
  'Orquídeas y Flores',
  'Suculentas y Cactus',
  'Identificación de Especies',
  'Plagas y Soluciones Orgánicas',
  'Propagación y Esquejes',
  'Diario Botánico'
];

const PRESET_IMAGES = [
  { label: 'Orquídea', url: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Monstera', url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Suculentas', url: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Ficus', url: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Flores Silvestres', url: '/wix-assets/acerca_1.jpg' }
];

export default function NewPostModal() {
  const { isNewPostModalOpen, setIsNewPostModalOpen, createPost, content } = useContent();

  const [title, setTitle] = useState('');
  const [contentBody, setContentBody] = useState('');
  const [category, setCategory] = useState<PostCategory>('Cuidado y Riego');
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
      authorName: content.siteSettings.curatorName,
      isCurator: true,
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
        className="relative w-full max-w-2xl bg-white dark:bg-darkGarden-900 rounded-3xl shadow-2xl border border-botanical-200 dark:border-botanical-800 overflow-hidden flex flex-col max-h-[92vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-botanical-950 dark:bg-black text-white flex items-center justify-between border-b border-botanical-800">
          <div className="flex items-center gap-2.5">
            <Flower2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-serif text-lg font-bold">
              Nueva Publicación de Constanza Pimentel
            </h3>
          </div>
          <button
            onClick={() => setIsNewPostModalOpen(false)}
            className="p-1.5 rounded-lg text-botanical-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4">
          {/* Author Badge */}
          <div className="bg-botanical-50 dark:bg-darkGarden-850 p-3.5 rounded-2xl border border-botanical-200 dark:border-botanical-800 flex items-center gap-3 text-xs">
            <img
              src="/wix-assets/acerca_1.jpg"
              alt="Constanza Pimentel"
              className="w-8 h-8 rounded-full object-cover border border-botanical-300"
            />
            <div>
              <span className="font-semibold text-botanical-950 dark:text-white block">
                {content.siteSettings.curatorName}
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                Publicación oficial del Jardín Secreto
              </span>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-botanical-800 dark:text-botanical-200 mb-1">
              Categoría
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as PostCategory)}
              className="w-full bg-white dark:bg-darkGarden-850 dark:text-white text-botanical-950 text-sm p-2.5 rounded-xl border border-botanical-200 dark:border-botanical-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
            <label className="block text-xs font-semibold text-botanical-800 dark:text-botanical-200 mb-1">
              Título de la Publicación *
            </label>
            <input
              type="text"
              placeholder="Ej: Secretos del riego de otoño y reposo de orquídeas"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white dark:bg-darkGarden-850 dark:text-white text-botanical-950 text-sm p-3 rounded-xl border border-botanical-200 dark:border-botanical-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-serif"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold text-botanical-800 dark:text-botanical-200 mb-1">
              Contenido de la Publicación *
            </label>
            <textarea
              rows={4}
              placeholder="Describe detalladamente tus observaciones, recomendaciones de cuidado o guía para la quincena..."
              value={contentBody}
              onChange={(e) => setContentBody(e.target.value)}
              className="w-full bg-white dark:bg-darkGarden-850 dark:text-white text-botanical-950 text-sm p-3 rounded-xl border border-botanical-200 dark:border-botanical-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none leading-relaxed"
              required
            />
          </div>

          {/* Image URL with Preset Quick Buttons */}
          <div>
            <label className="block text-xs font-semibold text-botanical-800 dark:text-botanical-200 mb-1 flex items-center justify-between">
              <span>Fotografía o Lámina (URL)</span>
              <span className="text-botanical-500 dark:text-botanical-400 font-normal">Opcional</span>
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... o /wix-assets/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-white dark:bg-darkGarden-850 dark:text-white text-botanical-950 text-xs p-2.5 rounded-xl border border-botanical-200 dark:border-botanical-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span className="text-[10px] text-botanical-500 dark:text-botanical-400">Láminas sugeridas:</span>
              {PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className="text-[11px] bg-botanical-100 dark:bg-darkGarden-800 hover:bg-botanical-200 dark:hover:bg-darkGarden-700 text-botanical-800 dark:text-botanical-200 px-2 py-0.5 rounded-md border border-botanical-200 dark:border-botanical-700 transition-colors"
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
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>{showAdvanced ? '− Ocultar ficha de cuidados' : '+ Agregar ficha de cuidados (Especie, Riego, Luz)'}</span>
            </button>

            {showAdvanced && (
              <div className="mt-3 p-4 bg-botanical-50 dark:bg-darkGarden-850 rounded-2xl border border-botanical-200 dark:border-botanical-700 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-botanical-700 dark:text-botanical-300 mb-1">
                    Nombre Científico
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Orchidaceae"
                    value={scientificName}
                    onChange={(e) => setScientificName(e.target.value)}
                    className="w-full bg-white dark:bg-darkGarden-900 dark:text-white text-botanical-950 text-xs p-2 rounded-lg border border-botanical-200 dark:border-botanical-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-botanical-700 dark:text-botanical-300 mb-1">
                    Pauta de Riego
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Cada 8 días"
                    value={watering}
                    onChange={(e) => setWatering(e.target.value)}
                    className="w-full bg-white dark:bg-darkGarden-900 dark:text-white text-botanical-950 text-xs p-2 rounded-lg border border-botanical-200 dark:border-botanical-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-botanical-700 dark:text-botanical-300 mb-1">
                    Exposición Solar
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Luz filtrada"
                    value={light}
                    onChange={(e) => setLight(e.target.value)}
                    className="w-full bg-white dark:bg-darkGarden-900 dark:text-white text-botanical-950 text-xs p-2 rounded-lg border border-botanical-200 dark:border-botanical-700"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-botanical-100 dark:border-botanical-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsNewPostModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-botanical-700 dark:text-botanical-300 hover:text-botanical-950 dark:hover:text-white rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publicar en el Cuaderno</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
