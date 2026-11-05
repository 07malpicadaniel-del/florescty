import type { Metadata } from 'next';
import './globals.css';
import { ContentProvider } from '../context/ContentContext';

export const metadata: Metadata = {
  title: 'El Jardín Secreto | Cuadernos Botánicos & Entregas Quincenales',
  description: 'Un espacio botánico creado por Constanza Pimentel P. Fichas de especies, consejos de cultivo, cuidados de orquídeas y flora viva con renovación quincenal.',
  keywords: ['botánica', 'plantas de interior', 'orquídeas', 'suculentas', 'jardín secreto', 'Constanza Pimentel', 'cuidados botánicos'],
  authors: [{ name: 'Constanza Pimentel P.' }],
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'El Jardín Secreto · Constanza Pimentel',
    description: 'Aprende y descubre las maravillas de la diversidad vegetal cada dos semanas.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#f7faf7] dark:bg-[#08130e] text-botanical-950 dark:text-[#e4efe8] antialiased selection:bg-emerald-200 selection:text-botanical-950 transition-colors duration-300">
        <ContentProvider>
          {children}
        </ContentProvider>
      </body>
    </html>
  );
}
