'use client';

import React, { useState } from 'react';
import { Sparkles, Maximize2, RotateCw, Flower2 } from 'lucide-react';

export default function Orchid3DViewer() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [modelType, setModelType] = useState<'botanical' | 'flower'>('botanical');

  // Selected orchid models on Sketchfab
  // 1. Phalaenopsis sp. (Joly Lab / Montreal Botanical Garden scan)
  // 2. Orchid flower specimen
  const modelId = modelType === 'botanical' 
    ? '0c0e843bb1ef432ea7008638b939fbf3' 
    : '684ff0951cc688ae4254e30813e0bdc5997af1e';

  const embedUrl = `https://sketchfab.com/models/${modelId}/embed?autostart=1&ui_controls=1&ui_infos=0&ui_inspector=0&ui_watermark=0&ui_theme=dark`;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#2B1428] via-garden-darkPurple to-[#1E0E1B] border border-garden-thistle/40 dark:border-garden-darkBorder shadow-2xl p-4 sm:p-5 flex flex-col group">
      {/* Header bar of 3D card */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-garden-olive animate-pulse" />
          <span className="font-serif font-semibold text-white tracking-wide flex items-center gap-1.5">
            <Flower2 className="w-3.5 h-3.5 text-garden-amethyst" />
            Modelado 3D Interactivo
          </span>
          <span className="text-garden-thistle/70 font-script text-base hidden sm:inline">
            Orquídea Phalaenopsis
          </span>
        </div>

        {/* Switch specimen view */}
        <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-lg text-[11px]">
          <button
            onClick={() => setModelType('botanical')}
            className={`px-2 py-0.5 rounded-md transition-all ${
              modelType === 'botanical'
                ? 'bg-garden-amethyst text-white shadow-sm'
                : 'text-garden-thistle/80 hover:text-white'
            }`}
          >
            Espécimen
          </button>
          <button
            onClick={() => setModelType('flower')}
            className={`px-2 py-0.5 rounded-md transition-all ${
              modelType === 'flower'
                ? 'bg-garden-amethyst text-white shadow-sm'
                : 'text-garden-thistle/80 hover:text-white'
            }`}
          >
            Flor en Maceta
          </button>
        </div>
      </div>

      {/* 3D Model Iframe Canvas Container */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center">
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-garden-darkBg/90 z-10 text-garden-thistle gap-2 p-4 text-center">
            <RotateCw className="w-8 h-8 text-garden-amethyst animate-spin" />
            <p className="font-serif text-sm">Cargando modelo 3D de la Orquídea...</p>
            <span className="text-[11px] text-garden-thistle/60">Interactúa con el cursor o el dedo para girar 360°</span>
          </div>
        )}

        <iframe
          title="Orquídea 3D Interactiva"
          src={embedUrl}
          className="w-full h-full border-0 rounded-2xl"
          allow="autoplay; fullscreen; vr"
          onLoad={() => setIsLoaded(true)}
        />

        {/* Floating guidance pill */}
        <div className="absolute bottom-3 left-3 right-3 pointer-events-none flex items-center justify-between text-[11px] text-garden-thistle/80 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <span className="flex items-center gap-1.5 font-medium">
            <RotateCw className="w-3 h-3 text-garden-amethyst animate-spin" />
            Arrastra para rotar 360° · Rueda para zoom
          </span>
          <span className="hidden sm:inline font-script text-garden-thistle text-sm">
            Orchidaceae
          </span>
        </div>
      </div>

      {/* Footer descriptor */}
      <div className="pt-3 flex items-center justify-between text-xs text-garden-thistle/80">
        <p className="font-serif italic text-xs leading-relaxed">
          Explora la anatomía botánica de sus pétalos, sépalos y columna floral en tiempo real.
        </p>
      </div>
    </div>
  );
}
