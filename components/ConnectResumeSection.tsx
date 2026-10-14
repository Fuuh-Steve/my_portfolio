'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Eye,
  Mail,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Globe,
  Github,
  Linkedin,
} from 'lucide-react';
import { playBlip } from '@/lib/sound';

interface ConnectResumeSectionProps {
  onOpenResume: () => void;
}

export default function ConnectResumeSection({ onOpenResume }: ConnectResumeSectionProps) {
  const [copied, setCopied] = useState(false);
  const email = 'fuuhsteve10@gmail.com';

  const handleCopyEmail = () => {
    playBlip(950);
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadResume = () => {
    playBlip(1000);
    // Open resume modal and trigger print/save PDF
    onOpenResume();
  };

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
    <motion.section
      id="connect-resume"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={containerVariants}
      className="py-14 sm:py-20 border-t border-zinc-900 scroll-mt-20"
    >
      {/* Section Tag */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
          Opportunities &amp; Credentials
        </span>
      </motion.div>

      {/* Headline & Intro */}
      <motion.div variants={itemVariants} className="space-y-4 max-w-3xl mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
          Want to Connect &amp; Work Together?
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-sans">
          I am always excited to discuss software engineering roles, product-building opportunities,
          and ambitious digital experiences. Whether you are looking for a full-stack developer, a learner with strong execution skills,
          or simply want to connect and learn more — let&apos;s start a conversation.
        </p>
      </motion.div>

      {/* Main Grid: Resume Download Box + Direct Connection Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Card: Resume Showcase & Download (7 cols) */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-7 rounded-2xl bg-gradient-to-b from-zinc-900/70 to-zinc-950/80 border border-zinc-800/80 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-xl"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors"></div>

          <div className="space-y-6 relative z-10">
            {/* Badge & Quick Stats */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-5">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-white">
                  <FileText className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Official Resume &amp; Dossier
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    FU-UH Steve Junior Atsi (Steve Jr)
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Updated 2025
              </span>
            </div>

            {/* Resume Summary Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/70 space-y-1">
                <div className="flex items-center gap-1.5 text-zinc-300 font-semibold font-display">
                  <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                  <span>5+ Years Experience</span>
                </div>
                <p className="text-zinc-500 font-mono text-[11px]">
                  Staff &amp; Senior Engineering roles building low-latency distributed runtimes.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/70 space-y-1">
                <div className="flex items-center gap-1.5 text-zinc-300 font-semibold font-display">
                  <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
                  <span>B.S. Computer Science</span>
                </div>
                <p className="text-zinc-500 font-mono text-[11px]">
                  Distributed Systems, Network Protocol Design, &amp; Cloud Architecture.
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              Contains complete technical career timeline, verified system benchmarks, open-source repositories,
              production impact metrics, and end-to-end stack competencies.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="pt-6 mt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-3 relative z-10">
            <motion.button
              onClick={handleDownloadResume}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-lg cursor-pointer font-display"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </motion.button>

            <motion.button
              onClick={() => {
                playBlip(800);
                onOpenResume();
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:border-zinc-700 transition-colors text-sm font-medium flex items-center gap-2 cursor-pointer font-display"
            >
              <Eye className="w-4 h-4 text-zinc-400" />
              <span>Preview Dossier</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Right Card: Direct Connection & Contact Channel (5 cols) */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                Direct Communication
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Worldwide Remote
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
              Let&apos;s Build Together
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Available for engineering opportunities, product collaborations, and meaningful software work while continuing my studies.
            </p>

            {/* Email Copy Card */}
            <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                Primary Contact
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-mono text-white select-all break-all">
                  {email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Social Profiles & Direct Mail link */}
          <div className="space-y-3 pt-2">
            <a
              href={`mailto:${email}?subject=Opportunity%20/%20Connecting%20with%20Steve%20Jr`}
              className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-white font-semibold text-center flex items-center justify-center gap-2 text-sm transition-colors cursor-pointer font-display"
            >
              <Mail className="w-4 h-4 text-zinc-300" />
              <span>Send Steve an Email</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-850 hover:border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-850 hover:border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
