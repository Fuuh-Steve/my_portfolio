'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Mail, FileText, Clock, X } from 'lucide-react';
import { playBlip } from '@/lib/sound';
import { fastScrollTo } from '@/lib/scroll';

interface HeroSectionProps {
  onOpenResume?: () => void;
}

export default function HeroSection({ onOpenResume }: HeroSectionProps) {
  const [localTime, setLocalTime] = useState<string>('');
  const [roleIndex, setRoleIndex] = useState(0);
  const rotatingRoles = ['Web Developer', 'Front-end Engineer', 'Backend Engineer', 'Fullstack Engineer', 'STEM Enthusiast', 'Engineering Student', 'Community Builder', 'Tech Advocate', 'Tech Educator', 'Tech Innovator', 'Tech Explorer'];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((current) => (current + 1) % rotatingRoles.length);
    }, 1400);

    return () => clearInterval(interval);
  }, [rotatingRoles.length]);

  const techPills = ['Node.js', 'TypeScript', 'CSS', 'Tailwind', 'React', 'Next.js', 'PostgreSQL', 'Supabase', 'GitHub', 'MongoDB', 'REST APIs', 'Figma'];
  const techPillsLoop = [...techPills, ...techPills];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="pt-8 pb-14 md:pt-16 md:pb-20 border-b border-zinc-800/60" id="about">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
      >
        {/* Left Column: Bio & Intro */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status & Live Clock Pill */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for roles &amp; projects</span>
            </div>

            {localTime && (
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 font-mono">
                <Clock className="w-3 h-3 text-zinc-500" />
                <span>{localTime}</span>
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <div className="text-sm font-medium text-zinc-300">
              Hi - I&apos;m
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.08]">
              Fu-uh Steve Junior
            </h1>

            <div className="flex min-h-[3rem] items-center gap-2 text-lg sm:text-2xl font-medium text-zinc-200">
              {/* <span className="text-zinc-400">I&apos;m a</span> */}
              <div className="relative inline-flex h-8 sm:h-10 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingRoles[roleIndex]}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-white font-semibold"
                  >
                    {rotatingRoles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.p variants={itemVariants} className="text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed font-normal">
            I build modern web applications with thoughtful UX, clean architecture, and reliable performance for people who want products that feel fast, polished, and scalable.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-1">
            <motion.button
              onClick={() => {
                playBlip(900);
                fastScrollTo('#contact', 75, 320);
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-sm cursor-pointer font-display"
            >
              <span>Contact Me</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-800 transition-colors text-sm font-medium flex items-center gap-1.5 cursor-pointer font-display"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </motion.a>

            <motion.a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-2.5 rounded-lg border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors text-sm font-medium flex items-center gap-1.5 cursor-pointer font-display"
            >
              <X className="w-4 h-4" />
              <span>X</span>
            </motion.a>

            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-2.5 rounded-lg border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors text-sm font-medium flex items-center gap-1.5 cursor-pointer font-display"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-1 overflow-hidden">
            <div className="relative flex w-full overflow-hidden">
              <motion.div
                className="flex min-w-max items-center gap-2"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 18,
                  ease: 'linear',
                }}
              >
                {techPillsLoop.map((tech, index) => (
                  <motion.span
                    key={`${tech}-${index}`}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    onClick={() => playBlip(850)}
                    className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer select-none whitespace-nowrap text-xs font-mono"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Clean Modern Portrait */}
        <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl group cursor-pointer"
          >
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDumQgPuF6ILbseA1aCApK_pPk3N126m6ykxrWYE7D6cY1x38gQCL1_mUO04_OvcFMovNC-2cW5kz7uMndYXut_7J6U19c3hpAmoGrYZlhWdNQZv7HjIHoNz1uBFoW5qV_BqLgW98p-KLa7L3p7QVMgQqU2Kzy3WKZvG67TU_2895il9-K-WQkGJlFudzmzGEqUuE810Wgq_EJK2GeJJZ_4jnuluVOX3hSFs9griN4L_vY_B0Yzc1Gt"
              alt="FU-UH Steve Junior Atsi (Steve Jr)"
              fill
              sizes="(max-width: 768px) 100vw, 340px"
              referrerPolicy="no-referrer"
              className="object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-500 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-300 font-mono">
              <span className="font-display font-medium">Steve Jr • Software Engineer</span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10">Active</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
