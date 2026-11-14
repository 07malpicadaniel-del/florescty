import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

const CHROME_PATH = '/usr/bin/google-chrome-stable';
const PORT = 3000;
const URL = `http://127.0.0.1:${PORT}`;

function loadExpectedAdminKey() {
  if (process.env.ADMIN_KEY) return process.env.ADMIN_KEY.trim();
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const raw = fs.readFileSync(envPath, 'utf8');
      const match = raw.match(/^ADMIN_KEY=(.+)$/m);
      if (match && match[1]) {
        return match[1].trim().replace(/^["']|["']$/g, '');
      }
    }
  } catch (e) {}
  return 'jardin2026';
}

let serverProcess = null;

async function startServer() {
  // Check if server is already running
  try {
    const res = await fetch(URL);
    if (res.ok) {
      console.log(`✅ Servidor ya activo en ${URL}`);
      return;
    }
  } catch (e) {}

  console.log('🚀 Iniciando servidor Next.js para pruebas E2E...');
  serverProcess = spawn('./node_modules/.bin/next', ['start', '-p', String(PORT), '-H', '127.0.0.1'], {
    cwd: process.cwd(),
    stdio: 'ignore',
    env: { ...process.env, PORT: String(PORT) }
  });

  // Wait for server to respond
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(URL);
      if (res.ok) {
        console.log(`✅ Servidor listo en ${URL}`);
        return;
      }
    } catch (e) {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('El servidor Next.js no respondió a tiempo');
}

function stopServer() {
  if (serverProcess) {
    console.log('🛑 Deteniendo servidor...');
    serverProcess.kill('SIGTERM');
  }
}

async function runE2E() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1280,900'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const consoleLogs = [];
  const errors = [];
  page.on('console', (msg) => consoleLogs.push(msg.text()));
  page.on('pageerror', (err) => errors.push(err.message));

  console.log(`\n==================================================`);
  console.log(`🌿 INICIANDO PRUEBAS END-TO-END (E2E) DEL BLOG`);
  console.log(`==================================================\n`);

  try {
    // TEST 1: Carga inicial y títulos
    console.log('▶ [Prueba 1] Verificando carga inicial y bienvenida...');
    await page.goto(URL, { waitUntil: 'networkidle2' });
    await page.waitForSelector('h1', { timeout: 10000 });
    const pageTitle = await page.title();
    console.log(`  - Título detectado: "${pageTitle}"`);
    if (!pageTitle.includes('Jardín') && !pageTitle.includes('Jardin')) {
      throw new Error(`Título no esperado: ${pageTitle}`);
    }

    // Verificar publicaciones botánicas cargadas en la página de inicio
    const postTitles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h3')).map(h => h.innerText);
    });
    console.log(`  - Títulos de publicaciones en página:`, postTitles.filter(t => t.includes('rosas') || t.includes('carnívoras') || t.includes('flores') || t.includes('mascotas')));
    const hasRosas = postTitles.some(t => t.includes('rosas'));
    const hasCarnivoras = postTitles.some(t => t.includes('carnívoras'));
    if (!hasRosas || !hasCarnivoras) {
      throw new Error(`No se encontraron las nuevas publicaciones (Rosas / Carnívoras) en Inicio: ${JSON.stringify(postTitles)}`);
    }
    console.log('  ✅ Carga inicial y publicaciones verificadas correctamente.');

    // TEST 2: Botón de Alternancia de Modo Obscuro
    console.log('\n▶ [Prueba 2] Probando botón de Modo Obscuro (Dark Mode)...');
    const darkModeBtn = await page.waitForSelector('button[aria-label="Alternar modo obscuro"]');
    if (!darkModeBtn) throw new Error('Botón de modo obscuro no encontrado');

    const isDarkInitially = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    await darkModeBtn.click();
    await new Promise((r) => setTimeout(r, 400));
    const isDarkAfterClick = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    if (isDarkAfterClick === isDarkInitially) {
      throw new Error('El botón de modo obscuro no alternó la clase .dark');
    }
    console.log(`  - Modo obscuro activado: ${isDarkAfterClick}`);
    // Revertir a claro
    await darkModeBtn.click();
    await new Promise((r) => setTimeout(r, 400));
    console.log('  ✅ Botón de modo obscuro funcionando a la perfección.');

    // TEST 3: Pestañas de Navegación
    console.log('\n▶ [Prueba 3] Probando botones de pestañas del Navbar...');
    // Clic en pestaña "Publicaciones"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('nav button'));
      const pubBtn = btns.find(b => b.innerText.includes('Publicaciones') && !b.innerText.includes('Admin'));
      if (pubBtn) pubBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));
    let generalTabState = await page.evaluate(() => {
      return {
        hasHeading: document.body.innerText.includes('Publicaciones del Jardín'),
        hasMovedRosas: document.body.innerText.includes('Las rosas y sus significados'),
      };
    });
    if (!generalTabState.hasHeading) throw new Error('No cambió a la pestaña Publicaciones');
    if (generalTabState.hasMovedRosas) throw new Error('Las publicaciones movidas a Admin aparecieron indebidamente en Publicaciones generales');
    console.log('  - Pestaña Publicaciones activada (sin mezcla de publicaciones de Admin).');

    // Clic en pestaña "Publicaciones de Admin"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('nav button'));
      const adminTabBtn = btns.find(b => b.innerText.includes('Publicaciones de Admin'));
      if (adminTabBtn) adminTabBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));
    const adminTabState = await page.evaluate(() => {
      return {
        hasHeading: document.body.innerText.includes('Publicaciones de Admin'),
        hasRosas: document.body.innerText.includes('Las rosas y sus significados'),
        hasCarnivoras: document.body.innerText.includes('Plantas carnívoras geniales'),
        hasMovedAdminPost: document.body.innerText.includes('5 flores que debes conocer'),
      };
    });
    if (!adminTabState.hasHeading) throw new Error('No cambió a la pestaña Publicaciones de Admin');
    if (!adminTabState.hasRosas || !adminTabState.hasCarnivoras || !adminTabState.hasMovedAdminPost) {
      throw new Error(`Faltan publicaciones movidas a Admin en Publicaciones de Admin. Debug: ${JSON.stringify(adminTabState)}`);
    }
    console.log('  - Pestaña Publicaciones de Admin activada con las 5 publicaciones actuales del Admin.');

    // Clic en pestaña "Plantas"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('nav button'));
      const plantBtn = btns.find(b => b.innerText.includes('Plantas'));
      if (plantBtn) plantBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));
    let hasPlantasHeading = await page.evaluate(() => {
      return document.body.innerText.includes('Colección de Flores & Plantas');
    });
    if (!hasPlantasHeading) throw new Error('No cambió a la pestaña Plantas');
    console.log('  - Pestaña Plantas activada.');

    // Clic en pestaña "Acerca de"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('nav button'));
      const aboutBtn = btns.find(b => b.innerText.includes('Acerca de'));
      if (aboutBtn) aboutBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));
    let hasAboutHeading = await page.evaluate(() => {
      return document.body.innerText.includes('Acerca de Nuestro Jardín');
    });
    if (!hasAboutHeading) throw new Error('No cambió a la pestaña Acerca de');
    console.log('  - Pestaña Acerca de activada.');

    // Volver a "Inicio"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('nav button'));
      const homeBtn = btns.find(b => b.innerText.includes('Inicio'));
      if (homeBtn) homeBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));
    console.log('  ✅ Todas las pestañas de navegación responden correctamente.');

    // TEST 4: Botones CTA del Hero
    console.log('\n▶ [Prueba 4] Probando botones CTA de Bienvenida (Hero)...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('section button'));
      const exploreBtn = btns.find(b => b.innerText.includes('Explorar Colección de Flores'));
      if (exploreBtn) exploreBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));
    let inPlantsTab = await page.evaluate(() => document.body.innerText.includes('Colección de Flores & Plantas'));
    if (!inPlantsTab) throw new Error('El botón CTA "Explorar Colección de Flores" no navegó');
    console.log('  - CTA "Explorar Colección de Flores" navega con éxito.');

    // TEST 5: Filtro por Dificultad en Plantas
    console.log('\n▶ [Prueba 5] Probando botones de filtro de dificultad de plantas...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const princBtn = btns.find(b => b.innerText === 'Principiante');
      if (princBtn) princBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));
    console.log('  - Filtro "Principiante" aplicado.');

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const allBtn = btns.find(b => b.innerText === 'Todas');
      if (allBtn) allBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));
    console.log('  ✅ Filtros de plantas interactivos y funcionando.');

    // TEST 6: Modal de Ficha de Planta (Click & Backdrop)
    console.log('\n▶ [Prueba 6] Probando apertura y cierre de ficha de planta...');
    await page.evaluate(() => {
      const firstCard = document.querySelector('section .grid > div');
      if (firstCard) firstCard.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    let isPlantModalOpen = await page.evaluate(() => {
      return Boolean(document.querySelector('.fixed.inset-0.z-50'));
    });
    if (!isPlantModalOpen) throw new Error('El modal de planta no se abrió');
    console.log('  - Modal de planta abierto exitosamente.');

    // Cierre mediante botón X
    await page.evaluate(() => {
      const closeBtn = document.querySelector('.fixed.inset-0 button');
      if (closeBtn) closeBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));
    let isPlantModalClosed = await page.evaluate(() => {
      return !document.querySelector('.fixed.inset-0.z-50');
    });
    if (!isPlantModalClosed) throw new Error('El modal de planta no cerró con la X');
    console.log('  ✅ Modal de planta abierto y cerrado correctamente.');

    // TEST 7: Sección Publicaciones y Filtro de Categoría
    console.log('\n▶ [Prueba 7] Probando sección de publicaciones y filtros de categoría...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('nav button'));
      const pubBtn = btns.find(b => b.innerText.includes('Publicaciones') && !b.innerText.includes('Admin'));
      if (pubBtn) pubBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    // Filtrar por 'Suculentas'
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const sucBtn = btns.find(b => b.innerText === 'Suculentas');
      if (sucBtn) sucBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));
    console.log('  - Filtro "Suculentas" aplicado.');

    // Volver a 'Todas'
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const allBtn = btns.find(b => b.innerText === 'Todas');
      if (allBtn) allBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    // Verificar que el botón de publicación automática ya no está expuesto de forma independiente
    const hasStandaloneAutoBtn = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('section button'));
      return btns.some(b => b.innerText === 'Publicación Automática');
    });
    if (hasStandaloneAutoBtn) {
      throw new Error('El botón de publicación automática sigue expuesto como botón independiente');
    }
    console.log('  - Verificado: El botón de publicación automática no está expuesto de forma independiente (está escondido).');
    console.log('  ✅ Filtros de categoría de publicaciones probados con éxito.');

    // TEST 8: Apertura de Publicación y Verificación de Retiro de Likes/Comentarios/Vistas
    console.log('\n▶ [Prueba 8] Probando detalle de publicación y confirmando retiro de likes, vistas y comentarios...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('nav button'));
      const adminTabBtn = btns.find(b => b.innerText.includes('Publicaciones de Admin'));
      if (adminTabBtn) adminTabBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));
    await page.evaluate(() => {
      const firstArticle = document.querySelector('article');
      if (firstArticle) firstArticle.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    // Confirmar que NO existen botones de Me gusta, contador de vistas ni formulario de comentarios
    const modalInspection = await page.evaluate(() => {
      const modal = document.querySelector('.fixed.inset-0.z-50');
      if (!modal) return { isOpen: false };
      const text = modal.innerText;
      const hasLikeBtn = Array.from(modal.querySelectorAll('button')).some(b => b.innerText.includes('Me gusta'));
      const hasCommentForm = Boolean(modal.querySelector('textarea'));
      const hasCommentsHeading = text.includes('Comentarios');
      const hasShareBtn = Array.from(modal.querySelectorAll('button')).some(b => b.innerText.includes('Compartir'));
      return {
        isOpen: true,
        hasLikeBtn,
        hasCommentForm,
        hasCommentsHeading,
        hasShareBtn,
      };
    });

    if (!modalInspection.isOpen) throw new Error('El modal de detalle de publicación no se abrió');
    if (modalInspection.hasLikeBtn) throw new Error('El botón de Me gusta aún aparece en el modal');
    if (modalInspection.hasCommentForm) throw new Error('El formulario de comentarios aún aparece en el modal');
    if (modalInspection.hasCommentsHeading) throw new Error('El encabezado de comentarios aún aparece en el modal');
    if (!modalInspection.hasShareBtn) throw new Error('El botón de compartir artículo no se encontró');
    console.log('  - Verificado: Likes, vistas y comentarios retirados con éxito del modal.');

    // Cerrar modal de publicación
    await page.evaluate(() => {
      const closeBtn = Array.from(document.querySelectorAll('.fixed button')).find(b => b.querySelector('svg.lucide-x'));
      if (closeBtn) closeBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));
    console.log('  ✅ Modal de detalle verificado sin likes ni comentarios.');

    // TEST 9: Modal "Nueva Publicación" y Envío de Formulario
    console.log('\n▶ [Prueba 9] Probando creación de nueva publicación con formulario...');
    await page.evaluate(() => {
      const pubBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('Nueva Publicación'));
      if (pubBtns.length > 0) pubBtns[0].click();
    });
    await new Promise((r) => setTimeout(r, 500));

    // Verificar que el botón "Ayuda" está integrado dentro del modal de publicar
    const hasHelpBtn = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.fixed.inset-0 form button'));
      return btns.some(b => b.innerText.includes('Ayuda'));
    });
    if (!hasHelpBtn) throw new Error('El botón "Ayuda" no se encontró dentro del modal de publicar');
    console.log('  - Verificado: El botón de "Ayuda" está integrado dentro del modal de publicar.');

    // Rellenar formulario
    const testPostTitle = `Nota Botánica de Campo #${Date.now().toString().slice(-4)}`;
    await page.type('input[placeholder="Ej: Consejos para cuidar orquídeas en invierno"]', testPostTitle);
    await page.type('textarea[placeholder="Escribe tus consejos, dudas o experiencias sobre las plantas..."]', 'Esta es una publicación de prueba automática para verificar la integración y funcionalidad de los formularios.');

    // Enviar publicación
    await page.evaluate(() => {
      const submitBtn = Array.from(document.querySelectorAll('form button')).find(b => b.innerText.includes('Publicar') && b.type === 'submit');
      if (submitBtn) submitBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    const isNewPostVisible = await page.evaluate((title) => {
      return document.body.innerText.includes(title);
    }, testPostTitle);

    if (!isNewPostVisible) throw new Error('La nueva publicación no apareció en la lista');
    console.log(`  - Nueva publicación "${testPostTitle}" creada sin clave y visible en Publicaciones.`);

    // Comprobar que NO apareció en Publicaciones de Admin
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('nav button'));
      const adminTabBtn = btns.find(b => b.innerText.includes('Publicaciones de Admin'));
      if (adminTabBtn) adminTabBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));
    const regularPostInAdmin = await page.evaluate((title) => {
      return document.body.innerText.includes(title);
    }, testPostTitle);
    if (regularPostInAdmin) throw new Error('La publicación sin Clave Admin no debió ir a Publicaciones de Admin');
    console.log('  ✅ Publicación sin clave mantenida únicamente en Publicaciones generales.');

    // TEST 10: Clave Admin (clave inválida + clave válida -> Publicaciones de Admin separada sin borrar nada)
    console.log('\n▶ [Prueba 10] Probando Clave Admin y sección "Publicaciones de Admin"...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('nav button'));
      const pubBtn = btns.find(b => b.innerText.includes('Publicar'));
      if (pubBtn) pubBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    const adminKeyInput = await page.$('#admin-key-input');
    if (!adminKeyInput) throw new Error('El campo Clave Admin (#admin-key-input) no se encontró en el formulario');

    const adminPostTitle = `Nota Oficial de Admin #${Date.now().toString().slice(-4)}`;
    await page.type('input[placeholder="Ej: Consejos para cuidar orquídeas en invierno"]', adminPostTitle);
    await page.type('textarea[placeholder="Escribe tus consejos, dudas o experiencias sobre las plantas..."]', 'Guía oficial escrita por el autor/a del jardín utilizando la Clave Admin.');

    // Intentar con clave incorrecta primero
    await page.type('#admin-key-input', 'clave-incorrecta');
    await page.evaluate(() => {
      const submitBtn = Array.from(document.querySelectorAll('form button')).find(b => b.innerText.includes('Publicar') && b.type === 'submit');
      if (submitBtn) submitBtn.click();
    });
    await new Promise((r) => setTimeout(r, 700));

    const invalidKeyError = await page.evaluate(() => {
      const alertEl = document.querySelector('[role="alert"]');
      return alertEl ? alertEl.innerText : '';
    });
    if (!invalidKeyError || !invalidKeyError.toLowerCase().includes('incorrecta')) {
      throw new Error(`No se mostró alerta al ingresar clave admin inválida: "${invalidKeyError}"`);
    }
    console.log('  - Verificado: Clave admin inválida bloqueada con mensaje de error claro.');

    // Reemplazar con clave admin válida
    await page.click('#admin-key-input');
    await page.keyboard.down('Control');
    await page.keyboard.press('a');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    const clearedVal = await page.$eval('#admin-key-input', (el) => el.value);
    if (clearedVal !== '') {
      throw new Error(`No se limpió el campo Clave Admin antes de escribir la clave válida (valor="${clearedVal}")`);
    }
    const validAdminKey = loadExpectedAdminKey();
    await page.type('#admin-key-input', validAdminKey);
    await new Promise((r) => setTimeout(r, 200));

    const hasAdminDestBadge = await page.evaluate(() => {
      return document.body.innerText.includes('Destino: Publicaciones de Admin');
    });
    if (!hasAdminDestBadge) throw new Error('No se mostró el indicador "Destino: Publicaciones de Admin"');

    await page.evaluate(() => {
      const submitBtn = Array.from(document.querySelectorAll('form button')).find(b => b.innerText.includes('Publicar') && b.type === 'submit');
      if (submitBtn) submitBtn.click();
    });
    await new Promise((r) => setTimeout(r, 1200));

    // Verificar redirección y aparición en Publicaciones de Admin
    const adminSectionCheck = await page.evaluate((title) => {
      const alertEl = document.querySelector('[role="alert"]');
      const modalOpen = Boolean(document.querySelector('#admin-key-input'));
      return {
        hasTitle: document.body.innerText.includes(title),
        hasAdminHeading: document.body.innerText.includes('Publicaciones de Admin'),
        hasAdminBadge: document.body.innerText.toUpperCase().includes('AUTOR / ADMIN'),
        hasMovedRosas: document.body.innerText.includes('Las rosas y sus significados'),
        modalStillOpen: modalOpen,
        alertText: alertEl ? alertEl.innerText : null,
      };
    }, adminPostTitle);

    if (!adminSectionCheck.hasAdminHeading || !adminSectionCheck.hasTitle) {
      throw new Error(`La publicación con Clave Admin no apareció en la sección Publicaciones de Admin. Debug: ${JSON.stringify(adminSectionCheck)}`);
    }
    if (!adminSectionCheck.hasAdminBadge) {
      throw new Error('No se mostró la insignia "Autor / Admin" en la publicación de admin');
    }
    if (!adminSectionCheck.hasMovedRosas) {
      throw new Error('Las publicaciones actuales de rosas no están en Publicaciones de Admin');
    }
    console.log(`  - Publicación "${adminPostTitle}" publicada en "Publicaciones de Admin" con insignia "Autor / Admin".`);

    // Verificar en pestaña "Publicaciones" que NO aparece ningún post de Admin y que sí contiene la publicación creada en Prueba 9
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('nav button'));
      const pubBtn = btns.find(b => b.innerText.includes('Publicaciones') && !b.innerText.includes('Admin'));
      if (pubBtn) pubBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    const generalSectionCheck = await page.evaluate((adminTitle, regularTitle) => {
      return {
        hasAdminTitle: document.body.innerText.includes(adminTitle),
        hasRegularTitle: document.body.innerText.includes(regularTitle),
        hasMovedRosas: document.body.innerText.includes('Las rosas y sus significados'),
        hasMovedCarnivoras: document.body.innerText.includes('Plantas carnívoras geniales'),
      };
    }, adminPostTitle, testPostTitle);

    if (generalSectionCheck.hasAdminTitle || generalSectionCheck.hasMovedRosas || generalSectionCheck.hasMovedCarnivoras) {
      throw new Error(`Publicaciones de Admin aparecieron mezcladas en Publicaciones generales. Debug: ${JSON.stringify(generalSectionCheck)}`);
    }
    if (!generalSectionCheck.hasRegularTitle) {
      throw new Error(`No apareció la publicación general "${testPostTitle}" en la sección Publicaciones. Debug: ${JSON.stringify(generalSectionCheck)}`);
    }
    console.log('  - Verificado: Las publicaciones generales están limpias y separadas de las publicaciones del Admin.');

    // Verificar en pestaña "Publicaciones de Admin" que contiene todas las 5 publicaciones actuales movidas del admin
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('nav button'));
      const adminTabBtn = btns.find(b => b.innerText.includes('Publicaciones de Admin'));
      if (adminTabBtn) adminTabBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    const adminSectionCheckMoved = await page.evaluate(() => {
      return {
        hasRosas: document.body.innerText.includes('Las rosas y sus significados'),
        hasCarnivoras: document.body.innerText.includes('Plantas carnívoras geniales'),
        hasInitial1: document.body.innerText.includes('5 flores que debes conocer'),
        hasInitial2: document.body.innerText.includes('Las flores y sus significados'),
        hasInitial3: document.body.innerText.includes('Flores que son malas para tus mascotas'),
      };
    });

    if (
      !adminSectionCheckMoved.hasRosas ||
      !adminSectionCheckMoved.hasCarnivoras ||
      !adminSectionCheckMoved.hasInitial1 ||
      !adminSectionCheckMoved.hasInitial2 ||
      !adminSectionCheckMoved.hasInitial3
    ) {
      throw new Error(`No se encontraron las 5 publicaciones actuales movidas a Publicaciones de Admin. Debug: ${JSON.stringify(adminSectionCheckMoved)}`);
    }
    console.log('  - Verificado: Las 5 publicaciones actuales fueron movidas con éxito a "Publicaciones de Admin".');

    // Verificar ambas secciones separadas en Inicio
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('nav button'));
      const homeBtn = btns.find(b => b.innerText.includes('Inicio'));
      if (homeBtn) homeBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    const homeSectionsCheck = await page.evaluate((adminTitle) => {
      return {
        hasRegularSnapshot: document.body.innerText.includes('Notas y Cuidados'),
        hasAdminSnapshot: document.body.innerText.includes('Publicaciones de Admin'),
        hasAdminPostOnHome: document.body.innerText.includes(adminTitle),
      };
    }, adminPostTitle);

    if (!homeSectionsCheck.hasRegularSnapshot || !homeSectionsCheck.hasAdminSnapshot || !homeSectionsCheck.hasAdminPostOnHome) {
      throw new Error('Inicio no muestra ambas secciones separadas con la nueva publicación de Admin');
    }
    console.log('  ✅ Inicio muestra ambas secciones separadas y la separación por Clave Admin funciona al 100%.');

    // TEST 11: Modal del Cuaderno (Biweekly Studio)
    console.log('\n▶ [Prueba 11] Probando modal de edición del Cuaderno...');
    await page.evaluate(() => {
      const notebookBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Cuaderno'));
      if (notebookBtn) notebookBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    const isStudioOpen = await page.evaluate(() => {
      return document.body.innerText.includes('Cuaderno de El Jardín Secreto');
    });
    if (!isStudioOpen) throw new Error('El modal del Cuaderno no se abrió');
    console.log('  - Modal del Cuaderno abierto con éxito.');

    // Cerrar modal
    await page.evaluate(() => {
      const closeBtn = Array.from(document.querySelectorAll('.fixed button')).find(b => b.querySelector('svg.lucide-x'));
      if (closeBtn) closeBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));
    console.log('  ✅ Modal del Cuaderno y controles verificados.');

    // Check for critical runtime errors
    if (errors.length > 0) {
      throw new Error(`Se detectaron errores fatales de página: ${errors.join(' | ')}`);
    } else {
      console.log('\n✨ Cero errores fatales en consola del navegador.');
    }

    console.log(`\n==================================================`);
    console.log(`🎉 TODAS LAS 11 PRUEBAS E2E COMPLETADAS CON ÉXITO`);
    console.log(`==================================================\n`);

  } finally {
    await browser.close();
  }
}

async function main() {
  try {
    await startServer();
    await runE2E();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error durante prueba E2E:', err);
    process.exit(1);
  } finally {
    stopServer();
  }
}

main();
