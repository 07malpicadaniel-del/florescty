# 🌿 El Jardín Secreto (Florescty)

> **Plataforma y Foro Botánico Quincenal con CMS Visual Integrado**  
> Proyecto migrado y rediseñado desde Wix Studio a una arquitectura moderna en **Next.js (App Router)**, **TypeScript**, y **Tailwind CSS**, optimizado para despliegue directo en **Vercel**.

---

## 📖 Sobre el Proyecto

Originalmente concebida como un sitio en Wix Studio por **Constanza Pimentel P.**, la web se ha transformado completamente en una aplicación web interactiva, moderna y viva que celebra la diversidad vegetal.

### 🌟 Nuevas Características y Mejoras de Arquitectura

1. **Foro Comunitario Botánico ("El Jardín Botánico Colectivo")**:
   - Categorías especializadas: *Cuidado y Riego*, *Orquídeas y Flores*, *Suculentas y Cactus*, *Identificación de Especies*, *Plagas y Soluciones Orgánicas*, *Propagación y Esquejes*.
   - Sistema interactivo de hilos de discusión con recuento de votos/likes, vistas, etiquetas quincenales e insignias oficiales para la curadora.
   - Hilos de comentarios en vivo donde los usuarios pueden interactuar y responder.
   - Modal para crear nuevas publicaciones con selector de fotos botánicas y fichas de cultivo (Nombre científico, Riego, Luz).

2. **Jardín Studio (Panel de Edición Quincenal)**:
   - **Solución al requerimiento de edición cada 2 semanas**: Constanza o el administrador del sitio cuenta con un CMS visual elegante integrado (*"Studio Quincenal"*) accesible mediante el botón flotante en la esquina inferior o desde la barra superior.
   - Permite actualizar:
     - El **número de entrega** y **rango de fechas** del ciclo quincenal.
     - El **título temático** y **mensaje editorial**.
     - La **Planta de la Quincena** (con foto, requerimientos de luz, riego, humedad, toxicidad pet-safe y consejos secretos).
     - Los **ejes destacados** de la entrega.
     - Los **textos generales** (bienvenida original de Wix, biografía, redes sociales y contacto).
     - Gestión del foro (fijar publicaciones en portada o moderar contenido).
     - **Exportación e Importación de respaldos JSON** con un clic para guardar o restaurar el estado del sitio.
     - Persistencia automática en el navegador (`localStorage`).

3. **Guía de Especies & Herbario Vivo**:
   - Sustituye los textos genéricos de portafolio de Wix por fichas botánicas reales (*Monstera Deliciosa*, *Orquídea Phalaenopsis*, *Sansevieria Trifasciata*, *Calathea Orbifolia*, *Ficus Lyrata*, *Echeveria Elegans*).
   - Filtros por nivel de dificultad (*Principiante*, *Intermedio*, *Experto*) e indicador de seguridad para mascotas (*Pet Safe*).

4. **Historia y Visión de Constanza Pimentel**:
   - Sección *"Acerca de"* con la misión original, el manifiesto botánico de 4 pilares y la explicación del ciclo biológico quincenal.

---

## 🚀 Tecnologías

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) con paleta botánica personalizada (`botanical`, `earth`, `flora`)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Micro-interacciones**: Canvas Confetti

---

## 🛠️ Instalación y Desarrollo Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/07malpicadaniel-del/florescty.git
   cd florescty
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## ☁️ Despliegue en Vercel

Este proyecto está preconfigurado para un despliegue sin fricciones en **Vercel**:

### Opción 1: Mediante la interfaz de Vercel (Recomendada)
1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New Project"** e importa el repositorio `07malpicadaniel-del/florescty`.
3. Vercel detectará automáticamente **Next.js**.
4. Haz clic en **"Deploy"**. En menos de 2 minutos tu sitio estará en producción con SSL y CDN global.

### Opción 2: Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 🌿 ¿Cómo edita el usuario cada 2 semanas?

1. En la web desplegada, haz clic en el botón flotante **"Studio Quincenal"** (esquina inferior derecha) o en la barra superior.
2. En la pestaña **"1. Edición Quincenal Activa"**, cambia el título de la quincena, las fechas y la planta protagonista.
3. Haz clic en **"Guardar y Publicar Quincena"**. Verás una lluvia de confeti y los cambios se aplicarán inmediatamente.
4. Opcionalmente, en la pestaña **"4. Respaldo & Vercel"**, descarga la copia de seguridad en JSON para tener un histórico de todas tus entregas quincenales.
