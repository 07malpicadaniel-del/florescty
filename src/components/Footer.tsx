'use client';

import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Sprout, 
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
    <footer className="bg-garden-darkPurple dark:bg-black text-white border-t border-garden-darkBorder pt-16 pb-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-11 rounded-lg overflow-hidden border border-garden-thistle/40 shrink-0 bg-white shadow-md">
                <img
                  src="/logo.png"
                  alt="Logo El Jardín Secreto"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
                {content.siteSettings.siteName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-garden-thistle/85 leading-relaxed max-w-sm font-serif">
              Un refugio botánico dedicado a aprender sobre nuevas especies de flores y plantas, su hábitat y consejos prácticos de cuidado cada dos semanas.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-garden-thistle/80 font-mono">
              <Calendar className="w-4 h-4 text-garden-amethyst" />
              <span>
                Edición #{content.currentEdition.editionNumber}: {content.currentEdition.cycleTitle}
              </span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-garden-amethyst font-mono">
              El Jardín
            </h4>
            <ul className="space-y-2 text-sm text-garden-thistle/90 font-serif">
              <li>
                <button 
                  onClick={() => setActiveTab('inicio')}
                  className="hover:text-white transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('publicaciones')}
                  className="hover:text-white transition-colors"
                >
                  Publicaciones ({content.posts.length})
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('plantas')}
                  className="hover:text-white transition-colors"
                >
                  Plantas ({content.plantsEncyclopedia.length})
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('acerca-de')}
                  className="hover:text-white transition-colors"
                >
                  Acerca de
                </button>
              </li>
              <li>
                <button 
                  onClick={openEditor}
                  className="text-garden-thistle hover:underline flex items-center gap-1 font-sans text-xs pt-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-garden-amethyst" />
                  <span>Cuaderno Quincenal (Editar)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Biweekly Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-garden-amethyst font-mono">
              Cuaderno Quincenal
            </h4>
            <p className="text-xs text-garden-thistle/80 leading-relaxed font-serif">
              Recibe cada 15 días la nueva flor o planta destacada, consejos de temporada y recordatorios de riego.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu.correo@ejemplo.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 bg-garden-darkBg border border-garden-darkBorder text-white text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-garden-amethyst placeholder:text-garden-thistle/40"
                  required
                />
                <button
                  type="submit"
                  className="bg-garden-olive hover:bg-garden-calPoly text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0"
                >
                  Suscribirme
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-garden-thistle flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-garden-amethyst" />
                  <span>¡Bienvenido al cuaderno quincenal de El Jardín Secreto!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-garden-darkBorder flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-garden-thistle/70 font-serif">
          <p>
            © {new Date().getFullYear()} {content.siteSettings.siteName}. Cuidado con amor natural.
          </p>
          <div className="flex items-center gap-4">
            <span>
              Un espacio para aprender y celebrar el reino vegetal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
