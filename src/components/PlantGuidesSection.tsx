'use client';

import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  BookOpen, 
  Sun, 
  Droplet, 
  ShieldCheck, 
  AlertCircle, 
  Search, 
  ArrowRight,
  Flower2
} from 'lucide-react';
import { RootsTopRight, RootsBottomLeft } from './BotanicalRoots';

export default function PlantGuidesSection() {
  const { content, setSelectedPlant } = useContent();
  const [filterDifficulty, setFilterDifficulty] = useState<string>('Todas');
  const [encyclopediaSearch, setEncyclopediaSearch] = useState('');

  const plants = content.plantsEncyclopedia.filter((p) => {
    const matchesDiff = filterDifficulty === 'Todas' || p.difficulty === filterDifficulty;
    const query = encyclopediaSearch.toLowerCase().trim();
    const matchesQuery = 
      !query ||
      p.commonName.toLowerCase().includes(query) ||
      p.scientificName.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query);

    return matchesDiff && matchesQuery;
  });

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative dark green roots in empty margin space */}
      <RootsTopRight className="opacity-25" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-garden-thistle/80 dark:border-garden-darkBorder relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 text-garden-amethyst mb-1">
            <Flower2 className="w-4 h-4" />
            <span className="font-serif text-xs font-semibold uppercase tracking-wider text-garden-olive">
              Herbario & Fichas Botánicas
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-script font-normal text-garden-darkPurple dark:text-garden-thistle tracking-wide leading-tight">
            Colección de Flores & Plantas
          </h2>
          <p className="text-garden-darkPurple/80 dark:text-garden-thistle/80 mt-1 max-w-2xl text-sm sm:text-base font-serif">
            Fichas completas de 20 especies botánicas con sus requerimientos de iluminación, hidratación y secretos de floración.
          </p>
        </div>

        {/* Filter by Difficulty */}
        <div className="flex items-center gap-2">
          {['Todas', 'Principiante', 'Intermedio', 'Experto'].map((level) => (
            <button
              key={level}
              onClick={() => setFilterDifficulty(level)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                filterDifficulty === level
                  ? 'bg-garden-darkPurple text-white dark:bg-garden-amethyst dark:text-white shadow-sm ring-1 ring-garden-amethyst'
                  : 'bg-white dark:bg-garden-darkCard text-garden-darkPurple dark:text-garden-thistle border border-garden-thistle/80 dark:border-garden-darkBorder hover:bg-garden-thistle/40'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar for Encyclopedia */}
      <div className="py-6">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-garden-amethyst absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por nombre de flor o planta..."
            value={encyclopediaSearch}
            onChange={(e) => setEncyclopediaSearch(e.target.value)}
            className="w-full bg-white dark:bg-garden-darkCard dark:text-white text-garden-darkPurple text-sm pl-10 pr-4 py-2.5 rounded-2xl border border-garden-thistle/80 dark:border-garden-darkBorder focus:outline-none focus:ring-2 focus:ring-garden-amethyst shadow-soft placeholder:text-garden-darkPurple/50"
          />
        </div>
      </div>

      {/* Plants Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.map((plant) => {
          const isPetSafe = 
            plant.toxicity.toLowerCase().includes('segura') ||
            plant.toxicity.toLowerCase().includes('inofensiva') ||
            plant.toxicity.toLowerCase().includes('no tóxica');

          return (
            <div
              key={plant.id}
              onClick={() => setSelectedPlant(plant)}
              className="group bg-white dark:bg-garden-darkCard rounded-2xl border border-garden-thistle/80 dark:border-garden-darkBorder overflow-hidden shadow-soft hover:shadow-lifted hover:border-garden-amethyst transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden bg-garden-thistle/30 dark:bg-garden-darkBg">
                <img
                  src={plant.imageUrl}
                  alt={plant.commonName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-garden-darkPurple via-transparent to-transparent opacity-75 group-hover:opacity-40 transition-opacity" />

                {/* Difficulty badge */}
                <div className="absolute top-3 right-3 bg-garden-darkPurple/80 backdrop-blur text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-garden-amethyst/30">
                  {plant.difficulty}
                </div>

                {/* Category Pill */}
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-garden-thistle block">
                    {plant.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white drop-shadow leading-tight">
                    {plant.commonName}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs italic text-garden-darkPurple/70 dark:text-garden-thistle/70 mb-2 font-serif">
                    {plant.scientificName}
                  </p>
                  <p className="text-xs text-garden-darkPurple/80 dark:text-garden-thistle/80 line-clamp-3 leading-relaxed font-serif">
                    {plant.summary}
                  </p>
                </div>

                {/* Quick specs pill row */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-garden-thistle/60 dark:border-garden-darkBorder text-garden-darkPurple/80 dark:text-garden-thistle/80">
                  <div className="flex items-center gap-1.5 truncate">
                    <Sun className="w-3.5 h-3.5 text-garden-amethyst shrink-0" />
                    <span className="truncate">{plant.light.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Droplet className="w-3.5 h-3.5 text-garden-amethyst shrink-0" />
                    <span className="truncate">{plant.watering.split('(')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="px-5 py-3 bg-garden-cream/60 dark:bg-garden-darkBg border-t border-garden-thistle/60 dark:border-garden-darkBorder flex items-center justify-between text-xs">
                <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                  isPetSafe ? 'text-garden-olive dark:text-garden-thistle' : 'text-rose-600'
                }`}>
                  {isPetSafe ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-garden-olive" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                  )}
                  <span>{isPetSafe ? 'Segura' : 'Precaución'}</span>
                </span>

                <span className="text-garden-amethyst font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1 font-serif">
                  Ver cuidados
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
