import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'FU-UH Steve Junior Atsi (Steve Jr) // Systems Architect & Full-Stack Engineer',
  description: 'Portfolio of FU-UH Steve Junior Atsi (Steve Jr) — Systems architect and full-stack engineer building distributed runtimes, Next.js applications, and precision interfaces.',
  openGraph: {
    title: 'FU-UH Steve Junior Atsi (Steve Jr) // Systems Architect & Full-Stack Engineer',
    description: 'Portfolio of FU-UH Steve Junior Atsi (Steve Jr) — Systems architect and full-stack engineer building distributed runtimes, Next.js applications, and precision interfaces.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FU-UH Steve Junior Atsi (Steve Jr) // Systems Architect & Full-Stack Engineer',
    description: 'Portfolio of FU-UH Steve Junior Atsi (Steve Jr) — Systems architect and full-stack engineer building distributed runtimes, Next.js applications, and precision interfaces.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
