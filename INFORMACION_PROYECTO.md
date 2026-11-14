# Documentación Actual del Proyecto — El Jardín Secreto (`florescty`)

Este documento resume el estado, la arquitectura, las funcionalidades, el contenido actual y los flujos de desarrollo y pruebas de **El Jardín Secreto** (`florescty`).

---

## 1. Descripción General

**El Jardín Secreto** es una plataforma web botánica en español construida con Next.js (App Router) y React. Combina artículos sobre flores y cuidados del hogar, una enciclopedia interactiva de 20 especies botánicas, un visor 3D interactivo de orquídeas desarrollado con Three.js, separación entre publicaciones generales y **Publicaciones de Admin** protegidas por clave, un cuaderno de edición visual integrado y generación asistida de artículos con IA.

- **Nombre del paquete**: `florescty` (`v1.0.0`)
- **Título de la aplicación**: `El Jardín Secreto | Plantas, Flores y Cuidados`
- **Autoría en el blog**: Anónima (`Autor del Jardín` en publicaciones de Admin y `Cultivador Anónimo` en notas generales o generadas con ayuda del modelo).

---

## 2. Stack Tecnológico

- **Framework**: Next.js `^14.2.35` (App Router)
- **UI**: React `^18.3.1`, TypeScript `5.9.3`
- **Estilos**: Tailwind CSS `^3.4.14` con `darkMode: 'class'`
  - **Paleta personalizada (`tailwind.config.js`)**:
    - `garden.darkPurple`: `#3A1C36`
    - `garden.amethyst`: `#9B71B2`
    - `garden.thistle`: `#E3D0EA`
    - `garden.olive`: `#6C6D11`
    - `garden.calPoly`: `#374126`
    - Derivados: `cream` (`#FAF6FB`), `tint` (`#F4ECF6`), `darkBg` (`#1E0E1B`), `darkCard` (`#2B1428`), `darkBorder` (`#4E2648`), además de escalas `botanical` y `flora`.
  - **Tipografías (`src/app/layout.tsx`)**: `Cormorant Garamond` (`font-serif`) y `Great Vibes` (`font-script`).
- **3D e Iconografía**: `three` (`^0.187.0`), `lucide-react` (`^1.16.0`), `canvas-confetti` (`^1.9.4`)
- **Pruebas E2E**: `puppeteer-core` (`^25.16.0`)

---

## 3. Estructura del Proyecto

```text
florescty/
├── .env.example
├── package.json
├── tailwind.config.js
├── README.md                          # Notas iniciales del proyecto
├── INFORMACION_PROYECTO.md            # Documentación actualizada del sistema
├── public/
│   └── logo.png                       # Logotipo del jardín
├── scripts/
│   └── e2e-test.mjs                   # Suite automatizada de 11 pruebas E2E
└── src/
    ├── app/
    │   ├── api/
    │   │   ├── groq-post/route.ts     # Endpoint IA para generar artículos botánicos
    │   │   └── verify-admin/route.ts  # Verificación segura de Clave Admin
    │   ├── globals.css
    │   ├── layout.tsx                 # Metadatos, fuentes y <ContentProvider>
    │   └── page.tsx                   # Página principal y enrutamiento por pestañas
    ├── components/
    │   ├── AboutSection.tsx           # Sección "Acerca de" y manifiesto
    │   ├── BiweeklyStudioModal.tsx    # Modal "Cuaderno del Blog" (CMS visual)
    │   ├── BotanicalRoots.tsx         # Detalles decorativos botánicos
    │   ├── Footer.tsx
    │   ├── ForumPostCard.tsx          # Tarjeta de artículo (sin likes, vistas ni comentarios)
    │   ├── ForumSection.tsx           # Listado/filtros para Publicaciones y Admin
    │   ├── HeroQuincena.tsx           # Bienvenida y visor 3D principal
    │   ├── Navbar.tsx                 # Navegación superior, buscador y cambio de tema
    │   ├── NewPostModal.tsx           # Formulario de publicación con campo opcional Clave Admin
    │   ├── Orchid3DViewer.tsx         # Visor interactivo 3D en Three.js
    │   ├── PlantGuidesSection.tsx     # Catálogo y filtros de las 20 especies botánicas
    │   ├── PlantaQuincenalModal.tsx   # Ficha detallada de cada planta
    │   ├── PostDetailModal.tsx        # Lectura completa y botón Compartir
    │   └── QuickEditFloatingButton.tsx# Acceso rápido al Cuaderno del Blog
    ├── context/
    │   └── ContentContext.tsx         # Estado global, tema y persistencia en localStorage
    ├── data/
    │   └── initialContent.ts          # Publicaciones iniciales y 20 perfiles de plantas
    └── types/
        └── index.ts                   # Tipos TypeScript (ForumPost, PlantProfile, etc.)
```

---

## 4. Funcionalidades Principales

### 4.1 Visor 3D Interactivo de Orquídeas (`Orchid3DViewer.tsx`)
- Renderizado en tiempo real con **Three.js** en el Hero principal.
- Incluye 4 paletas cromáticas seleccionables:
  1. `Amatista Real`
  2. `Blanca Luna (Phalaenopsis amabilis)`
  3. `Fucsia Imperial`
  4. `Rosa Crepúsculo`

### 4.2 Secciones Separadas de Publicaciones y Clave Admin
- La navegación distingue dos áreas independientes:
  - **Publicaciones** (`mode="community"`): artículos generales (`!post.isAdmin`), que inicia limpia hasta que se creen publicaciones sin Clave Admin o mediante el menú de ayuda IA.
  - **Publicaciones de Admin** (`mode="admin"`): artículos del autor (`isAdmin: true`) marcados con la insignia `Autor / Admin` y etiqueta `Publicación de Admin`.
- Al abrir **Nueva Publicación** (`NewPostModal.tsx`):
  - Si el campo **Clave Admin** queda vacío, el artículo se publica en **Publicaciones**.
  - Si se ingresa una **Clave Admin**, el cliente consulta `POST /api/verify-admin`, donde se valida en tiempo constante (`crypto.timingSafeEqual`) frente a `process.env.ADMIN_KEY` (con respaldo `'jardin2026'` según `.env.example`). Si es válida, se guarda y redirige a **Publicaciones de Admin**.
- Se retiraron por completo los **likes**, **contadores de vistas** y **comentarios** tanto de las tarjetas (`ForumPostCard.tsx`) como del lector modal (`PostDetailModal.tsx`), conservando el contenido completo del artículo y el botón **Compartir**.

### 4.3 Publicación Asistida con IA (`POST /api/groq-post`)
- La acción de publicación automática no aparece como botón aislado; se integra de forma discreta dentro del menú **Ayuda** unido al botón de publicar en **Publicaciones**.
- Conecta con la API de Groq usando el modelo `openai/gpt-oss-120b`.
- Incluye 10 temas rotativos (`PLANT_TOPICS`), 17 imágenes botánicas seleccionadas (`BOTANICAL_IMAGES`), verificación programada para miércoles y jueves (con opción `force` manual) y respuesta JSON estructurada bajo autoría anónima.

### 4.4 Enciclopedia Botánica (`20` Especies)
Definidas en `src/data/initialContent.ts` (`flor-1` a `flor-20`) con nivel de dificultad, luz, riego, humedad, toxicidad para mascotas/personas y notas de cultivo:

1. Orquídea Mariposa (*Phalaenopsis amabilis*)
2. Orquídea Cattleya Reina (*Cattleya labiata*)
3. Orquídea Vanda Azul (*Vanda coerulea*)
4. Lirio de la Paz (*Spathiphyllum wallisii*)
5. Anturio Rojo (Flor de Flamenco) (*Anthurium andraeanum*)
6. Violeta Africana (*Saintpaulia ionantha*)
7. Hortensia de Jardín (*Hydrangea macrophylla*)
8. Peonía Silvestre (*Paeonia lactiflora*)
9. Camelia Japonesa (*Camellia japonica*)
10. Gardenia (Jazmín del Cabo) (*Gardenia jasminoides*)
11. Ave del Paraíso (*Strelitzia reginae*)
12. Hibisco (Rosa de China) (*Hibiscus rosa-sinensis*)
13. Jazmín de Noche Real (*Jasminum officinale*)
14. Buganvilla Imperial (*Bougainvillea spectabilis*)
15. Magnolia Blanca Real (*Magnolia grandiflora*)
16. Flor de Loto Sagrado (*Nelumbo nucifera*)
17. Begonia de Flor (*Begonia elatior*)
18. Dalia Pompón de Verano (*Dahlia pinnata*)
19. Amarilis Real (*Hippeastrum vittatum*)
20. Lavanda Francesa (*Lavandula dentata*)

### 4.5 Persistencia y Tema
- **Estado del contenido (`ContentContext.tsx`)**: persistido en `localStorage` bajo `jardin_secreto_content_v8` (con migración automática desde claves anteriores `v7`, `v6`, `v5`, `v4` para conservar publicaciones personalizadas del usuario mientras se sincronizan las publicaciones iniciales).
- **Tema Claro / Obscuro**: persistido en `jardin_secreto_theme_v3`.
- **Cuaderno del Blog (`BiweeklyStudioModal.tsx`)**: editor visual accesible desde el Navbar o el botón flotante (`QuickEditFloatingButton.tsx`).

---

## 5. Publicaciones Actuales (Todas en Publicaciones de Admin)

Actualmente, las **5 publicaciones iniciales** definidas en `src/data/initialContent.ts` pertenecen a **Publicaciones de Admin** (`isAdmin: true`, autor `Autor del Jardín`):

| ID | Título | Categoría | Sección |
| :--- | :--- | :--- | :--- |
| `post-rosas-significados` | Las rosas y sus significados | Flores y Cuidados | Publicaciones de Admin |
| `post-plantas-carnivoras` | Plantas carnívoras geniales | Plantas de Casa | Publicaciones de Admin |
| `post-flores-conocer` | 5 flores que debes conocer | Flores y Cuidados | Publicaciones de Admin |
| `post-flores-significados` | Las flores y sus significados | Flores y Cuidados | Publicaciones de Admin |
| `post-flores-mascotas` | Flores que son malas para tus mascotas | Plantas de Casa | Publicaciones de Admin |

---

## 6. Variables de Entorno

Configurar un archivo `.env.local` tomando como base `.env.example` (no versionar claves reales):

- `GROQ_API_KEY`: clave de API para el endpoint `/api/groq-post`.
- `ADMIN_KEY`: clave secreta para publicar en **Publicaciones de Admin** desde `NewPostModal` y `/api/verify-admin` (si no se define en entorno, utiliza `'jardin2026'` como valor por defecto de desarrollo documentado en `.env.example`).

---

## 7. Comandos y Pruebas E2E

Scripts definidos en `package.json`:

- `pnpm run dev` — Inicia el servidor de desarrollo Next.js.
- `pnpm run build` — Compila la aplicación para producción.
- `pnpm run start` — Sirve la compilación de producción.
- `pnpm run lint` — Ejecuta el linter de Next.js.
- `pnpm run test:e2e` — Ejecuta `node scripts/e2e-test.mjs` con Puppeteer y Chrome estable contra un servidor Next.js local en el puerto `3000`.

### Cobertura de `scripts/e2e-test.mjs` (11 Pruebas)
1. **Prueba 1**: Carga inicial, título y visibilidad de las publicaciones en Inicio.
2. **Prueba 2**: Alternancia de modo obscuro / claro.
3. **Prueba 3**: Navegación por pestañas (`Publicaciones` general sin mezcla, `Publicaciones de Admin` con los artículos actuales, `Plantas` y retorno a `Inicio`).
4. **Prueba 4**: Interacción y cambio de color en el visor 3D (`Orchid3DViewer`).
5. **Prueba 5**: Buscador global en vivo desde el Navbar.
6. **Prueba 6**: Apertura y cierre del modal de ficha de planta (`PlantaQuincenalModal`).
7. **Prueba 7**: Filtros de categoría en `Publicaciones` y verificación de que el botón de publicación automática ya no aparece expuesto de forma aislada.
8. **Prueba 8**: Apertura de detalle de publicación (`PostDetailModal`) confirmando retiro de likes, vistas y comentarios, y presencia de `Compartir`.
9. **Prueba 9**: Creación de publicación general sin `Clave Admin` y confirmación de llegada a `Publicaciones`.
10. **Prueba 10**: Creación de publicación con `Clave Admin`, verificación de insignia `Autor / Admin` en `Publicaciones de Admin`, confirmación de separación estricta entre ambas secciones y presencia de las 5 publicaciones actuales en Admin e Inicio.
11. **Prueba 11**: Apertura y cierre del modal `Cuaderno de El Jardín Secreto`, más verificación de cero errores fatales de consola en el navegador.
