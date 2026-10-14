# FU-UH Steve Junior Atsi | Portfolio & AI Assistant

A modern portfolio website for FU-UH Steve Junior Atsi, also known as Steve Jr, built with Next.js and tailored for showcasing engineering work, technical capabilities, and professional experience.

This project combines a premium portfolio landing page, animated project presentation, downloadable resume section, and an AI-powered assistant that answers profile-related questions using Gemini.

## Overview

This portfolio is designed to:

- Present a strong personal brand and professional introduction
- Highlight project work, systems engineering experience, and technical skills
- Showcase a modern, responsive frontend built with Next.js and Tailwind CSS
- Include an embedded AI assistant for portfolio interactions and discovery
- Provide direct contact and resume access for potential employers and collaborators

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Google GenAI / Gemini API
- Lucide React icons

## Features

- Responsive single-page portfolio experience
- Animated hero section with rotating role text and technology marquee
- Project spotlight and modal-based detail views
- Resume and contact access sections
- AI-powered chat assistant for portfolio questions
- Custom brand styling with premium dark UI aesthetics

## Project Structure

```bash
.
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AboutMe.tsx
│   ├── CareerTimeline.tsx
│   ├── CompetenciesGrid.tsx
│   ├── ConnectResumeSection.tsx
│   ├── DispatchContact.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   ├── PortfolioChatbot.tsx
│   ├── ProjectModal.tsx
│   ├── ProjectsSection.tsx
│   ├── ResumeModal.tsx
│   ├── ScrollProgress.tsx
│   └── TechLogoCarousel.tsx
├── lib/
│   ├── data.ts
│   ├── scroll.ts
│   ├── sound.ts
│   └── utils.ts
├── .gitignore
├── eslint.config.mjs
├── metadata.json
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── README.md
└── public/
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18 or newer
- npm or another package manager
- A Google AI API key for Gemini access (optional for fallback mode)

## Local Setup

1. Clone the repository:

```bash
git clone https://github.com/Fuuh-Steve/my_portfolio.git
cd my_portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Create a local environment file:

```bash
cp .env.example .env.local
```

If `.env.example` does not exist, create `.env.local` manually and add:

```bash
GEMINI_API_KEY=your_google_gemini_api_key_here
```

4. Run the app in development mode:

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates an optimized production build.

```bash
npm run start
```

Runs the built app in production mode.

```bash
npm run lint
```

Runs the project linter.

## Environment Variables

The app supports a Gemini-powered portfolio assistant via:

- `GEMINI_API_KEY`

If this key is missing, the assistant falls back to a built-in intelligent response flow so the site remains functional.

## Deployment

This project is well-suited for deployment on Vercel, which is the recommended platform for Next.js applications.

Typical deployment steps:

1. Push the repository to GitHub
2. Import the project into Vercel
3. Add the `GEMINI_API_KEY` environment variable in the Vercel dashboard
4. Deploy the app

## About the Portfolio

This portfolio reflects the work and profile of FU-UH Steve Junior Atsi, a full-stack developer and engineering student focused on:

- modern web development
- API and product-driven software
- performant frontend experiences
- practical engineering solutions
- full-stack product development

## Contact

- Email: fuuhsteve10@gmail.com
- GitHub: https://github.com/Fuuh-Steve
- LinkedIn: https://linkedin.com
- X: https://x.com

## License

This project is currently unlicensed and intended for personal portfolio use unless otherwise specified.

## Notes

The project is designed as a personal professional showcase and may be adapted for other portfolios, personal branding sites, or engineering-focused landing pages.
