import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Cpu,
  Layers,
  Play,
  RotateCcw,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
  Database,
  CheckCircle2,
  MessageSquare,
  Code2,
} from 'lucide-react';
import { PORTFOLIO_DATA, PortfolioProject } from '../data/portfolioData';

/**
 * Unique Smooth 60fps Canvas Background for the Interactive Engineering Lab:
 * Isometric Circuit Pulse & Radar Sweep
 */
const LabCircuitPulseBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let rafId = 0;

    interface PulsePacket {
      x: number;
      y: number;
      vx: number;
      vy: number;
      trail: Array<{ x: number; y: number }>;
      turnTimer: number;
    }

    const packets: PulsePacket[] = [];
    const gridSize = 56;

    const initPackets = () => {
      packets.length = 0;
      const count = 18;
      for (let i = 0; i < count; i++) {
        const horiz = Math.random() > 0.5;
        const dir = Math.random() > 0.5 ? 1 : -1;
        packets.push({
          x: Math.floor((Math.random() * width) / gridSize) * gridSize,
          y: Math.floor((Math.random() * height) / gridSize) * gridSize,
          vx: horiz ? dir * 2.2 : 0,
          vy: horiz ? 0 : dir * 2.2,
          trail: [],
          turnTimer: 40 + Math.floor(Math.random() * 80),
        });
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initPackets();
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle circuit grid intersections
      ctx.strokeStyle = 'rgba(255,255,255,0.035)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw intersection micro-crosses
      ctx.fillStyle = 'rgba(255,255,255,0.09)';
      for (let x = gridSize; x < width; x += gridSize * 2) {
        for (let y = gridSize; y < height; y += gridSize * 2) {
          ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
        }
      }

      // Update & draw data packets along orthogonal circuit lines
      for (const p of packets) {
        if (!prefersReduced) {
          p.x += p.vx;
          p.y += p.vy;
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 26) p.trail.shift();

          p.turnTimer--;
          if (
            p.turnTimer <= 0 &&
            Math.abs(p.x % gridSize) < 3 &&
            Math.abs(p.y % gridSize) < 3
          ) {
            p.x = Math.round(p.x / gridSize) * gridSize;
            p.y = Math.round(p.y / gridSize) * gridSize;
            const dir = Math.random() > 0.5 ? 1 : -1;
            if (p.vx !== 0) {
              p.vx = 0;
              p.vy = dir * 2.2;
            } else {
              p.vy = 0;
              p.vx = dir * 2.2;
            }
            p.turnTimer = 45 + Math.floor(Math.random() * 90);
          }

          if (p.x < -40) p.x = width + 40;
          if (p.x > width + 40) p.x = -40;
          if (p.y < -40) p.y = height + 40;
          if (p.y > height + 40) p.y = -40;
        }

        if (p.trail.length > 2) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let i = 1; i < p.trail.length; i++) {
            ctx.lineTo(p.trail[i].x, p.trail[i].y);
          }
          ctx.strokeStyle = 'rgba(228, 228, 231, 0.22)';
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fill();
      }

      if (!prefersReduced) {
        rafId = requestAnimationFrame(render);
      }
    };

    render();
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
    />
  );
};

interface TerminalCommandPreset {
  id: string;
  label: string;
  command: string;
  outputLines: Array<{ text: string; tone?: 'muted' | 'success' | 'white' }>;
}

const TERMINAL_PRESETS: TerminalCommandPreset[] = [
  {
    id: 'setupci',
    label: 'pip install setupci',
    command: 'pip install setupci && setupci init quantum-store --stack nextjs-sanity',
    outputLines: [
      { text: 'Collecting setupci from PyPI (pypi.org/project/setupci/)...', tone: 'muted' },
      { text: 'Successfully installed setupci-1.2.0', tone: 'success' },
      { text: '[setupci] Scaffolding project: quantum-store (Next.js 16 + Sanity CMS)', tone: 'white' },
      { text: '  ├── src/app/              (App Router + SSR Metadata)', tone: 'muted' },
      { text: '  ├── src/sanity/schemas/   (product.ts, category.ts, order.ts)', tone: 'muted' },
      { text: '  ├── .github/workflows/    (ci-build-and-typecheck.yml)', tone: 'muted' },
      { text: '[SUCCESS] Repository initialized in 1.4s. Run `npm run dev` to launch.', tone: 'success' },
    ],
  },
  {
    id: 'leadshunter',
    label: 'leadshunter --city dubai',
    command: 'python main.py --niche "Luxury Real Estate" --city "Dubai" --sync-sheets',
    outputLines: [
      { text: '[LeadHunter v2] Launching headless Playwright browser cluster...', tone: 'muted' },
      { text: '[MAPS] Extracted 118 verified agencies in Downtown Dubai & Marina', tone: 'success' },
      { text: '[CRAWLER] Visiting business domains (/contact, /about) for emails...', tone: 'muted' },
      { text: '[DEDUP] SQLite SHA-256 check passed -> 0 duplicate records', tone: 'white' },
      { text: '[GOOGLE SHEETS] Streamed 84 verified B2B leads with emails & phones!', tone: 'success' },
    ],
  },
  {
    id: 'mjfte',
    label: 'mjfte --scan --dry-run',
    command: 'mjfte --scan-system --detect-duplicates --dry-run',
    outputLines: [
      { text: 'MJ FTE Windows System Analyzer // Tera system, meri zimmedari', tone: 'white' },
      { text: '[SCAN] Analyzing Temp, AppData, npm/pip caches & build artifacts...', tone: 'muted' },
      { text: '[HASH] SHA-256 duplicate scan completed across 14,820 files', tone: 'muted' },
      { text: '[SAFETY] Dry-Run Active: 0 personal files touched', tone: 'success' },
      { text: '[RESULT] 6.84 GB reclaimable storage identified. Pass --execute to clean.', tone: 'success' },
    ],
  },
  {
    id: 'clipcompress',
    label: 'clipcompress --crf 23',
    command: 'curl -X POST /api/v1/compress -d \'{"url":"https://youtu.be/demo","preset":"whatsapp"}\'',
    outputLines: [
      { text: '[ClipCompress] yt-dlp manifest resolved: 1080p60 MP4 + AAC audio', tone: 'muted' },
      { text: '[FFMPEG] Transcoding H.264 (libx264 -crf 23 -preset fast)...', tone: 'white' },
      { text: '[DONE] Compressed 142.6 MB -> 14.8 MB (-89.6% size reduction)', tone: 'success' },
      { text: '[STREAM] Ready for instant download or WhatsApp sharing.', tone: 'success' },
    ],
  },
];

interface BlueprintTrack {
  id: string;
  name: string;
  tagline: string;
  baseStack: string[];
  timeline: string;
  matchedProjectIds: string[];
  architectureSteps: string[];
}

const BLUEPRINT_TRACKS: BlueprintTrack[] = [
  {
    id: 'sanity-ecommerce',
    name: 'Next.js + Sanity CMS Storefront',
    tagline: 'Hardware, Fashion, Luxury or Industrial B2B E-Commerce Platform',
    baseStack: ['Next.js 16', 'Sanity CMS (GROQ)', 'TypeScript', 'Tailwind CSS'],
    timeline: '2 – 4 Weeks Production Delivery',
    matchedProjectIds: ['quantumbyte', 'fujifenix', 'norvia', 'festive-occasions'],
    architectureSteps: [
      'Next.js App Router Storefront + Dynamic SSR SEO',
      'Sanity Headless CMS Studio (Products, Variants, Stock)',
      'Instant Cart Drawer, Filtering & WhatsApp/Checkout Funnel',
      'Custom Admin Control Panel & Edge Caching',
    ],
  },
  {
    id: 'whatsapp-ai-agent',
    name: 'Autonomous WhatsApp & Lead AI Agent',
    tagline: '24/7 Conversational Sales Bot or Automated B2B Lead Hunter',
    baseStack: ['Python', 'FastAPI', 'OpenAI Agents SDK / Gemini', 'WhatsApp Cloud API'],
    timeline: '1.5 – 3 Weeks Production Delivery',
    matchedProjectIds: ['whatsapp-bot', 'leadshunter', 'agentica', 'aiza-ai'],
    architectureSteps: [
      'Meta WhatsApp Cloud Webhook / Playwright Headless Trigger',
      'Supabase / SQLite State Memory & Deduplication Engine',
      'OpenAI / Gemini Tool-Calling & Qualification Router',
      'Automated Reply Dispatch + Live Google Sheets CRM Sync',
    ],
  },
  {
    id: 'edtech-ai-saas',
    name: 'AI SaaS, EdTech Copilot or Developer IDE',
    tagline: 'Interactive Generative AI Workspace with Structured Outputs',
    baseStack: ['Next.js', 'TypeScript', 'Python FastAPI', 'Google Gemini / OpenAI'],
    timeline: '2 – 4 Weeks Production Delivery',
    matchedProjectIds: ['edugenius', 'gemcode', 'physical-ai', 'codementor-ai'],
    architectureSteps: [
      'Reactive Next.js Workspace & Authenticated User Sessions',
      'Semantic Intent Router & Prompt Guardrail Layer',
      'Strict JSON Schema Synthesis (Quizzes, Code, Docs)',
      'Real-Time Token Streaming & PDF/Data Export',
    ],
  },
  {
    id: 'cli-media-pipeline',
    name: 'Custom Python CLI or Media Pipeline',
    tagline: 'PyPI Developer Tooling, System Analyzer or FFmpeg Transcoder',
    baseStack: ['Python', 'Typer / Click', 'FastAPI', 'FFmpeg / yt-dlp', 'PyPI'],
    timeline: '1 – 2.5 Weeks Production Delivery',
    matchedProjectIds: ['setupci', 'mj-fte', 'clipcompress', 'aidev-cli'],
    architectureSteps: [
      'CLI Argument Parser or Next.js Upload Interface',
      'Async Python Worker Queue & Safety Guardrails',
      'FFmpeg Transcoding / File-System Scaffolding Engine',
      'PyPI Package Distribution & Vercel Documentation Portal',
    ],
  },
];

const OPTIONAL_MODULES = [
  { id: 'sanity-studio', label: 'Sanity CMS Studio', tech: 'Sanity GROQ' },
  { id: 'whatsapp-webhook', label: 'WhatsApp Cloud Bot', tech: 'Meta API' },
  { id: 'admin-portal', label: 'Custom Admin Dashboard', tech: 'Django / Next.js' },
  { id: 'sheets-crm', label: 'Google Sheets Live Sync', tech: 'OAuth2 API v4' },
  { id: 'ai-copilot', label: 'Embedded AI Copilot', tech: 'OpenAI / Gemini' },
  { id: 'ffmpeg-worker', label: 'Media Compression Pipeline', tech: 'FFmpeg + FastAPI' },
];

const GROQ_AND_AI_SAMPLES = [
  {
    id: 'quantumbyte-groq',
    title: 'QuantumByte — Sanity GROQ Hardware Query',
    badge: 'Next.js + Sanity CMS',
    code: `*[_type == "hardwareProduct" && inStock == true] | order(featured desc) [0...6] {
  _id,
  title,
  "slug": slug.current,
  category->{ title, "icon": icon.asset->url },
  specs { processor, gpu, ram, storage },
  pricePKR,
  "imageUrl": mainImage.asset->url
}`,
    response: `{
  "ms": 28,
  "resultCount": 6,
  "sample": {
    "title": "ASUS ROG Strix G16 (RTX 4070)",
    "category": "Gaming Laptops",
    "specs": { "gpu": "NVIDIA RTX 4070 8GB", "ram": "32GB DDR5" },
    "inStock": true
  }
}`,
  },
  {
    id: 'aiza-router',
    title: 'AIZA AI — Semantic Multi-Model Query Router',
    badge: 'Python + FastAPI Router',
    code: `async def route_user_query(prompt: str) -> ModelTarget:
    classification = await classifier.score_intent(prompt)
    if classification.domain == "CODE_ENGINEERING":
        return ModelTarget(provider="gemini-2.5-pro", temp=0.1)
    elif classification.domain == "WHATSAPP_SALES":
        return ModelTarget(provider="openai-agents-sdk", tools=[crm_sync])
    return ModelTarget(provider="fast-chat", temp=0.5)`,
    response: `{
  "detectedIntent": "CODE_ENGINEERING",
  "confidence": 0.984,
  "dispatchedModel": "gemini-2.5-pro",
  "firstTokenLatency": "210ms",
  "fallbackArmed": true
}`,
  },
];

interface InteractiveEngineeringLabProps {
  onSelectProjectCaseStudy: (project: PortfolioProject) => void;
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const InteractiveEngineeringLab: React.FC<InteractiveEngineeringLabProps> = ({
  onSelectProjectCaseStudy,
  onSelectServiceForInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'terminal' | 'groq'>('blueprint');

  // Terminal state
  const [selectedPreset, setSelectedPreset] = useState<TerminalCommandPreset>(
    TERMINAL_PRESETS[0]
  );
  const [customCmd, setCustomCmd] = useState('');
  const [visibleLines, setVisibleLines] = useState<number>(
    TERMINAL_PRESETS[0].outputLines.length
  );
  const [copiedCmd, setCopiedCmd] = useState(false);

  // Blueprint Builder state
  const [selectedTrackId, setSelectedTrackId] = useState<string>(BLUEPRINT_TRACKS[0].id);
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'sanity-studio',
    'admin-portal',
  ]);

  // GROQ / Code Inspector state
  const [selectedSampleId, setSelectedSampleId] = useState<string>(
    GROQ_AND_AI_SAMPLES[0].id
  );

  const activeTrack =
    BLUEPRINT_TRACKS.find((t) => t.id === selectedTrackId) || BLUEPRINT_TRACKS[0];

  const matchedProjects = PORTFOLIO_DATA.projects.filter((p) =>
    activeTrack.matchedProjectIds.includes(p.id)
  );

  const toggleModule = (modId: string) => {
    setSelectedModules((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
  };

  const runPreset = (preset: TerminalCommandPreset) => {
    setSelectedPreset(preset);
    setVisibleLines(0);
  };

  useEffect(() => {
    if (visibleLines >= selectedPreset.outputLines.length) return;
    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, 180);
    return () => clearTimeout(timer);
  }, [visibleLines, selectedPreset]);

  const handleCustomCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = customCmd.trim().toLowerCase();
    if (!raw) return;

    if (raw.includes('setupci') || raw.includes('pip')) {
      runPreset(TERMINAL_PRESETS[0]);
    } else if (raw.includes('lead') || raw.includes('maps')) {
      runPreset(TERMINAL_PRESETS[1]);
    } else if (raw.includes('mj') || raw.includes('clean')) {
      runPreset(TERMINAL_PRESETS[2]);
    } else if (raw.includes('video') || raw.includes('compress')) {
      runPreset(TERMINAL_PRESETS[3]);
    } else {
      setSelectedPreset({
        id: 'custom',
        label: customCmd,
        command: customCmd,
        outputLines: [
          {
            text: `[Mujtaba Shell] Executed: "${customCmd}"`,
            tone: 'white',
          },
          {
            text: 'Matched 25 verified repositories on @syed-mujtaba-stack (Next.js, Sanity CMS, Python, AI Agents).',
            tone: 'success',
          },
          {
            text: 'Tip: Try `pip install setupci`, `leadshunter`, `mjfte`, or `clipcompress`.',
            tone: 'muted',
          },
        ],
      });
      setVisibleLines(0);
    }
    setCustomCmd('');
  };

  const combinedStack = Array.from(
    new Set([
      ...activeTrack.baseStack,
      ...OPTIONAL_MODULES.filter((m) => selectedModules.includes(m.id)).map((m) => m.tech),
    ])
  );

  const whatsappBlueprintText = encodeURIComponent(
    `Hi Mujtaba! I configured a project blueprint on your portfolio:\n` +
      `• System: ${activeTrack.name}\n` +
      `• Stack: ${combinedStack.join(', ')}\n` +
      `• Estimated Sprint: ${activeTrack.timeline}\n` +
      `Let's discuss building this!`
  );

  const activeCodeSample =
    GROQ_AND_AI_SAMPLES.find((s) => s.id === selectedSampleId) || GROQ_AND_AI_SAMPLES[0];

  return (
    <section
      id="lab"
      aria-labelledby="lab-heading"
      className="relative border-t border-white/[0.07] bg-[#060608] py-24 sm:py-32 overflow-hidden"
    >
      {/* Unique Background Animation: Circuit Pulse & Radar Grid */}
      <LabCircuitPulseBg />

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#121216] px-3.5 py-1 text-xs font-medium text-zinc-300">
              <Sparkles className="h-3.5 w-3.5 text-zinc-400" />
              <span>Interactive Engineering Lab</span>
            </span>
            <h2
              id="lab-heading"
              className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white"
            >
              Test my CLI tools &amp;{' '}
              <span className="text-platinum">configure your system architecture.</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Configure a custom Next.js, Sanity CMS, or AI Agent blueprint, run simulated CLI commands from my published packages, or inspect live GROQ &amp; LLM router code.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap gap-2 rounded-xl border border-white/10 bg-[#0E0E12] p-1.5 self-start lg:self-end">
            <button
              type="button"
              onClick={() => setActiveTab('blueprint')}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'blueprint'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>1. Architecture Builder</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('terminal')}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'terminal'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>2. Live CLI Terminal</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('groq')}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'groq'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>3. Sanity GROQ &amp; AI Code</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: INTERACTIVE ARCHITECTURE & SCOPE BUILDER */}
          {activeTab === 'blueprint' && (
            <motion.div
              key="blueprint"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start"
            >
              {/* Left 5 Cols: Track & Module Selector */}
              <div className="lg:col-span-5 space-y-6 rounded-2xl border border-white/10 bg-[#0C0C0F]/95 p-6 sm:p-7 backdrop-blur-xl">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                    Step 1 · Select Product Architecture
                  </div>
                  <div className="space-y-2.5">
                    {BLUEPRINT_TRACKS.map((track) => {
                      const isSelected = track.id === selectedTrackId;
                      return (
                        <button
                          key={track.id}
                          type="button"
                          onClick={() => setSelectedTrackId(track.id)}
                          className={`w-full rounded-xl p-4 text-left border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-white/40 bg-[#17171E] text-white shadow-md'
                              : 'border-white/[0.07] bg-[#111116] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                          }`}
                        >
                          <div className="font-display text-sm sm:text-base font-bold text-white">
                            {track.name}
                          </div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            {track.tagline}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-white/[0.08] pt-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                    Step 2 · Add Optional Modules
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {OPTIONAL_MODULES.map((mod) => {
                      const active = selectedModules.includes(mod.id);
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => toggleModule(mod.id)}
                          className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-left text-xs transition-all cursor-pointer ${
                            active
                              ? 'border-emerald-400/50 bg-emerald-500/10 text-white font-medium'
                              : 'border-white/[0.08] bg-[#121217] text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <span>{mod.label}</span>
                          <CheckCircle2
                            className={`h-3.5 w-3.5 shrink-0 ${
                              active ? 'text-emerald-400' : 'text-zinc-600'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right 7 Cols: Live Generated Blueprint & Matched Portfolio Proof */}
              <div className="lg:col-span-7 rounded-2xl border border-white/12 bg-[#0D0D11]/95 p-6 sm:p-8 space-y-6 backdrop-blur-xl shadow-2xl">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
                  <div>
                    <span className="font-mono-tech text-[11px] text-emerald-400">
                      LIVE SYSTEM SPECIFICATION
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mt-0.5">
                      {activeTrack.name}
                    </h3>
                  </div>
                  <span className="rounded-lg border border-white/10 bg-[#16161D] px-3.5 py-1.5 font-mono-tech text-xs text-zinc-200">
                    Est. {activeTrack.timeline}
                  </span>
                </div>

                {/* Generated Pipeline Steps */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                    Execution Pipeline
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeTrack.architectureSteps.map((step, i) => (
                      <div
                        key={step}
                        className="rounded-xl border border-white/[0.07] bg-[#131319] p-3.5 flex items-start gap-3"
                      >
                        <span className="font-mono-tech text-xs font-bold text-zinc-400 mt-0.5">
                          0{i + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-zinc-200 leading-snug">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Combined Tech Stack Pills */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
                    Configured Technology Stack ({combinedStack.length} Layers)
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {combinedStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-[#16161C] px-3 py-1 font-mono-tech text-xs text-zinc-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Proof: Similar Projects Built by Mujtaba (with Real Preview Images!) */}
                <div className="border-t border-white/[0.08] pt-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                    Proven Reference Systems Built by Mujtaba (Click to Inspect)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchedProjects.map((proj) => (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => onSelectProjectCaseStudy(proj)}
                        className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#121217] p-2.5 text-left hover:border-white/30 transition-all cursor-pointer"
                      >
                        <img
                          src={proj.previewImage}
                          alt={proj.name}
                          className="h-12 w-16 rounded-lg object-cover object-top border border-white/10 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-white truncate group-hover:underline">
                            {proj.name}
                          </div>
                          <div className="text-[11px] text-zinc-400 truncate">
                            {proj.category}
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-white shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Bar: Dispatch Blueprint */}
                <div className="border-t border-white/[0.08] pt-5 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={`https://wa.me/923460630802?text=${whatsappBlueprintText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Send Blueprint on WhatsApp</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href="#contact"
                    onClick={() => onSelectServiceForInquiry(activeTrack.name)}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#15151C] px-4 py-2.5 text-xs font-medium text-white hover:border-white/35 transition-colors"
                  >
                    <span>Open Project Brief Form</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: INTERACTIVE CLI & PYPI SANDBOX */}
          {activeTab === 'terminal' && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-white/12 bg-[#09090C]/95 overflow-hidden shadow-2xl"
            >
              {/* Terminal Window Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#121217] px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono-tech text-xs text-zinc-400">
                    mujtaba@karachi-lab: ~/syed-mujtaba-stack (zsh)
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {TERMINAL_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => runPreset(preset)}
                      className={`rounded-md px-2.5 py-1 font-mono-tech text-[11px] transition-all cursor-pointer ${
                        selectedPreset.id === preset.id
                          ? 'bg-white text-black font-semibold'
                          : 'border border-white/10 bg-[#17171F] text-zinc-300 hover:border-white/25'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 sm:p-8 font-mono-tech text-xs sm:text-sm space-y-4 min-h-[320px] flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-2 text-white break-all">
                      <span className="text-emerald-400">$</span>
                      <span>{selectedPreset.command}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setVisibleLines(0)}
                        title="Replay command"
                        className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-[#14141A] px-2.5 py-1 text-[11px] text-zinc-300 hover:text-white cursor-pointer"
                      >
                        <RotateCcw className="h-3 w-3" />
                        <span>Replay</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(selectedPreset.command);
                          setCopiedCmd(true);
                          setTimeout(() => setCopiedCmd(false), 1800);
                        }}
                        className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-[#14141A] px-2.5 py-1 text-[11px] text-zinc-300 hover:text-white cursor-pointer"
                      >
                        {copiedCmd ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    {selectedPreset.outputLines.slice(0, visibleLines).map((line, i) => (
                      <div
                        key={i}
                        className={
                          line.tone === 'success'
                            ? 'text-emerald-400'
                            : line.tone === 'white'
                            ? 'text-white font-semibold'
                            : 'text-zinc-400'
                        }
                      >
                        {line.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Command Input */}
                <form
                  onSubmit={handleCustomCommandSubmit}
                  className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-[#101015] px-4 py-2.5"
                >
                  <span className="text-emerald-400 font-bold">$</span>
                  <input
                    type="text"
                    value={customCmd}
                    onChange={(e) => setCustomCmd(e.target.value)}
                    placeholder="Type a command (e.g. pip install setupci, leadshunter, mjfte, video) and press Enter..."
                    className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1 text-xs font-semibold text-black hover:bg-zinc-200 cursor-pointer shrink-0"
                  >
                    <Play className="h-3 w-3" />
                    <span>Run</span>
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SANITY GROQ & AI ROUTER CODE INSPECTOR */}
          {activeTab === 'groq' && (
            <motion.div
              key="groq"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div className="flex flex-wrap gap-2">
                {GROQ_AND_AI_SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => setSelectedSampleId(sample.id)}
                    className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                      selectedSampleId === sample.id
                        ? 'border-white bg-white text-black'
                        : 'border-white/10 bg-[#111116] text-zinc-300 hover:border-white/25'
                    }`}
                  >
                    {sample.title}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0B0B0F] p-6">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                    <span className="font-mono-tech text-xs text-zinc-300 flex items-center gap-2">
                      <Database className="h-3.5 w-3.5 text-zinc-400" />
                      {activeCodeSample.title}
                    </span>
                    <span className="rounded-md border border-white/10 bg-[#15151B] px-2.5 py-0.5 font-mono-tech text-[11px] text-zinc-300">
                      {activeCodeSample.badge}
                    </span>
                  </div>
                  <pre className="overflow-x-auto font-mono-tech text-xs sm:text-sm text-zinc-200 leading-relaxed">
                    <code>{activeCodeSample.code}</code>
                  </pre>
                </div>

                <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0B0B0F] p-6">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                    <span className="font-mono-tech text-xs text-zinc-300 flex items-center gap-2">
                      <Cpu className="h-3.5 w-3.5 text-emerald-400" />
                      Structured Execution Output
                    </span>
                    <span className="font-mono-tech text-[11px] text-emerald-400">
                      200 OK
                    </span>
                  </div>
                  <pre className="overflow-x-auto font-mono-tech text-xs sm:text-sm text-emerald-300/90 leading-relaxed">
                    <code>{activeCodeSample.response}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
