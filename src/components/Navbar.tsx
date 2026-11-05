'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Sprout, 
  BookOpen, 
  MessageSquare, 
  Info, 
  Sparkles, 
  PlusCircle, 
  Search,
  Calendar,
  Sun,
  Moon
} from 'lucide-react';

export default function Navbar() {
  const { 
    content, 
    activeTab, 
    setActiveTab, 
    openEditor, 
    setIsNewPostModalOpen,
    searchQuery,
    setSearchQuery,
    theme,
    toggleTheme
  } = useContent();

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Sprout },
    { id: 'foro', label: 'Foro Botánico', icon: MessageSquare, count: content.posts.length },
    { id: 'especies', label: 'Guía de Especies', icon: BookOpen, count: content.plantsEncyclopedia.length },
    { id: 'acerca-de', label: 'Acerca de', icon: Info },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-botanical-200/50 dark:border-botanical-800/60 shadow-soft transition-colors duration-300">
      {/* Top Biweekly Announcement Ribbon */}
      <div className="bg-botanical-950 dark:bg-black text-botanical-100 text-xs py-1.5 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-botanical-800 dark:bg-botanical-900 text-flora-amber px-2.5 py-0.5 rounded-full font-medium tracking-wide">
              <Calendar className="w-3 h-3" />
              Edición #{content.currentEdition.editionNumber}
            </span>
            <span className="font-semibold text-white hidden sm:inline">
              {content.currentEdition.cycleTitle}
            </span>
            <span className="text-botanical-300 hidden md:inline">
              · Quincena {content.currentEdition.dateRange}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-botanical-300 text-[11px] hidden lg:inline">
              Próxima entrega: <strong className="text-white">{content.currentEdition.nextEditionDate}</strong>
            </span>
            <button
              onClick={openEditor}
              className="flex items-center gap-1.5 bg-botanical-800 hover:bg-botanical-700 text-botanical-100 px-3 py-0.5 rounded-full text-[11px] font-medium transition-colors border border-botanical-600/40"
              title="Cuaderno para actualizar la entrega quincenal"
            >
              <Sparkles className="w-3 h-3 text-flora-amber" />
              <span>Taller Quincenal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand: Uses the genuine Wix Logo image! */}
        <button 
          onClick={() => setActiveTab('inicio')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="relative w-10 h-12 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-200 border border-botanical-300/60 dark:border-botanical-700 shrink-0 bg-white">
            <img
              src="/logo.png"
              alt="Logo El Jardín Secreto"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-botanical-950 dark:text-emerald-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                {content.siteSettings.siteName}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse hidden sm:inline-block" />
            </div>
            <p className="text-[11px] text-botanical-700 dark:text-botanical-300 font-medium tracking-wider">
              Por {content.siteSettings.curatorName}
            </p>
          </div>
        </button>

        {/* Search Bar - Center */}
        <div className="hidden md:flex items-center relative max-w-xs w-full">
          <Search className="w-4 h-4 text-botanical-500 dark:text-botanical-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar especies, temas o cuidados..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-botanical-50/70 hover:bg-botanical-50 focus:bg-white dark:bg-darkGarden-900/80 dark:focus:bg-darkGarden-850 dark:text-botanical-100 text-botanical-950 text-sm pl-9 pr-3 py-1.5 rounded-full border border-botanical-200 dark:border-botanical-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-xs text-botanical-500 hover:text-botanical-800 dark:hover:text-white"
            >
              ×
            </button>
          )}
        </div>

        {/* Navigation Tabs + Dark Mode Toggle */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-botanical-800 dark:bg-emerald-800 text-white shadow-sm' 
                    : 'text-botanical-800 dark:text-botanical-200 hover:bg-botanical-100/70 dark:hover:bg-darkGarden-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-botanical-200' : 'text-botanical-600 dark:text-botanical-400'}`} />
                <span className="hidden sm:inline">{item.label}</span>
                {'count' in item && item.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive ? 'bg-botanical-700 dark:bg-emerald-900 text-botanical-100' : 'bg-botanical-200/80 dark:bg-botanical-800 text-botanical-800 dark:text-botanical-200'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          {/* Modo Obscuro / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-botanical-700 dark:text-flora-amber hover:bg-botanical-100 dark:hover:bg-darkGarden-800 transition-colors"
            title={theme === 'dark' ? 'Cambiar a modo diurno' : 'Cambiar a modo nocturno (jardín oscuro)'}
            aria-label="Alternar modo obscuro"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 fill-flora-amber text-flora-amber" />
            ) : (
              <Moon className="w-4 h-4 text-botanical-700" />
            )}
          </button>

          {/* Action Button: Publicar */}
          <button
            onClick={() => setIsNewPostModalOpen(true)}
            className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-sm font-medium shadow-sm transition-all"
            title="Crear un nuevo tema botánico"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden md:inline">Publicar</span>
          </button>
        </nav>
      </div>

      {/* Mobile Search input */}
      <div className="md:hidden px-4 pb-2.5">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-botanical-500 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar en el jardín..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-botanical-50 dark:bg-darkGarden-900 dark:text-white text-botanical-950 text-xs pl-8 pr-3 py-2 rounded-xl border border-botanical-200 dark:border-botanical-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>
    </header>
  );
}
