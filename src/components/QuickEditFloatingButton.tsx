'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';
import { Sparkles, Flower2 } from 'lucide-react';

export default function QuickEditFloatingButton() {
  const { openEditor } = useContent();

  return (
    <aside 
      aria-label="Controles del Cuaderno"
      className="fixed bottom-6 right-6 z-40"
    >
      <button
        onClick={openEditor}
        className="group flex items-center gap-2.5 bg-garden-darkPurple/95 hover:bg-garden-darkPurple text-white pl-3.5 pr-4 py-3 rounded-full border border-garden-amethyst/50 shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-200 ring-1 ring-white/10 hover:ring-garden-amethyst"
        title="Abrir Cuaderno para editar las publicaciones y la quincena"
      >
        <span className="w-6 h-6 rounded-full bg-garden-amethyst flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
          <Flower2 className="w-3.5 h-3.5" />
        </span>
        <div className="text-left">
          <div className="text-[10px] uppercase font-bold tracking-wider text-garden-thistle font-mono">
            Editar
          </div>
          <div className="text-xs font-semibold text-white font-serif">
            Cuaderno del Blog
          </div>
        </div>
      </button>
    </aside>
  );
}
