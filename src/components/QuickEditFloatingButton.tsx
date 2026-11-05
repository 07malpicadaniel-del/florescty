'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export default function QuickEditFloatingButton() {
  const { openEditor, content } = useContent();

  return (
    <aside 
      aria-label="Controles de edición"
      className="fixed bottom-6 right-6 z-40"
    >
      <button
        onClick={openEditor}
        className="group flex items-center gap-2.5 bg-botanical-950/90 hover:bg-botanical-950 text-white pl-3.5 pr-4 py-3 rounded-full border border-botanical-700/80 shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-200 ring-1 ring-white/10 hover:ring-emerald-500/40"
        title="Abrir Studio para editar el contenido quincenal y foro"
      >
        <span className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-flora-amber group-hover:rotate-12 transition-transform">
          <Sparkles className="w-3.5 h-3.5" />
        </span>
        <div className="text-left">
          <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 font-mono">
            Modo Edición
          </div>
          <div className="text-xs font-semibold text-white">
            Studio Quincenal
          </div>
        </div>
      </button>
    </aside>
  );
}
