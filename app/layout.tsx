import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'FU-UH Steve Junior Atsi (Steve Jr) // Full-Stack Developer & Engineering Student',
  description: 'Portfolio of FU-UH Steve Junior Atsi (Steve Jr) — full-stack developer and engineering student building modern web products, APIs, and user-focused digital experiences.',
  openGraph: {
    title: 'FU-UH Steve Junior Atsi (Steve Jr) // Full-Stack Developer & Engineering Student',
    description: 'Portfolio of FU-UH Steve Junior Atsi (Steve Jr) — full-stack developer and engineering student building modern web products, APIs, and user-focused digital experiences.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FU-UH Steve Junior Atsi (Steve Jr) // Full-Stack Developer & Engineering Student',
    description: 'Portfolio of FU-UH Steve Junior Atsi (Steve Jr) — full-stack developer and engineering student building modern web products, APIs, and user-focused digital experiences.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
