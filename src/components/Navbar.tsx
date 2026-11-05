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
  Layers
} from 'lucide-react';

export default function Navbar() {
  const { 
    content, 
    activeTab, 
    setActiveTab, 
    openEditor, 
    setIsNewPostModalOpen,
    searchQuery,
    setSearchQuery 
  } = useContent();

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Sprout },
    { id: 'foro', label: 'Foro Botánico', icon: MessageSquare, count: content.posts.length },
    { id: 'especies', label: 'Guía de Especies', icon: BookOpen, count: content.plantsEncyclopedia.length },
    { id: 'acerca-de', label: 'Acerca de', icon: Info },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-botanical-200/50 shadow-soft">
      {/* Top Biweekly Announcement Ribbon */}
      <div className="bg-botanical-950 text-botanical-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-botanical-800 text-flora-amber px-2 py-0.5 rounded-full font-medium tracking-wide">
              <Calendar className="w-3 h-3" />
              Edición #{content.currentEdition.editionNumber}
            </span>
            <span className="font-semibold text-white hidden sm:inline">
              {content.currentEdition.cycleTitle}
            </span>
            <span className="text-botanical-300 hidden md:inline">
              · Activa hasta el {content.currentEdition.dateRange.split('–')[1] || content.currentEdition.dateRange}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-botanical-300 text-[11px] hidden lg:inline">
              Próxima renovación: <strong className="text-white">{content.currentEdition.nextEditionDate}</strong>
            </span>
            <button
              onClick={openEditor}
              className="flex items-center gap-1 bg-botanical-800 hover:bg-botanical-700 text-botanical-100 px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors border border-botanical-600/40"
              title="Panel para que el usuario edite cada 2 semanas"
            >
              <Sparkles className="w-3 h-3 text-flora-amber" />
              <span>Studio Quincenal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <button 
          onClick={() => setActiveTab('inicio')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-botanical-900 text-botanical-200 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
            <Sprout className="w-6 h-6 text-botanical-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-botanical-950 group-hover:text-botanical-700 transition-colors">
                {content.siteSettings.siteName}
              </span>
              <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-botanical-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-botanical-700 font-medium tracking-wider uppercase">
              Por {content.siteSettings.curatorName}
            </p>
          </div>
        </button>

        {/* Search Bar - Center */}
        <div className="hidden md:flex items-center relative max-w-xs w-full">
          <Search className="w-4 h-4 text-botanical-500 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar especies, temas o cuidados..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-botanical-50/70 hover:bg-botanical-50 focus:bg-white text-botanical-950 text-sm pl-9 pr-3 py-1.5 rounded-full border border-botanical-200 focus:outline-none focus:ring-2 focus:ring-botanical-500 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-xs text-botanical-500 hover:text-botanical-800"
            >
              ×
            </button>
          )}
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-botanical-800 text-white shadow-sm' 
                    : 'text-botanical-800 hover:bg-botanical-100/70 hover:text-botanical-950'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-botanical-300' : 'text-botanical-600'}`} />
                <span className="hidden sm:inline">{item.label}</span>
                {'count' in item && item.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive ? 'bg-botanical-700 text-botanical-100' : 'bg-botanical-200/80 text-botanical-800'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          {/* Action Button: Nueva Publicación */}
          <button
            onClick={() => setIsNewPostModalOpen(true)}
            className="flex items-center gap-1.5 bg-botanical-600 hover:bg-botanical-700 text-white px-3.5 py-2 rounded-lg text-sm font-medium shadow-sm transition-all hover:shadow"
            title="Crear un nuevo hilo en el foro"
          >
            <PlusCircle className="w-4 h-4 text-botanical-100" />
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
            className="w-full bg-botanical-50 text-botanical-950 text-xs pl-8 pr-3 py-2 rounded-lg border border-botanical-200 focus:outline-none focus:ring-1 focus:ring-botanical-500"
          />
        </div>
      </div>
    </header>
  );
}
