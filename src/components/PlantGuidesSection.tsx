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
  Tag, 
  Sparkles,
  ArrowRight
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-botanical-200">
        <div>
          <div className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            Herbario Vivo · Colección Botánica
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-botanical-950 tracking-tight">
            Guía de Especies & Cuidados
          </h2>
          <p className="text-botanical-700 mt-2 max-w-2xl text-sm sm:text-base">
            Fichas técnicas ilustradas con los secretos de cultivo de cada especie. Aprende sobre sus requerimientos de luz, riego, humedad y compatibilidad con mascotas.
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
                  ? 'bg-botanical-900 text-white shadow-sm'
                  : 'bg-white text-botanical-800 border border-botanical-200 hover:bg-botanical-50'
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
            className="w-full bg-white text-botanical-950 text-sm pl-10 pr-4 py-2.5 rounded-2xl border border-botanical-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-soft"
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
              className="group bg-white rounded-2xl border border-botanical-200/80 overflow-hidden shadow-soft hover:shadow-lifted hover:border-botanical-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden bg-botanical-100">
                <img
                  src={plant.imageUrl}
                  alt={plant.commonName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                {/* Difficulty badge */}
                <div className="absolute top-3 right-3 bg-botanical-950/80 backdrop-blur text-white text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/20">
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
                  <p className="text-xs italic text-botanical-600 mb-2 font-serif">
                    {plant.scientificName}
                  </p>
                  <p className="text-xs text-botanical-800 line-clamp-3 leading-relaxed">
                    {plant.summary}
                  </p>
                </div>

                {/* Quick specs pill row */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-botanical-100 text-botanical-700">
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
              <div className="px-5 py-3 bg-botanical-50/60 border-t border-botanical-100 flex items-center justify-between text-xs">
                <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                  isPetSafe ? 'text-emerald-700' : 'text-amber-700'
                }`}>
                  {isPetSafe ? (
                    <ShieldCheck className="w-3.5 h-3.5" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5" />
                  )}
                  <span>{isPetSafe ? 'Pet Safe' : 'Precaución'}</span>
                </span>

                <span className="text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
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
