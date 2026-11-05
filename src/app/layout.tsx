import type { Metadata } from 'next';
import './globals.css';
import { ContentProvider } from '../context/ContentContext';

export const metadata: Metadata = {
  title: 'El Jardín Secreto | Plantas, Flores y Cuidados',
  description: 'Un rincón verde dedicado a aprender sobre plantas, flores de temporada y consejos sencillos para su cuidado.',
  keywords: ['botánica', 'plantas', 'flores', 'orquídeas', 'suculentas', 'jardín secreto', 'cuidados de plantas'],
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'El Jardín Secreto',
    description: 'Aprende y descubre las maravillas de la naturaleza.',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Great+Vibes&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen flex flex-col bg-garden-cream dark:bg-garden-darkBg text-garden-darkPurple dark:text-garden-thistle antialiased selection:bg-garden-thistle selection:text-garden-darkPurple transition-colors duration-300">
        <ContentProvider>
          {children}
        </ContentProvider>
      </body>
    </html>
  );
}
