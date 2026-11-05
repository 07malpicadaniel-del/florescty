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
  Sparkles, 
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
    <div className="flex-1 flex flex-col min-h-screen bg-[#f7faf7] dark:bg-darkGarden-950 transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* TAB 1: INICIO */}
        {activeTab === 'inicio' && (
          <div className="space-y-12">
            {/* Magazine Hero */}
            <HeroQuincena />

            {/* Mission Banner (Faithful to Constanza's real words from Wix) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-botanical-100/90 via-emerald-50 to-botanical-100/90 dark:from-darkGarden-900 dark:via-darkGarden-850 dark:to-darkGarden-900 border border-botanical-200/80 dark:border-botanical-800 rounded-3xl p-6 sm:p-10 shadow-soft">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                  <div className="w-12 h-12 bg-white dark:bg-darkGarden-800 rounded-2xl flex items-center justify-center mx-auto shadow-sm text-emerald-700 dark:text-emerald-400 border border-botanical-200/50 dark:border-botanical-700">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-botanical-950 dark:text-white">
                    Bienvenido a El Jardín Secreto
                  </h2>
                  <p className="text-sm sm:text-base text-botanical-800 dark:text-botanical-200 leading-relaxed font-serif">
                    {content.siteSettings.welcomeText}
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-3 text-xs text-botanical-700 dark:text-botanical-300 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                      Renovación cada 2 semanas
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Flower2 className="w-3.5 h-3.5 text-flora-amber" />
                      Por {content.siteSettings.curatorName}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Home: Forum Snapshot */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex items-center justify-between border-b border-botanical-200 dark:border-botanical-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                    <Flower2 className="w-4 h-4" />
                    Publicaciones de Constanza
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-botanical-950 dark:text-white">
                    Cuadernos y Notas de Cultivo
                  </h3>
                </div>

                <button
                  onClick={() => setActiveTab('foro')}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 transition-colors"
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
              <div className="flex items-center justify-between border-b border-botanical-200 dark:border-botanical-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                    <BookOpen className="w-4 h-4" />
                    Herbario Vivo
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-botanical-950 dark:text-white">
                    Especies Destacadas
                  </h3>
                </div>

                <button
                  onClick={() => setActiveTab('especies')}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 transition-colors"
                >
                  <span>Ver enciclopedia completa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredPlants.map((plant) => (
                  <div
                    key={plant.id}
                    onClick={() => setSelectedPlant(plant)}
                    className="group bg-white dark:bg-darkGarden-900 rounded-2xl border border-botanical-200 dark:border-botanical-800 overflow-hidden shadow-soft hover:shadow-lifted cursor-pointer transition-all duration-300"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-botanical-100 dark:bg-darkGarden-800">
                      <img
                        src={plant.imageUrl}
                        alt={plant.commonName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-85" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <span className="text-[10px] font-mono text-emerald-300 uppercase block">
                          {plant.category}
                        </span>
                        <h4 className="font-serif font-bold text-lg text-white">
                          {plant.commonName}
                        </h4>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between text-xs text-botanical-700 dark:text-botanical-300">
                      <span className="font-serif italic">{plant.scientificName}</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                        Ver ficha →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: FORO */}
        {activeTab === 'foro' && <ForumSection />}

        {/* TAB 3: ESPECIES & CUIDADOS */}
        {activeTab === 'especies' && <PlantGuidesSection />}

        {/* TAB 4: ACERCA DE */}
        {activeTab === 'acerca-de' && <AboutSection />}
      </main>

      <Footer />

      {/* Global Interactive Modals */}
      <PostDetailModal />
      <NewPostModal />
      <PlantaQuincenalModal />
      <BiweeklyStudioModal />
      <QuickEditFloatingButton />
    </div>
  );
}
