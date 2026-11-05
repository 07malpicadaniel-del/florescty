import type { Metadata } from 'next';
import './globals.css';
import { ContentProvider } from '../context/ContentContext';

export const metadata: Metadata = {
  title: 'El Jardín Secreto | Comunidad Botánica & Cuadernos Quincenales',
  description: 'Comunidad botánica viva fundada por Constanza Pimentel. Fichas de especies, consejos de cultivo, cuidados estacionales y foro de discusión con renovación quincenal.',
  keywords: ['botánica', 'plantas de interior', 'orquídeas', 'suculentas', 'jardín secreto', 'foro de plantas', 'cuidados botánicos'],
  authors: [{ name: 'Constanza Pimentel P.' }],
  openGraph: {
    title: 'El Jardín Secreto · Comunidad Botánica',
    description: 'Aprende y comparte sobre la diversidad vegetal cada dos semanas.',
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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌿</text></svg>" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#f7faf7] text-botanical-950 antialiased selection:bg-emerald-200 selection:text-botanical-950">
        <ContentProvider>
          {children}
        </ContentProvider>
      </body>
    </html>
  );
}
