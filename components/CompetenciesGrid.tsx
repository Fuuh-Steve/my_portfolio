'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, Database, Cloud, Search } from 'lucide-react';
import { playBlip } from '@/lib/sound';

export default function CompetenciesGrid() {
  const [searchQuery, setSearchQuery] = useState('');

  const stackCategories = [
    {
      title: 'Frontend & UI',
      icon: Layers,
      description: 'I care a lot about interfaces that feel smooth, clear, and easy to trust.',
      skills: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Radix UI', 'Figma'],
    },
    {
      title: 'Backend & Systems',
      icon: Cpu,
      description: 'The logic and structure behind the product matter just as much as the interface.',
      skills: ['Node.js', 'WebAssembly', 'Go', 'Python / FastAPI', 'GraphQL', 'REST / gRPC'],
    },
    {
      title: 'Data & Telemetry',
      icon: Database,
      description: 'I like data that helps products become more reliable, useful, and easier to improve.',
      skills: ['PostgreSQL', 'ClickHouse', 'Redis Streams', 'Apache Kafka', 'Prisma / Drizzle'],
    },
    {
      title: 'Cloud & Infrastructure',
      icon: Cloud,
      description: 'I enjoy shipping clean, dependable software with solid deployment workflows behind it.',
      skills: ['Docker', 'AWS ECS & S3', 'Cloudflare Workers', 'GitHub Actions', 'Vercel', 'Turborepo'],
    },
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const queryLower = searchQuery.toLowerCase().trim();

  return (
    <section className="py-16 md:py-20 border-b border-zinc-800/60" id="stack">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="space-y-10"
      >
        {/* Section Header with Quick Search Filter */}
        <motion.div variants={cardVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
              Tech Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
              Tools I use to build
            </h2>
            <p className="text-sm text-zinc-400 max-w-lg">
              I work across the stack, from product ideas and interfaces to APIs and the systems behind them.
            </p>
          </div>

          {/* Interactive Search Tool */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors font-mono"
            />
          </div>
        </motion.div>

        {/* 4 Category Cards with Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stackCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors flex flex-col justify-between space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.28)]"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-display text-white">{cat.title}</h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-900">
                  {cat.skills.map((skill) => {
                    const isMatched = queryLower && skill.toLowerCase().includes(queryLower);
                    return (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.06, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => playBlip(800)}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer select-none ${
                          isMatched
                            ? 'bg-white text-black font-bold ring-2 ring-white/20'
                            : 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300'
                        }`}
                      >
                        {skill}
                      </motion.span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
