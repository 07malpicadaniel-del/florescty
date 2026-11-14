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
  Flower2,
  Crown,
  KeyRound,
  PlusCircle
} from 'lucide-react';

export default function HomePage() {
  const { 
    content, 
    activeTab, 
    setActiveTab, 
    setSelectedPlant,
    setIsNewPostModalOpen
  } = useContent();

  const latestRegularPosts = content.posts.filter((post) => !post.isAdmin).slice(0, 3);
  const latestAdminPosts = content.posts.filter((post) => Boolean(post.isAdmin)).slice(0, 6);
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
                      <Sprout className="w-3.5 h-3.5 text-garden-amethyst" />
                      Más de 20 especies florales
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Flower2 className="w-3.5 h-3.5 text-garden-amethyst" />
                      Cuidados sencillos y efectivos
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
                  <h3 className="text-4xl sm:text-5xl font-script font-normal text-garden-darkPurple dark:text-garden-thistle tracking-wide leading-tight">
                    Notas y Cuidados
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('publicaciones')}
                  className="cursor-pointer inline-flex items-center gap-1.5 text-sm font-semibold text-garden-amethyst hover:text-garden-darkPurple dark:hover:text-white transition-colors font-serif"
                >
                  <span>Ver todas las publicaciones</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {latestRegularPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {latestRegularPosts.map((post) => (
                    <ForumPostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="bg-white/80 dark:bg-garden-darkCard rounded-3xl border border-dashed border-garden-thistle dark:border-garden-darkBorder p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-soft">
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg font-bold text-garden-darkPurple dark:text-white">
                      Aún no hay publicaciones generales
                    </h4>
                    <p className="text-xs sm:text-sm text-garden-darkPurple/75 dark:text-garden-thistle/80 font-serif max-w-2xl">
                      Las publicaciones actuales se encuentran en <strong>Publicaciones de Admin</strong>. Puedes crear una publicación general aquí dejando la Clave Admin vacía.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsNewPostModalOpen(true)}
                    className="cursor-pointer shrink-0 inline-flex items-center gap-2 bg-garden-olive hover:bg-garden-calPoly text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm transition-colors"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Nueva Publicación</span>
                  </button>
                </div>
              )}
            </section>

            {/* Home: Publicaciones de Admin Snapshot (Separated Author Section) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex items-center justify-between gap-4 border-b border-garden-thistle/80 dark:border-garden-darkBorder pb-4 flex-wrap">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-garden-amethyst mb-1">
                    <Crown className="w-4 h-4" />
                    Espacio del Autor
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-script font-normal text-garden-darkPurple dark:text-garden-thistle tracking-wide leading-tight">
                    Publicaciones de Admin
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('publicaciones-admin')}
                  className="cursor-pointer inline-flex items-center gap-1.5 text-sm font-semibold text-garden-amethyst hover:text-garden-darkPurple dark:hover:text-white transition-colors font-serif"
                >
                  <span>Ver sección de Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {latestAdminPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {latestAdminPosts.map((post) => (
                    <ForumPostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="bg-white/80 dark:bg-garden-darkCard rounded-3xl border border-dashed border-garden-amethyst/50 dark:border-garden-darkBorder p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-soft">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-garden-thistle/50 dark:bg-garden-darkBg flex items-center justify-center text-garden-amethyst shrink-0 border border-garden-amethyst/30">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg font-bold text-garden-darkPurple dark:text-white">
                        Sección separada para el autor/a del jardín
                      </h4>
                      <p className="text-xs sm:text-sm text-garden-darkPurple/75 dark:text-garden-thistle/80 font-serif max-w-2xl">
                        Al crear una publicación e ingresar la <strong>Clave Admin</strong>, aparecerá aquí de forma independiente al resto de publicaciones. Si dejas la clave vacía, se publicará en la sección general.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsNewPostModalOpen(true)}
                    className="cursor-pointer shrink-0 inline-flex items-center gap-2 bg-garden-darkPurple hover:bg-garden-darkPurple/90 dark:bg-garden-amethyst dark:hover:bg-garden-amethyst/80 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm transition-colors"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Publicar como Admin</span>
                  </button>
                </div>
              )}
            </section>

            {/* Home: Featured Encyclopedia Snapshot */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-6">
              <div className="flex items-center justify-between border-b border-garden-thistle/80 dark:border-garden-darkBorder pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-garden-amethyst mb-1">
                    <BookOpen className="w-4 h-4" />
                    Colección
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-script font-normal text-garden-darkPurple dark:text-garden-thistle tracking-wide leading-tight">
                    Plantas Destacadas
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('plantas')}
                  className="cursor-pointer inline-flex items-center gap-1.5 text-sm font-semibold text-garden-amethyst hover:text-garden-darkPurple dark:hover:text-white transition-colors font-serif"
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
        {activeTab === 'publicaciones' && <ForumSection mode="community" />}

        {/* TAB 2B: PUBLICACIONES DE ADMIN */}
        {activeTab === 'publicaciones-admin' && <ForumSection mode="admin" />}

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
