'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';
import { 
  X, 
  Sun, 
  Droplet, 
  Wind, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Tag, 
  AlertTriangle
} from 'lucide-react';

export default function PlantaQuincenalModal() {
  const { selectedPlant, setSelectedPlant } = useContent();

  if (!selectedPlant) return null;

  const isSafeForPets = 
    selectedPlant.toxicity.toLowerCase().includes('no tóxica') || 
    selectedPlant.toxicity.toLowerCase().includes('pet safe') ||
    selectedPlant.toxicity.toLowerCase().includes('inofensiva') ||
    selectedPlant.toxicity.toLowerCase().includes('100% pet-friendly');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-darkGarden-900 rounded-3xl shadow-2xl border border-botanical-200 dark:border-botanical-800 overflow-hidden flex flex-col max-h-[92vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button
          onClick={() => setSelectedPlant(null)}
          className="absolute top-4 right-4 z-20 bg-botanical-950/80 hover:bg-black text-white p-2 rounded-full backdrop-blur transition-all border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-72 sm:h-80 w-full shrink-0">
          <img
            src={selectedPlant.imageUrl}
            alt={selectedPlant.commonName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-botanical-950 via-botanical-950/40 to-transparent" />

          {/* Plant Name Overlay */}
          <div className="absolute bottom-5 left-6 right-6 text-white space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-600/90 backdrop-blur text-xs font-semibold uppercase tracking-wider text-white mb-1">
              {selectedPlant.category}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold drop-shadow">
              {selectedPlant.commonName}
            </h2>
            <p className="font-serif italic text-botanical-200 text-sm sm:text-base">
              {selectedPlant.scientificName}
            </p>
          </div>
        </div>

        {/* Scrollable Specs Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Summary & Origin */}
          <div className="space-y-3">
            <p className="text-base sm:text-lg text-botanical-900 dark:text-botanical-100 leading-relaxed font-normal">
              {selectedPlant.summary}
            </p>
            <div className="flex items-center gap-2 text-xs text-botanical-600 dark:text-botanical-300 font-medium bg-botanical-50 dark:bg-darkGarden-850 p-3 rounded-2xl border border-botanical-200 dark:border-botanical-800">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span><strong>Hábitat Natural & Origen:</strong> {selectedPlant.origin}</span>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-amber-50/80 dark:bg-darkGarden-850 border border-amber-200/80 dark:border-botanical-800 rounded-2xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-semibold text-xs uppercase tracking-wide">
                <Sun className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Requerimiento de Luz</span>
              </div>
              <p className="text-xs sm:text-sm text-botanical-900 dark:text-botanical-200 font-medium">
                {selectedPlant.light}
              </p>
            </div>

            <div className="bg-cyan-50/80 dark:bg-darkGarden-850 border border-cyan-200/80 dark:border-botanical-800 rounded-2xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-cyan-900 dark:text-cyan-300 font-semibold text-xs uppercase tracking-wide">
                <Droplet className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Pauta de Riego</span>
              </div>
              <p className="text-xs sm:text-sm text-botanical-900 dark:text-botanical-200 font-medium">
                {selectedPlant.watering}
              </p>
            </div>

            <div className="bg-emerald-50/80 dark:bg-darkGarden-850 border border-emerald-200/80 dark:border-botanical-800 rounded-2xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-semibold text-xs uppercase tracking-wide">
                <Wind className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Humedad Ambiental</span>
              </div>
              <p className="text-xs sm:text-sm text-botanical-900 dark:text-botanical-200 font-medium">
                {selectedPlant.humidity}
              </p>
            </div>

            <div className={`rounded-2xl p-4 space-y-1 border ${
              isSafeForPets 
                ? 'bg-emerald-50/80 dark:bg-darkGarden-850 border-emerald-200/80 dark:border-botanical-800 text-emerald-900 dark:text-emerald-300' 
                : 'bg-rose-50/80 dark:bg-darkGarden-850 border-rose-200/80 dark:border-botanical-800 text-rose-900 dark:text-rose-300'
            }`}>
              <div className="flex items-center gap-2 font-semibold text-xs uppercase tracking-wide">
                {isSafeForPets ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                )}
                <span>Mascotas & Hogar</span>
              </div>
              <p className="text-xs sm:text-sm font-medium">
                {selectedPlant.toxicity}
              </p>
            </div>
          </div>

          {/* Curator's Advice */}
          {selectedPlant.curatorNotes && (
            <div className="bg-botanical-950 dark:bg-black text-botanical-50 rounded-2xl p-5 border border-botanical-800 relative overflow-hidden space-y-2">
              <div className="flex items-center gap-2 text-flora-amber text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Consejo de Constanza Pimentel</span>
              </div>
              <p className="text-xs sm:text-sm text-botanical-100 italic leading-relaxed font-serif">
                &ldquo;{selectedPlant.curatorNotes}&rdquo;
              </p>
            </div>
          )}

          {/* Tags */}
          {selectedPlant.tags && selectedPlant.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedPlant.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs font-medium bg-botanical-100 dark:bg-darkGarden-800 text-botanical-800 dark:text-botanical-200 px-3 py-1 rounded-full border border-botanical-200 dark:border-botanical-700"
                >
                  <Tag className="w-3 h-3 text-botanical-500" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
