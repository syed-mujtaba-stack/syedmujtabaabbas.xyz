export interface PortfolioProject {
  id: string;
  name: string;
  tagline: string;
  category: string;
  filterCategory:
    | 'All'
    | 'E-Commerce & B2B'
    | 'AI & Agents'
    | 'Full-Stack & Web'
    | 'Dev Tooling & Automation';
  featured: boolean;
  summary: string;
  stack: string[];
  liveUrl?: string;
  previewImage: string;
  verificationNote?: string;
  caseStudy: {
    problem: string;
    role: string;
    solution: string;
    keyDecisions: string[];
    verifiedOutcomes: string[];
  };
}

export interface SkillItem {
  name: string;
  context: string;
  core?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  architectureNote: string;
  skills: SkillItem[];
}

export interface AgentNode {
  id: string;
  label: string;
  sublabel: string;
  type: 'trigger' | 'orchestrator' | 'rag' | 'tool' | 'human' | 'output';
  latency: string;
  statusText: string;
  payloadSample: string;
}

export interface AgentWorkflowScenario {
  id: string;
  name: string;
  linkedProjectName: string;
  linkedLiveUrl?: string;
  architecturePattern: string;
  summary: string;
  nodes: AgentNode[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  subtitle: string;
  period: string;
  current?: boolean;
  description: string;
  highlights: string[];
  tags: string[];
}

export interface EducationItem {
  id: string;
  index: string;
  degree: string;
  institution: string;
  location: string;
  focus: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  technologies: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Syed Mujtaba Abbas',
    shortName: 'Mujtaba Abbas',
    monogram: 'M.J',
    title: 'Full-Stack Developer · Agentic AI Developer · DevOps & Cloud Engineer',
    location: 'Karachi, Pakistan',
    timezone: 'PKT / UTC+5',
    availability: 'Available for Select Full-Stack, Agentic AI & Sanity CMS Projects',
    heroIntro:
      'I architect and ship production Next.js & Sanity CMS e-commerce platforms, autonomous AI agent workflows (OpenAI Agents SDK, Gemini, Playwright), and developer CLI tools published on PyPI.',
    portraitUrl: '/portraits/mujtaba-executive-studio.png',
    originalPhotoUrl: 'https://www.syedmujtabaabbas.xyz/profile.png',
  },

  about: {
    leadParagraph:
      'I am an AI-Focused Full-Stack Developer, Agentic AI Engineer, and Founder based in Karachi, Pakistan. I specialize in connecting modern web interfaces (Next.js, React, TypeScript, Tailwind CSS, Sanity CMS) with resilient Python backends (FastAPI, Django, Flask) and autonomous LLM agent pipelines.',
    secondaryParagraph:
      'Across 25+ shipped platforms and open-source tools on GitHub (@syed-mujtaba-stack)—including QuantumByte Technologies, EduGenius, SetupCI (published on PyPI), KarachiGum, Fuji Fenix Elevator, Festive Occasions Dubai, and LeadHunter v2—I focus on software that eliminates operational bottlenecks and scales cleanly in production.',
    philosophyTitle: 'Engineering Philosophy',
    philosophyQuote:
      'Great software pairs fast, human-crafted interfaces with autonomous backend systems that remove repetitive work rather than adding complexity.',
    pillars: [
      {
        title: 'Full-Stack Web & Sanity CMS Commerce',
        subtitle: 'Next.js · TypeScript · Sanity Headless CMS · Tailwind CSS',
        description:
          'Engineering fast, SEO-hardened e-commerce storefronts, industrial B2B catalogs, and custom administrative portals backed by Sanity CMS, Django, and PostgreSQL.',
      },
      {
        title: 'Autonomous AI & Agentic Systems',
        subtitle: 'OpenAI Agents SDK · Google Gemini · WhatsApp Cloud API · Playwright',
        description:
          'Building multi-step AI agents that execute real business operations—from 24/7 WhatsApp customer handling and Google Maps B2B lead discovery to interactive AI coding workspaces.',
      },
      {
        title: 'Developer Tooling, CLI & Media Pipelines',
        subtitle: 'Python · PyPI (`setupci`) · FastAPI · FFmpeg · Docker',
        description:
          'Creating zero-friction CLI tools published on PyPI, Windows system analyzers, and asynchronous FastAPI + FFmpeg media compression pipelines.',
      },
    ],
    processSteps: [
      {
        id: '01',
        title: 'System & Schema Architecture',
        text: 'Define data models, Sanity GROQ schemas, API contracts, and agent boundaries before writing UI code.',
      },
      {
        id: '02',
        title: 'Full-Stack & AI Implementation',
        text: 'Build strictly typed Next.js frontends paired with FastAPI/Django backends and grounded LLM tool-calling pipelines.',
      },
      {
        id: '03',
        title: 'Performance & Safety Hardening',
        text: 'Enforce structured JSON outputs, deduplication guardrails, responsive Retina UI polish, and Core Web Vitals optimization.',
      },
      {
        id: '04',
        title: 'Production Deployment & Handoff',
        text: 'Ship with CI/CD automation, custom domain SSL, Sanity Studio training, and transparent telemetry.',
      },
    ],
  },

  skillCategories: [
    {
      id: 'frontend-cms',
      title: 'Frontend, Full-Stack Web & Headless CMS',
      shortTitle: 'Next.js & Sanity CMS',
      summary: 'Production web applications, SSR storefronts, and headless content studios.',
      architectureNote:
        'Used in QuantumByte Technologies, Fuji Fenix Elevator, Norvia, Festive Occasions Dubai, and KarachiGum.',
      skills: [
        {
          name: 'Next.js (App Router / v16)',
          context: 'SSR, RSC, dynamic routing, SEO metadata & Vercel edge delivery',
          core: true,
        },
        {
          name: 'Sanity Headless CMS',
          context: 'Custom Studio schemas, GROQ queries & real-time inventory management',
          core: true,
        },
        {
          name: 'TypeScript & React 19',
          context: 'Strictly typed component systems, interactive state & custom hooks',
          core: true,
        },
        {
          name: 'Tailwind CSS',
          context: 'Bespoke responsive layouts, dark-mode systems & micro-interactions',
        },
        {
          name: 'Three.js / HTML5 Canvas & Motion',
          context: '60fps interactive procedural backgrounds, GSAP & Framer Motion',
        },
        {
          name: 'React Native & Expo',
          context: 'Cross-platform mobile application architecture (EduGenius Mobile)',
        },
      ],
    },
    {
      id: 'agentic-ai',
      title: 'Agentic AI, LLMs & Autonomous Automation',
      shortTitle: 'Agentic AI & LLMs',
      summary: 'Multi-agent orchestration, conversational webhooks, and browser automation.',
      architectureNote:
        'Used in EduGenius, BotFlow WhatsApp Agent, LeadHunter v2, GemCode, Agentica, and AIZA AI.',
      skills: [
        {
          name: 'OpenAI Agents SDK & APIs',
          context: 'Multi-step agent reasoning, function calling & structured JSON outputs',
          core: true,
        },
        {
          name: 'Google Gemini API',
          context: 'GemCode 11-in-1 AI coding suite, CodeMentor AI & curriculum synthesis',
          core: true,
        },
        {
          name: 'WhatsApp Cloud API & Webhooks',
          context: 'Multi-tenant conversational AI agents & automated customer triage',
          core: true,
        },
        {
          name: 'Playwright Browser Automation',
          context: '24/7 headless Google Maps B2B lead scraping & multi-page contact crawling',
        },
        {
          name: 'Semantic Query Routing & RAG',
          context: 'Intent classification, multi-model dispatch & grounded context retrieval',
        },
        {
          name: 'Web Speech & Voice Synthesis',
          context: 'Browser-native voice recognition & spoken assistant pipelines (JARVIS)',
        },
      ],
    },
    {
      id: 'backend-python',
      title: 'Python Backends, APIs & Databases',
      shortTitle: 'Python & Backends',
      summary: 'High-concurrency REST APIs, relational data stores, and OAuth2 integrations.',
      architectureNote:
        'Used across ClipCompress, KarachiGum Admin, LeadHunter v2, and BotFlow.',
      skills: [
        {
          name: 'Python',
          context: 'Core language for AI agents, PyPI CLI packages (`setupci`) & automation',
          core: true,
        },
        {
          name: 'FastAPI',
          context: 'Async REST endpoints, webhook ingestion & background media workers',
          core: true,
        },
        {
          name: 'Django & Flask',
          context: 'Enterprise admin backends (`karachigum-admin-panel`) & REST APIs',
          core: true,
        },
        {
          name: 'Supabase & PostgreSQL',
          context: 'Relational schema design, authentication & real-time state persistence',
        },
        {
          name: 'SQLite & MongoDB',
          context: 'Zero-duplicate local hash stores & flexible document collections',
        },
        {
          name: 'Google Sheets API v4 & OAuth2',
          context: 'Automated CRM lead streaming & service-account synchronization',
        },
      ],
    },
    {
      id: 'devops-tooling',
      title: 'Developer Tooling, CLI, Media & Cloud Ops',
      shortTitle: 'CLI, DevOps & Media',
      summary: 'Published Python packages, FFmpeg transcoding, and CI/CD automation.',
      architectureNote:
        'Used in SetupCI (PyPI), MJ FTE Windows Cleaner, ClipCompress, and AIDev CLI.',
      skills: [
        {
          name: 'PyPI Package Publishing',
          context: 'Creator & maintainer of `setupci` (`pip install setupci`)',
          core: true,
        },
        {
          name: 'FFmpeg & yt-dlp Media Engine',
          context: 'Multi-platform video extraction & H.264/AAC bitrate compression',
          core: true,
        },
        {
          name: 'CLI Architecture (Typer / Click)',
          context: 'Interactive terminal tools (`setupci`, `mj-fte`, `aidev-cli`)',
          core: true,
        },
        {
          name: 'Git, GitHub Actions & CI/CD',
          context: 'Automated build pipelines, repository scaffolding & release workflows',
        },
        {
          name: 'Vercel, Firebase & Cloud Hosting',
          context: 'Production SSL deployments, edge caching & serverless functions',
        },
        {
          name: 'Windows System & File APIs',
          context: 'Safe cache analysis, SHA-256 duplicate detection & storage recovery',
        },
      ],
    },
  ] as SkillCategory[],

  projects: [
    // =========================================================================
    // 4 FEATURED PROJECTS (Displayed on Home Page + All Projects Page)
    // =========================================================================
    {
      id: 'quantumbyte',
      name: 'QuantumByte Technologies',
      tagline: 'Next-Gen Hardware E-Commerce Store & Enterprise IT Solutions Hub',
      category: 'Next.js · Sanity CMS · E-Commerce & IT Hub',
      filterCategory: 'E-Commerce & B2B',
      featured: true,
      summary:
        'Flagship technology e-commerce storefront and B2B IT services platform built with Next.js and Sanity CMS. Features real-time hardware catalog management (gaming laptops, custom rigs, networking gear) alongside custom software and AI service inquiry portals.',
      stack: ['Next.js', 'Sanity CMS', 'TypeScript', 'Tailwind CSS', 'React', 'GROQ'],
      liveUrl: 'https://www.quantumbytetechnologies.shop/',
      previewImage: '/projects/quantumbyte-preview.png',
      caseStudy: {
        problem:
          'Hardware retailers and enterprise IT providers often split their digital presence between static corporate sites and slow legacy stores, making it hard for customers to shop live hardware inventory while requesting custom IT deployments.',
        role: 'Lead Full-Stack Developer & Sanity CMS Architect',
        solution:
          'Engineered a unified Next.js App Router platform powered by Sanity Headless CMS (GROQ) that combines a high-speed dark-mode hardware store with an enterprise IT & AI solutions portal.',
        keyDecisions: [
          'Structured custom Sanity CMS schemas for laptops, GPUs, networking hardware, pricing tiers, and live stock status',
          'Built dual conversion funnels supporting both direct hardware cart checkout and enterprise IT consultation requests',
          'Optimized responsive high-DPI product imagery and SEO metadata across all catalog routes',
        ],
        verifiedOutcomes: [
          'Deployed in production at quantumbytetechnologies.shop',
          'Enabled instant non-technical catalog updates and price management via Sanity Studio',
          'Unified B2C hardware retail and B2B software/IT consulting under one scalable architecture',
        ],
      },
    },
    {
      id: 'edugenius',
      name: 'EduGenius',
      tagline: 'AI-Powered Learning Co-Pilot, Summarizer & Quiz Generator',
      category: 'EdTech SaaS · Generative AI Platform',
      filterCategory: 'AI & Agents',
      featured: true,
      summary:
        'An intelligent educational co-pilot that transforms raw study material and chapters into structured summaries, Q&A flashcards, and personalized multiple-choice assessments in seconds.',
      stack: ['Next.js', 'TypeScript', 'Python', 'OpenAI / Gemini API', 'Tailwind CSS'],
      liveUrl: 'https://mj-edugenius.vercel.app/',
      previewImage: '/projects/edugenius-preview.png',
      caseStudy: {
        problem:
          'Students and educators spend hours manually converting textbook chapters and lecture notes into practice tests, revision summaries, and flashcards.',
        role: 'Founder & Lead Full-Stack AI Engineer',
        solution:
          'Built a full-stack Next.js and LLM-powered learning platform that parses study topics and generates structured, difficulty-calibrated quizzes and chapter summaries in real time.',
        keyDecisions: [
          'Enforced strict JSON schema outputs from OpenAI/Gemini prompts to guarantee valid quiz rendering',
          'Expanded the ecosystem with a dark-mode Study Companion (`edugenius.vercel.app`) and React Native Expo mobile app',
          'Designed a clean, distraction-free study interface with instant answer explanations',
        ],
        verifiedOutcomes: [
          'Live production platform at mj-edugenius.vercel.app with companion Pro and Mobile repositories',
          'Reduced revision and quiz creation workflows from hours to seconds per chapter',
        ],
      },
    },
    {
      id: 'setupci',
      name: 'SetupCI',
      tagline: 'Published Python CLI Tool (`pip install setupci`) for Instant Scaffolding',
      category: 'Developer Tooling · PyPI Package & Web Portal',
      filterCategory: 'Dev Tooling & Automation',
      featured: true,
      summary:
        'An open-source developer productivity CLI published on PyPI that eliminates boilerplate setup by scaffolding project directories, Git repositories, virtual environments, and CI workflows in one command.',
      stack: ['Python', 'PyPI', 'Typer / Click', 'Git Automation', 'Next.js Docs'],
      liveUrl: 'https://setupci.vercel.app',
      previewImage: '/projects/setupci-preview.png',
      caseStudy: {
        problem:
          'Developers repeatedly lose momentum wiring up directory trees, `.gitignore` files, virtual environments, and CI configurations every time they start a new repository.',
        role: 'Creator & Core Maintainer',
        solution:
          'Created and published the `setupci` Python CLI package to PyPI alongside a full documentation and showcase portal at `setupci.vercel.app`.',
        keyDecisions: [
          'Packaged for global installation via `pip install setupci` with zero-config CLI flags',
          'Automated directory generation, Git initialization, and stack-specific boilerplate templates',
          'Built a dark-mode developer documentation site on Vercel with interactive terminal previews',
        ],
        verifiedOutcomes: [
          'Published and maintained on official PyPI (`pypi.org/project/setupci/`)',
          'Live web documentation and quickstart portal at setupci.vercel.app',
        ],
      },
    },
    {
      id: 'karachigum',
      name: 'KarachiGum',
      tagline: 'Global B2B Industrial Guar Gum Export Platform & Admin Suite',
      category: 'B2B Industrial Export · Next.js & Django Admin',
      filterCategory: 'E-Commerce & B2B',
      featured: true,
      summary:
        'Corporate B2B web platform and Django/Next.js administrative ecosystem built for a Pakistani guar gum exporter to showcase food, pharmaceutical, and industrial grade specifications to global buyers.',
      stack: ['Next.js', 'React', 'Tailwind CSS', 'Django REST API', 'B2B SEO'],
      liveUrl: 'https://www.karachigum.com/',
      previewImage: '/projects/karachigum-preview.png',
      caseStudy: {
        problem:
          'International commodity buyers require clear technical grade specifications, quality certifications, and fast RFQ inquiry routing before initiating bulk export orders.',
        role: 'Full-Stack Web Developer',
        solution:
          'Built the public B2B export showcase (`karachigum.com`) paired with a dedicated Django REST API + Next.js Admin Control Panel (`karachigum-admin-panel`).',
        keyDecisions: [
          'Organized product architecture by industrial application (food grade, pharmaceuticals, textiles, oil drilling)',
          'Developed a separate full-stack admin portal using Django and Next.js for inventory and inquiry management',
          'Optimized page speed and international trade SEO metadata for global procurement teams',
        ],
        verifiedOutcomes: [
          'Delivered live corporate B2B export platform at karachigum.com',
          'Streamlined international trade inquiry capture and catalog administration',
        ],
      },
    },

    // =========================================================================
    // 17 ADDITIONAL GITHUB PROJECTS (Displayed on Dedicated All Projects Page)
    // =========================================================================
    {
      id: 'festive-occasions',
      name: 'Festive Occasions Dubai',
      tagline: 'Luxury Holiday & Event Decoration Platform in Dubai, UAE',
      category: 'Luxury Brand Web · Next.js & TypeScript',
      filterCategory: 'E-Commerce & B2B',
      featured: false,
      summary:
        'Bespoke luxury holiday decoration and event styling platform (`festiveoccasions.ae`) serving residential villas, hotels, and corporate venues across Dubai and the UAE.',
      stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Local UAE SEO'],
      liveUrl: 'https://www.festiveoccasions.ae',
      previewImage: '/projects/festive-preview.png',
      caseStudy: {
        problem:
          'Luxury seasonal styling brands in Dubai need a visual-first digital flagship that converts high-net-worth villa owners and corporate event planners into booked consultations.',
        role: 'Lead Full-Stack Web Developer',
        solution:
          'Designed and engineered `festiveoccasions.ae` with Next.js and TypeScript, featuring curated installation galleries, service packages, and direct consultation booking.',
        keyDecisions: [
          'Implemented high-DPI lookbook galleries with fast Next/Image optimization',
          'Structured local UAE SEO targeting Dubai residential communities and commercial venues',
          'Integrated instant WhatsApp and consultation booking triggers across every collection',
        ],
        verifiedOutcomes: [
          'Deployed live at festiveoccasions.ae for the Dubai luxury event market',
          'Delivered smooth editorial motion and mobile-first booking conversion flows',
        ],
      },
    },
    {
      id: 'fujifenix',
      name: 'Fuji Fenix Elevator Platform',
      tagline: 'Multi-Page Industrial Website, Sanity CMS Backend & Admin App',
      category: 'Industrial Engineering · Next.js + Sanity CMS',
      filterCategory: 'E-Commerce & B2B',
      featured: false,
      summary:
        'Full-stack digital ecosystem for Fuji Fenix Elevator (`fujifenix.com`) combining a multi-page Next.js corporate website, a Sanity CMS backend for elevator specifications, and a custom admin portal.',
      stack: ['Next.js', 'TypeScript', 'Sanity CMS', 'Tailwind CSS', 'Admin Portal'],
      liveUrl: 'https://fujifenix.com',
      previewImage: '/projects/fujifenix-preview.png',
      caseStudy: {
        problem:
          'Elevator engineering firms need a unified system to publish complex passenger, freight, and panoramic elevator specifications while managing client installation and maintenance quotes.',
        role: 'Full-Stack Developer & CMS Architect',
        solution:
          'Architected a three-tier platform (`fujifenix-elevator`): a multi-page Next.js public website, a Sanity CMS content studio, and an administrative management application.',
        keyDecisions: [
          'Modeled elevator technical specifications, shaft dimensions, and load ratings in Sanity CMS',
          'Built a dedicated admin interface for tracking client inquiries and service schedules',
          'Engineered responsive industrial product pages optimized for construction and real-estate buyers',
        ],
        verifiedOutcomes: [
          'Shipped complete Next.js + Sanity CMS + Admin architecture for Fuji Fenix Elevator',
          'Centralized product catalog management and B2B quotation workflows',
        ],
      },
    },
    {
      id: 'norvia',
      name: 'Norvia Tech & Digital Services',
      tagline: 'Next.js 16 + Sanity CMS Tech Accessories Store & Digital Services Hub',
      category: 'Next.js 16 · Sanity CMS · Hybrid Commerce',
      filterCategory: 'E-Commerce & B2B',
      featured: false,
      summary:
        'Modern e-commerce and digital agency platform (`norviaitservices.site`) built with Next.js 16, Sanity CMS, and Tailwind CSS v4 to sell premium tech accessories alongside digital IT services.',
      stack: ['Next.js 16', 'Sanity CMS', 'TypeScript', 'Tailwind CSS v4', 'React'],
      liveUrl: 'https://norviaitservices.site',
      previewImage: '/projects/norvia-preview.png',
      caseStudy: {
        problem:
          'Emerging technology brands need a single cohesive platform capable of handling physical tech accessory retail alongside B2B digital service packages.',
        role: 'Lead Full-Stack Developer',
        solution:
          'Built `norviaitservices.site` using Next.js 16 and Sanity CMS with dynamic catalog filtering, dark-mode product cards, and service inquiry workflows.',
        keyDecisions: [
          'Adopted Next.js 16 App Router and Tailwind CSS v4 for ultra-fast page loads',
          'Connected Sanity Headless CMS for real-time product and service tier updates',
          'Designed a dark-mode brand identity across both retail and agency sections',
        ],
        verifiedOutcomes: [
          'Deployed live at norviaitservices.site with full Sanity Studio integration',
          'Combined retail product discovery and IT consulting onboarding in one codebase',
        ],
      },
    },
    {
      id: 'whatsapp-bot',
      name: 'BotFlow — WhatsApp AI Agent Platform',
      tagline: 'Multi-Tenant WhatsApp Business AI Agent & Webhook Orchestrator',
      category: 'Agentic AI SaaS · WhatsApp Cloud API',
      filterCategory: 'AI & Agents',
      featured: false,
      summary:
        'End-to-end SaaS platform (`whatsappbotbuilder-two.vercel.app`) enabling businesses to configure, train, and deploy autonomous AI customer support and sales agents on WhatsApp.',
      stack: ['Next.js', 'Python', 'FastAPI', 'WhatsApp Cloud API', 'OpenAI Agents SDK', 'Supabase'],
      liveUrl: 'https://whatsappbotbuilder-two.vercel.app',
      previewImage: '/projects/whatsapp-preview.png',
      caseStudy: {
        problem:
          'Businesses handling high volumes of customer messages on WhatsApp suffer from slow manual replies, lost after-hours leads, and brittle rule-based chatbots.',
        role: 'AI Systems Architect & Full-Stack Engineer',
        solution:
          'Engineered BotFlow—a multi-tenant web dashboard and Python FastAPI webhook orchestrator that connects Meta WhatsApp Cloud API with OpenAI Agents SDK and Supabase memory.',
        keyDecisions: [
          'Built tenant authentication and agent configuration flows at whatsappbotbuilder-two.vercel.app',
          'Implemented signature-verified Meta Cloud webhooks with stateful conversation history',
          'Added human-handoff escalation triggers when customer intent requires manual intervention',
        ],
        verifiedOutcomes: [
          'Deployed live SaaS portal at whatsappbotbuilder-two.vercel.app',
          'Enabled 24/7 autonomous WhatsApp lead qualification and customer support',
        ],
      },
    },
    {
      id: 'mj-fte',
      name: 'MJ FTE — Windows System Analyzer & Cleaner',
      tagline: 'Safety-First Windows Disk Cleaner, Duplicate Scanner & CLI Agent',
      category: 'Systems Utility · Python CLI & Web Portal',
      filterCategory: 'Dev Tooling & Automation',
      featured: false,
      summary:
        'A transparent, safety-first disk cleaner and system analyzer for Windows (`mjfte.vercel.app`). Scans temporary caches, detects duplicate files via SHA-256 hashing, and reclaims disk space safely.',
      stack: ['Python', 'Windows System APIs', 'CLI', 'Next.js', 'Tailwind CSS'],
      liveUrl: 'https://mjfte.vercel.app/',
      previewImage: '/projects/mjfte-preview.png',
      caseStudy: {
        problem:
          'Developer workstations accumulate gigabytes of hidden temp caches and duplicate files, while third-party cleaners often act as opaque bloatware.',
        role: 'Creator & Systems Developer',
        solution:
          'Built the open-source `mj-fte` Python CLI agent with mandatory dry-run safety previews, protected directory guardrails, and an interactive documentation portal at `mjfte.vercel.app`.',
        keyDecisions: [
          'Enforced read-only dry-run reports before any file deletion is executed',
          'Engineered fast SHA-256 file hashing to pinpoint exact duplicate files across drives',
          'Created a bilingual-friendly developer showcase site at mjfte.vercel.app',
        ],
        verifiedOutcomes: [
          'Shipped open-source CLI (`syed-mujtaba-stack/mj-fte`) and live web portal at mjfte.vercel.app',
          'Provided transparent, zero-telemetry Windows storage recovery',
        ],
      },
    },
    {
      id: 'leadshunter',
      name: 'LeadHunter v2 — Autonomous Google Maps Agent',
      tagline: '24/7 Autonomous B2B Lead Discovery, Website Crawler & Sheets Sync',
      category: 'Autonomous AI Agent · Playwright & Python',
      filterCategory: 'AI & Agents',
      featured: false,
      summary:
        'Autonomous 24/7 Python lead-generation engine (`syed-mujtaba-stack/leadshunter`) that scrapes Google Maps by niche and city, crawls business websites for verified emails, deduplicates records, and syncs live to Google Sheets.',
      stack: ['Python', 'Playwright', 'Google Sheets API', 'AsyncIO', 'SQLite Deduplication'],
      previewImage: '/projects/leadshunter-preview.png',
      verificationNote: 'Autonomous Python CLI & daemon system (github.com/syed-mujtaba-stack/leadshunter).',
      caseStudy: {
        problem:
          'Outbound sales and agency teams spend countless hours manually searching Google Maps, visiting business websites to hunt for email addresses, and pasting rows into spreadsheets.',
        role: 'Lead AI & Automation Engineer',
        solution:
          'Engineered LeadHunter v2—a headless Playwright cluster and multi-page website crawler backed by SQLite deduplication and real-time Google Sheets OAuth2 synchronization.',
        keyDecisions: [
          'Built resilient Playwright stealth scrolling to extract full Google Maps business cards',
          'Added an asynchronous website crawler that visits `/contact` and `/about` pages to harvest verified emails',
          'Integrated local SQLite hash deduplication so zero duplicate leads ever reach Google Sheets',
        ],
        verifiedOutcomes: [
          'Automated 24/7 multi-niche, multi-city B2B lead discovery and enrichment',
          'Eliminated manual spreadsheet entry with live Google Sheets API v4 streaming',
        ],
      },
    },
    {
      id: 'clipcompress',
      name: 'ClipCompress — Multi-Platform Video Suite',
      tagline: 'Universal Video Downloader & FFmpeg H.264/AAC Compression Engine',
      category: 'Full-Stack Media Pipeline · Next.js 16 + FastAPI',
      filterCategory: 'Dev Tooling & Automation',
      featured: false,
      summary:
        'Full-stack media platform (`syed-mujtaba-stack/video-downloader`) built with Next.js 16, FastAPI, yt-dlp, and FFmpeg to download videos from YouTube, TikTok, Instagram, and X and compress them with zero visual quality loss.',
      stack: ['Next.js 16', 'FastAPI', 'Python', 'yt-dlp', 'FFmpeg', 'Tailwind CSS'],
      previewImage: '/projects/clipcompress-preview.png',
      verificationNote: 'Full-stack Next.js 16 + FastAPI + FFmpeg media pipeline (syed-mujtaba-stack/video-downloader).',
      caseStudy: {
        problem:
          'Downloading reference media from social platforms and compressing large video files for WhatsApp, Slack, or web publishing usually requires sketchy ad-filled tools or manual CLI flags.',
        role: 'Full-Stack & Media Systems Engineer',
        solution:
          'Built ClipCompress combining a Next.js 16 streaming UI with an asynchronous Python FastAPI backend powered by `yt-dlp` and `FFmpeg` H.264/AAC transcoding workers.',
        keyDecisions: [
          'Engineered preset CRF transcoding profiles (WhatsApp <16MB, Studio 1080p/4K, 320kbps MP3 Audio)',
          'Implemented chunked byte-range file streaming and automatic ephemeral storage cleanup',
          'Supported unified manifest parsing across YouTube, TikTok, Instagram, and X',
        ],
        verifiedOutcomes: [
          'Achieved 70%–80% video file size reduction while preserving sharp H.264 playback quality',
          'Delivered a clean, ad-free full-stack media utility in Next.js 16 and FastAPI',
        ],
      },
    },
    {
      id: 'ayesha-fashion',
      name: 'Ayesha Fashion Style Storefront',
      tagline: 'Modern Retail E-Commerce Storefront & Lookbook Experience',
      category: 'E-Commerce Retail · Next.js & TypeScript',
      filterCategory: 'E-Commerce & B2B',
      featured: false,
      summary:
        'Mobile-first fashion e-commerce platform (`ayeshafashionstyle.shop`) engineered for seasonal apparel collections, dynamic size/color variant selection, and fast cart checkout.',
      stack: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'E-Commerce'],
      liveUrl: 'https://www.ayeshafashionstyle.shop/',
      previewImage: '/projects/ayesha-preview.png',
      caseStudy: {
        problem:
          'Apparel and fashion brands require a fast, mobile-optimized digital storefront where high-resolution lookbooks and size/fabric variants are effortless to browse.',
        role: 'Full-Stack Web Developer',
        solution:
          'Built `ayeshafashionstyle.shop` with Next.js, TypeScript, and Tailwind CSS, featuring collection filtering, instant cart drawer state, and mobile-first checkout flows.',
        keyDecisions: [
          'Optimized lookbook imagery and responsive product grids for smartphone shoppers',
          'Implemented reactive client-side cart state with SKU variant tracking',
          'Crafted clean editorial typography tailored for retail merchandising',
        ],
        verifiedOutcomes: [
          'Launched live production storefront at ayeshafashionstyle.shop',
          'Streamlined mobile catalog browsing and checkout conversion',
        ],
      },
    },
    {
      id: 'edgeway-security',
      name: 'Edgeway Security Inc. Platform',
      tagline: 'Enterprise Physical Security, Surveillance & Guard Dispatch Portal',
      category: 'Enterprise Web · Next.js & Dark UI',
      filterCategory: 'Full-Stack & Web',
      featured: false,
      summary:
        'High-contrast dark enterprise web platform (`security-dark-ui.vercel.app`) built for Edgeway Security Inc. to showcase licensed guard services, HD surveillance, solar camera monitoring, and 24/7 dispatch.',
      stack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Enterprise UI'],
      liveUrl: 'https://security-dark-ui.vercel.app',
      previewImage: '/projects/dark-repo-preview.png',
      caseStudy: {
        problem:
          'Commercial physical security firms need an authoritative, high-trust digital presence that highlights 24/7 dispatch readiness, licensing, and industry-specific protection plans.',
        role: 'Frontend Architect & UI Engineer',
        solution:
          'Designed and built `security-dark-ui.vercel.app` (`dark-repo-web`) with a precision dark-mode UI, service vertical breakdowns, and an instant security quote funnel.',
        keyDecisions: [
          'Surfaced key trust metrics (20+ years experience, 24/7 dispatch, 9+ industries) above the fold',
          'Structured dedicated modules for armed/unarmed guards, HD surveillance, and solar cameras',
          'Built a fast quote request flow for commercial property and construction managers',
        ],
        verifiedOutcomes: [
          'Deployed live at security-dark-ui.vercel.app with responsive desktop and mobile layouts',
          'Delivered a commanding enterprise brand experience',
        ],
      },
    },
    {
      id: 'studedu',
      name: 'StudEdu — Free AI E-Learning Platform',
      tagline: 'Open-Access Skill Mastery, Courses & Mentorship Portal',
      category: 'EdTech Platform · React, TypeScript & Firebase',
      filterCategory: 'Full-Stack & Web',
      featured: false,
      summary:
        'Accessible e-learning web platform (`studedu-ai.web.app`) providing free structured courses across coding, AI, design, and business with mentor directories and guided tracks.',
      stack: ['TypeScript', 'React', 'Firebase', 'Tailwind CSS', 'EdTech'],
      liveUrl: 'https://studedu-ai.web.app/',
      previewImage: '/projects/studedu-preview.png',
      caseStudy: {
        problem:
          'Aspiring developers and students often face fragmented tutorials and expensive paywalls when learning modern coding, AI, and design skills.',
        role: 'Full-Stack Developer',
        solution:
          'Engineered StudEdu (`studedu-ai.web.app`) on React, TypeScript, and Firebase to deliver a barrier-free course catalog and mentorship discovery platform.',
        keyDecisions: [
          'Built fast client-side course filtering across coding, AI, design, and business tracks',
          'Deployed on Firebase with clean responsive cards and student progress states',
          'Designed an approachable, high-clarity educational UI',
        ],
        verifiedOutcomes: [
          'Live production deployment at studedu-ai.web.app',
          'Created an intuitive catalog for open-access digital education',
        ],
      },
    },
    {
      id: 'khizar-luxury',
      name: 'Khizar Luxury Market',
      tagline: 'Multi-Category Luxury E-Commerce Marketplace & Search Engine',
      category: 'E-Commerce Marketplace · Next.js & TypeScript',
      filterCategory: 'E-Commerce & B2B',
      featured: false,
      summary:
        'Full-featured online marketplace (`khizar-luxury-market.vercel.app`) with live product search, category filtering, wishlist management, order tracking, and a dedicated "Luxury Corner".',
      stack: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'E-Commerce'],
      liveUrl: 'https://khizar-luxury-market.vercel.app',
      previewImage: '/projects/khizar-luxury-preview.png',
      caseStudy: {
        problem:
          'Multi-category online stores require fast search autocompletion, persistent wishlist/cart counters, and clear order tracking to retain shoppers.',
        role: 'Full-Stack E-Commerce Developer',
        solution:
          'Built `khizar-luxury-market.vercel.app` using Next.js and TypeScript with global product search, category navigation, and interactive cart/wishlist management.',
        keyDecisions: [
          'Implemented real-time header search and category-level filtering',
          'Added persistent cart and wishlist badge states across page transitions',
          'Structured dedicated Order Tracking and FAQ support routes',
        ],
        verifiedOutcomes: [
          'Deployed live at khizar-luxury-market.vercel.app',
          'Delivered a complete multi-category retail marketplace architecture',
        ],
      },
    },
    {
      id: 'physical-ai',
      name: 'Physical AI & Humanoid Robotics',
      tagline: 'Interactive Textbook, Multilingual Portal & AI Copilot for Embodied AI',
      category: 'AI & Robotics Education · Next.js & AI Copilot',
      filterCategory: 'AI & Agents',
      featured: false,
      summary:
        'Interactive educational platform and digital textbook (`physical-ai-nine.vercel.app`) dedicated to Physical AI and Humanoid Robotics, featuring multilingual support and an embedded AI chat assistant.',
      stack: ['TypeScript', 'Next.js', 'AI Assistant', 'Interactive Docs', 'Tailwind CSS'],
      liveUrl: 'https://physical-ai-nine.vercel.app/',
      previewImage: '/projects/physical-ai-preview.png',
      caseStudy: {
        problem:
          'Learners exploring Embodied Intelligence and Humanoid Robotics need structured curriculum chapters paired with an interactive AI assistant that can answer technical questions in context.',
        role: 'Creator & Full-Stack AI Developer',
        solution:
          'Built `physical-ai-nine.vercel.app` combining a digital robotics textbook, technical blog, language switcher, and floating AI study copilot.',
        keyDecisions: [
          'Structured modular textbook navigation with dark/light mode support',
          'Embedded an interactive AI chat widget for real-time robotics Q&A',
          'Added multilingual interface controls for broader accessibility',
        ],
        verifiedOutcomes: [
          'Shipped live educational platform at physical-ai-nine.vercel.app',
          'Bridged structured robotics documentation with interactive AI tutoring',
        ],
      },
    },
    {
      id: 'gemcode',
      name: 'GemCode — AI Code Editor Powered by Gemini',
      tagline: '11-in-1 Gemini-Powered AI Software Engineering Workspace',
      category: 'AI Developer IDE · Google Gemini API',
      filterCategory: 'AI & Agents',
      featured: false,
      summary:
        'Specialized AI coding workspace (`gemcode.vercel.app`) powered by Google Gemini with 11 dedicated engineering tools: AI Chat, Improve Code, Explain Code, Fix Bugs, Generate Tests, Generate Docs, Translate Code, Convert Code, Project Scaffolder, Regex Generator, and SQL Generator.',
      stack: ['TypeScript', 'Next.js', 'Google Gemini API', 'Tailwind CSS', 'Developer Tools'],
      liveUrl: 'https://gemcode.vercel.app',
      previewImage: '/projects/gemcode-preview.png',
      caseStudy: {
        problem:
          'Developers waste time writing repetitive context prompts in generic chat windows when they need focused tasks like unit test generation, SQL queries, regex patterns, or bug fixes.',
        role: 'Creator & AI Engineer',
        solution:
          'Created GemCode (`gemcode.vercel.app`)—an IDE-style dark workspace with 11 specialized Google Gemini engineering pipelines accessible in one click.',
        keyDecisions: [
          'Engineered 11 task-specific system prompts tuned for code refactoring, test generation, SQL, and regex',
          'Built a clean dark-mode sidebar workspace modeled after modern code editors',
          'Included a Project Scaffolder and cross-language code converter',
        ],
        verifiedOutcomes: [
          'Deployed live at gemcode.vercel.app',
          'Consolidated 11 everyday developer AI workflows into a single workspace',
        ],
      },
    },
    {
      id: 'jarvis-ai',
      name: 'JARVIS — Voice-Interactive Virtual Assistant',
      tagline: 'Browser-Native Speech Recognition & Voice Synthesis AI Assistant',
      category: 'Voice AI Assistant · Web Speech API',
      filterCategory: 'AI & Agents',
      featured: false,
      summary:
        'Voice-activated virtual assistant (`j-a-r-v-i-s-mujtaba.vercel.app`) built with the Web Speech API and conversational AI. Listens to spoken commands, executes web actions, and replies via synthesized speech.',
      stack: ['JavaScript', 'Web Speech API', 'Speech Synthesis', 'Conversational AI', 'HUD UI'],
      liveUrl: 'https://j-a-r-v-i-s-mujtaba.vercel.app/',
      previewImage: '/projects/jarvis-preview.png',
      caseStudy: {
        problem:
          'Most browser AI tools require keyboard input, lacking a hands-free voice command and spoken feedback loop.',
        role: 'Creator & Frontend Developer',
        solution:
          'Built JARVIS (`j-a-r-v-i-s-mujtaba.vercel.app`) integrating browser-native speech recognition, intent parsing, and speech synthesis inside a sci-fi wireframe HUD.',
        keyDecisions: [
          'Used the Web Speech API for low-latency microphone capture without external plugins',
          'Implemented voice command routing for web searches, time/date queries, and interactive dialogue',
          'Paired spoken responses with an animated 3D wireframe visual interface',
        ],
        verifiedOutcomes: [
          'Launched live interactive voice assistant at j-a-r-v-i-s-mujtaba.vercel.app',
          'Demonstrated real-time speech-to-intent-to-voice execution in the browser',
        ],
      },
    },
    {
      id: 'fastcv',
      name: 'FastCV — Instant LinkedIn-to-PDF Resume Studio',
      tagline: 'Real-Time Resume Builder with LinkedIn Import, Themes & QR Codes',
      category: 'Developer & Career Utility · React & PDF Engine',
      filterCategory: 'Full-Stack & Web',
      featured: false,
      summary:
        'Interactive resume builder (`fastcv-beta.vercel.app`) featuring LinkedIn data import, live split-screen preview, multiple templates (Default, Modern, Creative), custom accent colors, QR code generation, and instant PDF export.',
      stack: ['JavaScript', 'React', 'PDF Generation', 'QR Code Generator', 'Print CSS'],
      liveUrl: 'https://fastcv-beta.vercel.app/',
      previewImage: '/projects/fastcv-preview.png',
      caseStudy: {
        problem:
          'Formatting a clean technical resume across different visual layouts and embedding portfolio QR codes is tedious in traditional word processors.',
        role: 'Creator & Frontend Engineer',
        solution:
          'Engineered FastCV (`fastcv-beta.vercel.app`) with a reactive split-pane editor, one-click template switching, dynamic QR code embedding, and print-perfect PDF generation.',
        keyDecisions: [
          'Built instant template switching between Default, Modern, and Creative layouts without losing form state',
          'Added optional QR code rendering so printed resumes link directly to live portfolios',
          'Included dark/light editor toggle and custom accent color pickers',
        ],
        verifiedOutcomes: [
          'Shipped live at fastcv-beta.vercel.app with zero-signup PDF export',
          'Streamlined resume creation for developers and professionals',
        ],
      },
    },
    {
      id: 'beacon-skycast',
      name: 'Beacon SkyCast — Weather Intelligence App',
      tagline: 'Real-Time Meteorological Telemetry & Animated Atmospheric Forecast',
      category: 'Web Application · Next.js & Weather API',
      filterCategory: 'Full-Stack & Web',
      featured: false,
      summary:
        'Dynamic weather intelligence web app (`skycast-vert-two.vercel.app` / `Beacon`) combining real-time meteorological telemetry with an animated sky canvas and multi-day forecasting.',
      stack: ['TypeScript', 'Next.js', 'Weather Telemetry API', 'Tailwind CSS', 'Animated UI'],
      liveUrl: 'https://skycast-vert-two.vercel.app/',
      previewImage: '/projects/beacon-preview.png',
      caseStudy: {
        problem:
          'Conventional weather apps bury core forecast data inside cluttered layouts without visual atmospheric context.',
        role: 'Full-Stack Developer',
        solution:
          'Built Beacon SkyCast (`skycast-vert-two.vercel.app`) with Next.js and TypeScript, pairing live weather API data with a smooth animated sky backdrop.',
        keyDecisions: [
          'Integrated live meteorological endpoints for current conditions and multi-day forecasts',
          'Designed an animated sky header that reflects atmospheric conditions',
          'Kept navigation instantaneous between Home and Forecast views',
        ],
        verifiedOutcomes: [
          'Deployed live at skycast-vert-two.vercel.app (`syed-mujtaba-stack/Beacon`)',
          'Delivered a clean, responsive weather intelligence interface',
        ],
      },
    },
    {
      id: 'codementor-ai',
      name: 'CodeMentor AI — Interactive Programming Tutor',
      tagline: 'AI-Based Interactive Tutor for Programming & Algorithm Mastery',
      category: 'EdTech & AI Tutor · Next.js & TypeScript',
      filterCategory: 'AI & Agents',
      featured: false,
      summary:
        'AI-powered programming tutor (`mentor-ai-pi.vercel.app` / `MentorAI`) created by Syed Mujtaba Abbas to guide learners through code debugging, algorithm explanations, and modern web development.',
      stack: ['TypeScript', 'Next.js', 'Gemini / OpenAI API', 'Tailwind CSS', 'EdTech'],
      liveUrl: 'https://mentor-ai-pi.vercel.app',
      previewImage: '/projects/mentor-ai-preview.png',
      caseStudy: {
        problem:
          'New developers frequently copy code snippets without grasping the underlying logic, edge cases, or architectural trade-offs.',
        role: 'Founder & Full-Stack AI Developer',
        solution:
          'Built CodeMentor AI (`mentor-ai-pi.vercel.app`) to deliver step-by-step interactive programming guidance and conceptual explanations.',
        keyDecisions: [
          'Tuned system prompts for pedagogical clarity and step-by-step code walkthroughs',
          'Built a lightweight Next.js interface with session persistence',
          'Integrated founder profile and direct developer mentorship links',
        ],
        verifiedOutcomes: [
          'Deployed live at mentor-ai-pi.vercel.app',
          'Provided an accessible AI programming mentor for students',
        ],
      },
    },
    {
      id: 'agentica',
      name: 'Agentica — Multi-Agent Collaboration System',
      tagline: 'Autonomous Multi-Agent Task Decomposition & Execution Framework',
      category: 'Multi-Agent AI · TypeScript & LLM Orchestration',
      filterCategory: 'AI & Agents',
      featured: false,
      summary:
        'Multi-agent AI framework (`syed-mujtaba-stack/Agentica`) enabling specialized autonomous agents (Planner, Researcher, Coder, Reviewer) to collaborate over a shared context bus.',
      stack: ['TypeScript', 'Next.js', 'Multi-Agent Systems', 'Function Calling', 'LLM Orchestration'],
      previewImage: '/projects/agentica-preview.png',
      verificationNote: 'Multi-agent orchestration repository (github.com/syed-mujtaba-stack/Agentica).',
      caseStudy: {
        problem:
          'Single-turn LLM calls struggle with complex software and research tasks that require iterative planning, tool execution, and verification.',
        role: 'AI Systems Architect',
        solution:
          'Designed Agentica—a supervisor-worker multi-agent graph where specialized role agents decompose objectives, execute tools, and validate outputs.',
        keyDecisions: [
          'Separated Planner, Researcher, Coder, and Reviewer responsibilities into distinct agent nodes',
          'Implemented a structured JSON context bus for deterministic inter-agent handoffs',
          'Added execution trace telemetry for token and step visibility',
        ],
        verifiedOutcomes: [
          'Published modular multi-agent architecture in `syed-mujtaba-stack/Agentica`',
          'Improved task completion reliability through automated reviewer passes',
        ],
      },
    },
    {
      id: 'personal-ai-employee',
      name: 'Personal AI Employee — Digital FTE Agent',
      tagline: 'Autonomous Python Digital FTE for Task Triage & Operational Workflows',
      category: 'Autonomous Operations · Python AI Agent',
      filterCategory: 'AI & Agents',
      featured: false,
      summary:
        'Autonomous Digital Full-Time Equivalent (FTE) agent (`syed-mujtaba-stack/Personal-AI-Employee-Agent`) engineered in Python to triage incoming messages, manage task queues, and execute recurring workflows.',
      stack: ['Python', 'AI Agents', 'Workflow Automation', 'LLM APIs', 'Audit Logging'],
      previewImage: '/projects/personal-ai-employee-preview.png',
      verificationNote: 'Python autonomous Digital FTE repository (syed-mujtaba-stack/Personal-AI-Employee-Agent).',
      caseStudy: {
        problem:
          'Founders and lean engineering teams spend disproportionate time on repetitive inbox triage, status updates, and routine operational checklists.',
        role: 'AI Agent Engineer',
        solution:
          'Engineered a Python Digital FTE daemon governed by explicit SOPs, priority triage rules, and human-in-the-loop approval gates.',
        keyDecisions: [
          'Structured modular SOP configurations so the agent follows strict operational boundaries',
          'Implemented automated daily executive digest generation and task prioritization',
          'Added mandatory approval gates before external actions are dispatched',
        ],
        verifiedOutcomes: [
          'Shipped reusable Digital FTE blueprint in `syed-mujtaba-stack/Personal-AI-Employee-Agent`',
          'Automated recurring operational triage with full auditability',
        ],
      },
    },
    {
      id: 'aidev-cli',
      name: 'AIDev CLI — AI Full-Stack App Builder',
      tagline: 'Command-Line AI Engineer that Plans & Scaffolds Full-Stack Codebases',
      category: 'AI Developer CLI · Python Code Generator',
      filterCategory: 'Dev Tooling & Automation',
      featured: false,
      summary:
        'AI-powered command-line engineer (`syed-mujtaba-stack/aidev-cli`) written in Python that converts natural-language prompts into database schemas, API routes, and full-stack application codebases.',
      stack: ['Python', 'CLI', 'Code Generation', 'LLM Agents', 'Full-Stack Scaffolding'],
      previewImage: '/projects/aidev-cli-preview.png',
      verificationNote: 'Python AI CLI application builder (github.com/syed-mujtaba-stack/aidev-cli).',
      caseStudy: {
        problem:
          'Bootstrapping a new full-stack application from an initial product idea requires repetitive schema modeling, route wiring, and frontend scaffolding.',
        role: 'Creator & AI Tooling Engineer',
        solution:
          'Built `aidev-cli` in Python to plan system architecture from a terminal prompt and write cohesive frontend + backend codebases to disk.',
        keyDecisions: [
          'Two-phase execution: architectural specification planning followed by deterministic file generation',
          'Generated matching database models, REST endpoints, and frontend views',
          'Built rich terminal progress telemetry and validation checks',
        ],
        verifiedOutcomes: [
          'Published `syed-mujtaba-stack/aidev-cli` on GitHub',
          'Accelerated prompt-to-repository prototyping directly from the terminal',
        ],
      },
    },
    {
      id: 'aiza-ai',
      name: 'AIZA AI — Intelligent Query Router Chatbot',
      tagline: 'Full-Stack AI Assistant with Semantic Multi-Model Query Routing',
      category: 'AI Router System · Python & FastAPI',
      filterCategory: 'AI & Agents',
      featured: false,
      summary:
        'Full-stack Python AI assistant (`syed-mujtaba-stack/AIZA-AI`) featuring an intelligent semantic query router that classifies prompt intent (coding, math, research, chat) and dispatches to specialized model pipelines.',
      stack: ['Python', 'FastAPI', 'LLM Router', 'Full-Stack AI', 'Streaming UI'],
      previewImage: '/projects/aiza-ai-preview.png',
      verificationNote: 'Full-stack Python query-routing AI repository (syed-mujtaba-stack/AIZA-AI).',
      caseStudy: {
        problem:
          'Sending every prompt to a single monolithic LLM configuration wastes latency on simple queries and underperforms on specialized coding or analytical prompts.',
        role: 'Full-Stack AI Engineer',
        solution:
          'Engineered AIZA AI with a semantic intent classifier that scores incoming prompts and routes them to domain-optimized system prompts and model pipelines.',
        keyDecisions: [
          'Built an intent router classifying code engineering, analytical reasoning, research, and general chat',
          'Implemented automatic provider fallback and token streaming',
          'Paired the Python backend with a clean conversational web UI',
        ],
        verifiedOutcomes: [
          'Developed `syed-mujtaba-stack/AIZA-AI` demonstrating production LLM routing patterns',
          'Improved response relevance across technical and conversational queries',
        ],
      },
    },
  ] as PortfolioProject[],

  agentWorkflows: [
    {
      id: 'whatsapp-cloud-agent',
      name: 'Autonomous WhatsApp Business Agent',
      linkedProjectName: 'BotFlow — WhatsApp AI Agent Platform',
      linkedLiveUrl: 'https://whatsappbotbuilder-two.vercel.app',
      architecturePattern: 'Webhook Ingestion -> Context Memory -> OpenAI Agent -> Cloud Dispatch',
      summary:
        'Multi-tenant conversational AI pipeline that processes real-time Meta WhatsApp Cloud webhooks, retrieves tenant context from Supabase, executes OpenAI Agent reasoning, and dispatches instant replies.',
      nodes: [
        {
          id: 'wa-trigger',
          label: 'Meta Webhook Ingestion',
          sublabel: 'X-Hub-Signature-256 verified WhatsApp payload',
          type: 'trigger',
          latency: '18ms',
          statusText: '200 OK · Signature Verified',
          payloadSample: `{\n  "object": "whatsapp_business_account",\n  "sender": "+92346xxxxxxx",\n  "message": "Do you have RTX 4070 laptops in stock?",\n  "tenant_id": "tn_quantumbyte"\n}`,
        },
        {
          id: 'wa-memory',
          label: 'Tenant Context & RAG',
          sublabel: 'Supabase thread history & catalog rules',
          type: 'rag',
          latency: '42ms',
          statusText: 'Retrieved 4 catalog chunks + thread state',
          payloadSample: `{\n  "tenant": "QuantumByte",\n  "matched_skus": ["ASUS-ROG-G16", "LENOVO-LEGION-5"],\n  "stock_status": "IN_STOCK",\n  "escalation_required": false\n}`,
        },
        {
          id: 'wa-agent',
          label: 'OpenAI Agent Orchestrator',
          sublabel: 'Intent classification & response synthesis',
          type: 'orchestrator',
          latency: '610ms',
          statusText: 'Tool call: check_inventory() -> Success',
          payloadSample: `{\n  "intent": "PRODUCT_AVAILABILITY",\n  "confidence": 0.97,\n  "action": "SEND_CATALOG_CARDS",\n  "human_handoff": false\n}`,
        },
        {
          id: 'wa-output',
          label: 'WhatsApp Cloud Dispatch',
          sublabel: 'Structured reply + CRM lead stage update',
          type: 'output',
          latency: '95ms',
          statusText: 'Delivered via Graph API v20.0',
          payloadSample: `{\n  "messaging_product": "whatsapp",\n  "status": "delivered",\n  "crm_stage": "QUALIFIED_LEAD"\n}`,
        },
      ],
    },
    {
      id: 'leadshunter-pipeline',
      name: 'Autonomous Google Maps Lead Hunter',
      linkedProjectName: 'LeadHunter v2 Engine',
      architecturePattern: 'Playwright Cluster -> Website Email Crawler -> SQLite Dedup -> Sheets API',
      summary:
        '24/7 autonomous B2B lead discovery daemon that scrapes Google Maps listings by niche and city, crawls discovered domains for verified emails, deduplicates via SQLite, and syncs live to Google Sheets.',
      nodes: [
        {
          id: 'lh-trigger',
          label: 'Niche & Region Scheduler',
          sublabel: 'Target queue: Niche + City parameters',
          type: 'trigger',
          latency: '12ms',
          statusText: 'Queue active · Dubai & Karachi targets',
          payloadSample: `{\n  "niche": "Dental Clinics",\n  "city": "Dubai Marina",\n  "max_results": 150,\n  "headless": true\n}`,
        },
        {
          id: 'lh-scraper',
          label: 'Playwright Maps Extractor',
          sublabel: 'Stealth DOM scrolling & card extraction',
          type: 'tool',
          latency: '1.8s',
          statusText: 'Extracted 142 verified map listings',
          payloadSample: `{\n  "business": "Marina Smile Dental",\n  "phone": "+971-4-xxx-xxxx",\n  "website": "https://marinasmile.ae",\n  "rating": 4.9\n}`,
        },
        {
          id: 'lh-crawler',
          label: 'Deep Website Contact Crawler',
          sublabel: 'Scans /, /contact, /about for emails',
          type: 'orchestrator',
          latency: '420ms',
          statusText: 'Regex matched verified domain email',
          payloadSample: `{\n  "domain": "marinasmile.ae",\n  "emails_found": ["info@marinasmile.ae"],\n  "dedup_hash": "sha256:8f91c2...",\n  "is_unique": true\n}`,
        },
        {
          id: 'lh-sheets',
          label: 'Google Sheets OAuth2 Sync',
          sublabel: 'Appends enriched row to live CRM sheet',
          type: 'output',
          latency: '140ms',
          statusText: 'Appended 89 net-new leads to Sheet',
          payloadSample: `{\n  "spreadsheet_id": "1BxiMVs0XRA5nFMd...",\n  "updated_rows": 89,\n  "duplicates_skipped": 53\n}`,
        },
      ],
    },
    {
      id: 'edugenius-quiz-engine',
      name: 'Generative Assessment & Quiz Pipeline',
      linkedProjectName: 'EduGenius Platform',
      linkedLiveUrl: 'https://mj-edugenius.vercel.app/',
      architecturePattern: 'Study Material Parser -> Structured LLM Router -> Interactive Quiz Runner',
      summary:
        'Educational synthesis pipeline that converts raw chapters and study topics into executive summaries, flashcards, and strictly typed multiple-choice assessments.',
      nodes: [
        {
          id: 'edu-input',
          label: 'Topic & Chapter Ingestion',
          sublabel: 'Normalizes raw study text & difficulty tier',
          type: 'trigger',
          latency: '24ms',
          statusText: 'Context tokenized · 3,400 tokens',
          payloadSample: `{\n  "topic": "Neural Network Backpropagation",\n  "difficulty": "Intermediate",\n  "question_count": 10\n}`,
        },
        {
          id: 'edu-llm',
          label: 'Structured JSON Synthesis',
          sublabel: 'OpenAI / Gemini strict schema generation',
          type: 'orchestrator',
          latency: '890ms',
          statusText: 'Validated 10 MCQs + summary blocks',
          payloadSample: `{\n  "summary_points": 5,\n  "questions_generated": 10,\n  "schema_valid": true\n}`,
        },
        {
          id: 'edu-output',
          label: 'Interactive Assessment UI',
          sublabel: 'Client-side quiz state & instant grading',
          type: 'output',
          latency: '15ms',
          statusText: 'Hydrated interactive quiz session',
          payloadSample: `{\n  "session_id": "eg_9921",\n  "instant_explanations": true,\n  "export_ready": true\n}`,
        },
      ],
    },
  ] as AgentWorkflowScenario[],

  experience: [
    // =========================================================================
    // PRESENT / ACTIVE ROLES FIRST (Ordered at the very top)
    // =========================================================================
    {
      id: 'independent-consultant',
      role: 'Independent Tech Consultant',
      organization: 'Full-Stack & AI Developer',
      subtitle: 'International Client Architecture & Delivery',
      period: 'Jan 2024 — Present',
      current: true,
      description:
        'Deliver end-to-end software and AI solutions for international clients, from technical architecture and agentic workflows to Next.js/Sanity CMS e-commerce platforms and cloud deployment pipelines.',
      highlights: [
        'Architected and shipped production platforms including QuantumByte Technologies, Festive Occasions Dubai, Fuji Fenix Elevator, Norvia, and KarachiGum.',
        'Built autonomous AI agents and developer tools including EduGenius, BotFlow WhatsApp Agent, and LeadHunter v2.',
        'Managed full lifecycle delivery from system design and Sanity Studio schemas to cloud deployment.',
      ],
      tags: ['Full-Stack', 'Agentic AI', 'Next.js & Sanity CMS', 'Cloud & DevOps'],
    },
    {
      id: 'alphamind',
      role: 'Founder',
      organization: 'AlphaMind',
      subtitle: 'AI Product Studio & Agentic Research',
      period: '2025 — Present',
      current: true,
      description:
        'Spearheading an AI product studio focused on intelligent web applications, autonomous agent workflows, and developer productivity tools.',
      highlights: [
        'Architected and launched AI-native learning and coding platforms including EduGenius and GemCode.',
        'Established reusable full-stack blueprints combining Next.js, TypeScript, Sanity CMS, and Python FastAPI.',
        'Led end-to-end product architecture, prompt engineering, and cloud deployment.',
      ],
      tags: ['Next.js', 'Python', 'OpenAI Agents SDK', 'Gemini API', 'TypeScript'],
    },
    {
      id: 'alphatech-ai',
      role: 'Founder',
      organization: 'AlphaTech AI',
      subtitle: 'AI Automation & Full-Stack Software Solutions',
      period: '2025 — Present',
      current: true,
      description:
        'Building custom conversational AI agents, business process automation pipelines, and full-stack web platforms.',
      highlights: [
        'Engineered BotFlow (multi-tenant WhatsApp AI agent builder) and LeadHunter v2 (autonomous Google Maps lead agent).',
        'Consulted with commercial clients to automate customer support and lead qualification.',
      ],
      tags: ['WhatsApp Cloud API', 'Next.js', 'Sanity CMS', 'FastAPI', 'Playwright'],
    },
    {
      id: 'setupci-creator',
      role: 'Founder & Creator',
      organization: 'SetupCI & Open-Source PyPI Maintainer',
      subtitle: 'Published Python CLI Tools (`setupci` & `mj-fte`)',
      period: '2025 — Present',
      current: true,
      description:
        'Created, packaged, and maintained SetupCI (`pip install setupci`) and MJ FTE (`pip install mj-fte`)—open-source Python CLI tools published on PyPI.',
      highlights: [
        'Published official `setupci` and `mj-fte` packages to PyPI with companion documentation portals on Vercel.',
        'Automated directory scaffolding, Git initialization, and safety-first Windows disk analysis.',
      ],
      tags: ['Python', 'PyPI', 'CLI Architecture', 'Git Automation', 'Next.js'],
    },

    // =========================================================================
    // COMPLETED / CAREER PROGRESSION ROLES (AlphaTach 6-Step Progression)
    // =========================================================================
    {
      id: 'alphatach-agentic-fullstack',
      role: 'Full Stack Developer · Agentic AI Developer',
      organization: 'AlphaTach',
      subtitle: 'Career Progression · Senior Track',
      period: '6 months',
      current: false,
      description:
        'Integrated agentic AI workflows into products and built autonomous agents for reasoning, tool use, and multi-step execution.',
      highlights: [
        'Designed multi-step LLM orchestration pipelines with tool calling and structured outputs.',
        'Connected autonomous AI backends to production React and Next.js interfaces.',
      ],
      tags: ['LangChain', 'LLM Orchestration', 'Full-Stack', 'Agentic AI'],
    },
    {
      id: 'alphatach-fullstack',
      role: 'Full Stack Developer',
      organization: 'AlphaTach',
      subtitle: 'Career Progression · Full-Stack Engineering',
      period: '6 months',
      current: false,
      description:
        'Developed scalable web applications and APIs; query optimization and Redis caching improved application load times by 30%.',
      highlights: [
        'Engineered full-stack features across React/Next.js frontends and Node.js/Django backends.',
        'Implemented Redis caching and database query optimization for 30% faster load times.',
      ],
      tags: ['React / Next.js', 'Node.js / Django', 'Redis', 'Performance'],
    },
    {
      id: 'alphatach-jr-agentic',
      role: 'Junior Agentic AI Developer',
      organization: 'AlphaTach',
      subtitle: 'Career Progression · AI & Automation',
      period: '3 months',
      current: false,
      description:
        'Worked on prompt engineering, LLM integrations, and AI-powered data pipelines for internal automation.',
      highlights: [
        'Built structured prompt templates and integrated LLM APIs into internal automation workflows.',
      ],
      tags: ['Prompt Engineering', 'LLM APIs', 'Automation'],
    },
    {
      id: 'alphatach-jr-fullstack',
      role: 'Junior Full Stack Developer',
      organization: 'AlphaTach',
      subtitle: 'Career Progression · Web Applications',
      period: '3 months',
      current: false,
      description:
        'Built responsive frontend features and connected them to backend APIs and application data.',
      highlights: [
        'Delivered reusable React UI components wired to RESTful backend endpoints and relational databases.',
      ],
      tags: ['React', 'REST APIs', 'Databases'],
    },
    {
      id: 'alphatach-jr-backend',
      role: 'Junior Backend Developer',
      organization: 'AlphaTach',
      subtitle: 'Career Progression · APIs & Data Layer',
      period: '3 months',
      current: false,
      description:
        'Developed server-side logic, REST APIs, background workers, database schemas, and SQL/NoSQL queries.',
      highlights: [
        'Designed relational and document schemas and implemented background task workers.',
      ],
      tags: ['Backend', 'APIs', 'SQL / NoSQL'],
    },
    {
      id: 'alphatach-jr-frontend',
      role: 'Junior Frontend Developer',
      organization: 'AlphaTach',
      subtitle: 'Career Progression · UI Foundations',
      period: '3 months',
      current: false,
      description:
        'Created responsive interfaces and reusable components with modern JavaScript and CSS tools.',
      highlights: [
        'Translated UI specifications into clean, mobile-responsive web components.',
      ],
      tags: ['JavaScript', 'CSS', 'Responsive UI'],
    },
  ] as ExperienceItem[],

  education: {
    items: [
      {
        id: 'bs-robotics',
        index: '01',
        degree: 'B.S. in Robotics',
        institution: 'Superior University',
        location: 'Karachi, Pakistan',
        focus:
          'Robotics engineering, autonomous systems, computational foundations, and intelligent hardware-software integration.',
      },
      {
        id: 'intermediate-pre-eng',
        index: '02',
        degree: 'Intermediate · Pre-Engineering',
        institution: 'Board of Secondary Education',
        location: 'Karachi, Pakistan',
        focus:
          'Higher secondary foundation in advanced Mathematics, Physics, and Engineering principles.',
      },
      {
        id: 'matriculation-cs',
        index: '03',
        degree: 'Matriculation · Computer Science',
        institution: 'Board of Secondary Education',
        location: 'Karachi, Pakistan',
        focus: 'Core foundations in Computer Science, programming logic, and science.',
      },
    ] as EducationItem[],
    additionalNote:
      'Additional Learning: Agentic AI through GIAIC (Governor Sindh Initiative for AI, Web 3.0 & Metaverse); exploring Robotics AI. Degree completion and course dates were not provided on syedmujtabaabbas.xyz and are intentionally omitted rather than fabricated.',
  },

  services: [
    {
      id: 'fullstack-sanity-ecommerce',
      index: '01',
      title: 'Next.js & Sanity CMS E-Commerce Platforms',
      tagline: 'High-speed custom storefronts, B2B catalogs & headless CMS studios',
      description:
        'End-to-end architecture and development of modern e-commerce storefronts and B2B industrial platforms using Next.js, TypeScript, Tailwind CSS, and Sanity Headless CMS—modeled after QuantumByte Technologies, Fuji Fenix Elevator, and Norvia.',
      deliverables: [
        'Custom Next.js App Router storefront with responsive mobile-first UI',
        'Sanity CMS Studio with tailored schemas for products, variants, pricing, and stock',
        'Custom Admin Control Panels (Next.js / Django) for order and inquiry management',
        'Technical SEO, Open Graph metadata, and Vercel edge deployment',
      ],
      technologies: ['Next.js', 'Sanity CMS', 'TypeScript', 'Tailwind CSS', 'Django / FastAPI', 'PostgreSQL'],
    },
    {
      id: 'agentic-ai-automation',
      index: '02',
      title: 'Autonomous AI Agents & WhatsApp Automation',
      tagline: '24/7 conversational WhatsApp agents, LLM routers & B2B lead pipelines',
      description:
        'Custom AI agents that execute real business workflows—from multi-tenant WhatsApp Cloud API customer support bots (BotFlow) to 24/7 Playwright Google Maps B2B lead discovery and Google Sheets CRM synchronization (LeadHunter v2).',
      deliverables: [
        'Official Meta WhatsApp Cloud API webhook backend with OpenAI / Gemini reasoning',
        'Autonomous Playwright browser scraping & multi-page contact enrichment agents',
        'Semantic query routers and RAG knowledge bases backed by Supabase/PostgreSQL',
        'Human-in-the-loop escalation triggers and live Google Sheets / CRM sync',
      ],
      technologies: ['Python', 'FastAPI', 'OpenAI Agents SDK', 'Google Gemini API', 'WhatsApp Cloud API', 'Playwright'],
    },
    {
      id: 'custom-cli-media-tools',
      index: '03',
      title: 'Python CLI Tooling, APIs & Media Pipelines',
      tagline: 'Custom developer CLIs, PyPI packages & FFmpeg processing backends',
      description:
        'Bespoke command-line tools, developer scaffolding utilities, and high-throughput media processing backends—modeled after SetupCI (published on PyPI), MJ FTE, and ClipCompress.',
      deliverables: [
        'Packaged Python CLI applications using Typer/Click ready for PyPI distribution',
        'Asynchronous FastAPI microservices and background task queues',
        'Automated video/audio extraction and FFmpeg H.264/AAC compression pipelines',
        'Comprehensive web documentation portals and CI/CD workflows',
      ],
      technologies: ['Python', 'FastAPI', 'PyPI Packaging', 'FFmpeg', 'yt-dlp', 'GitHub Actions'],
    },
  ] as ServiceItem[],

  contact: {
    subheadline:
      'Available for select Next.js & Sanity CMS e-commerce platforms, autonomous AI agent systems, and full-stack software engineering engagements.',
    email: 'abbasmujtaba125@gmail.com',
    phone: '+92 346 0630802',
    phoneHref: 'tel:+923460630802',
    whatsappHref: 'https://wa.me/923460630802',
    locationText: 'Karachi, Sindh, Pakistan',
    timezoneNote: 'Pakistan Standard Time (PKT / UTC+5) · Async & live overlap with UAE, UK, EU & US teams',
    socials: [
      {
        id: 'github',
        label: 'GitHub',
        handle: '@syed-mujtaba-stack',
        url: 'https://github.com/syed-mujtaba-stack',
        verifiedNote: '21+ public repositories, AI agents, Sanity CMS stores & PyPI CLI tools',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        handle: 'in/creative-mujtaba',
        url: 'https://www.linkedin.com/in/creative-mujtaba',
        verifiedNote: 'Verified from GitHub profile README (syed-mujtaba-stack)',
      },
      {
        id: 'twitter',
        label: 'X (Twitter)',
        handle: '@mujtaba_ai',
        url: 'https://x.com/mujtaba_ai',
        verifiedNote: 'Verified from syedmujtabaabbas.xyz',
      },
      {
        id: 'instagram',
        label: 'Instagram',
        handle: '@syed_mujtaba_abbas_',
        url: 'https://www.instagram.com/syed_mujtaba_abbas_',
        verifiedNote: 'Verified from syedmujtabaabbas.xyz',
      },
    ],
  },
};
