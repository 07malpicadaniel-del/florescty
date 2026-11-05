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
  Settings, 
  Save, 
  Download, 
  Upload, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Pin, 
  CheckCircle2, 
  Lock, 
  Unlock,
  Eye,
  Sliders,
  HelpCircle
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
  
  // Local edit state for the biweekly edition
  const [editionForm, setEditionForm] = useState<BiweeklyEdition>({ ...content.currentEdition });
  const [settingsForm, setSettingsForm] = useState<SiteSettings>({ ...content.siteSettings });
  
  // Highlighting input
  const [newHighlight, setNewHighlight] = useState('');
  
  // Feedback toast
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
    showToast('¡Edición Quincenal actualizada y guardada con éxito!');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    showToast('¡Ajustes generales del sitio actualizados!');
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
          showToast('¡Copia de respaldo importada correctamente!');
          confetti({ particleCount: 60, spread: 70 });
        } else {
          alert('El archivo no tiene el formato JSON válido de El Jardín Secreto.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-botanical-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="bg-botanical-950 text-white px-6 py-4 flex items-center justify-between border-b border-botanical-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-botanical-800 flex items-center justify-center text-flora-amber border border-botanical-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold">
                  Jardín Studio · Panel de Edición Quincenal
                </h3>
                <span className="bg-emerald-700 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Modo Editor
                </span>
              </div>
              <p className="text-xs text-botanical-300">
                Diseñado para que actualices tu web botánica y foro cada 2 semanas con cero complicaciones.
              </p>
            </div>
          </div>

          <button
            onClick={closeEditor}
            className="p-1.5 rounded-xl text-botanical-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Sub-Navigation */}
        <div className="bg-botanical-50 border-b border-botanical-200 px-6 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('edicion')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'edicion'
                ? 'bg-botanical-900 text-white shadow-sm'
                : 'text-botanical-700 hover:bg-botanical-200/60'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-flora-amber" />
            <span>1. Edición Quincenal Activa</span>
          </button>

          <button
            onClick={() => setActiveTab('textos')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'textos'
                ? 'bg-botanical-900 text-white shadow-sm'
                : 'text-botanical-700 hover:bg-botanical-200/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-botanical-500" />
            <span>2. Textos & Curadora</span>
          </button>

          <button
            onClick={() => setActiveTab('publicaciones')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'publicaciones'
                ? 'bg-botanical-900 text-white shadow-sm'
                : 'text-botanical-700 hover:bg-botanical-200/60'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-botanical-500" />
            <span>3. Gestionar Foro ({content.posts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('respaldos')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'respaldos'
                ? 'bg-botanical-900 text-white shadow-sm'
                : 'text-botanical-700 hover:bg-botanical-200/60'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-botanical-500" />
            <span>4. Respaldo & Vercel</span>
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs font-medium px-4 py-2.5 flex items-center justify-between shadow-md">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {toastMessage}
            </span>
            <button onClick={() => setToastMessage(null)} className="text-emerald-100 hover:text-white">
              ×
            </button>
          </div>
        )}

        {/* Scrollable Tab Content */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {/* TAB 1: BIWEEKLY EDITION */}
          {activeTab === 'edicion' && (
            <form onSubmit={handleSaveEdition} className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-start gap-3">
                <Leaf className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950">
                  <strong>Paso Quincenal:</strong> Cambia aquí el título del ciclo, las fechas, la planta que protagonizará estas dos semanas y el mensaje para la comunidad. Al presionar <strong>Guardar Cambios</strong>, la web se actualizará al instante.
                </div>
              </div>

              {/* Cycle Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-botanical-800 mb-1">
                    Número de Entrega
                  </label>
                  <input
                    type="number"
                    value={editionForm.editionNumber}
                    onChange={(e) => setEditionForm({ ...editionForm, editionNumber: Number(e.target.value) })}
                    className="w-full bg-white text-botanical-950 text-sm p-2.5 rounded-xl border border-botanical-200 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-botanical-800 mb-1">
                    Rango de Fechas
                  </label>
                  <input
                    type="text"
                    value={editionForm.dateRange}
                    onChange={(e) => setEditionForm({ ...editionForm, dateRange: e.target.value })}
                    placeholder="Ej. 01 Nov – 15 Nov 2026"
                    className="w-full bg-white text-botanical-950 text-sm p-2.5 rounded-xl border border-botanical-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-botanical-800 mb-1">
                    Próxima Entrega
                  </label>
                  <input
                    type="text"
                    value={editionForm.nextEditionDate}
                    onChange={(e) => setEditionForm({ ...editionForm, nextEditionDate: e.target.value })}
                    placeholder="Ej. 16 Noviembre 2026"
                    className="w-full bg-white text-botanical-950 text-sm p-2.5 rounded-xl border border-botanical-200"
                    required
                  />
                </div>
              </div>

              {/* Cycle Title & Editorial Message */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-botanical-800 mb-1">
                    Título del Ciclo Quincenal *
                  </label>
                  <input
                    type="text"
                    value={editionForm.cycleTitle}
                    onChange={(e) => setEditionForm({ ...editionForm, cycleTitle: e.target.value })}
                    placeholder="Ej. El Despertar de las Aráceas y Selvas Domésticas"
                    className="w-full bg-white text-botanical-950 text-sm p-3 rounded-xl border border-botanical-200 font-serif font-bold text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-botanical-800 mb-1">
                    Mensaje Editorial de Constanza Pimentel
                  </label>
                  <textarea
                    rows={3}
                    value={editionForm.editorialMessage}
                    onChange={(e) => setEditionForm({ ...editionForm, editorialMessage: e.target.value })}
                    className="w-full bg-white text-botanical-950 text-sm p-3 rounded-xl border border-botanical-200 leading-relaxed resize-none"
                    required
                  />
                </div>
              </div>

              {/* Highlights Manager */}
              <div className="bg-botanical-50 p-4 rounded-2xl border border-botanical-200 space-y-3">
                <label className="block text-xs font-semibold text-botanical-900">
                  Ejes Destacados de esta Quincena
                </label>
                <div className="space-y-2">
                  {editionForm.highlights?.map((h, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-botanical-200 text-xs">
                      <span>• {h}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(i)}
                        className="text-rose-600 hover:text-rose-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Agregar nuevo punto clave (ej: Guía de poda para el otoño)..."
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    className="flex-1 bg-white text-xs p-2.5 rounded-xl border border-botanical-200"
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="bg-botanical-800 hover:bg-botanical-700 text-white text-xs px-3.5 py-2.5 rounded-xl font-medium"
                  >
                    Agregar
                  </button>
                </div>
              </div>

              {/* Featured Plant Section */}
              <div className="border-t border-botanical-200 pt-6 space-y-4">
                <div className="flex items-center gap-2 text-botanical-950 font-serif font-bold text-lg">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  <h4>Planta Protagonista de la Quincena</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-botanical-800 mb-1">
                      Nombre Común
                    </label>
                    <input
                      type="text"
                      value={editionForm.featuredPlant.commonName}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, commonName: e.target.value }
                      })}
                      className="w-full bg-white text-botanical-950 text-sm p-2.5 rounded-xl border border-botanical-200 font-semibold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-botanical-800 mb-1">
                      Nombre Científico
                    </label>
                    <input
                      type="text"
                      value={editionForm.featuredPlant.scientificName}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, scientificName: e.target.value }
                      })}
                      className="w-full bg-white text-botanical-950 text-sm p-2.5 rounded-xl border border-botanical-200 italic"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-botanical-800 mb-1">
                      URL de la Fotografía Principal
                    </label>
                    <input
                      type="url"
                      value={editionForm.featuredPlant.imageUrl}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, imageUrl: e.target.value }
                      })}
                      className="w-full bg-white text-botanical-950 text-xs p-2.5 rounded-xl border border-botanical-200 font-mono"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-botanical-800 mb-1">
                      Resumen / Por qué es especial esta quincena
                    </label>
                    <textarea
                      rows={2}
                      value={editionForm.featuredPlant.summary}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, summary: e.target.value }
                      })}
                      className="w-full bg-white text-botanical-950 text-xs sm:text-sm p-2.5 rounded-xl border border-botanical-200 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-botanical-800 mb-1">
                      Requerimiento de Luz
                    </label>
                    <input
                      type="text"
                      value={editionForm.featuredPlant.light}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, light: e.target.value }
                      })}
                      className="w-full bg-white text-botanical-950 text-xs p-2.5 rounded-xl border border-botanical-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-botanical-800 mb-1">
                      Pauta de Riego
                    </label>
                    <input
                      type="text"
                      value={editionForm.featuredPlant.watering}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, watering: e.target.value }
                      })}
                      className="w-full bg-white text-botanical-950 text-xs p-2.5 rounded-xl border border-botanical-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-botanical-800 mb-1">
                      Humedad Requerida
                    </label>
                    <input
                      type="text"
                      value={editionForm.featuredPlant.humidity}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, humidity: e.target.value }
                      })}
                      className="w-full bg-white text-botanical-950 text-xs p-2.5 rounded-xl border border-botanical-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-botanical-800 mb-1">
                      Dificultad de Cultivo
                    </label>
                    <select
                      value={editionForm.featuredPlant.difficulty}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, difficulty: e.target.value as DifficultyLevel }
                      })}
                      className="w-full bg-white text-botanical-950 text-xs p-2.5 rounded-xl border border-botanical-200"
                    >
                      <option value="Principiante">Principiante</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Experto">Experto</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-botanical-800 mb-1">
                      Consejo Secreto de la Curadora
                    </label>
                    <input
                      type="text"
                      value={editionForm.featuredPlant.curatorNotes}
                      onChange={(e) => setEditionForm({
                        ...editionForm,
                        featuredPlant: { ...editionForm.featuredPlant, curatorNotes: e.target.value }
                      })}
                      placeholder="Ej. El secreto está en no encharcar las raíces aéreas..."
                      className="w-full bg-white text-botanical-950 text-xs p-2.5 rounded-xl border border-botanical-200"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-botanical-200 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar y Publicar Quincena</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: TEXTS AND CURATOR */}
          {activeTab === 'textos' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="bg-botanical-50 border border-botanical-200 p-4 rounded-2xl flex items-start gap-3">
                <FileText className="w-5 h-5 text-botanical-700 shrink-0 mt-0.5" />
                <div className="text-xs text-botanical-900">
                  Edita los textos base creados por <strong>Constanza Pimentel</strong> (nombre del jardín, mensaje de bienvenida, historia de Acerca de y datos de contacto).
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-botanical-800 mb-1">
                    Nombre del Sitio / Proyecto
                  </label>
                  <input
                    type="text"
                    value={settingsForm.siteName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, siteName: e.target.value })}
                    className="w-full bg-white text-botanical-950 text-sm p-2.5 rounded-xl border border-botanical-200 font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-botanical-800 mb-1">
                    Curadora / Autora
                  </label>
                  <input
                    type="text"
                    value={settingsForm.curatorName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, curatorName: e.target.value })}
                    className="w-full bg-white text-botanical-950 text-sm p-2.5 rounded-xl border border-botanical-200 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-botanical-800 mb-1">
                    Mensaje de Bienvenida (Página Principal)
                  </label>
                  <textarea
                    rows={3}
                    value={settingsForm.welcomeText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, welcomeText: e.target.value })}
                    className="w-full bg-white text-botanical-950 text-xs sm:text-sm p-3 rounded-xl border border-botanical-200 resize-none leading-relaxed"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-botanical-800 mb-1">
                    Historia Completa (Sección &ldquo;Acerca de&rdquo;)
                  </label>
                  <textarea
                    rows={4}
                    value={settingsForm.aboutStory}
                    onChange={(e) => setSettingsForm({ ...settingsForm, aboutStory: e.target.value })}
                    className="w-full bg-white text-botanical-950 text-xs sm:text-sm p-3 rounded-xl border border-botanical-200 resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-botanical-800 mb-1">
                    Instagram de la Comunidad
                  </label>
                  <input
                    type="text"
                    value={settingsForm.instagram}
                    onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                    className="w-full bg-white text-botanical-950 text-xs p-2.5 rounded-xl border border-botanical-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-botanical-800 mb-1">
                    Correo de Contacto
                  </label>
                  <input
                    type="email"
                    value={settingsForm.contactEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                    className="w-full bg-white text-botanical-950 text-xs p-2.5 rounded-xl border border-botanical-200"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-botanical-200 flex items-center justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Textos</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: FORUM POSTS MANAGEMENT */}
          {activeTab === 'publicaciones' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-botanical-950 text-base">
                    Publicaciones Activas en el Foro ({content.posts.length})
                  </h4>
                  <p className="text-xs text-botanical-600">
                    Fija las más importantes en portada o elimina contenido no deseado.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-botanical-100 border border-botanical-200 rounded-2xl overflow-hidden bg-white">
                {content.posts.map((p) => (
                  <div key={p.id} className="p-4 flex items-center justify-between gap-4 hover:bg-botanical-50/50 transition-colors">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {p.pinned && (
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                            Fijado
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-botanical-500">
                          {p.category} · {p.fortnightTag}
                        </span>
                      </div>
                      <h5 className="font-semibold text-sm text-botanical-950 truncate">
                        {p.title}
                      </h5>
                      <p className="text-xs text-botanical-600 truncate">
                        Por {p.author.name} · {p.comments.length} comentarios · {p.likes} me gusta
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => togglePinPost(p.id)}
                        className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                          p.pinned 
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                            : 'bg-white text-botanical-700 border-botanical-200 hover:bg-botanical-100'
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
                        className="p-2 rounded-lg bg-white hover:bg-rose-50 text-botanical-400 hover:text-rose-600 border border-botanical-200 transition-colors"
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

          {/* TAB 4: BACKUPS, RESTORE & VERCEL */}
          {activeTab === 'respaldos' && (
            <div className="space-y-6">
              <div className="bg-botanical-900 text-white p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-flora-amber font-semibold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>¿Cómo funciona el flujo quincenal?</span>
                </div>
                <div className="text-xs text-botanical-200 space-y-2 leading-relaxed">
                  <p>
                    <strong>1. Edición en Vivo:</strong> Cualquier cambio que hagas en este panel se guarda automáticamente en tu navegador y en la sesión de la web.
                  </p>
                  <p>
                    <strong>2. Exportación con un clic:</strong> Puedes descargar un archivo de respaldo (<code>.json</code>) para guardar el historial de tus quincenas o compartirlo.
                  </p>
                  <p>
                    <strong>3. Publicación en Vercel:</strong> Cuando realices el deploy en Vercel, este panel seguirá 100% activo y funcional en producción.
                  </p>
                </div>
              </div>

              {/* Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-botanical-50 border border-botanical-200 p-4 rounded-2xl flex flex-col justify-between space-y-3">
                  <div>
                    <h5 className="font-bold text-xs text-botanical-950 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                      <Download className="w-4 h-4 text-emerald-600" />
                      Descargar Copia
                    </h5>
                    <p className="text-[11px] text-botanical-600">
                      Guarda todo el contenido actual (textos, quincena, foro) en tu computadora.
                    </p>
                  </div>
                  <button
                    onClick={exportContentBackup}
                    className="w-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    Descargar Respaldo JSON
                  </button>
                </div>

                <div className="bg-botanical-50 border border-botanical-200 p-4 rounded-2xl flex flex-col justify-between space-y-3">
                  <div>
                    <h5 className="font-bold text-xs text-botanical-950 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                      <Upload className="w-4 h-4 text-cyan-600" />
                      Importar Copia
                    </h5>
                    <p className="text-[11px] text-botanical-600">
                      Restaura un archivo de respaldo previo de una quincena anterior.
                    </p>
                  </div>
                  <label className="w-full bg-white hover:bg-botanical-100 text-botanical-900 border border-botanical-300 text-xs font-semibold py-2.5 rounded-xl transition-colors text-center cursor-pointer block">
                    <span>Seleccionar Archivo</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJsonFile}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex flex-col justify-between space-y-3">
                  <div>
                    <h5 className="font-bold text-xs text-rose-950 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                      <RotateCcw className="w-4 h-4 text-rose-600" />
                      Restablecer Todo
                    </h5>
                    <p className="text-[11px] text-rose-700">
                      Restaura la web a su configuración original de El Jardín Secreto.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('¿Restablecer todo el contenido a los valores iniciales de fábrica?')) {
                        resetToDefaults();
                        showToast('Contenido restablecido.');
                      }
                    }}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    Restablecer de Fábrica
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
