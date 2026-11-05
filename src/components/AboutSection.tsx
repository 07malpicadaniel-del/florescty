'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Sprout, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Camera, 
  Flower2 
} from 'lucide-react';
import { RootsTopRight, RootsBottomLeft } from './BotanicalRoots';

export default function AboutSection() {
  const { content, openEditor } = useContent();
  const { siteSettings } = content;

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 overflow-hidden">
      {/* Decorative dark green roots in empty spaces */}
      <RootsTopRight className="opacity-80" />
      <RootsBottomLeft className="opacity-80" />
      {/* Top Garden Editorial */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Genuine Botanical Plate (5 cols) */}
        <div className="lg:col-span-5">
          <div className="relative group bg-white dark:bg-garden-darkCard p-6 rounded-3xl border border-garden-thistle dark:border-garden-darkBorder shadow-lifted transition-all">
            {/* Real Botanical Art from Wix Site */}
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden mb-6 bg-garden-cream dark:bg-garden-darkBg border border-garden-thistle/80 dark:border-garden-darkBorder">
              <img
                src="/wix-assets/acerca_2.jpg"
                alt="Lámina Botánica con Flores Delicadas"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-garden-darkPurple via-garden-darkPurple/20 to-transparent opacity-75" />

              {/* Garden Seal overlay */}
              <div className="absolute top-4 right-4 bg-garden-darkPurple/90 dark:bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-garden-amethyst/40 flex items-center gap-1.5 text-xs text-garden-thistle font-serif">
                <Flower2 className="w-3.5 h-3.5 text-garden-amethyst" />
                <span>El Jardín Secreto</span>
              </div>

              {/* Title inside card */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] font-mono uppercase tracking-wider text-garden-thistle block mb-1">
                  Espacio Botánico
                </span>
                <h3 className="text-3xl font-serif font-bold text-white drop-shadow">
                  {siteSettings.siteName}
                </h3>
              </div>
            </div>

            {/* Poppy Flower badge + bio quote */}
            <div className="flex items-start gap-3.5 mb-4 p-3 bg-garden-cream dark:bg-garden-darkBg rounded-2xl border border-garden-thistle/80 dark:border-garden-darkBorder">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-garden-thistle dark:border-garden-darkBorder shadow-sm">
                <img
                  src="/wix-assets/acerca_1.jpg"
                  alt="Amapola Silvestre"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-garden-darkPurple/90 dark:text-garden-thistle leading-relaxed font-serif italic">
                Un rincón verde dedicado a aprender sobre plantas, flores de temporada y consejos sencillos para su cuidado en el hogar.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-garden-thistle/60 dark:border-garden-darkBorder text-xs text-garden-darkPurple/80 dark:text-garden-thistle/80">
              <span className="flex items-center gap-1.5 font-medium">
                <Camera className="w-4 h-4 text-garden-amethyst" />
                {siteSettings.instagram}
              </span>
              <a
                href={`mailto:${siteSettings.contactEmail}`}
                className="flex items-center gap-1.5 font-medium text-garden-olive dark:text-garden-thistle hover:underline"
              >
                <Mail className="w-4 h-4" />
                <span>Contacto</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Mission and Story (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-garden-amethyst font-semibold text-xs uppercase tracking-wider">
            <Sprout className="w-4 h-4" />
            <span className="font-serif text-garden-olive uppercase tracking-wider text-xs font-semibold">
              El Refugio Botánico
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-script font-normal text-garden-darkPurple dark:text-garden-thistle leading-tight tracking-wide">
            Acerca de Nuestro Jardín
          </h2>

          <div className="space-y-4 text-lg text-garden-darkPurple/80 dark:text-garden-thistle leading-relaxed font-serif">
            <p className="whitespace-pre-line">
              {siteSettings.aboutStory}
            </p>
            <div className="bg-garden-cream dark:bg-garden-darkCard p-5 rounded-2xl border-l-4 border-garden-amethyst italic text-garden-darkPurple dark:text-garden-thistle text-base leading-relaxed">
              &ldquo;{siteSettings.welcomeText}&rdquo;
            </div>
          </div>

          {/* 4 Pillars of Manifesto */}
          <div className="pt-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-garden-darkPurple/70 dark:text-garden-thistle/70 font-mono">
              Nuestros 4 Principios del Jardín:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siteSettings.manifesto.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-garden-darkCard p-3.5 rounded-2xl border border-garden-thistle/80 dark:border-garden-darkBorder flex items-start gap-2.5 shadow-soft"
                >
                  <CheckCircle2 className="w-4 h-4 text-garden-amethyst shrink-0 mt-0.5" />
                  <span className="text-xs text-garden-darkPurple dark:text-garden-thistle font-medium leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Biweekly Biological Cycle (Natural and Organic) */}
      <div className="bg-garden-darkPurple dark:bg-black text-white rounded-3xl p-8 sm:p-10 border border-garden-darkBorder shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-garden-calPoly text-garden-thistle px-3 py-1 rounded-full text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-garden-amethyst" />
            <span>El Ritmo de las Plantas: ¿Por qué cada dos semanas?</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Un ciclo quincenal al compás de la naturaleza
          </h3>

          <p className="text-garden-thistle/90 text-base sm:text-lg leading-relaxed font-serif">
            A diferencia del ritmo acelerado de la vida diaria, las plantas crecen despacio: una hoja nueva toma de diez a quince días en desarrollarse por completo. Cada dos semanas, renovamos este espacio con una nueva especie destacada, consejos de temporada y nuevas publicaciones para compartir el amor por la flora.
          </p>

          <div className="pt-2">
            <button
              onClick={openEditor}
              className="inline-flex items-center gap-2 bg-garden-olive text-white hover:bg-garden-calPoly font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors shadow-md"
            >
              <Sparkles className="w-4 h-4 text-garden-thistle" />
              <span>Abrir Cuaderno Quincenal (Editar)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
