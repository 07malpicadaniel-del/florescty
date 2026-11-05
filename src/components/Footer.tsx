'use client';

import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Sprout, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Calendar,
  Flower2
} from 'lucide-react';

export default function Footer() {
  const { content, setActiveTab, openEditor } = useContent();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-botanical-950 dark:bg-black text-white border-t border-botanical-800 pt-16 pb-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-11 rounded-lg overflow-hidden border border-botanical-700 shrink-0 bg-white shadow-md">
                <img
                  src="/logo.png"
                  alt="Logo El Jardín Secreto"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                {content.siteSettings.siteName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-botanical-300 leading-relaxed max-w-sm font-serif">
              Un refugio botánico fundado por <strong>{content.siteSettings.curatorName}</strong>. Cada dos semanas compartimos notas sobre nuevas especies de flores y plantas, su hábitat y consejos de cuidado.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-botanical-400">
              <Calendar className="w-4 h-4 text-flora-amber" />
              <span>
                Edición #{content.currentEdition.editionNumber}: {content.currentEdition.cycleTitle}
              </span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono">
              El Jardín
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-botanical-200">
              <li>
                <button 
                  onClick={() => setActiveTab('inicio')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Inicio & Quincena Activa
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('foro')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Cuaderno de Publicaciones ({content.posts.length})
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('especies')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Guía de Especies ({content.plantsEncyclopedia.length} fichas)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('acerca-de')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Acerca de Constanza Pimentel
                </button>
              </li>
              <li>
                <button 
                  onClick={openEditor}
                  className="text-flora-amber hover:underline flex items-center gap-1 font-medium pt-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Taller Quincenal (Editar Contenido)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Biweekly Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono">
              Cuaderno Quincenal
            </h4>
            <p className="text-xs text-botanical-300 leading-relaxed font-serif">
              Recibe cada 15 días la nueva flor o planta destacada, consejos de temporada y recordatorios de riego.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu.correo@ejemplo.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 bg-botanical-900 dark:bg-darkGarden-900 border border-botanical-700 text-white text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0"
                >
                  Suscribirme
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>¡Bienvenido al cuaderno quincenal de El Jardín Secreto!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-botanical-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-botanical-400">
          <p className="font-serif">
            © {new Date().getFullYear()} {content.siteSettings.siteName}. Creado y cuidado con amor por {content.siteSettings.curatorName}.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-botanical-400">
              Un espacio para aprender y celebrar el reino vegetal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
