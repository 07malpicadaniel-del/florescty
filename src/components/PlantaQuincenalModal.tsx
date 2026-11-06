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
    selectedPlant.toxicity.toLowerCase().includes('segura') ||
    selectedPlant.toxicity.toLowerCase().includes('inofensiva') ||
    selectedPlant.toxicity.toLowerCase().includes('no tóxica');

  return (
    <div 
      onClick={() => setSelectedPlant(null)}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn cursor-pointer"
    >
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-garden-darkCard rounded-3xl shadow-2xl border border-garden-thistle dark:border-garden-darkBorder overflow-hidden flex flex-col max-h-[92vh] transition-colors cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button
          type="button"
          onClick={() => setSelectedPlant(null)}
          className="cursor-pointer absolute top-4 right-4 z-20 bg-garden-darkPurple/80 hover:bg-garden-darkPurple text-white p-2 rounded-full backdrop-blur transition-all border border-garden-amethyst/30"
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
          <div className="absolute inset-0 bg-gradient-to-t from-garden-darkPurple via-garden-darkPurple/40 to-transparent" />

          {/* Plant Name Overlay */}
          <div className="absolute bottom-5 left-6 right-6 text-white space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-garden-amethyst/90 backdrop-blur text-xs font-semibold uppercase tracking-wider text-white mb-1">
              {selectedPlant.category}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold drop-shadow">
              {selectedPlant.commonName}
            </h2>
            <p className="font-serif italic text-garden-thistle text-sm sm:text-base">
              {selectedPlant.scientificName}
            </p>
          </div>
        </div>

        {/* Scrollable Specs Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Summary & Origin */}
          <div className="space-y-3">
            <p className="text-base sm:text-lg text-garden-darkPurple dark:text-garden-thistle leading-relaxed font-serif">
              {selectedPlant.summary}
            </p>
            <div className="flex items-center gap-2 text-xs text-garden-darkPurple/70 dark:text-garden-thistle/70 font-medium bg-garden-cream dark:bg-garden-darkBg p-3 rounded-2xl border border-garden-thistle/80 dark:border-garden-darkBorder">
              <MapPin className="w-4 h-4 text-garden-amethyst shrink-0" />
              <span><strong>Hábitat natural:</strong> {selectedPlant.origin}</span>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-garden-cream dark:bg-garden-darkBg border border-garden-thistle/80 dark:border-garden-darkBorder rounded-2xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-garden-darkPurple dark:text-garden-thistle font-semibold text-xs uppercase tracking-wide">
                <Sun className="w-4 h-4 text-garden-amethyst" />
                <span>Luz recomendada</span>
              </div>
              <p className="text-xs sm:text-sm text-garden-darkPurple/90 dark:text-garden-thistle font-serif font-medium">
                {selectedPlant.light}
              </p>
            </div>

            <div className="bg-garden-cream dark:bg-garden-darkBg border border-garden-thistle/80 dark:border-garden-darkBorder rounded-2xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-garden-darkPurple dark:text-garden-thistle font-semibold text-xs uppercase tracking-wide">
                <Droplet className="w-4 h-4 text-garden-amethyst" />
                <span>Riego</span>
              </div>
              <p className="text-xs sm:text-sm text-garden-darkPurple/90 dark:text-garden-thistle font-serif font-medium">
                {selectedPlant.watering}
              </p>
            </div>

            <div className="bg-garden-cream dark:bg-garden-darkBg border border-garden-thistle/80 dark:border-garden-darkBorder rounded-2xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-garden-darkPurple dark:text-garden-thistle font-semibold text-xs uppercase tracking-wide">
                <Wind className="w-4 h-4 text-garden-amethyst" />
                <span>Humedad</span>
              </div>
              <p className="text-xs sm:text-sm text-garden-darkPurple/90 dark:text-garden-thistle font-serif font-medium">
                {selectedPlant.humidity}
              </p>
            </div>

            <div className={`rounded-2xl p-4 space-y-1 border ${
              isSafeForPets 
                ? 'bg-garden-cream dark:bg-garden-darkBg border-garden-thistle/80 dark:border-garden-darkBorder text-garden-darkPurple dark:text-garden-thistle' 
                : 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-semibold text-xs uppercase tracking-wide">
                {isSafeForPets ? (
                  <ShieldCheck className="w-4 h-4 text-garden-olive" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                )}
                <span>Hogar & Mascotas</span>
              </div>
              <p className="text-xs sm:text-sm font-serif font-medium">
                {selectedPlant.toxicity}
              </p>
            </div>
          </div>

          {/* Curator's Advice */}
          {selectedPlant.curatorNotes && (
            <div className="bg-garden-darkPurple text-garden-thistle rounded-2xl p-5 border border-garden-darkBorder relative overflow-hidden space-y-2">
              <div className="flex items-center gap-2 text-garden-amethyst text-xs font-semibold tracking-wider uppercase font-serif">
                <Sparkles className="w-4 h-4" />
                <span>Consejo para el cultivo</span>
              </div>
              <p className="text-xs sm:text-sm text-garden-thistle/90 italic leading-relaxed font-serif text-base">
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
                  className="inline-flex items-center gap-1 text-xs font-medium bg-garden-thistle/50 dark:bg-garden-darkBg text-garden-darkPurple dark:text-garden-thistle px-3 py-1 rounded-full border border-garden-thistle dark:border-garden-darkBorder"
                >
                  <Tag className="w-3 h-3 text-garden-amethyst" />
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
