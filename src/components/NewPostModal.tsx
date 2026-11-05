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
  HelpCircle,
  Leaf
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
  { label: 'Esquejes', url: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1000&q=80' },
];

export default function NewPostModal() {
  const { isNewPostModalOpen, setIsNewPostModalOpen, createPost, content } = useContent();

  const [title, setTitle] = useState('');
  const [contentBody, setContentBody] = useState('');
  const [category, setCategory] = useState<PostCategory>('Cuidado y Riego');
  const [authorName, setAuthorName] = useState('');
  const [isCurator, setIsCurator] = useState(false);
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
      authorName: authorName.trim() || undefined,
      isCurator,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-botanical-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-botanical-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <h3 className="font-serif text-lg font-bold">
              Crear Nueva Publicación en el Foro
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
          {/* Post Author / Curator Toggle */}
          <div className="bg-botanical-50 p-3.5 rounded-2xl border border-botanical-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-medium text-botanical-900">Autor:</span>
              <button
                type="button"
                onClick={() => setIsCurator(!isCurator)}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  isCurator
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-white text-botanical-700 border border-botanical-300'
                }`}
              >
                {isCurator ? '★ Constanza Pimentel (Curadora)' : 'Publicar como Visitante'}
              </button>
            </div>

            {!isCurator && (
              <input
                type="text"
                placeholder="Tu nombre (opcional)..."
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="bg-white text-botanical-950 px-3 py-1.5 rounded-xl border border-botanical-200 text-xs focus:ring-1 focus:ring-emerald-500"
              />
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-botanical-800 mb-1">
              Categoría del Tema
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as PostCategory)}
              className="w-full bg-white text-botanical-950 text-sm p-2.5 rounded-xl border border-botanical-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
            <label className="block text-xs font-semibold text-botanical-800 mb-1">
              Título de la Publicación *
            </label>
            <input
              type="text"
              placeholder="Ej: ¿Cómo salvar una orquídea con hojas arrugadas?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white text-botanical-950 text-sm p-3 rounded-xl border border-botanical-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold text-botanical-800 mb-1">
              Contenido / Pregunta / Experiencia *
            </label>
            <textarea
              rows={4}
              placeholder="Describe detalladamente tu caso, dudas sobre riego, luz, síntomas de la planta..."
              value={contentBody}
              onChange={(e) => setContentBody(e.target.value)}
              className="w-full bg-white text-botanical-950 text-sm p-3 rounded-xl border border-botanical-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              required
            />
          </div>

          {/* Image URL with Preset Quick Buttons */}
          <div>
            <label className="block text-xs font-semibold text-botanical-800 mb-1 flex items-center justify-between">
              <span>Fotografía o Imagen (URL)</span>
              <span className="text-botanical-500 font-normal">Opcional</span>
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-white text-botanical-950 text-xs p-2.5 rounded-xl border border-botanical-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span className="text-[10px] text-botanical-500">Presets rápidos:</span>
              {PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className="text-[11px] bg-botanical-100 hover:bg-botanical-200 text-botanical-800 px-2 py-0.5 rounded-md border border-botanical-200 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Collapsible Botanical Specs */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
            >
              <span>{showAdvanced ? '− Ocultar ficha botánica' : '+ Agregar ficha técnica (Nombre científico, Riego, Luz)'}</span>
            </button>

            {showAdvanced && (
              <div className="mt-3 p-4 bg-botanical-50 rounded-2xl border border-botanical-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-botanical-700 mb-1">
                    Nombre Científico
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Ficus elastica"
                    value={scientificName}
                    onChange={(e) => setScientificName(e.target.value)}
                    className="w-full bg-white text-botanical-950 text-xs p-2 rounded-lg border border-botanical-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-botanical-700 mb-1">
                    Riego Recomendado
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Cada 8 días"
                    value={watering}
                    onChange={(e) => setWatering(e.target.value)}
                    className="w-full bg-white text-botanical-950 text-xs p-2 rounded-lg border border-botanical-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-botanical-700 mb-1">
                    Exposición Solar
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Luz indirecta"
                    value={light}
                    onChange={(e) => setLight(e.target.value)}
                    className="w-full bg-white text-botanical-950 text-xs p-2 rounded-lg border border-botanical-200"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-botanical-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsNewPostModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-botanical-700 hover:text-botanical-950 rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publicar en el Foro</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
