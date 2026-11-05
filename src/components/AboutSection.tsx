'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Sprout, 
  Heart, 
  Mail, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Leaf,
  Clock,
  Camera,
  Flower2,
  BookmarkCheck
} from 'lucide-react';

export default function AboutSection() {
  const { content, openEditor } = useContent();
  const { siteSettings } = content;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Top Garden Editorial & Founder Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Botanical Illustration & Emblem Card (No fake human photo!) (5 cols) */}
        <div className="lg:col-span-5">
          <div className="relative group bg-white dark:bg-darkGarden-900 p-6 rounded-3xl border border-botanical-200 dark:border-botanical-800 shadow-lifted transition-all">
            {/* Real Botanical Art from Wix Site */}
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden mb-6 bg-botanical-100 dark:bg-darkGarden-850 border border-botanical-200/80 dark:border-botanical-800">
              <img
                src="/wix-assets/acerca_2.jpg"
                alt="Lámina Botánica con Flores Delicadas"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-botanical-950 via-botanical-950/20 to-transparent opacity-75" />

              {/* Garden Seal overlay */}
              <div className="absolute top-4 right-4 bg-botanical-900/90 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-botanical-600/50 flex items-center gap-1.5 text-xs text-flora-amber font-serif">
                <Flower2 className="w-3.5 h-3.5" />
                <span>Sello Botánico</span>
              </div>

              {/* Founder Text inside card */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 block mb-1">
                  Creadora & Curadora
                </span>
                <h3 className="text-2xl font-serif font-bold text-white drop-shadow">
                  {siteSettings.curatorName}
                </h3>
                <p className="text-xs text-botanical-200 font-serif italic">
                  El Jardín Secreto
                </p>
              </div>
            </div>

            {/* Poppy Flower badge + bio quote */}
            <div className="flex items-start gap-3.5 mb-4 p-3 bg-botanical-50/70 dark:bg-darkGarden-850 rounded-2xl border border-botanical-200/60 dark:border-botanical-800">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-botanical-300 dark:border-botanical-700 shadow-sm">
                <img
                  src="/wix-assets/acerca_1.jpg"
                  alt="Amapola Silvestre"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-botanical-800 dark:text-botanical-200 leading-relaxed italic">
                &ldquo;{siteSettings.curatorBio}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-botanical-100 dark:border-botanical-800 text-xs text-botanical-700 dark:text-botanical-300">
              <span className="flex items-center gap-1.5 font-medium">
                <Camera className="w-4 h-4 text-rose-500" />
                {siteSettings.instagram}
              </span>
              <a
                href={`mailto:${siteSettings.contactEmail}`}
                className="flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                <Mail className="w-4 h-4" />
                <span>Contacto Directo</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Mission and Story (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider">
            <Sprout className="w-4 h-4" />
            Nuestra Historia & Propósito Verde
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-botanical-950 dark:text-emerald-50 leading-tight">
            Acerca de nuestro Blog & Comunidad en {siteSettings.siteName}
          </h2>

          <div className="space-y-4 text-base text-botanical-800 dark:text-botanical-200 leading-relaxed font-normal">
            <p className="whitespace-pre-line">
              {siteSettings.aboutStory}
            </p>
            <div className="bg-botanical-50 dark:bg-darkGarden-850 p-5 rounded-2xl border-l-4 border-emerald-600 dark:border-emerald-500 italic text-botanical-900 dark:text-botanical-100 text-sm leading-relaxed">
              &ldquo;{siteSettings.welcomeText}&rdquo;
            </div>
          </div>

          {/* 4 Pillars of Manifesto */}
          <div className="pt-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-botanical-600 dark:text-botanical-400">
              Nuestros 4 Principios Fundamentales:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siteSettings.manifesto.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-darkGarden-900 p-3.5 rounded-2xl border border-botanical-200 dark:border-botanical-800 flex items-start gap-2.5 shadow-soft"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-botanical-900 dark:text-botanical-100 font-medium leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Biweekly Biological Cycle (Natural and Organic) */}
      <div className="bg-botanical-950 dark:bg-black text-white rounded-3xl p-8 sm:p-10 border border-botanical-800 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-botanical-800 dark:bg-darkGarden-800 text-flora-amber px-3 py-1 rounded-full text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>El Ritmo de las Plantas: ¿Por qué cada dos semanas?</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Un ciclo quincenal inspirado en los tiempos de la naturaleza
          </h3>

          <p className="text-botanical-200 text-sm sm:text-base leading-relaxed">
            A diferencia de la prisa del día a día, las plantas crecen despacio: una hoja nueva toma de diez a quince días en desarrollarse por completo. Cada dos semanas, <strong>Constanza Pimentel</strong> renueva este espacio con una nueva especie destacada, consejos de temporada y un foro vivo para compartir el amor por la flora.
          </p>

          <div className="pt-2">
            <button
              onClick={openEditor}
              className="inline-flex items-center gap-2 bg-flora-amber text-botanical-950 hover:bg-amber-400 font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Abrir Cuaderno Quincenal (Actualizar Contenido)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
