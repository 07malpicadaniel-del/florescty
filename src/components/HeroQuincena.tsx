'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Sparkles, 
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
    <section className="relative overflow-hidden bg-gradient-to-b from-garden-darkPurple via-[#2D142A] to-garden-darkPurple dark:from-black dark:via-garden-darkBg dark:to-black text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b border-garden-darkBorder transition-colors">
      {/* Decorative ambient background glows with Amethyst & Olive */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-garden-amethyst/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-garden-olive/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Badges & Fortnight Countdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-garden-calPoly/80 border border-garden-olive/40 text-xs font-semibold text-garden-thistle">
              <span className="w-2 h-2 rounded-full bg-garden-thistle animate-ping" />
              Edición Quincenal
            </span>
            <span className="text-xs text-garden-thistle/80 font-mono">
              {currentEdition.dateRange}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openEditor}
              className="inline-flex items-center gap-1.5 text-xs text-garden-thistle hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-garden-amethyst" />
              <span>Editar esta Quincena</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Left is Editorial, Right is Featured Plant Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Editorial & Vision (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2.5 text-garden-thistle flex-wrap">
                <Flower2 className="w-4 h-4 text-garden-amethyst" />
                <span className="font-script text-2xl sm:text-3xl text-garden-thistle tracking-wide">
                  El encanto de las flores
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-garden-thistle/70 bg-white/10 px-2 py-0.5 rounded-full">
                  Entrega #{currentEdition.editionNumber}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                {currentEdition.cycleTitle}
              </h1>
              <p className="text-garden-thistle/90 text-lg sm:text-xl leading-relaxed font-normal max-w-2xl font-serif">
                {currentEdition.editorialMessage}
              </p>
            </div>

            {/* Biweekly Highlights list */}
            {currentEdition.highlights && currentEdition.highlights.length > 0 && (
              <div className="bg-garden-darkPurple/80 dark:bg-garden-darkCard/80 border border-garden-darkBorder rounded-2xl p-4 space-y-2.5">
                <div className="text-xs font-semibold uppercase tracking-wider text-garden-thistle flex items-center gap-1.5 font-serif">
                  <Leaf className="w-3.5 h-3.5 text-garden-amethyst" />
                  Puntos destacados de la quincena:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-garden-thistle/90">
                  {currentEdition.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-garden-amethyst shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('publicaciones')}
                className="inline-flex items-center gap-2 bg-garden-olive hover:bg-garden-calPoly text-white font-medium px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-garden-olive/30 text-sm group"
              >
                <span>Ver Publicaciones</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('plantas')}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-3 rounded-xl transition-colors border border-white/20 text-sm"
              >
                <Leaf className="w-4 h-4 text-garden-thistle" />
                <span>Colección de Plantas</span>
              </button>

              <button
                onClick={() => setSelectedPlant(plant)}
                className="inline-flex items-center gap-2 text-garden-thistle hover:text-white px-3 py-3 text-sm font-medium transition-colors font-serif italic"
              >
                <span>Ficha de {plant.commonName}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Featured Plant Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative group bg-garden-darkCard/95 border border-garden-darkBorder rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
              <div className="absolute -top-3 left-6 bg-garden-amethyst text-white px-3.5 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-md">
                <Flower2 className="w-3.5 h-3.5 text-garden-thistle" />
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
                <div className="absolute inset-0 bg-gradient-to-t from-garden-darkPurple via-transparent to-transparent opacity-85" />
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-mono text-garden-thistle uppercase tracking-wider block">
                    {plant.category}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white drop-shadow">
                    {plant.commonName}
                  </h3>
                  <p className="text-xs italic text-garden-thistle/90 font-serif">
                    {plant.scientificName}
                  </p>
                </div>

                <div className="absolute top-3 right-3 bg-garden-darkPurple/80 backdrop-blur px-2.5 py-1 rounded-lg text-[11px] font-semibold text-garden-thistle border border-garden-amethyst/30">
                  {plant.difficulty}
                </div>
              </div>

              {/* Quick Specs Badges */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="bg-garden-darkBg/90 rounded-xl p-2 border border-garden-darkBorder">
                  <Sun className="w-4 h-4 text-garden-amethyst mx-auto mb-1" />
                  <div className="text-[10px] text-garden-thistle/70 font-medium">Luz</div>
                  <div className="text-xs font-medium text-white truncate" title={plant.light}>
                    {plant.light.split('(')[0].trim()}
                  </div>
                </div>

                <div className="bg-garden-darkBg/90 rounded-xl p-2 border border-garden-darkBorder">
                  <Droplet className="w-4 h-4 text-garden-thistle mx-auto mb-1" />
                  <div className="text-[10px] text-garden-thistle/70 font-medium">Riego</div>
                  <div className="text-xs font-medium text-white truncate" title={plant.watering}>
                    {plant.watering.split('(')[0].trim()}
                  </div>
                </div>

                <div className="bg-garden-darkBg/90 rounded-xl p-2 border border-garden-darkBorder">
                  <ShieldCheck className="w-4 h-4 text-garden-olive mx-auto mb-1" />
                  <div className="text-[10px] text-garden-thistle/70 font-medium">Hogar</div>
                  <div className="text-xs font-medium text-white truncate" title={plant.toxicity}>
                    {plant.toxicity.includes('Segura') || plant.toxicity.includes('no tóxica') ? 'Segura' : 'Precaución'}
                  </div>
                </div>
              </div>

              {/* Plant Excerpt & Action */}
              <div className="mt-4 pt-3 border-t border-garden-darkBorder flex items-center justify-between gap-2">
                <p className="text-xs text-garden-thistle/80 line-clamp-2 italic font-serif">
                  &ldquo;{plant.summary}&rdquo;
                </p>
                <button
                  onClick={() => setSelectedPlant(plant)}
                  className="shrink-0 text-xs bg-garden-olive hover:bg-garden-calPoly text-white font-medium px-3.5 py-1.5 rounded-xl transition-colors font-serif"
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
