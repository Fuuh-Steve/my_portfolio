'use client';

import { motion } from 'motion/react';
import { Code2, Cpu, ShieldCheck } from 'lucide-react';

export default function AboutMe() {
  const values = [
    {
      icon: Cpu,
      title: 'Systems & Scalability',
      description: 'Designing distributed data pipelines and low-overhead services with Rust, Node.js, and ClickHouse that scale cleanly under production loads.',
    },
    {
      icon: Code2,
      title: 'Precision Frontend',
      description: 'Crafting responsive, accessible web interfaces with Next.js, React, and Tailwind CSS. Obsessed with fast first paints and zero layout shift.',
    },
    {
      icon: ShieldCheck,
      title: 'Developer Experience',
      description: 'Maintaining open-source design systems, building reusable component primitives, and establishing robust CI/CD and testing pipelines.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="py-16 md:py-20 border-b border-zinc-800/60" id="about-me">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="space-y-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="space-y-2">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
            Crafting software at the intersection of systems &amp; UI.
          </h2>
        </motion.div>

        {/* Story & Background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div variants={itemVariants} className="lg:col-span-6 space-y-4 text-zinc-300 text-base leading-relaxed">
            <p>
              Hi, I&apos;m <strong className="text-white font-semibold">FU-UH Steve Junior Atsi</strong>, widely known as <strong className="text-white font-semibold">Steve Jr</strong>. I am a systems architect and full-stack software engineer with over 5 years of experience building scalable applications and distributed cloud services.
            </p>
            <p className="text-zinc-400">
              My engineering philosophy is built around clarity and performance: writing clean, deterministic code, picking the right boundaries between browser and backend, and maintaining zero-bloat dependencies.
            </p>
            <p className="text-zinc-400">
              I specialize in end-to-end TypeScript and Next.js applications, low-latency Rust/WASM kernels, and event-driven architectures that process millions of records with high reliability.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1"
            >
              <span className="text-zinc-500 text-[10px] block uppercase">EXPERIENCE</span>
              <span className="text-white text-lg font-bold font-display">5+ Years</span>
              <p className="text-zinc-400 text-[11px] font-sans">Full-stack &amp; systems engineering</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1"
            >
              <span className="text-zinc-500 text-[10px] block uppercase">COMMUNITY</span>
              <span className="text-white text-lg font-bold font-display">1,200+</span>
              <p className="text-zinc-400 text-[11px] font-sans">GitHub stars across crates &amp; tools</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1"
            >
              <span className="text-zinc-500 text-[10px] block uppercase">LOCATION</span>
              <span className="text-white text-lg font-bold font-display">Worldwide</span>
              <p className="text-zinc-400 text-[11px] font-sans">Open to Remote &amp; Relocation</p>
            </motion.div>
          </motion.div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2 hover:border-zinc-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold font-display text-white">{val.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{val.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
