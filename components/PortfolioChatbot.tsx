'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  User,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { playBlip } from '@/lib/sound';
import { fastScrollTo } from '@/lib/scroll';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const STARTER_QUESTIONS = [
  'Who is Steve Jr?',
  "What is Steve's tech stack?",
  'Tell me about his key projects',
  'How do I download his resume?',
  'How can I contact or hire Steve?',
];

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm Steve Jr's AI assistant. Ask me anything about his 5+ years of software engineering experience, distributed systems projects, tech stack, or how to connect and download his resume!",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // focus input when opened on non-touch devices
      const timer = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    playBlip(750);
    const updatedMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();

      playBlip(900);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply || "I'm having trouble processing that right now, but feel free to email Steve directly at fuuhsteve10@gmail.com!",
        },
      ]);
    } catch {
      playBlip(500);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Steve Jr (FU-UH Steve Junior Atsi) is a Systems Architect & Full-Stack Engineer specializing in high-throughput distributed architectures, Next.js, and TypeScript. You can download his resume in the Connect & Resume section or contact him at fuuhsteve10@gmail.com!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    playBlip(650);
    setMessages([
      {
        role: 'assistant',
        content:
          "Hi! I'm Steve Jr's AI assistant. Ask me anything about his 5+ years of software engineering experience, distributed systems projects, tech stack, or how to connect and download his resume!",
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
            className="w-[calc(100vw-2.5rem)] sm:w-[400px] h-[520px] max-h-[82vh] bg-zinc-950/95 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden mb-3 font-sans"
          >
            {/* Chatbot Header */}
            <div className="px-4 py-3.5 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white relative">
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-zinc-950"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-white font-display">
                      Steve Jr Assistant
                    </h3>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">
                      AI
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online • FU-UH Steve Junior Atsi
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Reset conversation"
                  aria-label="Reset chat"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    playBlip(700);
                    setIsOpen(false);
                  }}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2.5 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-md bg-zinc-800 border border-zinc-700/80 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-white text-black font-medium rounded-tr-sm shadow-md'
                        : 'bg-zinc-900/90 text-zinc-200 border border-zinc-800/80 rounded-tl-sm'
                    }`}
                  >
                    {msg.content}

                    {/* Helpful shortcut link if resume was mentioned */}
                    {msg.role === 'assistant' &&
                      msg.content.toLowerCase().includes('connect & resume') && (
                        <div className="pt-2 mt-2 border-t border-zinc-800 flex items-center gap-2">
                          <button
                            onClick={() => {
                              playBlip(800);
                              fastScrollTo('#connect-resume', 75, 320);
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:underline cursor-pointer"
                          >
                            <span>Jump to Connect &amp; Resume</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-md bg-zinc-700 flex items-center justify-center shrink-0 mt-0.5 text-zinc-200">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-6 h-6 rounded-md bg-zinc-800 border border-zinc-700/80 flex items-center justify-center shrink-0 text-emerald-400">
                    <Sparkles className="w-3 h-3 animate-spin" />
                  </div>
                  <div className="bg-zinc-900/90 text-zinc-400 border border-zinc-800/80 px-3.5 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"></span>
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"
                      style={{ animationDelay: '0.15s' }}
                    ></span>
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"
                      style={{ animationDelay: '0.3s' }}
                    ></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Starter Chips (show when few messages) */}
            {messages.length <= 3 && !isLoading && (
              <div className="px-3 py-2 border-t border-zinc-900 bg-zinc-950/80 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-[11px] whitespace-nowrap transition-colors cursor-pointer shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-zinc-800/80 bg-zinc-900/40 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Steve Jr's work, skills, or resume..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-xl bg-white text-black hover:bg-zinc-200 disabled:opacity-30 disabled:hover:bg-white transition-opacity cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Corner Trigger Button */}
      <motion.button
        onClick={() => {
          playBlip(800);
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`h-12 px-4 rounded-full flex items-center gap-2.5 shadow-2xl border transition-all cursor-pointer ${
          isOpen
            ? 'bg-zinc-900 text-white border-zinc-700'
            : 'bg-zinc-950/90 text-white border-zinc-800 hover:border-zinc-750 backdrop-blur-md group'
        }`}
        aria-label="Chat with Steve Jr's AI assistant"
      >
        <div className="relative">
          <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:rotate-6 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400"></span>
        </div>
        <span className="text-xs font-display font-bold tracking-tight">
          {isOpen ? 'Close Chat' : "Ask Steve's AI"}
        </span>
      </motion.button>
    </div>
  );
}
