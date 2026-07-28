import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AndeInfra - Ingeniería y Servicios | La Serena, Región de Coquimbo',
  description: 'Inversiones AndeInfra SpA - Obras civiles, minería, servicios generales, maquinaria y logística en la Región de Coquimbo y macrozona norte. Solidez Cordillerana, Precisión de Ingeniería.',
  keywords: ['AndeInfra', 'Ingeniería', 'Obras Civiles', 'Minería', 'La Serena', 'Coquimbo', 'Movimiento de Tierras', 'Estructuras Metálicas', 'Servicios Generales', 'Chile'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-[#142026] text-white antialiased font-['Inter',sans-serif] selection:bg-[#B96A37] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
