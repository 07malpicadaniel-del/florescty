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
  Moon,
  Crown
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

  const regularPostsCount = content.posts.filter((p) => !p.isAdmin).length;
  const adminPostsCount = content.posts.filter((p) => Boolean(p.isAdmin)).length;

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Sprout },
    { id: 'publicaciones', label: 'Publicaciones', icon: FileText, count: regularPostsCount },
    { id: 'publicaciones-admin', label: 'Publicaciones de Admin', icon: Crown, count: adminPostsCount },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap xl:flex-nowrap items-center justify-between gap-2.5">
        {/* Brand */}
        <button 
          type="button"
          onClick={() => setActiveTab('inicio')}
          className="cursor-pointer flex items-center gap-2.5 text-left group shrink-0"
        >
          <div 
            className="relative rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-200 border-2 border-garden-thistle dark:border-garden-darkBorder shrink-0 bg-white"
            style={{ width: '56px', height: '68px', maxWidth: '56px', maxHeight: '68px' }}
          >
            <img
              src="/logo.png"
              alt="Logo El Jardín Secreto"
              width={56}
              height={68}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-script text-3xl sm:text-4xl font-normal tracking-wide text-garden-darkPurple dark:text-garden-thistle group-hover:text-garden-amethyst transition-colors whitespace-nowrap">
                {content.siteSettings.siteName}
              </span>
              <span className="w-2 h-2 rounded-full bg-garden-olive animate-pulse hidden sm:inline-block" />
            </div>
            <span className="font-serif text-[10px] sm:text-[11px] text-garden-olive dark:text-garden-thistle/80 uppercase tracking-widest block font-medium">
              Flores · Plantas · Cuidados
            </span>
          </div>
        </button>

        {/* Search Bar - Center */}
        <div className="hidden xl:flex items-center relative w-32 2xl:w-44 shrink-0">
          <Search className="w-3.5 h-3.5 text-garden-amethyst absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar flores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/80 hover:bg-white focus:bg-white dark:bg-garden-darkCard dark:focus:bg-garden-darkBg dark:text-garden-thistle text-garden-darkPurple text-xs pl-8 pr-3 py-1.5 rounded-full border border-garden-thistle/80 dark:border-garden-darkBorder focus:outline-none focus:ring-2 focus:ring-garden-amethyst transition-all placeholder:text-garden-darkPurple/50 dark:placeholder:text-garden-thistle/50"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-xs text-garden-amethyst hover:text-garden-darkPurple dark:hover:text-white"
            >
              ×
            </button>
          )}
        </div>

        {/* Navigation Tabs + Dark Mode Toggle */}
        <nav className="flex items-center gap-1 flex-wrap xl:flex-nowrap">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`cursor-pointer flex items-center gap-1.5 px-2 2xl:px-2.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                  isActive 
                    ? 'bg-garden-darkPurple text-white dark:bg-garden-amethyst dark:text-white shadow-sm' 
                    : 'text-garden-darkPurple dark:text-garden-thistle hover:bg-garden-thistle/50 dark:hover:bg-garden-darkCard'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-garden-thistle' : 'text-garden-amethyst'}`} />
                <span className="hidden md:inline">{item.label}</span>
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
            className="cursor-pointer p-2 rounded-xl text-garden-darkPurple dark:text-garden-thistle hover:bg-garden-thistle/50 dark:hover:bg-garden-darkCard transition-colors shrink-0"
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
            className="cursor-pointer flex items-center gap-1.5 bg-garden-olive hover:bg-garden-calPoly text-white px-2.5 xl:px-3 py-2 rounded-xl text-xs font-medium shadow-sm transition-all whitespace-nowrap shrink-0"
            title="Escribir una publicación"
          >
            <PlusCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Publicar</span>
          </button>
        </nav>
      </div>

      {/* Tablet / Mobile Search input */}
      <div className="xl:hidden px-4 pb-2.5 max-w-7xl mx-auto">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-garden-amethyst absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar plantas, flores o cuidados..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-garden-darkCard dark:text-white text-garden-darkPurple text-xs pl-8 pr-3 py-2 rounded-xl border border-garden-thistle dark:border-garden-darkBorder focus:outline-none focus:ring-1 focus:ring-garden-amethyst"
          />
        </div>
      </div>
    </header>
  );
}
