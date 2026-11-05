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
  Users, 
  Leaf,
  Clock,
  Camera
} from 'lucide-react';

export default function AboutSection() {
  const { content, openEditor } = useContent();
  const { siteSettings } = content;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Top Founder & Vision Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Founder Photo & Bio Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="relative group bg-white p-6 rounded-3xl border border-botanical-200 shadow-lifted">
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden mb-6">
              <img
                src={siteSettings.curatorAvatar}
                alt={siteSettings.curatorName}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-botanical-950 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 block">
                  Fundadora & Curadora
                </span>
                <h3 className="text-2xl font-serif font-bold">
                  {siteSettings.curatorName}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-botanical-800 leading-relaxed italic mb-4">
              &ldquo;{siteSettings.curatorBio}&rdquo;
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-botanical-100 text-xs text-botanical-700">
              <span className="flex items-center gap-1.5 font-medium">
                <Camera className="w-4 h-4 text-rose-600" />
                {siteSettings.instagram}
              </span>
              <a
                href={`mailto:${siteSettings.contactEmail}`}
                className="flex items-center gap-1.5 font-medium text-emerald-700 hover:text-emerald-800"
              >
                <Mail className="w-4 h-4" />
                <span>Contactar</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Mission and Story (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider">
            <Sprout className="w-4 h-4" />
            Nuestra Historia & Propósito
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-botanical-950 leading-tight">
            Acerca de nuestro Blog & Comunidad en {siteSettings.siteName}
          </h2>

          <div className="space-y-4 text-base text-botanical-800 leading-relaxed">
            <p>
              {siteSettings.aboutStory}
            </p>
            <p className="bg-botanical-50 p-4 rounded-2xl border-l-4 border-emerald-600 italic text-botanical-900 text-sm">
              &ldquo;{siteSettings.welcomeText}&rdquo;
            </p>
          </div>

          {/* 4 Pillars of Manifesto */}
          <div className="pt-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-botanical-600">
              Nuestros 4 Principios Fundamentales:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siteSettings.manifesto.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white p-3.5 rounded-xl border border-botanical-200 flex items-start gap-2.5 shadow-soft"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-botanical-900 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Biweekly Cycle Architecture Explanation */}
      <div className="bg-botanical-900 text-white rounded-3xl p-8 sm:p-10 border border-botanical-700 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-botanical-800 text-flora-amber px-3 py-1 rounded-full text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>El Ritmo de las Plantas: ¿Por qué cada dos semanas?</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold">
            Un ciclo quincenal diseñado para la naturaleza y para ti
          </h3>

          <p className="text-botanical-200 text-sm sm:text-base leading-relaxed">
            A diferencia de las redes sociales frenéticas que exigen atención diaria, las plantas crecen despacio: una hoja nueva toma de 10 a 15 días en desarrollarse. Cada dos semanas lanzamos un nuevo ciclo temático con una especie protagonista, consejos estacionales y nuevos debates en el foro.
          </p>

          <div className="pt-2">
            <button
              onClick={openEditor}
              className="inline-flex items-center gap-2 bg-flora-amber text-botanical-950 hover:bg-amber-400 font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Abrir Studio Quincenal (Editar Contenido)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
