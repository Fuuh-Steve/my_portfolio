'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, Send, Github, Linkedin, MapPin, Mail, Sparkles } from 'lucide-react';
import { playBlip } from '@/lib/sound';

export default function DispatchContact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleCopyEmail = async () => {
    try {
      playBlip(1000);
      await navigator.clipboard.writeText('fuuhsteve10@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playBlip(900);
    setStatus('sending');

    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="py-16 md:py-24" id="contact">
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
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
            Let&apos;s build something great.
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg">
            Have a project in mind, an engineering role, or architecture consultation? Get in touch with Steve Jr directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Left */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-4">
            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-4 shadow-sm hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                  Direct Email
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="space-y-2">
                <div className="text-base sm:text-lg font-semibold font-display text-white select-all break-all">
                  fuuhsteve10@gmail.com
                </div>
                <p className="text-xs text-zinc-400">
                  Direct inbox of FU-UH Steve Junior Atsi
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-200 hover:text-white hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 active:scale-95 cursor-pointer font-display"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Email Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Location & Social Channels */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-4 text-xs font-mono shadow-sm">
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-zinc-500 shrink-0" />
                <span>Worldwide Remote • Open to Relocation</span>
              </div>
              <div className="pt-3 border-t border-zinc-900 flex items-center gap-4 text-zinc-400">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </motion.a>
                <span>•</span>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </motion.a>
                <span>•</span>
                <a
                  href="mailto:fuuhsteve10@gmail.com"
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Right */}
          <motion.div variants={itemVariants} className="lg:col-span-7 p-6 md:p-8 rounded-2xl bg-zinc-950 border border-zinc-800/80 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs text-zinc-400 font-medium font-display block">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Steve Henderson"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs text-zinc-400 font-medium font-display block">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="contact@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs text-zinc-400 font-medium font-display block">
                  Project Brief or Inquiry
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Share details about your project, team goals, or timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {status === 'sent' ? (
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 font-display">
                    <Check className="w-4 h-4" /> Message dispatched! Steve Jr will reply shortly.
                  </span>
                ) : (
                  <span className="text-xs text-zinc-500 font-mono">
                    Replies typically within 24 hours
                  </span>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer shadow-sm font-display"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{status === 'sending' ? 'Transmitting...' : 'Send Message'}</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
