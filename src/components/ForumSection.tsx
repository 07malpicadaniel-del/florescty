'use client';

import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import ForumPostCard from './ForumPostCard';
import confetti from 'canvas-confetti';
import { 
  FileText, 
  PlusCircle, 
  Sparkles, 
  Sprout, 
  Flower2,
  RefreshCw,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Crown,
  KeyRound,
  ArrowRight
} from 'lucide-react';

import { RootsTopRight, RootsBottomLeft, RootsDivider } from './BotanicalRoots';

const CATEGORIES = [
  'Todas',
  'Flores y Cuidados',
  'Plantas de Casa',
  'Suculentas',
  'Consejos de Riego',
  'Diario de Jardín'
];

interface ForumSectionProps {
  mode?: 'community' | 'admin';
}

export default function ForumSection({ mode = 'community' }: ForumSectionProps) {
  const { 
    content, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    setIsNewPostModalOpen,
    setActiveTab,
    isGeneratingAI,
    generateAIPost 
  } = useContent();

  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [showHelpMenu, setShowHelpMenu] = useState(false);

  const isAdminMode = mode === 'admin';

  // Separate admin posts strictly from community/regular posts without deleting anything
  const sectionPosts = content.posts.filter((post) =>
    isAdminMode ? Boolean(post.isAdmin) : !post.isAdmin
  );

  const filteredPosts = sectionPosts.filter((post) => {
    const matchesCategory = 
      selectedCategory === 'Todas' || post.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = 
      !query || 
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      (post.plantDetails?.scientificName && post.plantDetails.scientificName.toLowerCase().includes(query));

    return matchesCategory && matchesQuery;
  });

  const handleTestGroq = async () => {
    setAiFeedback('Conectando con modelo botánico de Groq para redactar artículo...');
    const ok = await generateAIPost(true);
    if (ok) {
      setAiFeedback('¡Publicación automática generada y añadida al blog con éxito!');
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    } else {
      setAiFeedback('No se pudo generar la publicación automática en este momento. Intenta de nuevo.');
    }
    setTimeout(() => setAiFeedback(null), 5000);
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative dark green roots in the background - prominent and visible */}
      <RootsTopRight className="opacity-80" />
      <RootsBottomLeft className="opacity-80" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-garden-thistle/80 dark:border-garden-darkBorder relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 text-garden-amethyst mb-1">
            {isAdminMode ? (
              <>
                <Crown className="w-4 h-4" />
                <span className="font-serif text-xs font-semibold uppercase tracking-wider text-garden-olive">
                  Espacio del Autor
                </span>
              </>
            ) : (
              <>
                <Flower2 className="w-4 h-4" />
                <span className="font-serif text-xs font-semibold uppercase tracking-wider text-garden-olive">
                  Cuaderno del Cultivador
                </span>
              </>
            )}
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-script font-normal text-garden-darkPurple dark:text-garden-thistle tracking-wide leading-tight">
            {isAdminMode ? 'Publicaciones de Admin' : 'Publicaciones del Jardín'}
          </h2>
          <p className="text-garden-darkPurple/80 dark:text-garden-thistle/80 mt-1 max-w-2xl text-sm sm:text-base font-serif">
            {isAdminMode
              ? 'Publicaciones exclusivas subidas con Clave Admin, separadas del resto de publicaciones del blog.'
              : 'Artículos detallados sobre flores, orquídeas, humedad y cuidados prácticos para el hogar.'}
          </p>
        </div>

        <div className="relative flex items-center gap-3 shrink-0 z-20 flex-wrap">
          {isAdminMode ? (
            <button
              type="button"
              onClick={() => setIsNewPostModalOpen(true)}
              className="cursor-pointer inline-flex items-center gap-2 bg-garden-darkPurple hover:bg-garden-darkPurple/90 dark:bg-garden-amethyst dark:hover:bg-garden-amethyst/80 text-white font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all text-xs sm:text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Nueva Publicación</span>
            </button>
          ) : (
            <>
              {/* Backdrop to close help dropdown when clicked outside */}
              {showHelpMenu && (
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setShowHelpMenu(false)} 
                />
              )}

              {/* Unified Publish Button with Hidden/Discreet 'Ayuda' */}
              <div className="inline-flex rounded-xl shadow-sm z-40 relative">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(true)}
                  className="cursor-pointer inline-flex items-center gap-2 bg-garden-olive hover:bg-garden-calPoly text-white font-medium px-4 py-2.5 rounded-l-xl text-xs sm:text-sm transition-all border-r border-garden-calPoly/60"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Nueva Publicación</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowHelpMenu(!showHelpMenu)}
                  className="cursor-pointer inline-flex items-center justify-center bg-garden-olive hover:bg-garden-calPoly text-white px-2.5 py-2.5 rounded-r-xl transition-all"
                  title="Opciones de publicación y Ayuda"
                  aria-label="Abrir opciones de ayuda"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showHelpMenu ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Discreet Help Dropdown Menu ("Ayuda") */}
              {showHelpMenu && (
                <div 
                  className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-garden-darkCard rounded-2xl shadow-2xl border border-garden-thistle dark:border-garden-darkBorder py-2 z-50 animate-fadeIn"
                >
                  <div className="px-3.5 py-1.5 border-b border-garden-thistle/60 dark:border-garden-darkBorder text-[10px] font-semibold text-garden-darkPurple/60 dark:text-garden-thistle/60 uppercase tracking-wider font-serif">
                    Asistencia al Cultivador
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      setShowHelpMenu(false);
                      handleTestGroq();
                    }}
                    disabled={isGeneratingAI}
                    className="w-full text-left px-3.5 py-2.5 text-xs text-garden-darkPurple dark:text-garden-thistle hover:bg-garden-thistle/40 dark:hover:bg-garden-darkBg flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-garden-amethyst shrink-0" />
                    <div>
                      <div className="font-semibold text-garden-darkPurple dark:text-white flex items-center gap-1.5">
                        <span>Ayuda</span>
                        <span className="text-[10px] font-normal text-garden-amethyst font-sans bg-garden-thistle/50 dark:bg-garden-darkBorder px-1.5 py-0.2 rounded">Automática</span>
                      </div>
                      <div className="text-[10px] text-garden-darkPurple/60 dark:text-garden-thistle/60 mt-0.5">
                        Redactar publicación con ayuda del modelo
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Feedback banner if AI generation occurred */}
      {!isAdminMode && aiFeedback && (
        <div className="my-4 p-3.5 bg-garden-calPoly text-garden-thistle rounded-2xl border border-garden-olive/60 flex items-center justify-between gap-3 text-xs shadow-md animate-fadeIn relative z-20">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-garden-amethyst shrink-0" />
            <span className="font-medium">{aiFeedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setAiFeedback(null)}
            className="text-white hover:text-garden-thistle font-bold px-2 py-0.5"
          >
            ×
          </button>
        </div>
      )}

      {/* Section Info Banner */}
      {isAdminMode ? (
        <div className="my-4 bg-garden-thistle/40 dark:bg-garden-darkCard p-3.5 rounded-2xl border border-garden-amethyst/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-garden-darkPurple dark:text-garden-thistle relative z-10">
          <div className="flex items-center gap-2.5">
            <KeyRound className="w-4 h-4 text-garden-amethyst shrink-0" />
            <span>
              <strong>Sección de Admin:</strong> Para subir una publicación aquí, pulsa{' '}
              <strong>Nueva Publicación</strong> e ingresa tu <strong>Clave Admin</strong>. Si no ingresas clave, la publicación irá a la sección general.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('publicaciones')}
            className="cursor-pointer shrink-0 inline-flex items-center gap-1 text-garden-amethyst hover:text-garden-darkPurple dark:hover:text-white font-semibold"
          >
            <span>Ir a Publicaciones generales</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="my-4 bg-garden-thistle/40 dark:bg-garden-darkCard p-3 rounded-2xl border border-garden-thistle/80 dark:border-garden-darkBorder flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-garden-darkPurple dark:text-garden-thistle relative z-10">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-garden-amethyst shrink-0" />
            <span>
              <strong>Publicaciones automáticas:</strong> Cada <strong>miércoles</strong> y <strong>jueves</strong> se publica un nuevo artículo botánico en el blog.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('publicaciones-admin')}
            className="cursor-pointer shrink-0 inline-flex items-center gap-1.5 text-garden-darkPurple dark:text-garden-thistle hover:text-garden-amethyst font-semibold"
          >
            <Crown className="w-3.5 h-3.5 text-garden-amethyst" />
            <span>Ver Publicaciones de Admin</span>
          </button>
        </div>
      )}

      {/* Categories Bar & Search Filter */}
      <div className="py-6 space-y-4 relative z-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none max-w-full">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-garden-darkPurple text-white dark:bg-garden-amethyst dark:text-white shadow-sm ring-1 ring-garden-amethyst'
                      : 'bg-white dark:bg-garden-darkCard text-garden-darkPurple dark:text-garden-thistle border border-garden-thistle/80 dark:border-garden-darkBorder hover:bg-garden-thistle/40'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-garden-darkPurple/70 dark:text-garden-thistle/70 font-medium">
            Mostrando <strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'publicación' : 'publicaciones'}
          </div>
        </div>

        {searchQuery && (
          <div className="bg-garden-thistle/50 dark:bg-garden-darkCard text-garden-darkPurple dark:text-garden-thistle text-xs px-3 py-1.5 rounded-lg flex items-center justify-between">
            <span>
              Filtrando por: <strong>&ldquo;{searchQuery}&rdquo;</strong>
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="cursor-pointer text-garden-amethyst hover:underline font-semibold text-xs ml-2"
            >
              Limpiar filtro
            </button>
          </div>
        )}
      </div>

      {/* Posts Grid */}
      <div className="relative z-10">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <ForumPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : isAdminMode && sectionPosts.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-garden-darkCard rounded-3xl border border-dashed border-garden-amethyst/50 dark:border-garden-darkBorder">
            <div className="w-14 h-14 bg-garden-thistle/40 dark:bg-garden-darkBg rounded-full flex items-center justify-center mx-auto mb-4 text-garden-amethyst">
              <Crown className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-garden-darkPurple dark:text-white mb-2">
              Aún no hay publicaciones de Admin
            </h3>
            <p className="text-garden-darkPurple/75 dark:text-garden-thistle/75 text-sm max-w-md mx-auto mb-6 font-serif">
              Esta sección guarda de forma separada los artículos publicados por el autor/a usando la{' '}
              <strong>Clave Admin</strong>.
            </p>
            <button
              type="button"
              onClick={() => setIsNewPostModalOpen(true)}
              className="cursor-pointer inline-flex items-center gap-2 bg-garden-darkPurple hover:bg-garden-darkPurple/90 dark:bg-garden-amethyst text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Crear Publicación de Admin</span>
            </button>
          </div>
        ) : !isAdminMode && sectionPosts.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-garden-darkCard rounded-3xl border border-dashed border-garden-thistle dark:border-garden-darkBorder">
            <div className="w-14 h-14 bg-garden-thistle/30 dark:bg-garden-darkBg rounded-full flex items-center justify-center mx-auto mb-4 text-garden-amethyst">
              <Sprout className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-garden-darkPurple dark:text-white mb-2">
              Aún no hay publicaciones generales
            </h3>
            <p className="text-garden-darkPurple/75 dark:text-garden-thistle/75 text-sm max-w-md mx-auto mb-6 font-serif">
              Las publicaciones actuales están reunidas en <strong>Publicaciones de Admin</strong>. Crea una nueva nota aquí dejando vacía la Clave Admin.
            </p>
            <button
              type="button"
              onClick={() => setIsNewPostModalOpen(true)}
              className="cursor-pointer inline-flex items-center gap-2 bg-garden-olive hover:bg-garden-calPoly text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Crear Primera Publicación</span>
            </button>
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white dark:bg-garden-darkCard rounded-3xl border border-dashed border-garden-thistle dark:border-garden-darkBorder">
            <div className="w-14 h-14 bg-garden-thistle/30 dark:bg-garden-darkBg rounded-full flex items-center justify-center mx-auto mb-4 text-garden-amethyst">
              <Sprout className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-garden-darkPurple dark:text-white mb-1">
              No se encontraron publicaciones
            </h3>
            <p className="text-garden-darkPurple/70 dark:text-garden-thistle/70 text-sm max-w-md mx-auto mb-6">
              No hay temas registrados bajo este criterio de búsqueda.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Todas');
                setSearchQuery('');
              }}
              className="cursor-pointer inline-flex items-center gap-2 bg-garden-olive text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-garden-calPoly transition-colors"
            >
              Ver todas las publicaciones
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
