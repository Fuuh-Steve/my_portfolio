'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProjectSpec } from '@/lib/data';
import { X, Copy, Check, Code2 } from 'lucide-react';
import { playBlip } from '@/lib/sound';

interface ProjectModalProps {
  project: ProjectSpec | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopyCode = async () => {
    try {
      playBlip(900);
      await navigator.clipboard.writeText(project.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl relative my-8 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
              {project.subtitle}
            </span>
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
          </div>
          <button
            onClick={() => {
              playBlip(700);
              onClose();
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Image */}
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
            <Image
              src={project.image}
              alt={project.alt}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              referrerPolicy="no-referrer"
              className="object-cover filter contrast-110"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              Overview
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed font-normal">
              {project.longDescription}
            </p>
          </div>

          {/* Tech Tags */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Source Code Preview */}
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
                <Code2 className="w-4 h-4" /> Implementation Snippet
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:text-white transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-black border border-zinc-800/80 text-zinc-300 overflow-x-auto text-[11px] leading-relaxed">
              <code>{project.codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-zinc-800/80 bg-zinc-900/40 flex justify-end">
          <button
            onClick={() => {
              playBlip(700);
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
