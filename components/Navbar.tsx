'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { playBlip } from '@/lib/sound';
import { fastScrollTo } from '@/lib/scroll';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'About', href: '#about-me' },
    { label: 'Projects', href: '#projects' },
    { label: 'Stack', href: '#stack' },
    { label: 'Experience', href: '#experience' },
    { label: 'Connect & Resume', href: '#connect-resume' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playBlip(750);
    setMobileMenuOpen(false);
    fastScrollTo(href, 75, 320);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 pt-4 px-4 sm:px-6 pointer-events-none">
        <div className="max-w-5xl mx-auto pointer-events-auto">
          <nav
            className={`h-14 rounded-full px-5 flex items-center justify-between transition-all duration-300 ${
              scrolled
                ? 'bg-zinc-950/90 shadow-2xl border border-zinc-700/80 backdrop-blur-xl'
                : 'bg-zinc-950/75 shadow-lg border border-zinc-800/80 backdrop-blur-lg'
            }`}
          >
            {/* Brand Logo: SJ close to Steve Jr only, no white rounded background */}
            <motion.a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 group cursor-pointer select-none"
              title="FU-UH Steve Junior Atsi (Steve Jr)"
            >
              <span className="text-lg font-black font-logo text-white tracking-tight group-hover:text-zinc-300 transition-colors">
                SJ
              </span>
              <span className="text-base font-bold font-logo text-white tracking-tight group-hover:text-zinc-200 transition-colors">
                Steve Jr
              </span>
            </motion.a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 text-xs text-zinc-400 font-medium font-display">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors cursor-pointer relative"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Action */}
            <div className="flex items-center gap-2">
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="hidden sm:inline-flex items-center gap-1 px-4 h-8 rounded-full bg-white text-black text-xs font-semibold font-display hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
              >
                <span>Get in touch</span>
              </motion.a>

              {/* Mobile Hamburger Toggle */}
              <motion.button
                onClick={() => {
                  playBlip(800);
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                whileTap={{ scale: 0.92 }}
                className="md:hidden h-8 w-8 rounded-full border border-zinc-800 bg-zinc-900 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </motion.button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed inset-0 z-40 md:hidden bg-zinc-950/98 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                <span className="font-logo font-bold text-zinc-300">SJ Steve Jr</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-3 rounded-xl text-lg font-medium text-zinc-200 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors cursor-pointer font-display"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-900 space-y-3">
              <a
                href="#connect-resume"
                onClick={(e) => handleNavClick(e, '#connect-resume')}
                className="w-full py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-medium text-center block text-sm font-display cursor-pointer"
              >
                Connect &amp; Download Resume
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full py-3 rounded-xl bg-white text-black font-semibold text-center block text-sm active:scale-98 transition-transform cursor-pointer font-display"
              >
                Get in Touch
              </a>
              <div className="text-center text-xs text-zinc-500 font-mono">
                FU-UH Steve Junior Atsi • Software Engineer
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
