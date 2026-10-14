'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import HeroSection from '@/components/HeroSection';
import TechLogoCarousel from '@/components/TechLogoCarousel';
import AboutMe from '@/components/AboutMe';
import ProjectsSection from '@/components/ProjectsSection';
import CompetenciesGrid from '@/components/CompetenciesGrid';
import CareerTimeline from '@/components/CareerTimeline';
import ConnectResumeSection from '@/components/ConnectResumeSection';
import DispatchContact from '@/components/DispatchContact';
import Footer from '@/components/Footer';
import ProjectModal from '@/components/ProjectModal';
import ResumeModal from '@/components/ResumeModal';
import PortfolioChatbot from '@/components/PortfolioChatbot';
import { ProjectSpec } from '@/lib/data';

const welcomeMessages = [
  'Welcome :-)',
  'Bienvenue :-)',
  'Hola :-)',
  'Willkommen :-)',
  'Bem-vindo :-)',
  'Добро пожаловать :-)',
  '欢迎 :-)',
  'नमस्ते :-)',
  'こんにちは :-)',
  'مرحبا :-)',
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectSpec | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [welcomeIndex, setWelcomeIndex] = useState(0);

  useEffect(() => {
    const cycleWelcome = setInterval(() => {
      setWelcomeIndex((current) => (current + 1) % welcomeMessages.length);
    }, 320);

    const hideSplash = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3800);

    return () => {
      clearInterval(cycleWelcome);
      clearTimeout(hideSplash);
    };
  }, []);

  if (isSplashVisible) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#070709] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.18),_rgba(255,255,255,0.04)_32%,_transparent_68%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_transparent_60%)] blur-3xl" />
        <div className="relative flex items-center justify-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={welcomeMessages[welcomeIndex]}
              initial={{ opacity: 0, y: 26, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -26, scale: 1.08, filter: 'blur(10px)' }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="text-center text-4xl font-semibold tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.18)] sm:text-6xl"
            >
              {welcomeMessages[welcomeIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen bg-[#070709] text-zinc-300 font-sans antialiased relative selection:bg-white selection:text-black"
    >
      {/* Dynamic Scroll Progress Bar */}
      <ScrollProgress />

      {/* Subtle Ambient Radial Glow */}
      <div className="fixed inset-0 pointer-events-none radial-glow z-0"></div>

      {/* Modern Floating Header Navbar with Steve Jr Logo & Fast Nav */}
      <Navbar />

      {/* Main Sections Container with Fluid High-Velocity Transitions */}
      <main className="w-full pt-20 max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
        {/* Hero Section */}
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />

        {/* Dynamic Framer Motion Tech Logo Slideshow */}
        <TechLogoCarousel />

        {/* About Me Section with Staggered Fast Scroll Load-in */}
        <AboutMe />

        {/* Featured Projects Section with Fast Scroll Target & Layout Animations */}
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* Tech Stack & Tools Section */}
        <CompetenciesGrid />

        {/* Career Experience Section */}
        <CareerTimeline />

        {/* Dedicated Connect & Resume Section with PDF Download */}
        <ConnectResumeSection onOpenResume={() => setIsResumeOpen(true)} />

        {/* Contact Section */}
        <DispatchContact />
      </main>

      {/* Modern Footer */}
      <Footer />

      {/* Corner AI Portfolio Chatbot */}
      <PortfolioChatbot />

      {/* Clean Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Interactive Resume & Dossier Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </motion.div>
  );
}
