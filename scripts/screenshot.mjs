// Utilidad: genera capturas de pantalla de la web para revisión visual.
// Uso: node scripts/screenshot.mjs <outDir> (requiere `next start` en 127.0.0.1:3000)
import puppeteer from 'puppeteer-core';

const OUT = process.argv[2] || '/tmp';
const URL = 'http://127.0.0.1:3000';

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--enable-unsafe-swiftshader', '--use-angle=swiftshader']
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
page.on('pageerror', (e) => console.error('PAGE ERROR:', e.message));
await page.goto(URL, { waitUntil: 'networkidle2' });
await new Promise((r) => setTimeout(r, 2500));
await page.screenshot({ path: `${OUT}/home-top.png` });
await page.screenshot({ path: `${OUT}/home-full.png`, fullPage: true });

const clickTab = async (label) => {
  await page.evaluate((l) => {
    const b = Array.from(document.querySelectorAll('nav button')).find((x) => x.innerText.includes(l));
    b && b.click();
  }, label);
  await new Promise((r) => setTimeout(r, 800));
};

await clickTab('Publicaciones');
await page.screenshot({ path: `${OUT}/publicaciones.png`, fullPage: true });

await page.evaluate(() => document.querySelector('article')?.click());
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: `${OUT}/post-modal.png` });
await page.keyboard.press('Escape');
await page.evaluate(() => {
  const c = Array.from(document.querySelectorAll('.fixed button')).find((b) => b.querySelector('svg.lucide-x'));
  c && c.click();
});

// Dark mode
await clickTab('Inicio');
await page.evaluate(() => document.querySelector('button[aria-label="Alternar modo obscuro"]')?.click());
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: `${OUT}/home-dark.png` });
await page.evaluate(() => document.querySelector('button[aria-label="Alternar modo obscuro"]')?.click());

await browser.close();
console.log('Capturas guardadas en', OUT);
