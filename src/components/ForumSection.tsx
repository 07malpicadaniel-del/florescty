'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';
import ForumPostCard from './ForumPostCard';
import { 
  FileText, 
  PlusCircle, 
  Sparkles, 
  Sprout, 
  Flower2,
  RefreshCw,
  Calendar
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

export default function ForumSection() {
  const { 
    content, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    setIsNewPostModalOpen,
    openEditor,
    isGeneratingAI,
    generateAIPost 
  } = useContent();

  const filteredPosts = content.posts.filter((post) => {
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
    await generateAIPost(true);
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
            <Flower2 className="w-4 h-4" />
            <span className="font-serif text-xs font-semibold uppercase tracking-wider text-garden-olive">
              Cuaderno del Cultivador
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-script font-normal text-garden-darkPurple dark:text-garden-thistle tracking-wide leading-tight">
            Publicaciones del Jardín
          </h2>
          <p className="text-garden-darkPurple/80 dark:text-garden-thistle/80 mt-1 max-w-2xl text-sm sm:text-base font-serif">
            Artículos detallados sobre flores, orquídeas, humedad y cuidados prácticos para el hogar.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          {/* Button: "Publicación Automática" (as requested) */}
          <button
            onClick={handleTestGroq}
            disabled={isGeneratingAI}
            className="flex items-center gap-2 bg-garden-darkPurple hover:bg-garden-darkPurple/90 dark:bg-garden-amethyst dark:hover:bg-garden-amethyst/80 text-white font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all disabled:opacity-50 text-xs sm:text-sm"
            title="Generar nueva publicación automática para el blog"
          >
            {isGeneratingAI ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-garden-thistle" />
                <span>Generando...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-garden-thistle" />
                <span>Publicación Automática</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsNewPostModalOpen(true)}
            className="flex items-center gap-2 bg-garden-olive hover:bg-garden-calPoly text-white font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all text-xs sm:text-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nueva Publicación</span>
          </button>
        </div>
      </div>

      {/* Automated Schedule Info Banner */}
      <div className="my-4 bg-garden-thistle/40 dark:bg-garden-darkCard p-3 rounded-2xl border border-garden-thistle/80 dark:border-garden-darkBorder flex items-center justify-between gap-3 text-xs text-garden-darkPurple dark:text-garden-thistle relative z-10">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-garden-amethyst shrink-0" />
          <span>
            <strong>Publicaciones automáticas:</strong> Cada <strong>miércoles</strong> y <strong>jueves</strong> se publica un nuevo artículo botánico en el blog. Pulsa el botón de arriba para probar una publicación ahora mismo.
          </span>
        </div>
      </div>

      {/* Categories Bar & Search Filter */}
      <div className="py-6 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none max-w-full">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
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
              onClick={() => setSearchQuery('')}
              className="text-garden-amethyst hover:underline font-semibold text-xs ml-2"
            >
              Limpiar filtro
            </button>
          </div>
        )}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <ForumPostCard key={post.id} post={post} />
          ))}
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
            onClick={() => {
              setSelectedCategory('Todas');
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-2 bg-garden-olive text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-garden-calPoly transition-colors"
          >
            Ver todas las publicaciones
          </button>
        </div>
      )}
    </section>
  );
}
