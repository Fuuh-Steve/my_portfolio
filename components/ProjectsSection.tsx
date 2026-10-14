'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, ProjectSpec } from '@/lib/data';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { playBlip } from '@/lib/sound';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectSpec) => void;
}

export default function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'fullstack' | 'systems' | 'oss'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const categories = [
    { label: 'All', value: 'all' as const },
    { label: 'Full Stack', value: 'fullstack' as const },
    { label: 'Systems', value: 'systems' as const },
    { label: 'Open Source', value: 'oss' as const },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="py-16 md:py-20 border-b border-zinc-800/60" id="projects">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={containerVariants}
        className="space-y-10"
      >
        {/* Header & Filter Controls */}
        <motion.div variants={cardVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
              Projects
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
              Featured Work
            </h2>
            <p className="text-sm text-zinc-400 max-w-lg">
              A selection of production systems, developer tooling, and full-stack applications.
            </p>
          </div>

          {/* Dynamic Filter Pills with Sliding Indicator */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs self-start sm:self-auto font-medium relative">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => {
                    playBlip(750);
                    setActiveCategory(cat.value);
                  }}
                  className={`relative px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer select-none z-10 font-display ${
                    isActive ? 'text-black font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-white rounded-lg -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Project Cards Grid with Staggered Scroll Entrance */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.article
                layout
                key={proj.id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                onClick={() => onSelectProject(proj)}
                className="group rounded-2xl border border-zinc-800/80 bg-zinc-950/70 overflow-hidden hover:border-zinc-700 transition-all cursor-pointer flex flex-col justify-between shadow-[0_12px_34px_rgba(0,0,0,0.28)]"
              >
                <div>
                  {/* Image Preview */}
                  <div className="relative w-full aspect-[16/10] bg-zinc-900 overflow-hidden border-b border-zinc-800/60">
                    <Image
                      src={proj.image}
                      alt={proj.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      referrerPolicy="no-referrer"
                      className="object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-white/10">
                      {proj.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
                        {proj.subtitle}
                      </span>
                      <h3 className="text-lg font-bold font-display text-white group-hover:text-zinc-200 transition-colors">
                        {proj.title}
                      </h3>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>
                  </div>
                </div>

                {/* Tags & Action Footer */}
                <div className="p-5 pt-0 space-y-4">
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/80 text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-medium text-white font-display">
                    <span>View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
