'use client';

import { motion } from 'motion/react';

export default function CareerTimeline() {
  const experiences = [
    {
      role: 'Staff Engineer & UI Architect',
      company: 'Stealth AI Labs',
      period: '2023 — Present',
      location: 'San Francisco, CA',
      bullets: [
        'Directing architecture across real-time AI model interfaces and agentic workflows.',
        'Decreased initial bundle payload by 42% via custom chunking schedules and virtualized tree tables.',
        'Mentoring a team of 12 full-stack engineers on performance, type safety, and systems design.',
      ],
      tags: ['Next.js 15', 'TypeScript', 'WASM Kernels', 'Turbopack'],
    },
    {
      role: 'Senior Full Stack Engineer',
      company: 'FinTech Cloud Platform',
      period: '2021 — 2023',
      location: 'San Francisco, CA',
      bullets: [
        'Engineered real-time order-book visualization canvases handling 15,000 WebSocket events/second.',
        'Designed audit trails and regulatory logging pipelines with zero message loss.',
        'Migrated legacy monolithic dashboard to Next.js with server components and edge rendering.',
      ],
      tags: ['WebSockets', 'PostgreSQL', 'Go', 'Kafka Brokers'],
    },
    {
      role: 'Software Engineer',
      company: 'Acme Open Systems',
      period: '2019 — 2021',
      location: 'San Francisco, CA',
      bullets: [
        'Constructed component libraries, automated design token generators, and headless client dashboards.',
        'Set up end-to-end testing with Playwright and Jest, increasing test coverage from 45% to 88%.',
      ],
      tags: ['React', 'Node.js', 'Docker', 'Jest & Playwright'],
    },
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

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="py-16 md:py-20 border-b border-zinc-800/60" id="experience">
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
            Career
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
            Work Experience
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg">
            Track record of leading architecture and shipping scalable web applications.
          </p>
        </motion.div>

        {/* Timeline Items */}
        <div className="space-y-6">
          {experiences.map((exp) => (
            <motion.div
              key={exp.role + exp.company}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="p-6 md:p-7 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-lg font-bold font-display text-white">{exp.role}</h3>
                  <div className="text-sm text-zinc-400 font-medium">
                    {exp.company} • <span className="text-zinc-500 font-normal">{exp.location}</span>
                  </div>
                </div>
                <span className="font-mono text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full self-start sm:self-auto">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-2 text-sm text-zinc-300 list-disc list-inside">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <span className="text-zinc-300">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
