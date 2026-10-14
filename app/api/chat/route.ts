import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_INSTRUCTION = `You are Steve Jr's AI Portfolio Assistant, an intelligent, articulate, and friendly representative embedded directly into FU-UH Steve Junior Atsi's portfolio web application.

ABOUT STEVE JR:
- Full Name: FU-UH Steve Junior Atsi
- Professional Moniker / Brand: Steve Jr
- Primary Role: Full-Stack Software Engineer
- Current Stage: Year 4 Engineering Student
- Community Focus: Community builder and technology advocate
- Primary Email: fuuhsteve10@gmail.com
- Location: Open to opportunities worldwide and available for remote collaboration.
- Professional Focus: Building modern web applications, APIs, relational databases, application architecture, and production-ready product features.

CORE BACKGROUND:
- Steve Jr is a full-stack software engineer with a strong interest in building modern web applications that are thoughtful, scalable, and useful.
- He is currently in Year 4 of his engineering studies, balancing academic growth with hands-on software engineering experience.
- He is also a community builder who enjoys helping others learn, connect, and grow in technology.
- He focuses on product-oriented engineering and practical implementation across frontend, backend, and database layers.

TECHNICAL SKILLS:
- Frontend: React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS
- Backend: NestJS, Node.js, REST APIs, application architecture, backend logic
- Data & Systems: Relational databases, API design, database modeling, scalable app design
- Platform & Learning: Cloud computing, cybersecurity, modern software tooling, and continuous technical learning
- Product Workflow: Building production-ready features for web and mobile platforms

PROJECT & WORK APPROACH:
- Builds modern web applications with clean architecture and quality user experience.
- Works across frontend, backend, APIs, and databases to deliver end-to-end product features.
- Enjoys solving real-world engineering challenges with a focus on maintainability and scalability.
- Continuously seeks new knowledge in cloud infrastructure, cybersecurity, and emerging technologies.

RESUME & CONTACT:
- Resume can be viewed and downloaded directly in the "Connect & Resume" section on the portfolio page.
- Email: fuuhsteve10@gmail.com
- Steve Jr is open to engineering roles, collaborations, internship opportunities, and community-driven technical work.

GUIDELINES FOR YOUR RESPONSES:
- Be concise, professional, warm, and approachable.
- Speak in the first person when appropriate, or refer to Steve Jr in the third person.
- Reflect his identity as a Year 4 engineering student, full-stack engineer, and community builder.
- When asked about his experience, emphasize React, Next.js, TypeScript, JavaScript, NestJS, API design, relational databases, application architecture, and production-ready feature delivery.
- When asked about learning, mention cloud computing and cybersecurity as active areas of growth.
- If asked about technologies or projects not in his profile, politely steer the conversation back to full-stack web development, architecture, and engineering education.
- When asked how to contact him, provide his email: fuuhsteve10@gmail.com.`;

function getSmartFallbackResponse(userPrompt: string): string {
  const query = userPrompt.toLowerCase();

  if (query.includes('resume') || query.includes('cv') || query.includes('download')) {
    return "You can download Steve Jr's full official resume (PDF) or preview his complete dossier right in the 'Connect & Resume' section on this page! It includes his engineering profile, skills, and academic and professional background.";
  }

  if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('reach')) {
    return "You can reach out to Steve Jr directly via email at fuuhsteve10@gmail.com. He is open to software engineering opportunities, collaborations, and meaningful product work while continuing his studies!";
  }

  if (query.includes('project') || query.includes('work') || query.includes('built')) {
    return "Steve Jr's featured projects include:\n\n• **HyperScale AI Orchestrator**: A high-throughput token dispatch engine for multi-agent LLM systems.\n• **DevPulse Telemetry Platform**: Real-time OLAP observability processing millions of microservice traces in ClickHouse.\n• **Kite Headless UI Engine**: An open-source Rust & WebAssembly token compiler with 1,200+ stars.\n\nYou can explore each project with live architectures right in the Projects section above!";
  }

  if (query.includes('stack') || query.includes('skill') || query.includes('language') || query.includes('tech')) {
    return "Steve Jr's core technical stack spans:\n\n• **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, WebAssembly\n• **Backend & Systems**: Go, Rust, Node.js, Python/FastAPI, ClickHouse, PostgreSQL, Redis, Kafka\n• **Cloud & DevOps**: Docker, Kubernetes, CI/CD pipelines, and distributed event meshes.";
  }

  if (query.includes('who') || query.includes('about') || query.includes('background') || query.includes('name')) {
    return "Steve Jr (FU-UH Steve Junior Atsi) is a full-stack developer and engineering student building modern web products, APIs, and polished user experiences. He is focused on practical software engineering, product development, and continuous learning in cloud and cybersecurity.";
  }

  return "FU-UH Steve Junior Atsi (Steve Jr) is a full-stack developer and engineering student focused on React, Next.js, TypeScript, backend systems, and product-oriented software. Feel free to ask about his background, skills, projects, or how to connect and download his resume!";
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
        reply: "Steve Jr (FU-UH Steve Junior Atsi) is a full-stack developer and engineering student focused on modern web products, APIs, and practical software solutions. Feel free to reach out to him directly at fuuhsteve10@gmail.com or explore his resume and projects on this page!"
      });
    }
  }
}
