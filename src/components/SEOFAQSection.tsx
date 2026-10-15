import React, { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  Gift,
  Layers,
  Code2,
  Bot,
  ShoppingBag,
  Terminal,
  Globe,
  Cpu,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
} from 'lucide-react';

export interface TechKeywordSilo {
  id: string;
  title: string;
  shortLabel: string;
  icon: React.ReactNode;
  headline: string;
  description: string;
  keywords: string[];
  proofProjects: { name: string; url: string }[];
}

export const TECH_KEYWORD_SILOS: TechKeywordSilo[] = [
  {
    id: 'nextjs-react-frontend',
    title: 'Next.js 16, React 19 & High-Speed Frontend Architecture',
    shortLabel: 'Next.js & React 19',
    icon: <Code2 className="h-4 w-4 text-emerald-400" />,
    headline: 'Sub-Second SSR/ISR Web Applications, 3D WebGL Motion & Core Web Vitals Optimization',
    description:
      'Architecting production-grade web applications with Next.js 16 App Router, React 19 Server Components, TypeScript, Tailwind CSS v4, GSAP, Framer Motion, and Three.js interactive 60fps canvas experiences engineered for 99+ Lighthouse SEO scores.',
    keywords: [
      'Hire Next.js 16 Developer',
      'React 19 TypeScript Architect',
      'Next.js App Router Specialist',
      'Server Actions & SSR/ISR',
      'Tailwind CSS UI Engineer',
      'GSAP & Framer Motion Developer',
      'Three.js & WebGL Portfolio Developer',
      'Core Web Vitals & Technical SEO Expert',
      'Frontend Performance Optimization',
      'Responsive Dark UI Design System',
    ],
    proofProjects: [
      { name: 'QuantumByte Technologies', url: 'https://www.quantumbytetechnologies.shop/' },
      { name: 'Festive Occasions Dubai', url: 'https://www.festiveoccasions.ae' },
      { name: 'Fuji Fenix Elevator', url: 'https://fujifenix.com' },
    ],
  },
  {
    id: 'sanity-headless-ecommerce',
    title: 'Sanity Headless CMS & Custom E-Commerce Platforms',
    shortLabel: 'Sanity CMS & E-Commerce',
    icon: <ShoppingBag className="h-4 w-4 text-emerald-400" />,
    headline: 'Composable Storefronts, Sanity Studio v3 Schemas, GROQ Pipelines & Multi-Currency Checkout',
    description:
      'Building scalable B2C and B2B e-commerce stores powered by Next.js and Sanity Headless CMS. Includes custom Sanity Studio dashboards, real-time GROQ product catalogs, dynamic inventory, WhatsApp/Stripe order flows, and international export portals.',
    keywords: [
      'Sanity CMS Developer',
      'Next.js Sanity E-Commerce Store',
      'Headless Commerce Architect',
      'GROQ Query Optimization',
      'Sanity Studio Custom Schema',
      'B2B Export Web Platform Developer',
      'Custom Online Store Developer Pakistan & UAE',
      'Multi-Currency E-Commerce Checkout',
      'Composable CMS Migration',
      'Product Catalog Management System',
    ],
    proofProjects: [
      { name: 'QuantumByte Store', url: 'https://www.quantumbytetechnologies.shop/' },
      { name: 'Norvia Tech Store', url: 'https://norviaitservices.site' },
      { name: 'KarachiGum B2B Export', url: 'https://www.karachigum.com/' },
      { name: 'Khizar Luxury Market', url: 'https://khizar-luxury-market.vercel.app' },
    ],
  },
  {
    id: 'agentic-ai-llm-rag',
    title: 'Agentic AI, OpenAI / Gemini SDK & Multi-Agent Systems',
    shortLabel: 'Agentic AI & LLMs',
    icon: <Bot className="h-4 w-4 text-emerald-400" />,
    headline: 'Autonomous AI Copilots, Realtime Voice Agents, RAG Knowledge Bases & Multi-Model Routers',
    description:
      'Designing deterministic multi-agent workflows using OpenAI Agents SDK, Google Gemini API, OpenRouter, and Python. Specializing in Retrieval-Augmented Generation (RAG), full-duplex voice call AI agents, autonomous digital employees, and AI coding IDEs.',
    keywords: [
      'Agentic AI Engineer',
      'OpenAI Agents SDK Developer',
      'Google Gemini API Integration',
      'RAG & Vector Database Architect',
      'Multi-Agent Orchestration Python',
      'Realtime AI Voice Call Agent',
      'OpenRouter LLM Integration',
      'Autonomous Digital FTE Developer',
      'Custom AI Chatbot & Copilot',
      'Prompt Engineering & Tool Calling',
    ],
    proofProjects: [
      { name: 'EduGenius AI Co-Pilot', url: 'https://mj-edugenius.vercel.app/' },
      { name: 'GemCode 11-in-1 Gemini IDE', url: 'https://gemcode.vercel.app' },
      { name: 'JARVIS Voice Assistant', url: 'https://j-a-r-v-i-s-mujtaba.vercel.app' },
      { name: 'CodeMentor AI Tutor', url: 'https://mentor-ai-pi.vercel.app' },
    ],
  },
  {
    id: 'whatsapp-crm-automation',
    title: 'WhatsApp Cloud API Bots & Conversational CRM Automation',
    shortLabel: 'WhatsApp AI & CRM',
    icon: <Globe className="h-4 w-4 text-emerald-400" />,
    headline: '24/7 Meta WhatsApp Business API Webhooks, Bilingual Sales Agents & Live Google Sheets CRM',
    description:
      'Engineering production WhatsApp AI agents connected to the official Meta WhatsApp Cloud API. Automates customer support, order booking, catalog lookup, lead qualification in English and Urdu/Roman Urdu, and instant CRM synchronization.',
    keywords: [
      'WhatsApp Cloud API Developer',
      'Custom WhatsApp AI Chatbot',
      'Meta Business API Webhook Engineer',
      'Automated WhatsApp Sales Funnel',
      'Multi-Tenant SaaS Bot Builder',
      'Google Sheets CRM Automation',
      '24/7 AI Customer Support Agent',
      'Bilingual Urdu & English AI Bot',
      'Conversational Commerce Engineer',
      'Lead Qualification Bot',
    ],
    proofProjects: [
      { name: 'BotFlow WhatsApp AI Platform', url: 'https://whatsappbotbuilder-two.vercel.app' },
    ],
  },
  {
    id: 'playwright-scraping-leads',
    title: 'Playwright Browser Automation & B2B Lead Generation Bots',
    shortLabel: 'Playwright & Lead Bots',
    icon: <Cpu className="h-4 w-4 text-emerald-400" />,
    headline: 'Autonomous Headless Chromium Crawlers, Google Maps B2B Scrapers & Data Enrichment Pipelines',
    description:
      'Building resilient browser automation systems with Python and Playwright that extract verified B2B business leads from Google Maps, crawl company websites for emails and phone numbers, deduplicate records, and sync directly to Google Sheets.',
    keywords: [
      'Playwright Automation Engineer',
      'Google Maps B2B Lead Scraper',
      'Python Web Scraping Specialist',
      'Headless Browser Bot Developer',
      'Automated Email & Contact Extractor',
      'B2B Outbound Data Pipeline',
      'Google Sheets API Sync Bot',
      'Anti-Detection Web Crawler',
      'Workflow & RPA Automation',
      'Custom Data Mining Scripts',
    ],
    proofProjects: [
      { name: 'SetupCI & Automation Suite', url: 'https://setupci.vercel.app' },
    ],
  },
  {
    id: 'python-fastapi-django-cli',
    title: 'Python Backend, FastAPI, Django & PyPI CLI Packages',
    shortLabel: 'Python, FastAPI & CLI',
    icon: <Terminal className="h-4 w-4 text-emerald-400" />,
    headline: 'High-Concurrency REST APIs, Published PyPI Developer Tools & FFmpeg Media Engines',
    description:
      'Developing robust Python backends with FastAPI and Django REST Framework, publishing installable developer CLI packages on PyPI (`pip install setupci`), building Windows system utilities (`MJ FTE`), and orchestrating yt-dlp + FFmpeg media pipelines.',
    keywords: [
      'Python Backend Developer',
      'FastAPI Microservices Engineer',
      'Django REST Framework Developer',
      'PyPI Package Author & Maintainer',
      'Python CLI Tool Developer',
      'FFmpeg & yt-dlp Video Pipeline',
      ' PostgreSQL & Supabase Architect',
      'RESTful API & Webhook Design',
      'Windows System Automation Python',
      'Full-Stack Python & Next.js Engineer',
    ],
    proofProjects: [
      { name: 'SetupCI on PyPI', url: 'https://pypi.org/project/setupci/' },
      { name: 'MJ FTE Disk Analyzer CLI', url: 'https://mjfte.vercel.app/' },
    ],
  },
  {
    id: 'devops-cloud-security',
    title: 'Cloud DevOps, CI/CD Pipelines & Cybersecurity Interfaces',
    shortLabel: 'DevOps & Cloud Security',
    icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />,
    headline: 'Automated GitHub Actions CI/CD, Docker Containers, Edge Deployments & Enterprise Security UI',
    description:
      'Streamlining developer velocity with automated repository scaffolding, GitHub Actions CI/CD workflows, Docker containerization, Vercel/Firebase edge hosting, and enterprise cybersecurity command center interfaces.',
    keywords: [
      'DevOps & CI/CD Engineer',
      'GitHub Actions Workflow Automation',
      'Docker & Container Deployment',
      'Vercel & Cloud Edge Architect',
      'Cybersecurity Dashboard UI Developer',
      'Automated Project Scaffolding',
      'Linux Server & Cloud Infrastructure',
      'Zero-Downtime Web Deployment',
    ],
    proofProjects: [
      { name: 'Edgeway Security Inc.', url: 'https://security-dark-ui.vercel.app' },
      { name: 'SetupCI Bootstrapper', url: 'https://setupci.vercel.app' },
    ],
  },
  {
    id: 'mobile-edtech-robotics',
    title: 'React Native Mobile Apps, EdTech AI & Humanoid Robotics',
    shortLabel: 'Mobile, EdTech & Robotics',
    icon: <Smartphone className="h-4 w-4 text-emerald-400" />,
    headline: 'Cross-Platform Expo Mobile Apps, AI Learning Platforms & Embodied Physical AI Systems',
    description:
      'Creating cross-platform iOS/Android mobile apps with React Native and Expo, interactive AI e-learning ecosystems (`EduGenius`, `StudEdu`), and Physical AI & Humanoid Robotics simulation and documentation portals.',
    keywords: [
      'React Native & Expo Developer',
      'EdTech AI Platform Engineer',
      'Physical AI & Humanoid Robotics',
      'Cross-Platform Mobile App Developer',
      'AI Quiz & Exam Generator',
      'Interactive E-Learning Web App',
      'Instant PDF Resume Builder Developer',
      'Weather & Telemetry Web Apps',
    ],
    proofProjects: [
      { name: 'Physical AI & Humanoid Robotics', url: 'https://physical-ai-nine.vercel.app/' },
      { name: 'StudEdu E-Learning AI', url: 'https://studedu-ai.web.app/' },
      { name: 'FastCV Instant Resume Builder', url: 'https://fastcv-beta.vercel.app' },
    ],
  },
];

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  tag: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-who',
    tag: 'Profile & Leadership',
    question: 'Who is Syed Mujtaba Abbas and what technologies does he specialize in?',
    answer:
      'Syed Mujtaba Abbas is an AI-Focused Full-Stack Developer, Agentic AI Engineer, and Founder of AlphaMind, AlphaTech AI, and SetupCI based in Karachi, Pakistan (PKT / UTC+5). He specializes in Next.js 16, React 19, TypeScript, Sanity Headless CMS, Python (FastAPI & Django), OpenAI Agents SDK, Google Gemini API, WhatsApp Cloud API automation, Playwright web scraping, and PyPI CLI package engineering.',
  },
  {
    id: 'faq-ecommerce',
    tag: 'Next.js & Sanity CMS',
    question:
      'Which production Next.js and Sanity CMS e-commerce platforms has Syed Mujtaba Abbas built?',
    answer:
      'His shipped e-commerce and B2B platforms include QuantumByte Technologies (quantumbytetechnologies.shop — Next.js + Sanity CMS hardware store & IT hub), Fuji Fenix Elevator (fujifenix.com — multi-page Next.js + Sanity CMS + Admin App), Norvia Tech & Digital Services (norviaitservices.site), Festive Occasions Dubai (festiveoccasions.ae), KarachiGum (karachigum.com + Django/Next.js Admin), Ayesha Fashion Style, and Khizar Luxury Market.',
  },
  {
    id: 'faq-ai-agents',
    tag: 'Agentic AI & Automation',
    question:
      'What autonomous AI agents, WhatsApp bots, and Python CLI tools has Syed Mujtaba Abbas engineered?',
    answer:
      'He created SetupCI (`pip install setupci` on PyPI), MJ FTE (Windows disk analyzer & cleaner CLI), BotFlow (Multi-Tenant WhatsApp Cloud AI Agent Platform), LeadHunter v2 (24/7 Playwright Google Maps B2B lead discovery + Google Sheets CRM sync), EduGenius (AI learning & quiz co-pilot), GemCode (11-in-1 Gemini AI coding workspace), ClipCompress (Next.js 16 + FastAPI + FFmpeg media pipeline), Agentica, and AIZA AI.',
  },
  {
    id: 'faq-pricing',
    tag: 'Packages & Pricing',
    question:
      'What are the current development packages and discounted launch offers?',
    answer:
      'Syed Mujtaba Abbas offers 4 transparent launch bundles: (1) Next.js 16 + Sanity CMS Full E-Commerce Store for $149 / Rs. 42,000 (Code: QUANTUM-149), (2) 24/7 Autonomous WhatsApp AI Agent + Live CRM Sync for $99 / Rs. 28,000 (Code: BOTFLOW-99), (3) High-Converting Business Website + AI Chat Widget for $79 / Rs. 22,000 (Code: WEB-LAUNCH-79), and (4) Autonomous B2B LeadHunter Bot + Google Sheets Sync for $69 / Rs. 19,500 (Code: LEADS-69).',
  },
  {
    id: 'faq-collaboration',
    tag: 'Global Remote Delivery',
    question:
      'Can international clients in the USA, UK, UAE (Dubai), Europe, and Pakistan hire Syed Mujtaba Abbas?',
    answer:
      'Yes. Syed Mujtaba Abbas works with founders, agencies, and enterprises across the USA, UK, UAE (Dubai), Saudi Arabia, Europe, and Pakistan. Every engagement follows a 4-stage milestone workflow (Architecture -> Full-Stack & AI Build -> QA & Security Hardening -> Production Launch & Sanity Handover) with direct communication via WhatsApp (+92 346 0630802), GitHub, or email (abbasmujtaba125@gmail.com).',
  },
];

interface SEOFAQSectionProps {
  onOpenOffersPopup: () => void;
  onOpenAllProjects: () => void;
}

export const SEOFAQSection: React.FC<SEOFAQSectionProps> = ({
  onOpenOffersPopup,
  onOpenAllProjects,
}) => {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);
  const [activeSiloId, setActiveSiloId] = useState<string>(TECH_KEYWORD_SILOS[0].id);

  const activeSilo =
    TECH_KEYWORD_SILOS.find((s) => s.id === activeSiloId) || TECH_KEYWORD_SILOS[0];

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative border-t border-white/[0.07] bg-[#060609] py-20 sm:py-28 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8 space-y-20">
        {/* PART 1: Interactive 8-Domain Tech Keyword & Capabilities Matrix */}
        <div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Full-Spectrum Tech Authority &amp; Capabilities Matrix</span>
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Production expertise across{' '}
                <span className="text-platinum">8 core technology domains.</span>
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Select any technology pillar below to inspect verified capabilities, search specializations, and live deployed systems built by Syed Mujtaba Abbas.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 self-start lg:self-end">
              <button
                type="button"
                onClick={onOpenOffersPopup}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all cursor-pointer"
              >
                <Gift className="h-3.5 w-3.5" />
                <span>Launch Packages ($69–$149)</span>
              </button>
              <button
                type="button"
                onClick={onOpenAllProjects}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#121217] px-4 py-2.5 text-xs font-semibold text-white hover:border-white/35 transition-all cursor-pointer"
              >
                <Layers className="h-3.5 w-3.5 text-zinc-400" />
                <span>All 25 Shipped Systems</span>
              </button>
            </div>
          </div>

          {/* 8 Domain Selector Pills */}
          <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Technology Specialization Domains">
            {TECH_KEYWORD_SILOS.map((silo) => {
              const selected = silo.id === activeSilo.id;
              return (
                <button
                  key={silo.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveSiloId(silo.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all cursor-pointer border ${
                    selected
                      ? 'border-white/30 bg-white text-zinc-950 shadow-sm'
                      : 'border-white/10 bg-[#0D0D12] text-zinc-300 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <span className={selected ? 'text-zinc-950' : ''}>{silo.icon}</span>
                  <span>{silo.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tech Domain Detail Card */}
          <div className="rounded-3xl border border-white/12 bg-[#0C0C11] p-6 sm:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1 font-mono-tech text-[11px] text-emerald-400">
                  {activeSilo.icon}
                  <span>{activeSilo.title}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {activeSilo.headline}
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {activeSilo.description}
                </p>

                {/* Live Proof Links */}
                <div className="pt-2">
                  <div className="font-mono-tech text-[10px] uppercase tracking-wider text-zinc-500 mb-2.5">
                    Verified Production Proof Systems:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeSilo.proofProjects.map((proj) => (
                      <a
                        key={proj.name}
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-500/20 transition-all"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>{proj.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Indexed Tech Keywords & Capabilities */}
              <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#08080C] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-[10px] uppercase tracking-wider text-zinc-400">
                    Specializations &amp; Search Keywords
                  </span>
                  <span className="font-mono-tech text-[10px] text-emerald-400">
                    {activeSilo.keywords.length} Core Capabilities
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeSilo.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="rounded-lg border border-white/10 bg-[#121218] px-2.5 py-1 text-[11px] font-medium text-zinc-200"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Crawlable Semantic Directory of All 8 Domains for Search Engine Indexing */}
          <div className="sr-only" aria-hidden="false">
            <h3>Complete Technology Keyword &amp; Engineering Specialization Index — Syed Mujtaba Abbas</h3>
            {TECH_KEYWORD_SILOS.map((silo) => (
              <article key={silo.id}>
                <h4>{silo.title} — {silo.headline}</h4>
                <p>{silo.description}</p>
                <ul>
                  {silo.keywords.map((kw) => (
                    <li key={kw}>{kw} — Syed Mujtaba Abbas</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        {/* PART 2: Frequently Asked Questions (FAQPage Schema Matched) */}
        <div className="pt-8 border-t border-white/[0.07]">
          <div className="max-w-2xl space-y-2 mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#121216] px-3.5 py-1 text-xs font-medium text-zinc-300">
              <HelpCircle className="h-3.5 w-3.5 text-zinc-400" />
              <span>Frequently Asked Questions</span>
            </span>
            <h2
              id="faq-heading"
              className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white"
            >
              Everything clients &amp; recruiters{' '}
              <span className="text-platinum">ask before starting.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-3">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all ${
                      isOpen
                        ? 'border-white/25 bg-[#111117]'
                        : 'border-white/[0.08] bg-[#0B0B0F] hover:border-white/15'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenId(isOpen ? '' : item.id)}
                      className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                    >
                      <div>
                        <span className="font-mono-tech text-[10px] uppercase tracking-wider text-emerald-400">
                          {item.tag}
                        </span>
                        <h3 className="font-display text-base sm:text-lg font-bold text-white mt-1">
                          {item.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-zinc-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6 text-sm text-zinc-300 leading-relaxed border-t border-white/[0.07] pt-4">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right 4 Cols: SEO & Performance Readiness Summary Card */}
            <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#0C0C10]/95 p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Sparkles className="h-4 w-4" />
                <span>Global Search &amp; AI-Index Ready</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                Engineered for Top-Tier Discovery
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Structured with 7 linked Schema.org JSON-LD entities (`ProfilePage`, `Person`, `ProfessionalService`, `OfferCatalog`, `ItemList`, `FAQPage`, `WebSite`), 80+ high-intent tech keywords, Google Image Sitemap, and `/llms.txt`.
              </p>
              <div className="space-y-2 pt-2 border-t border-white/[0.08] font-mono-tech text-[11px] text-zinc-300">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">JSON-LD Entities</span>
                  <span className="text-emerald-400">7 Linked Schemas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Tech Keyword Silos</span>
                  <span className="text-emerald-400">8 Domains (80+ Terms)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Indexed Systems</span>
                  <span className="text-white">25 Projects + Images</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">AI Crawler Index</span>
                  <a
                    href="/llms.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline hover:text-emerald-300"
                  >
                    /llms.txt Active
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">XML + Image Sitemap</span>
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline hover:text-emerald-300"
                  >
                    /sitemap.xml Active
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
