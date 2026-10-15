import React, { useRef, useState } from 'react';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  FileText,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { HeroLiquidWaveBg } from './SectionBackgrounds';
import { MagneticButton } from './MagneticButton';

interface HeroSectionProps {
  onOpenDossier?: () => void;
  onOpenCommandPalette?: () => void;
}

const PORTRAIT_LOOKBOOK = [
  {
    id: 'studio',
    label: 'Executive',
    src: '/portraits/mujtaba-executive-studio.png',
    caption: 'Executive Studio · Full-Stack & AI Engineer',
  },
  {
    id: 'architect',
    label: 'Architect',
    src: '/portraits/mujtaba-ai-architect.png',
    caption: 'Systems Lab · Autonomous AI & Cloud Architecture',
  },
  {
    id: 'keynote',
    label: 'Portrait',
    src: '/portraits/mujtaba-keynote-speaker.png',
    caption: 'Principal Engineer · Karachi, Pakistan',
  },
  {
    id: 'founder',
    label: 'Founder',
    src: '/portraits/mujtaba-founder-casual.png',
    caption: 'Independent Consultant · Product & Infrastructure',
  },
];

const FOCUS_AREAS = [
  {
    id: 'fullstack',
    label: 'Full-Stack Products',
    summary:
      'Architecting fast, production-grade web platforms with Next.js, React, TypeScript, Python FastAPI, and PostgreSQL.',
    projects: 'KarachiGum · Norvia · Ayesha Fashion · Fuji Fenix',
  },
  {
    id: 'ai-agents',
    label: 'Agentic AI & RAG',
    summary:
      'Building autonomous multi-agent workflows, OpenAI SDK tool-calling pipelines, and RAG systems with human-in-the-loop safety.',
    projects: 'EduGenius · WhatsApp AI Platform · LeadHunter v2 · MJ FTE',
  },
  {
    id: 'devops',
    label: 'DevOps & Cloud',
    summary:
      'Automating Docker containerization, GitHub Actions CI/CD pipelines, and zero-downtime cloud deployments.',
    projects: 'SetupCI · Containerized Microservices · Linux Cloud',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDossier }) => {
  const { profile, contact } = PORTFOLIO_DATA;
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [hovering, setHovering] = useState(false);
  const [activeFocus, setActiveFocus] = useState(FOCUS_AREAS[0]);
  const [activePortraitIndex, setActivePortraitIndex] = useState(0);

  const activePortrait = PORTRAIT_LOOKBOOK[activePortraitIndex];

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    setTilt({
      rotateX: -normY * 12,
      rotateY: normX * 14,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-screen w-full overflow-hidden bg-[#050505] pt-28 pb-20 lg:pt-32 lg:pb-24 flex items-center"
    >
      {/* SECTION 1 UNIQUE BACKGROUND ANIMATION: Interactive Liquid Wave Mesh */}
      <HeroLiquidWaveBg />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left 7 Columns: Clean, Confident Human Typography */}
          <div className="lg:col-span-7 space-y-7">
            {/* Simple, Authentic Availability Pill */}
            <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-white/10 bg-[#0E0E11]/90 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-zinc-200">
                {profile.availability}
              </span>
              <span className="text-zinc-600">·</span>
              <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                <MapPin className="h-3 w-3 text-zinc-400" />
                {profile.location}
              </span>
            </div>

            {/* Clean Display Headline */}
            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-6xl xl:text-[4.25rem] font-bold tracking-[-0.03em] leading-[1.05] text-white">
                Syed Mujtaba Abbas
                <span className="block text-platinum mt-2 text-2xl sm:text-4xl xl:text-[2.65rem] font-semibold">
                  Building intelligent web products, autonomous AI &amp; cloud systems.
                </span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
                {profile.heroIntro}
              </p>
            </div>

            {/* Clean Interactive Discipline Switcher (Dark Gray Surface) */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0C0C0F]/85 p-5 backdrop-blur-xl">
              <div className="flex flex-wrap gap-2 pb-4 border-b border-white/[0.07]">
                {FOCUS_AREAS.map((area) => {
                  const isSelected = activeFocus.id === area.id;
                  return (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setActiveFocus(area)}
                      className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-black shadow-sm'
                          : 'bg-[#151519] text-zinc-400 hover:bg-[#1E1E24] hover:text-zinc-200'
                      }`}
                    >
                      {area.label}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 space-y-2.5">
                <p className="text-sm text-zinc-200 leading-relaxed">
                  {activeFocus.summary}
                </p>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-zinc-300 shrink-0" />
                  <span>
                    <strong className="text-zinc-200 font-medium">Shipped work:</strong>{' '}
                    {activeFocus.projects}
                  </span>
                </div>
              </div>
            </div>

            {/* Clean Action Buttons & Direct Socials */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <MagneticButton>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-semibold tracking-wide text-black transition-all hover:bg-zinc-200"
                >
                  <span>Explore Selected Work</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </MagneticButton>

              {onOpenDossier && (
                <MagneticButton>
                  <button
                    type="button"
                    onClick={onOpenDossier}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#121216] px-5 py-3.5 text-xs font-medium text-zinc-200 hover:border-white/30 hover:bg-[#18181D] hover:text-white transition-all cursor-pointer"
                  >
                    <FileText className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Read Full Resume</span>
                  </button>
                </MagneticButton>
              )}

              <div className="flex items-center gap-2 pl-1">
                <a
                  href="https://github.com/syed-mujtaba-stack"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#111115] text-zinc-400 hover:border-white/25 hover:text-white transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/creative-mujtaba"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#111115] text-zinc-400 hover:border-white/25 hover:text-white transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  aria-label="Send Email"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#111115] text-zinc-400 hover:border-white/25 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: 3D Interactive Studio Portrait Showcase with 4 Professional Portraits */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={cardRef}
              onMouseEnter={() => setHovering(true)}
              onMouseMove={handleCardMove}
              onMouseLeave={() => {
                setHovering(false);
                setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
              }}
              className="perspective-stage w-full max-w-[430px]"
            >
              <div
                style={{
                  transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${
                    hovering ? 1.015 : 1
                  }, ${hovering ? 1.015 : 1}, 1)`,
                  transition: hovering
                    ? 'transform 160ms cubic-bezier(0.22, 1, 0.36, 1)'
                    : 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-[#17171C] to-[#0A0A0D] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.92)]"
              >
                {/* Soft Silver Specular Glare */}
                <div
                  className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
                  style={{
                    opacity: hovering ? 1 : 0,
                    background: `radial-gradient(380px circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.14), transparent 65%)`,
                  }}
                />

                {/* Top Portrait Lookbook Switcher */}
                <div className="relative z-30 flex items-center justify-between gap-1.5 mb-3">
                  <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#0D0D10] p-1">
                    {PORTRAIT_LOOKBOOK.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActivePortraitIndex(idx)}
                        className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
                          activePortraitIndex === idx
                            ? 'bg-white text-black font-semibold shadow-sm'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <span className="font-mono-tech text-[10px] text-zinc-400">
                    0{activePortraitIndex + 1} / 04
                  </span>
                </div>

                {/* Main Professional Portrait Stage */}
                <div className="relative aspect-[4/4.3] w-full overflow-hidden rounded-xl bg-[#09090B]">
                  <img
                    key={activePortrait.src}
                    src={activePortrait.src}
                    alt={`${profile.name} — ${activePortrait.caption}`}
                    className="h-full w-full object-cover object-top transition-all duration-700"
                    style={{
                      transform: hovering ? 'scale(1.03)' : 'scale(1)',
                    }}
                    loading="eager"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#09090B] via-[#09090B]/70 to-transparent" />

                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between">
                    <div>
                      <p className="text-base font-semibold text-white">
                        {profile.name}
                      </p>
                      <p className="text-xs text-zinc-300">
                        {activePortrait.caption}
                      </p>
                    </div>
                    <span className="rounded-md border border-white/15 bg-black/80 px-2.5 py-1 font-mono-tech text-[11px] text-zinc-200 backdrop-blur-md">
                      Karachi, PK
                    </span>
                  </div>
                </div>

                {/* Clean Bottom Highlights */}
                <div className="mt-3.5 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl border border-white/[0.06] bg-[#111115] px-2 py-2.5">
                    <div className="text-xs font-semibold text-white">10+ Shipped</div>
                    <div className="text-[11px] text-zinc-400">Live &amp; OSS Systems</div>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-[#111115] px-2 py-2.5">
                    <div className="text-xs font-semibold text-white">B.S. Robotics</div>
                    <div className="text-[11px] text-zinc-400">Superior Univ.</div>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-[#111115] px-2 py-2.5">
                    <div className="text-xs font-semibold text-white">200+ Repos</div>
                    <div className="text-[11px] text-zinc-400">GitHub Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
