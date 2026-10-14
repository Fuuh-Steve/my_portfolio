'use client';

import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  category: string;
  logo: string;
}

const TECH_ITEMS: TechItem[] = [
  { name: 'TypeScript', category: 'Language', logo: 'https://cdn.simpleicons.org/typescript/white' },
  { name: 'Node.js', category: 'Runtime', logo: 'https://cdn.simpleicons.org/nodedotjs/white' },
  { name: 'CSS', category: 'Styling', logo: 'https://cdn.simpleicons.org/css3/white' },
  { name: 'Tailwind', category: 'Styling', logo: 'https://cdn.simpleicons.org/tailwindcss/white' },
  { name: 'React', category: 'Library', logo: 'https://cdn.simpleicons.org/react/white' },
  { name: 'Next.js', category: 'Framework', logo: 'https://cdn.simpleicons.org/nextdotjs/white' },
  { name: 'PostgreSQL', category: 'Database', logo: 'https://cdn.simpleicons.org/postgresql/white' },
  { name: 'Supabase', category: 'Platform', logo: 'https://cdn.simpleicons.org/supabase/white' },
  { name: 'GitHub', category: 'Collaboration', logo: 'https://cdn.simpleicons.org/github/white' },
  { name: 'MongoDB', category: 'Database', logo: 'https://cdn.simpleicons.org/mongodb/white' },
  { name: 'Figma', category: 'Design', logo: 'https://cdn.simpleicons.org/figma/white' },
  { name: 'OpenAPI', category: 'API', logo: 'https://cdn.simpleicons.org/openapiinitiative/white' },
];

export default function TechLogoCarousel() {
  const displayItems = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div className="py-6 border-b border-zinc-800/60 overflow-hidden relative select-none">
      <div className="flex items-center justify-between mb-3 px-1 text-xs font-mono text-zinc-500 uppercase tracking-widest">
        <span>Languages &amp; Technologies</span>
        <span className="text-zinc-600 hidden sm:inline">Continuous Integration • Multi-Runtime</span>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#070709] via-[#070709]/85 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#070709] via-[#070709]/85 to-transparent z-10 pointer-events-none"></div>

      <motion.div
        className="flex gap-3 w-max px-2"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          ease: [0.25, 0.1, 0.25, 1],
          duration: 54,
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {displayItems.map((tech, index) => (
          <motion.div
            key={`${tech.name}-${index}`}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-white/12 bg-[#0b0b0f]/80 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.04),0_18px_50px_rgba(0,0,0,0.35)] hover:border-zinc-500/60 transition-colors cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-zinc-950/90 border border-white/10 flex items-center justify-center overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_18px_rgba(255,255,255,0.08)]">
              <img
                src={tech.logo}
                alt={tech.name}
                className="h-4 w-4 object-contain"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors">
                {tech.name}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono leading-none">
                {tech.category}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
