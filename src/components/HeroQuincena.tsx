'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';
import { 
  ArrowRight, 
  Leaf, 
  CheckCircle2, 
  Flower2,
  BookOpen,
  Sparkles
} from 'lucide-react';
import dynamic from 'next/dynamic';

const Orchid3DViewer = dynamic(() => import('./Orchid3DViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 sm:h-96 rounded-3xl bg-gradient-to-b from-[#2B1428] via-garden-darkPurple to-[#1E0E1B] border-2 border-garden-thistle/50 flex flex-col items-center justify-center text-garden-thistle gap-3 p-6 text-center shadow-2xl">
      <div className="w-8 h-8 rounded-full border-2 border-garden-amethyst border-t-transparent animate-spin" />
      <p className="font-serif text-sm text-white font-medium">Iniciando visor 3D de la Orquídea...</p>
    </div>
  )
});

import { RootsTopRight, RootsBottomLeft } from './BotanicalRoots';

export default function HeroQuincena() {
  const { 
    content, 
    setActiveTab, 
    openEditor 
  } = useContent();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-garden-darkPurple via-[#2B1428] to-garden-darkPurple dark:from-black dark:via-garden-darkBg dark:to-black text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-garden-darkBorder transition-colors">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-garden-amethyst/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-garden-olive/15 rounded-full blur-3xl pointer-events-none" />

      {/* Dark green decorative roots & branches in empty spaces - Highly visible and prominent */}
      <RootsTopRight className="right-0 top-0 opacity-80" />
      <RootsBottomLeft className="left-0 bottom-0 opacity-80" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Grid: Left is Warm Welcome, Right is Interactive 3D Orchid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Blog Welcome (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Very Large Prominent Logo + Avonia Script Title */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
              <div 
                className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-garden-thistle/80 dark:border-garden-darkBorder shrink-0 bg-white hover:scale-105 transition-transform duration-300"
                style={{ width: '120px', height: '144px', maxWidth: '120px', maxHeight: '144px' }}
              >
                <img
                  src="/logo.png"
                  alt="Logo El Jardín Secreto"
                  width={120}
                  height={144}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-garden-calPoly/90 border border-garden-olive/50 text-xs font-semibold text-garden-thistle">
                  <Flower2 className="w-3.5 h-3.5 text-garden-amethyst" />
                  <span>Blog Botánico & Flores del Hogar</span>
                </div>
                <h1 className="font-script text-6xl sm:text-7xl lg:text-8xl text-white font-normal tracking-wide leading-tight drop-shadow-md">
                  El Jardín Secreto
                </h1>
              </div>
            </div>
            
            <p className="font-serif text-xl sm:text-2xl text-garden-thistle/90 italic font-light leading-relaxed max-w-2xl">
              Un refugio botánico dedicado al arte de observar, aprender y cuidar las flores y plantas que llenan de vida nuestro hogar.
            </p>

            {/* Botanical Values list (clean, no dates or editions) */}
            <div className="bg-garden-darkPurple/80 dark:bg-garden-darkCard/80 border border-garden-darkBorder rounded-2xl p-4 sm:p-5 space-y-3 shadow-inner">
              <div className="text-xs font-semibold uppercase tracking-wider text-garden-thistle flex items-center gap-2 font-serif">
                <Leaf className="w-4 h-4 text-garden-amethyst" />
                <span>En este rincón verde encontrarás:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-garden-thistle/90 font-serif">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-garden-amethyst shrink-0 mt-0.5" />
                  <span>Guía completa con más de 20 especies de flores</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-garden-amethyst shrink-0 mt-0.5" />
                  <span>Consejos detallados de riego, sustrato y luz</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-garden-amethyst shrink-0 mt-0.5" />
                  <span>Notas botánicas automáticas cada semana</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-garden-amethyst shrink-0 mt-0.5" />
                  <span>Comunidad abierta de cultivadores anónimos</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 relative z-20">
              <button
                type="button"
                onClick={() => setActiveTab('plantas')}
                className="inline-flex items-center gap-2 bg-garden-olive hover:bg-garden-calPoly text-white font-medium px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-garden-olive/30 text-sm group cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-garden-thistle" />
                <span>Explorar Colección de Flores</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('publicaciones')}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-3 rounded-xl transition-colors border border-white/20 text-sm cursor-pointer"
              >
                <Leaf className="w-4 h-4 text-garden-thistle" />
                <span>Leer Publicaciones del Jardín</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Orchid Model (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <Orchid3DViewer />
          </div>
        </div>
      </div>
    </section>
  );
}
