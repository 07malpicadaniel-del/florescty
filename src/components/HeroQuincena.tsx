'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Sparkles, 
  Calendar, 
  Sun, 
  Droplet, 
  ShieldCheck, 
  ArrowRight, 
  Leaf, 
  CheckCircle2, 
  SlidersHorizontal,
  Flower2
} from 'lucide-react';

export default function HeroQuincena() {
  const { 
    content, 
    setActiveTab, 
    openEditor, 
    setSelectedPlant 
  } = useContent();

  const { currentEdition } = content;
  const plant = currentEdition.featuredPlant;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-botanical-950 via-botanical-900 to-botanical-950 dark:from-black dark:via-darkGarden-950 dark:to-black text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b border-botanical-800 transition-colors">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-flora-amber/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Badges & Fortnight Countdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-botanical-800/80 dark:bg-darkGarden-850 border border-botanical-700 text-xs font-semibold text-botanical-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Edición Quincenal Activa
            </span>
            <span className="text-xs text-botanical-300 font-mono">
              Quincena {currentEdition.dateRange}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openEditor}
              className="inline-flex items-center gap-1.5 text-xs text-botanical-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-flora-amber" />
              <span>Personalizar esta Quincena</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Left is Editorial, Right is Featured Plant Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Editorial & Vision (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-flora-amber font-mono text-xs uppercase tracking-widest font-semibold">
                <Flower2 className="w-4 h-4" />
                Entrega Quincenal #{currentEdition.editionNumber}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                {currentEdition.cycleTitle}
              </h1>
              <p className="text-botanical-200 text-base sm:text-lg leading-relaxed font-normal max-w-2xl font-serif">
                {currentEdition.editorialMessage}
              </p>
            </div>

            {/* Biweekly Highlights list */}
            {currentEdition.highlights && currentEdition.highlights.length > 0 && (
              <div className="bg-botanical-900/60 dark:bg-darkGarden-900/80 border border-botanical-700/50 rounded-2xl p-4 space-y-2.5">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                  Ejes de la Quincena:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-botanical-200">
                  {currentEdition.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('foro')}
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-medium px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-700/30 text-sm group"
              >
                <span>Explorar Cuaderno Quincenal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('especies')}
                className="inline-flex items-center gap-2 bg-botanical-800 hover:bg-botanical-700 dark:bg-darkGarden-850 dark:hover:bg-darkGarden-800 text-botanical-100 font-medium px-4 py-3 rounded-xl transition-colors border border-botanical-600/50 text-sm"
              >
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>Herbario de Especies</span>
              </button>

              <button
                onClick={() => setSelectedPlant(plant)}
                className="inline-flex items-center gap-2 text-flora-amber hover:text-white px-3 py-3 text-sm font-medium transition-colors"
              >
                <span>Ficha de {plant.commonName}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Featured Plant of the Fortnight Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative group bg-botanical-900/90 dark:bg-darkGarden-900/90 border border-botanical-700 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
              <div className="absolute -top-3 left-6 bg-flora-amber text-botanical-950 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-md">
                <Flower2 className="w-3.5 h-3.5" />
                Planta de la Quincena
              </div>

              {/* Plant Image */}
              <div 
                className="relative h-60 sm:h-64 w-full rounded-2xl overflow-hidden mt-2 cursor-pointer"
                onClick={() => setSelectedPlant(plant)}
              >
                <img
                  src={plant.imageUrl}
                  alt={plant.commonName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-botanical-950 via-transparent to-transparent opacity-85" />
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-mono text-emerald-300 uppercase tracking-wider block">
                    {plant.category}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white drop-shadow">
                    {plant.commonName}
                  </h3>
                  <p className="text-xs italic text-botanical-200 font-serif">
                    {plant.scientificName}
                  </p>
                </div>

                <div className="absolute top-3 right-3 bg-botanical-950/80 backdrop-blur px-2.5 py-1 rounded-lg text-[11px] font-semibold text-emerald-300 border border-emerald-500/30">
                  {plant.difficulty}
                </div>
              </div>

              {/* Quick Specs Badges */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="bg-botanical-800/80 dark:bg-darkGarden-850 rounded-xl p-2 border border-botanical-700/50">
                  <Sun className="w-4 h-4 text-flora-amber mx-auto mb-1" />
                  <div className="text-[10px] text-botanical-400 font-medium">Luz</div>
                  <div className="text-xs font-medium text-botanical-100 truncate" title={plant.light}>
                    {plant.light.split('(')[0].trim()}
                  </div>
                </div>

                <div className="bg-botanical-800/80 dark:bg-darkGarden-850 rounded-xl p-2 border border-botanical-700/50">
                  <Droplet className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <div className="text-[10px] text-botanical-400 font-medium">Riego</div>
                  <div className="text-xs font-medium text-botanical-100 truncate" title={plant.watering}>
                    {plant.watering.split('(')[0].trim()}
                  </div>
                </div>

                <div className="bg-botanical-800/80 dark:bg-darkGarden-850 rounded-xl p-2 border border-botanical-700/50">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <div className="text-[10px] text-botanical-400 font-medium">Hogar</div>
                  <div className="text-xs font-medium text-botanical-100 truncate" title={plant.toxicity}>
                    {plant.toxicity.includes('No tóxica') || plant.toxicity.includes('Pet Safe') ? 'Segura' : 'Precaución'}
                  </div>
                </div>
              </div>

              {/* Plant Excerpt & Action */}
              <div className="mt-4 pt-3 border-t border-botanical-800 flex items-center justify-between gap-2">
                <p className="text-xs text-botanical-300 line-clamp-2 italic font-serif">
                  &ldquo;{plant.summary}&rdquo;
                </p>
                <button
                  onClick={() => setSelectedPlant(plant)}
                  className="shrink-0 text-xs bg-emerald-700 hover:bg-emerald-600 text-white font-medium px-3.5 py-1.5 rounded-xl transition-colors"
                >
                  Ver Ficha
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
