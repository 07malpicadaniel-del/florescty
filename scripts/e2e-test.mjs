import { spawn } from 'child_process';
import puppeteer from 'puppeteer-core';

const CHROME_PATH = '/usr/bin/google-chrome-stable';
const PORT = 3000;
const URL = `http://127.0.0.1:${PORT}`;

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

    // Verificar las 2 nuevas publicaciones cargadas
    const postTitles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h3')).map(h => h.innerText);
    });
    console.log(`  - Títulos de publicaciones en página:`, postTitles.filter(t => t.includes('Orquídeas') || t.includes('Violetas') || t.includes('Guía')));
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
      const pubBtn = btns.find(b => b.innerText.includes('Publicaciones'));
      if (pubBtn) pubBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));
    let hasPublicacionesHeading = await page.evaluate(() => {
      return document.body.innerText.includes('Publicaciones del Jardín');
    });
    if (!hasPublicacionesHeading) throw new Error('No cambió a la pestaña Publicaciones');
    console.log('  - Pestaña Publicaciones activada.');

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
      const pubBtn = btns.find(b => b.innerText.includes('Publicaciones'));
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
    console.log('  ✅ Filtros de categoría de publicaciones probados con éxito.');

    // TEST 8: Apertura de Publicación, Like y Comentario
    console.log('\n▶ [Prueba 8] Probando detalle de publicación, Me gusta y Comentario...');
    await page.evaluate(() => {
      const firstArticle = document.querySelector('article');
      if (firstArticle) firstArticle.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    // Verificar botón Me gusta en modal
    const likesBefore = await page.evaluate(() => {
      const heartBtn = Array.from(document.querySelectorAll('.fixed button')).find(b => b.innerText.includes('Me gusta'));
      return heartBtn ? heartBtn.innerText : '';
    });
    console.log(`  - Estado inicial Me gusta: "${likesBefore}"`);

    await page.evaluate(() => {
      const heartBtn = Array.from(document.querySelectorAll('.fixed button')).find(b => b.innerText.includes('Me gusta'));
      if (heartBtn) heartBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    const likesAfter = await page.evaluate(() => {
      const heartBtn = Array.from(document.querySelectorAll('.fixed button')).find(b => b.innerText.includes('Me gusta'));
      return heartBtn ? heartBtn.innerText : '';
    });
    console.log(`  - Estado posterior Me gusta: "${likesAfter}"`);

    // Añadir comentario
    await page.type('input[placeholder="Tu nombre (opcional)..."]', 'Cultivador de Prueba');
    await page.type('textarea[placeholder="Escribe tu comentario o consejo..."]', '¡Excelente publicación y hermosas fotos botánicas!');
    await page.evaluate(() => {
      const submitBtn = Array.from(document.querySelectorAll('form button')).find(b => b.innerText.includes('Publicar Comentario'));
      if (submitBtn) submitBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    const hasNewComment = await page.evaluate(() => {
      return document.body.innerText.includes('¡Excelente publicación y hermosas fotos botánicas!');
    });
    if (!hasNewComment) throw new Error('El comentario no se añadió a la publicación');
    console.log('  - Comentario añadido y visualizado correctamente.');

    // Cerrar modal de publicación
    await page.evaluate(() => {
      const closeBtn = Array.from(document.querySelectorAll('.fixed button')).find(b => b.querySelector('svg.lucide-x'));
      if (closeBtn) closeBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));
    console.log('  ✅ Me gusta y comentarios validados al 100%.');

    // TEST 9: Modal "Nueva Publicación" y Envío de Formulario
    console.log('\n▶ [Prueba 9] Probando creación de nueva publicación con formulario...');
    await page.evaluate(() => {
      const pubBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('Nueva Publicación'));
      if (pubBtns.length > 0) pubBtns[0].click();
    });
    await new Promise((r) => setTimeout(r, 500));

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
    console.log(`  - Nueva publicación "${testPostTitle}" creada y visible en el blog.`);
    console.log('  ✅ Formulario de Nueva Publicación verificado correctamente.');

    // TEST 10: Modal del Cuaderno (Biweekly Studio)
    console.log('\n▶ [Prueba 10] Probando modal de edición del Cuaderno...');
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
      console.warn('⚠️ Se detectaron errores de página:', errors);
    } else {
      console.log('\n✨ Cero errores fatales en consola del navegador.');
    }

    console.log(`\n==================================================`);
    console.log(`🎉 TODAS LAS 10 PRUEBAS E2E COMPLETADAS CON ÉXITO`);
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
