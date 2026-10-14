'use client';

import { motion } from 'framer-motion';
import { Code2, Cpu, ShieldCheck } from 'lucide-react';

export default function AboutMe() {
  const values = [
    {
      icon: Cpu,
      title: 'Building with intent',
      description: 'I like creating systems and features that are practical, efficient, and built to last—whether that means cleaner APIs or smarter product flows.',
    },
    {
      icon: Code2,
      title: 'Designing for people',
      description: 'I care about how software feels in the hands of real users: smooth interfaces, clear experiences, and thoughtful details that make products easier to love.',
    },
    {
      icon: ShieldCheck,
      title: 'Learning in public',
      description: 'I enjoy growing through hands-on work, community building, and constant iteration—especially when it helps me improve the way I build and teach.',
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
            I build software that feels useful, polished, and personal.
          </h2>
        </motion.div>

        {/* Story & Background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div variants={itemVariants} className="lg:col-span-6 space-y-4 text-zinc-300 text-base leading-relaxed">
            <p>
              Hi, I&apos;m <strong className="text-white font-semibold">Steve Jr</strong> — a full-stack developer, Year 4 engineering student, and community builder. I like turning ideas into software that feels intentional, useful, and genuinely enjoyable to use.
            </p>
            <p className="text-zinc-400">
              My work sits between product thinking and engineering execution: I build clean interfaces, reliable APIs, and thoughtful digital experiences with React, Next.js, TypeScript, and modern backend tools. I’m always learning, improving, and trying to build things that solve real problems with style.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1 shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
            >
              <span className="text-zinc-500 text-[10px] block uppercase">EDUCATION</span>
              <span className="text-white text-lg font-bold font-display">Year 4</span>
              <p className="text-zinc-400 text-[11px] font-sans">Engineering student</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1 shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
            >
              <span className="text-zinc-500 text-[10px] block uppercase">FOCUS</span>
              <span className="text-white text-lg font-bold font-display">Full-Stack</span>
              <p className="text-zinc-400 text-[11px] font-sans">Web, APIs &amp; product building</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-1 shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
            >
              <span className="text-zinc-500 text-[10px] block uppercase">LOCATION</span>
              <span className="text-white text-lg font-bold font-display">Worldwide</span>
              <p className="text-zinc-400 text-[11px] font-sans">Open to Remote &amp; relocation</p>
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
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2 hover:border-zinc-700 transition-colors shadow-[0_10px_28px_rgba(0,0,0,0.22)]"
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
