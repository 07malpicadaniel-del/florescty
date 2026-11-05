'use client';

import React from 'react';
import { useContent } from '../context/ContentContext';
import Navbar from '../components/Navbar';
import HeroQuincena from '../components/HeroQuincena';
import ForumSection from '../components/ForumSection';
import ForumPostCard from '../components/ForumPostCard';
import PlantGuidesSection from '../components/PlantGuidesSection';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import PostDetailModal from '../components/PostDetailModal';
import NewPostModal from '../components/NewPostModal';
import PlantaQuincenalModal from '../components/PlantaQuincenalModal';
import BiweeklyStudioModal from '../components/BiweeklyStudioModal';
import QuickEditFloatingButton from '../components/QuickEditFloatingButton';
import { 
  BookOpen, 
  ArrowRight, 
  Sprout, 
  Calendar,
  Flower2
} from 'lucide-react';

export default function HomePage() {
  const { 
    content, 
    activeTab, 
    setActiveTab, 
    setSelectedPlant 
  } = useContent();

  const latestPosts = content.posts.slice(0, 3);
  const featuredPlants = content.plantsEncyclopedia.slice(0, 3);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-garden-cream dark:bg-garden-darkBg transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* TAB 1: INICIO */}
        {activeTab === 'inicio' && (
          <div className="space-y-12">
            {/* Magazine Hero */}
            <HeroQuincena />

            {/* Welcome Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-garden-thistle/40 via-white to-garden-thistle/40 dark:from-garden-darkCard dark:via-garden-darkBg dark:to-garden-darkCard border border-garden-thistle/80 dark:border-garden-darkBorder rounded-3xl p-6 sm:p-10 shadow-soft">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                  <div className="w-12 h-12 bg-white dark:bg-garden-darkCard rounded-2xl flex items-center justify-center mx-auto shadow-sm text-garden-amethyst border border-garden-thistle/80 dark:border-garden-darkBorder">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-garden-darkPurple dark:text-white">
                    Bienvenido a El Jardín Secreto
                  </h2>
                  <p className="text-base sm:text-lg text-garden-darkPurple/80 dark:text-garden-thistle/90 leading-relaxed font-serif">
                    {content.siteSettings.welcomeText}
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-3 text-xs text-garden-darkPurple/70 dark:text-garden-thistle/70 font-medium font-serif">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-garden-amethyst" />
                      Renovación cada 2 semanas
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Flower2 className="w-3.5 h-3.5 text-garden-amethyst" />
                      Espacio Botánico
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Home: Publications Snapshot */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex items-center justify-between border-b border-garden-thistle/80 dark:border-garden-darkBorder pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-garden-amethyst mb-1">
                    <Flower2 className="w-4 h-4" />
                    Publicaciones Recientes
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-serif font-bold text-garden-darkPurple dark:text-white">
                    Notas y Cuidados
                  </h3>
                </div>

                <button
                  onClick={() => setActiveTab('publicaciones')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-garden-amethyst hover:text-garden-darkPurple dark:hover:text-white transition-colors font-serif"
                >
                  <span>Ver todas las publicaciones</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {latestPosts.map((post) => (
                  <ForumPostCard key={post.id} post={post} />
                ))}
              </div>
            </section>

            {/* Home: Featured Encyclopedia Snapshot */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-6">
              <div className="flex items-center justify-between border-b border-garden-thistle/80 dark:border-garden-darkBorder pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-garden-amethyst mb-1">
                    <BookOpen className="w-4 h-4" />
                    Colección
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-serif font-bold text-garden-darkPurple dark:text-white">
                    Plantas Destacadas
                  </h3>
                </div>

                <button
                  onClick={() => setActiveTab('plantas')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-garden-amethyst hover:text-garden-darkPurple dark:hover:text-white transition-colors font-serif"
                >
                  <span>Ver todas las plantas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredPlants.map((plant) => (
                  <div
                    key={plant.id}
                    onClick={() => setSelectedPlant(plant)}
                    className="group bg-white dark:bg-garden-darkCard rounded-2xl border border-garden-thistle/80 dark:border-garden-darkBorder overflow-hidden shadow-soft hover:shadow-lifted cursor-pointer transition-all duration-300"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-garden-thistle/30 dark:bg-garden-darkBg">
                      <img
                        src={plant.imageUrl}
                        alt={plant.commonName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-garden-darkPurple via-transparent to-transparent opacity-85" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <span className="text-[10px] font-mono text-garden-thistle uppercase block">
                          {plant.category}
                        </span>
                        <h4 className="font-serif font-bold text-xl text-white">
                          {plant.commonName}
                        </h4>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between text-xs text-garden-darkPurple/80 dark:text-garden-thistle">
                      <span className="font-serif italic text-sm">{plant.scientificName}</span>
                      <span className="text-garden-amethyst font-semibold group-hover:translate-x-0.5 transition-transform font-serif text-sm">
                        Ver cuidados →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: PUBLICACIONES (antes Foro) */}
        {activeTab === 'publicaciones' && <ForumSection />}

        {/* TAB 3: PLANTAS */}
        {activeTab === 'plantas' && <PlantGuidesSection />}

        {/* TAB 4: ACERCA DE */}
        {activeTab === 'acerca-de' && <AboutSection />}
      </main>

      <Footer />

      {/* Global Modals */}
      <PostDetailModal />
      <NewPostModal />
      <PlantaQuincenalModal />
      <BiweeklyStudioModal />
      <QuickEditFloatingButton />
    </div>
  );
}
