'use client';

import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { BiweeklyEdition, DifficultyLevel, SiteSettings } from '../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Leaf, 
  FileText, 
  Save, 
  Download, 
  Upload, 
  RotateCcw, 
  Trash2, 
  Pin, 
  CheckCircle2, 
  Sliders,
  Flower2
} from 'lucide-react';

export default function BiweeklyStudioModal() {
  const { 
    isEditorOpen, 
    closeEditor, 
    content, 
    updateCurrentEdition, 
    updateSiteSettings, 
    deletePost, 
    togglePinPost,
    resetToDefaults,
    exportContentBackup,
    importContentBackup 
  } = useContent();

  const [activeTab, setActiveTab] = useState<'edicion' | 'textos' | 'publicaciones' | 'respaldos'>('edicion');
  
  const [editionForm, setEditionForm] = useState<BiweeklyEdition>({ ...content.currentEdition });
  const [settingsForm, setSettingsForm] = useState<SiteSettings>({ ...content.siteSettings });
  
  const [newHighlight, setNewHighlight] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isEditorOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveEdition = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentEdition(editionForm);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    showToast('¡Edición Quincenal guardada con éxito!');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    showToast('¡Textos del jardín actualizados!');
  };

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    setEditionForm({
      ...editionForm,
      highlights: [...(editionForm.highlights || []), newHighlight.trim()]
    });
    setNewHighlight('');
  };

  const handleRemoveHighlight = (idx: number) => {
    const next = [...(editionForm.highlights || [])];
    next.splice(idx, 1);
    setEditionForm({ ...editionForm, highlights: next });
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        const ok = importContentBackup(result);
        if (ok) {
          showToast('¡Cuaderno de respaldo restaurado correctamente!');
          confetti({ particleCount: 60, spread: 70 });
        } else {
          alert('El archivo no tiene el formato válido de El Jardín Secreto.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div 
      onClick={closeEditor}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn cursor-pointer"
    >
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-garden-darkCard rounded-3xl shadow-2xl border border-garden-thistle dark:border-garden-darkBorder overflow-hidden flex flex-col max-h-[92vh] transition-colors cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="bg-garden-darkPurple text-white px-6 py-4 flex items-center justify-between border-b border-garden-darkBorder">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-garden-darkBg flex items-center justify-center text-garden-amethyst border border-garden-amethyst/30">
              <Flower2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl font-bold">
                  Cuaderno de El Jardín Secreto
                </h3>
              </div>
              <p className="text-xs text-garden-thistle/80 font-serif">
                Gestiona las publicaciones, textos e información del blog botánico.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeEditor}
            className="cursor-pointer p-1.5 rounded-xl text-garden-thistle hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Navigation */}
        <div className="bg-garden-cream dark:bg-garden-darkBg border-b border-garden-thistle/80 dark:border-garden-darkBorder px-6 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('edicion')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'edicion'
                ? 'bg-garden-darkPurple text-white dark:bg-garden-amethyst dark:text-white shadow-sm'
                : 'text-garden-darkPurple dark:text-garden-thistle hover:bg-garden-thistle/40'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-garden-amethyst" />
            <span>1. Entrega Quincenal</span>
          </button>

          <button
            onClick={() => setActiveTab('textos')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'textos'
                ? 'bg-garden-darkPurple text-white dark:bg-garden-amethyst dark:text-white shadow-sm'
                : 'text-garden-darkPurple dark:text-garden-thistle hover:bg-garden-thistle/40'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-garden-amethyst" />
            <span>2. Textos del Jardín</span>
          </button>

          <button
            onClick={() => setActiveTab('publicaciones')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'publicaciones'
                ? 'bg-garden-darkPurple text-white dark:bg-garden-amethyst dark:text-white shadow-sm'
                : 'text-garden-darkPurple dark:text-garden-thistle hover:bg-garden-thistle/40'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-garden-amethyst" />
            <span>3. Publicaciones ({content.posts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('respaldos')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'respaldos'
                ? 'bg-garden-darkPurple text-white dark:bg-garden-amethyst dark:text-white shadow-sm'
                : 'text-garden-darkPurple dark:text-garden-thistle hover:bg-garden-thistle/40'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-garden-amethyst" />
            <span>4. Respaldos</span>
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="bg-garden-olive text-white text-xs font-medium px-4 py-2.5 flex items-center justify-between shadow-md">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {toastMessage}
            </span>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
              ×
            </button>
          </div>
        )}

        {/* Scrollable Tab Content */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {/* TAB 1: BIWEEKLY EDITION */}
          {activeTab === 'edicion' && (
            <form onSubmit={handleSaveEdition} className="space-y-6">
              <div className="bg-garden-thistle/30 dark:bg-garden-darkBg border border-garden-thistle/80 dark:border-garden-darkBorder p-4 rounded-2xl flex items-start gap-3">
                <Leaf className="w-5 h-5 text-garden-amethyst shrink-0 mt-0.5" />
                <div className="text-xs text-garden-darkPurple dark:text-garden-thistle leading-relaxed font-serif text-sm">
                  Cambia aquí el título del ciclo, las fechas, la planta protagonista y los puntos destacados de esta quincena.
                </div>
              </div>

              {/* Cycle Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                    Número de Entrega
                  </label>
                  <input
                    type="number"
                    value={editionForm.editionNumber}
                    onChange={(e) => setEditionForm({ ...editionForm, editionNumber: Number(e.target.value) })}
                    className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-sm p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                    Rango de Fechas
                  </label>
                  <input
                    type="text"
                    value={editionForm.dateRange}
                    onChange={(e) => setEditionForm({ ...editionForm, dateRange: e.target.value })}
                    placeholder="Ej. 01 Nov – 15 Nov"
                    className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-sm p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                    Próxima Entrega
                  </label>
                  <input
                    type="text"
                    value={editionForm.nextEditionDate}
                    onChange={(e) => setEditionForm({ ...editionForm, nextEditionDate: e.target.value })}
                    placeholder="Ej. 16 de Noviembre"
                    className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-sm p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder"
                    required
                  />
                </div>
              </div>

              {/* Cycle Title & Editorial Message */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                    Título de la Quincena *
                  </label>
                  <input
                    type="text"
                    value={editionForm.cycleTitle}
                    onChange={(e) => setEditionForm({ ...editionForm, cycleTitle: e.target.value })}
                    placeholder="Ej. El Cuidado de las Orquídeas y Plantas de Interior"
                    className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-base p-3 rounded-xl border border-garden-thistle dark:border-garden-darkBorder font-serif font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                    Mensaje del Cuaderno
                  </label>
                  <textarea
                    rows={3}
                    value={editionForm.editorialMessage}
                    onChange={(e) => setEditionForm({ ...editionForm, editorialMessage: e.target.value })}
                    className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-sm p-3 rounded-xl border border-garden-thistle dark:border-garden-darkBorder leading-relaxed resize-none"
                    required
                  />
                </div>
              </div>

              {/* Highlights Manager */}
              <div className="bg-garden-cream dark:bg-garden-darkBg p-4 rounded-2xl border border-garden-thistle/80 dark:border-garden-darkBorder space-y-3">
                <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle font-serif text-sm">
                  Puntos Destacados de esta Quincena
                </label>
                <div className="space-y-2">
                  {editionForm.highlights?.map((h, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 bg-white dark:bg-garden-darkCard px-3 py-2 rounded-xl border border-garden-thistle dark:border-garden-darkBorder text-xs text-garden-darkPurple dark:text-garden-thistle">
                      <span>• {h}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(i)}
                        className="text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Agregar nuevo punto..."
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    className="flex-1 bg-white dark:bg-garden-darkCard dark:text-white text-xs p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder"
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="bg-garden-olive text-white text-xs px-3.5 py-2.5 rounded-xl font-medium"
                  >
                    Agregar
                  </button>
                </div>
              </div>

              {/* Featured Plant Section */}
              <div className="border-t border-garden-thistle/80 dark:border-garden-darkBorder pt-6 space-y-4">
                <div className="flex items-center gap-2 text-garden-darkPurple dark:text-garden-thistle font-serif font-bold text-xl">
                  <Flower2 className="w-5 h-5 text-garden-amethyst" />
                  <h4>Planta de la Quincena</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                      Nombre Común
                    </label>
                    <input
                      type="text"
                      value={editionForm.featuredPlant.commonName}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, commonName: e.target.value }
                      })}
                      className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-sm p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder font-semibold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                      Nombre Científico
                    </label>
                    <input
                      type="text"
                      value={editionForm.featuredPlant.scientificName}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, scientificName: e.target.value }
                      })}
                      className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-sm p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder italic font-serif"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                      Fotografía (URL)
                    </label>
                    <input
                      type="url"
                      value={editionForm.featuredPlant.imageUrl}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, imageUrl: e.target.value }
                      })}
                      className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-xs p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder font-mono"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                      Resumen breve
                    </label>
                    <textarea
                      rows={2}
                      value={editionForm.featuredPlant.summary}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, summary: e.target.value }
                      })}
                      className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-xs sm:text-sm p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                      Luz
                    </label>
                    <input
                      type="text"
                      value={editionForm.featuredPlant.light}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, light: e.target.value }
                      })}
                      className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-xs p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                      Riego
                    </label>
                    <input
                      type="text"
                      value={editionForm.featuredPlant.watering}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, watering: e.target.value }
                      })}
                      className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-xs p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                      Dificultad
                    </label>
                    <select
                      value={editionForm.featuredPlant.difficulty}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, difficulty: e.target.value as DifficultyLevel }
                      })}
                      className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-xs p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder"
                    >
                      <option value="Principiante">Principiante</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Experto">Experto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                      Consejo especial
                    </label>
                    <input
                      type="text"
                      value={editionForm.featuredPlant.curatorNotes}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, curatorNotes: e.target.value }
                      })}
                      placeholder="Ej. Mantén la maceta con luz indirecta..."
                      className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-xs p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-garden-thistle/80 dark:border-garden-darkBorder flex items-center justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-garden-olive hover:bg-garden-calPoly text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: TEXTS */}
          {activeTab === 'textos' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                    Nombre del Jardín
                  </label>
                  <input
                    type="text"
                    value={settingsForm.siteName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, siteName: e.target.value })}
                    className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-sm p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder font-serif font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                    Mensaje de Bienvenida (Inicio)
                  </label>
                  <textarea
                    rows={3}
                    value={settingsForm.welcomeText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, welcomeText: e.target.value })}
                    className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-xs sm:text-sm p-3 rounded-xl border border-garden-thistle dark:border-garden-darkBorder resize-none leading-relaxed"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                    Historia (Sección Acerca de)
                  </label>
                  <textarea
                    rows={4}
                    value={settingsForm.aboutStory}
                    onChange={(e) => setSettingsForm({ ...settingsForm, aboutStory: e.target.value })}
                    className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-xs sm:text-sm p-3 rounded-xl border border-garden-thistle dark:border-garden-darkBorder resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={settingsForm.instagram}
                    onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                    className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-xs p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-garden-darkPurple dark:text-garden-thistle mb-1">
                    Correo
                  </label>
                  <input
                    type="email"
                    value={settingsForm.contactEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                    className="w-full bg-white dark:bg-garden-darkBg dark:text-white text-garden-darkPurple text-xs p-2.5 rounded-xl border border-garden-thistle dark:border-garden-darkBorder"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-garden-thistle/80 dark:border-garden-darkBorder flex items-center justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-garden-olive hover:bg-garden-calPoly text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Textos</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: POSTS MANAGEMENT */}
          {activeTab === 'publicaciones' && (
            <div className="space-y-4">
              <div className="divide-y divide-garden-thistle/60 dark:divide-garden-darkBorder border border-garden-thistle dark:border-garden-darkBorder rounded-2xl overflow-hidden bg-white dark:bg-garden-darkBg">
                {content.posts.map((p) => (
                  <div key={p.id} className="p-4 flex items-center justify-between gap-4 hover:bg-garden-cream/60 dark:hover:bg-garden-darkCard transition-colors">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {p.isAdmin && (
                          <span className="bg-garden-darkPurple text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                            Admin
                          </span>
                        )}
                        {p.pinned && (
                          <span className="bg-garden-amethyst text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                            Fijada
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-garden-darkPurple/60 dark:text-garden-thistle/60">
                          {p.category} · {p.fortnightTag}
                        </span>
                      </div>
                      <h5 className="font-semibold text-sm text-garden-darkPurple dark:text-white truncate">
                        {p.title}
                      </h5>
                      <p className="text-xs text-garden-darkPurple/60 dark:text-garden-thistle/60 truncate font-serif">
                        {p.createdAt} · {p.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => togglePinPost(p.id)}
                        className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                          p.pinned 
                            ? 'bg-garden-amethyst text-white border-garden-amethyst' 
                            : 'bg-white dark:bg-garden-darkCard text-garden-darkPurple dark:text-garden-thistle border-garden-thistle dark:border-garden-darkBorder'
                        }`}
                        title={p.pinned ? 'Desfijar' : 'Fijar en portada'}
                      >
                        <Pin className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar "${p.title}"?`)) {
                            deletePost(p.id);
                          }
                        }}
                        className="p-2 rounded-lg bg-white dark:bg-garden-darkCard hover:bg-rose-50 text-rose-500 border border-garden-thistle dark:border-garden-darkBorder transition-colors"
                        title="Eliminar publicación"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BACKUPS */}
          {activeTab === 'respaldos' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-garden-cream dark:bg-garden-darkBg border border-garden-thistle dark:border-garden-darkBorder p-4 rounded-2xl flex flex-col justify-between space-y-3">
                  <div>
                    <h5 className="font-bold text-xs text-garden-darkPurple dark:text-white uppercase tracking-wide flex items-center gap-1.5 mb-1">
                      <Download className="w-4 h-4 text-garden-amethyst" />
                      Descargar Cuaderno
                    </h5>
                    <p className="text-[11px] text-garden-darkPurple/70 dark:text-garden-thistle/70">
                      Guarda el contenido actual en tu computadora.
                    </p>
                  </div>
                  <button
                    onClick={exportContentBackup}
                    className="w-full bg-garden-olive text-white text-xs font-semibold py-2.5 rounded-xl transition-colors hover:bg-garden-calPoly"
                  >
                    Descargar Respaldo JSON
                  </button>
                </div>

                <div className="bg-garden-cream dark:bg-garden-darkBg border border-garden-thistle dark:border-garden-darkBorder p-4 rounded-2xl flex flex-col justify-between space-y-3">
                  <div>
                    <h5 className="font-bold text-xs text-garden-darkPurple dark:text-white uppercase tracking-wide flex items-center gap-1.5 mb-1">
                      <Upload className="w-4 h-4 text-garden-amethyst" />
                      Restaurar Cuaderno
                    </h5>
                    <p className="text-[11px] text-garden-darkPurple/70 dark:text-garden-thistle/70">
                      Restaura un archivo JSON de respaldo.
                    </p>
                  </div>
                  <label className="w-full bg-white dark:bg-garden-darkCard text-garden-darkPurple dark:text-white border border-garden-thistle dark:border-garden-darkBorder text-xs font-semibold py-2.5 rounded-xl transition-colors text-center cursor-pointer block hover:bg-garden-thistle/30">
                    <span>Seleccionar Archivo</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJsonFile}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 p-4 rounded-2xl flex flex-col justify-between space-y-3">
                  <div>
                    <h5 className="font-bold text-xs text-rose-950 dark:text-rose-200 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                      <RotateCcw className="w-4 h-4 text-rose-600" />
                      Restablecer Jardín
                    </h5>
                    <p className="text-[11px] text-rose-700 dark:text-rose-300">
                      Restaura el jardín a su estado original.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('¿Restablecer el jardín al estado inicial?')) {
                        resetToDefaults();
                        showToast('Jardín restablecido al estado original.');
                      }
                    }}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    Restablecer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
