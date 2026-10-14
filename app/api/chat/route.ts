import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_INSTRUCTION = `You are Steve Jr's AI Portfolio Assistant, an intelligent, articulate, and friendly representative embedded directly into FU-UH Steve Junior Atsi's portfolio web application.

ABOUT STEVE JR:
- Full Name: FU-UH Steve Junior Atsi
- Professional Moniker / Brand: Steve Jr (monogram "SJ")
- Primary Role: Systems Architect & Full-Stack Software Engineer
- Primary Email: fuuhsteve10@gmail.com
- Location: Available for Worldwide Remote roles and flexible global relocation.
- Experience Level: 5+ years building sub-millisecond distributed runtimes, high-throughput APIs, and precision frontends.
- Education: B.S. in Computer Science & Distributed Systems.

KEY TECHNICAL SKILLS:
- Languages: TypeScript, JavaScript, Go, Rust, Python, SQL, C/C++
- Frontend: Next.js (App Router, Server Components), React 19, Tailwind CSS, Framer Motion, HTML5 Canvas, WebAssembly
- Backend & Distributed: Node.js, Go microservices, FastAPI, Rust Tokio runtime, Kafka, ClickHouse, PostgreSQL, Redis, gRPC, WebSockets, Docker, Kubernetes
- Architecture: Event-driven pipelines, OLAP ingestion, zero-layout-shift UI, high-concurrency backpressure, distributed caching

FLAGSHIP PROJECTS:
1. HyperScale AI Orchestrator (2024): Distributed token dispatch engine for multi-agent LLM systems with real-time streaming, edge caching, and live diagnostics (Next.js 15, TypeScript, WebSockets, FastAPI).
2. DevPulse Telemetry Platform (2023): Real-time observability engine consuming millions of distributed microservice traces daily with sub-second queries (TypeScript, ClickHouse, Kafka, Tailwind CSS).
3. Kite Headless UI Engine (2024): Open-source token compiler outputting sub-atomic DOM bindings with zero runtime overhead, 1,200+ GitHub stars (Rust, WebAssembly, React 19).

RESUME & CONTACT:
- Resume can be viewed and downloaded directly in the "Connect & Resume" section on the portfolio page. Users can click "Download Resume (PDF)" or "Preview Dossier" in the app.
- Email: fuuhsteve10@gmail.com
- Steve Jr is currently open to full-time engineering roles, high-scale systems architecture consulting, and exciting collaborations.

GUIDELINES FOR YOUR RESPONSES:
- Be concise, professional, warm, and helpful. Keep responses to 1-3 short paragraphs or bullet points.
- Speak in the third person about Steve Jr or as his helpful assistant (e.g., "Steve Jr is...", "He specializes in...").
- When asked how to get his resume, tell them they can download the PDF or preview the full dossier right here in the 'Connect & Resume' section of the site!
- When asked how to contact him, provide his email: fuuhsteve10@gmail.com and suggest sending an email or connecting on LinkedIn/GitHub.
- If asked about technologies or projects not in his profile, politely clarify his primary focus on distributed systems, modern full-stack web applications, and low-latency architectures.`;

function getSmartFallbackResponse(userPrompt: string): string {
  const query = userPrompt.toLowerCase();

  if (query.includes('resume') || query.includes('cv') || query.includes('download')) {
    return "You can download Steve Jr's full official resume (PDF) or preview his complete dossier right in the 'Connect & Resume' section on this page! It features his 5+ years of verified software engineering experience, system architecture benchmarks, and education.";
  }

  if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('reach')) {
    return "You can reach out to Steve Jr directly via email at fuuhsteve10@gmail.com. He is actively available for full-time software engineering roles, systems architecture consulting, and high-impact distributed web products!";
  }

  if (query.includes('project') || query.includes('work') || query.includes('built')) {
    return "Steve Jr's featured projects include:\n\n• **HyperScale AI Orchestrator**: A high-throughput token dispatch engine for multi-agent LLM systems.\n• **DevPulse Telemetry Platform**: Real-time OLAP observability processing millions of microservice traces in ClickHouse.\n• **Kite Headless UI Engine**: An open-source Rust & WebAssembly token compiler with 1,200+ stars.\n\nYou can explore each project with live architectures right in the Projects section above!";
  }

  if (query.includes('stack') || query.includes('skill') || query.includes('language') || query.includes('tech')) {
    return "Steve Jr's core technical stack spans:\n\n• **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, WebAssembly\n• **Backend & Systems**: Go, Rust, Node.js, Python/FastAPI, ClickHouse, PostgreSQL, Redis, Kafka\n• **Cloud & DevOps**: Docker, Kubernetes, CI/CD pipelines, and distributed event meshes.";
  }

  if (query.includes('who') || query.includes('about') || query.includes('background') || query.includes('name')) {
    return "Steve Jr (FU-UH Steve Junior Atsi) is a Systems Architect and Full-Stack Software Engineer with 5+ years of experience designing sub-millisecond API runtimes, distributed event meshes, and precision web applications. He holds a B.S. in Computer Science & Distributed Systems.";
  }

  return "FU-UH Steve Junior Atsi (Steve Jr) is a Systems Architect and Full-Stack Engineer specializing in high-performance distributed systems, Next.js, TypeScript, Go, and Rust. Feel free to ask about his background, flagship projects, core technical stack, or how to connect and download his resume!";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];

    if (!messages.length) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1];

    // If no API key configured, use intelligent fallback
    if (!process.env.GEMINI_API_KEY) {
      const fallbackReply = getSmartFallbackResponse(latestMessage.content);
      return NextResponse.json({ reply: fallbackReply });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Format message history for Gemini API
    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || getSmartFallbackResponse(latestMessage.content);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error);
    // Graceful fallback on any network/API issue so user experience never breaks
    try {
      const body = await req.clone().json().catch(() => ({}));
      const fallbackMsg = body.messages?.[body.messages.length - 1]?.content || '';
      return NextResponse.json({ reply: getSmartFallbackResponse(fallbackMsg) });
    } catch {
      return NextResponse.json({
        reply: "Steve Jr (FU-UH Steve Junior Atsi) is a Systems Architect & Full-Stack Engineer. Feel free to reach out to him directly at fuuhsteve10@gmail.com or explore his resume and projects on this page!"
      });
    }
  }
}
