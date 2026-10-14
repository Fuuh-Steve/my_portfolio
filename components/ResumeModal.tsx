'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Mail, MapPin, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import { playBlip } from '@/lib/sound';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    playBlip(1000);
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl relative my-8 overflow-hidden font-sans"
        >
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Resume &amp; Professional Dossier
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={() => {
                  playBlip(700);
                  onClose();
                }}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Body */}
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6 text-sm text-zinc-300">
            {/* Identity Header */}
            <div className="border-b border-zinc-800 pb-5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h2 className="text-2xl font-bold font-display text-white">
                  FU-UH Steve Junior Atsi
                </h2>
                <span className="text-xs font-mono text-zinc-400">
                  Known professionally as <strong className="text-white">Steve Jr</strong>
                </span>
              </div>
              <p className="text-zinc-400 font-medium">
                Full-Stack Developer &amp; Engineering Student
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  fuuhsteve10@gmail.com
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  Open to Worldwide Remote &amp; Global Relocation
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                Executive Profile
              </h3>
              <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">
                Full-stack developer and engineering student focused on building modern web products, API-driven systems, and user-centered experiences with React, Next.js, TypeScript, and backend technologies. I enjoy creating reliable, scalable software and continuously improving my skills in product development and emerging technologies.
              </p>
            </div>

            {/* Core Competencies */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                Core Competencies &amp; Technologies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <span className="text-white font-bold block">Frontend &amp; UI</span>
                  <span className="text-zinc-400">Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, WebAssembly</span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <span className="text-white font-bold block">Backend &amp; Distributed</span>
                  <span className="text-zinc-400">Node.js, Rust, Go, Python/FastAPI, ClickHouse, PostgreSQL, Kafka, Redis</span>
                </div>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Selected Experience</span>
              </h3>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                    <span className="font-bold text-white text-sm">Staff Engineer &amp; UI Architect</span>
                    <span className="text-zinc-500 font-mono">2023 — Present</span>
                  </div>
                  <span className="text-xs text-zinc-400 block">Stealth AI Labs</span>
                  <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1">
                    <li>Led frontend and distributed orchestration across real-time AI interfaces.</li>
                    <li>Decreased initial bundle payloads by 42% through custom chunking algorithms.</li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                    <span className="font-bold text-white text-sm">Senior Full Stack Engineer</span>
                    <span className="text-zinc-500 font-mono">2021 — 2023</span>
                  </div>
                  <span className="text-xs text-zinc-400 block">FinTech Cloud Platform</span>
                  <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1">
                    <li>Built real-time telemetry dashboards handling 15k+ WebSocket events/sec.</li>
                    <li>Engineered regulatory audit trails with zero event dropping.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education & Philosophy */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education &amp; Credentials</span>
              </h3>
              <p className="text-xs text-zinc-300">
                B.S. in Computer Science / Software Engineering • Continuous open-source contributor
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-900/50 flex justify-between items-center text-xs font-mono">
            <span className="text-zinc-500">FU-UH Steve Junior Atsi (Steve Jr)</span>
            <button
              onClick={() => {
                playBlip(700);
                onClose();
              }}
              className="px-4 py-1.5 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
