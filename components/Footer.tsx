'use client';

import { ArrowUp } from 'lucide-react';
import { playBlip } from '@/lib/sound';
import { fastScrollTo } from '@/lib/scroll';

export default function Footer() {
  const scrollToTop = () => {
    playBlip(950);
    fastScrollTo('#about', 75, 320);
  };

  const navLinks = [
    { label: 'About', href: '#about-me' },
    { label: 'Projects', href: '#projects' },
    { label: 'Stack', href: '#stack' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playBlip(750);
    fastScrollTo(href, 75, 320);
  };

  return (
    <footer className="w-full border-t border-zinc-800/60 py-10 mt-12 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
        <div className="flex items-center gap-2 text-center md:text-left">
          <span className="font-semibold text-zinc-400 font-display">Steve Jr</span>
          <span>•</span>
          <span>© {new Date().getFullYear()} FU-UH Steve Junior Atsi</span>
        </div>

        <div className="flex items-center gap-4 text-zinc-400 font-display">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={scrollToTop}
          className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-display"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
