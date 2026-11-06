'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Sprout, 
  BookOpen, 
  FileText, 
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
    { id: 'publicaciones', label: 'Publicaciones', icon: FileText, count: content.posts.length },
    { id: 'plantas', label: 'Plantas', icon: BookOpen, count: content.plantsEncyclopedia.length },
    { id: 'acerca-de', label: 'Acerca de', icon: Info },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-garden-thistle/70 dark:border-garden-darkBorder shadow-soft transition-colors duration-300">
      {/* Top Welcome Ribbon: Clean blog banner with no dates or deliveries */}
      <div className="bg-garden-darkPurple text-garden-thistle text-xs py-1.5 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-garden-calPoly text-garden-thistle px-2.5 py-0.5 rounded-full font-medium tracking-wide text-[11px]">
              <Sprout className="w-3 h-3 text-garden-amethyst" />
              Blog Botánico
            </span>
            <span className="font-serif text-white/95 hidden sm:inline text-xs">
              Aprende y comparte sobre la naturaleza y el cuidado de las flores
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openEditor}
              className="cursor-pointer flex items-center gap-1.5 bg-garden-amethyst/30 hover:bg-garden-amethyst/50 text-white px-3 py-0.5 rounded-full text-[11px] font-medium transition-colors border border-garden-amethyst/40"
              title="Cuaderno del Blog"
            >
              <Sparkles className="w-3 h-3 text-garden-thistle" />
              <span>Cuaderno</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Brand: Logo significantly larger with Avonia script title */}
        <button 
          type="button"
          onClick={() => setActiveTab('inicio')}
          className="cursor-pointer flex items-center gap-3.5 sm:gap-4 text-left group shrink-0"
        >
          <div 
            className="relative rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-200 border-2 border-garden-thistle dark:border-garden-darkBorder shrink-0 bg-white"
            style={{ width: '80px', height: '96px', maxWidth: '80px', maxHeight: '96px' }}
          >
            <img
              src="/logo.png"
              alt="Logo El Jardín Secreto"
              width={80}
              height={96}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-script text-4xl sm:text-6xl font-normal tracking-wide text-garden-darkPurple dark:text-garden-thistle group-hover:text-garden-amethyst transition-colors">
                {content.siteSettings.siteName}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-garden-olive animate-pulse hidden sm:inline-block" />
            </div>
            <span className="font-serif text-xs sm:text-sm text-garden-olive dark:text-garden-thistle/80 uppercase tracking-widest block font-medium">
              Flores · Plantas · Cuidados
            </span>
          </div>
        </button>

        {/* Search Bar - Center */}
        <div className="hidden md:flex items-center relative max-w-xs w-full">
          <Search className="w-4 h-4 text-garden-amethyst absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar plantas, flores o cuidados..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/80 hover:bg-white focus:bg-white dark:bg-garden-darkCard dark:focus:bg-garden-darkBg dark:text-garden-thistle text-garden-darkPurple text-sm pl-9 pr-3 py-1.5 rounded-full border border-garden-thistle/80 dark:border-garden-darkBorder focus:outline-none focus:ring-2 focus:ring-garden-amethyst transition-all placeholder:text-garden-darkPurple/50 dark:placeholder:text-garden-thistle/50"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-xs text-garden-amethyst hover:text-garden-darkPurple dark:hover:text-white"
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
                type="button"
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-garden-darkPurple text-white dark:bg-garden-amethyst dark:text-white shadow-sm' 
                    : 'text-garden-darkPurple dark:text-garden-thistle hover:bg-garden-thistle/50 dark:hover:bg-garden-darkCard'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-garden-thistle' : 'text-garden-amethyst'}`} />
                <span className="hidden sm:inline">{item.label}</span>
                {'count' in item && item.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive ? 'bg-garden-amethyst text-white' : 'bg-garden-thistle/80 text-garden-darkPurple dark:bg-garden-darkBorder dark:text-garden-thistle'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          {/* Modo Obscuro / Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="cursor-pointer p-2 rounded-xl text-garden-darkPurple dark:text-garden-thistle hover:bg-garden-thistle/50 dark:hover:bg-garden-darkCard transition-colors"
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label="Alternar modo obscuro"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 fill-garden-thistle text-garden-thistle" />
            ) : (
              <Moon className="w-4 h-4 text-garden-darkPurple" />
            )}
          </button>

          {/* Action Button: Publicar */}
          <button
            type="button"
            onClick={() => setIsNewPostModalOpen(true)}
            className="cursor-pointer flex items-center gap-1.5 bg-garden-olive hover:bg-garden-calPoly text-white px-3.5 py-2 rounded-xl text-sm font-medium shadow-sm transition-all"
            title="Escribir una publicación"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden md:inline">Publicar</span>
          </button>
        </nav>
      </div>

      {/* Mobile Search input */}
      <div className="md:hidden px-4 pb-2.5">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-garden-amethyst absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar plantas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-garden-darkCard dark:text-white text-garden-darkPurple text-xs pl-8 pr-3 py-2 rounded-xl border border-garden-thistle dark:border-garden-darkBorder focus:outline-none focus:ring-1 focus:ring-garden-amethyst"
          />
        </div>
      </div>
    </header>
  );
}
