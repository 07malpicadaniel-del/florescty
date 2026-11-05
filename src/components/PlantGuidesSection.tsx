'use client';

import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { PlantProfile } from '../types';
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
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-botanical-200 dark:border-botanical-800">
        <div>
          <div className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            Herbario Vivo · Colección Botánica
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-botanical-950 dark:text-emerald-50 tracking-tight">
            Guía de Especies & Cuidados
          </h2>
          <p className="text-botanical-700 dark:text-botanical-300 mt-2 max-w-2xl text-sm sm:text-base">
            Fichas ilustradas con los requerimientos de luz, riego, humedad ambiental y compatibilidad con mascotas de cada flor y planta de nuestra colección.
          </p>
        </div>

        {/* Filter by Difficulty */}
        <div className="flex items-center gap-2">
          {['Todas', 'Principiante', 'Intermedio', 'Experto'].map((level) => (
            <button
              key={level}
              onClick={() => setFilterDifficulty(level)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filterDifficulty === level
                  ? 'bg-botanical-800 dark:bg-emerald-700 text-white shadow-sm'
                  : 'bg-white dark:bg-darkGarden-900 text-botanical-800 dark:text-botanical-200 border border-botanical-200 dark:border-botanical-800 hover:bg-botanical-50 dark:hover:bg-darkGarden-850'
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
          <Search className="w-4 h-4 text-botanical-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por nombre común o científico..."
            value={encyclopediaSearch}
            onChange={(e) => setEncyclopediaSearch(e.target.value)}
            className="w-full bg-white dark:bg-darkGarden-900 dark:text-white text-botanical-950 text-sm pl-10 pr-4 py-2.5 rounded-2xl border border-botanical-200 dark:border-botanical-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-soft"
          />
        </div>
      </div>

      {/* Plants Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.map((plant) => {
          const isPetSafe = 
            plant.toxicity.toLowerCase().includes('no tóxica') ||
            plant.toxicity.toLowerCase().includes('pet') ||
            plant.toxicity.toLowerCase().includes('inofensiva');

          return (
            <div
              key={plant.id}
              onClick={() => setSelectedPlant(plant)}
              className="group bg-white dark:bg-darkGarden-900 rounded-2xl border border-botanical-200/80 dark:border-botanical-800/80 overflow-hidden shadow-soft hover:shadow-lifted hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden bg-botanical-100 dark:bg-darkGarden-800">
                <img
                  src={plant.imageUrl}
                  alt={plant.commonName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-75 group-hover:opacity-40 transition-opacity" />

                {/* Difficulty badge */}
                <div className="absolute top-3 right-3 bg-botanical-950/80 backdrop-blur text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-white/20">
                  {plant.difficulty}
                </div>

                {/* Category Pill */}
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 block">
                    {plant.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white drop-shadow leading-tight">
                    {plant.commonName}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs italic text-botanical-600 dark:text-emerald-300 mb-2 font-serif">
                    {plant.scientificName}
                  </p>
                  <p className="text-xs text-botanical-800 dark:text-botanical-300 line-clamp-3 leading-relaxed">
                    {plant.summary}
                  </p>
                </div>

                {/* Quick specs pill row */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-botanical-100 dark:border-botanical-800 text-botanical-700 dark:text-botanical-300">
                  <div className="flex items-center gap-1.5 truncate">
                    <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">{plant.light.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Droplet className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span className="truncate">{plant.watering.split('(')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="px-5 py-3 bg-botanical-50/70 dark:bg-darkGarden-950 border-t border-botanical-100 dark:border-botanical-800 flex items-center justify-between text-xs">
                <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                  isPetSafe ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'
                }`}>
                  {isPetSafe ? (
                    <ShieldCheck className="w-3.5 h-3.5" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5" />
                  )}
                  <span>{isPetSafe ? 'Pet Safe' : 'Precaución'}</span>
                </span>

                <span className="text-emerald-700 dark:text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                  Ver ficha completa
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
