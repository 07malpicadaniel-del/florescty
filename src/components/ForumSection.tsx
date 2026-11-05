'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';
import ForumPostCard from './ForumPostCard';
import { 
  MessageSquare, 
  PlusCircle, 
  Filter, 
  Sparkles, 
  Search, 
  Sprout,
  HelpCircle,
  TrendingUp,
  Layers
} from 'lucide-react';
import { PostCategory } from '../types';

const CATEGORIES: ('Todas' | PostCategory)[] = [
  'Todas',
  'Cuidado y Riego',
  'Orquídeas y Flores',
  'Suculentas y Cactus',
  'Identificación de Especies',
  'Plagas y Soluciones Orgánicas',
  'Propagación y Esquejes'
];

export default function ForumSection() {
  const { 
    content, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    setIsNewPostModalOpen,
    openEditor 
  } = useContent();

  const filteredPosts = content.posts.filter((post) => {
    const matchesCategory = 
      selectedCategory === 'Todas' || post.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = 
      !query || 
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.author.name.toLowerCase().includes(query) ||
      (post.plantDetails?.scientificName && post.plantDetails.scientificName.toLowerCase().includes(query));

    return matchesCategory && matchesQuery;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-botanical-200">
        <div>
          <div className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider mb-2">
            <MessageSquare className="w-4 h-4" />
            Comunidad Abierta · El Jardín Secreto
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-botanical-950 tracking-tight">
            Foro Botánico & Cuadernos de Cultivo
          </h2>
          <p className="text-botanical-700 mt-2 max-w-2xl text-sm sm:text-base">
            Comparte tus dudas, descubre soluciones orgánicas, aprende de los cuadernos de la quincena e intercambia experiencias con amantes de las plantas de todo el mundo.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsNewPostModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all hover:shadow"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Crear Nueva Publicación</span>
          </button>

          <button
            onClick={openEditor}
            className="flex items-center gap-1.5 bg-botanical-100 hover:bg-botanical-200 text-botanical-900 border border-botanical-300 font-medium px-3.5 py-2.5 rounded-xl text-sm transition-colors"
            title="Administrar publicaciones de la quincena"
          >
            <Sparkles className="w-4 h-4 text-flora-amber" />
            <span className="hidden sm:inline">Modo Curadora</span>
          </button>
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
                      ? 'bg-botanical-800 text-white shadow-sm ring-1 ring-botanical-700'
                      : 'bg-white text-botanical-800 border border-botanical-200/80 hover:bg-botanical-50 hover:border-botanical-400'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-botanical-600 font-medium">
            Mostrando <strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'discusión' : 'discusiones'}
          </div>
        </div>

        {searchQuery && (
          <div className="bg-botanical-100/70 text-botanical-900 text-xs px-3 py-1.5 rounded-lg flex items-center justify-between">
            <span>
              Filtrando por: <strong>&ldquo;{searchQuery}&rdquo;</strong>
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-botanical-700 hover:text-black font-semibold underline text-xs"
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
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-botanical-300">
          <div className="w-14 h-14 bg-botanical-100 rounded-full flex items-center justify-center mx-auto mb-4 text-botanical-600">
            <Sprout className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-xl font-bold text-botanical-950 mb-1">
            No se encontraron publicaciones
          </h3>
          <p className="text-botanical-700 text-sm max-w-md mx-auto mb-6">
            No hay temas con la categoría o búsqueda seleccionada. Sé el primero en iniciar una conversación sobre este tema.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Todas');
              setSearchQuery('');
              setIsNewPostModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-emerald-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-emerald-600 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Crear la primera publicación</span>
          </button>
        </div>
      )}
    </section>
  );
}
