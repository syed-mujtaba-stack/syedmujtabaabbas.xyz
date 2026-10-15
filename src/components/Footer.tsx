import React, { useEffect, useState } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Command,
  Copy,
  FileText,
  Gift,
  Github,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Sparkles,
} from 'lucide-react';
import { PORTFOLIO_DATA, PortfolioProject } from '../data/portfolioData';

interface FooterProps {
  onOpenOffersPopup?: () => void;
  onOpenDossier?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenAllProjects?: () => void;
  onSelectProject?: (project: PortfolioProject) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenOffersPopup,
  onOpenDossier,
  onOpenCommandPalette,
  onOpenAllProjects,
  onSelectProject,
}) => {
  const { profile, contact, projects } = PORTFOLIO_DATA;
  const [pktTime, setPktTime] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(new Date());
        setPktTime(formatted);
      } catch {
        setPktTime('PKT / UTC+5');
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 30000);
    return () => clearInterval(timer);
  }, []);

  const flagshipProjects = projects.slice(0, 6);

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#050507] text-zinc-400 overflow-hidden">
      {/* Subtle Top Horizon Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-60"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 0%, rgba(255, 255, 255, 0.05), transparent 80%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8 pt-16 pb-12">
        {/* Top Executive CTA & Offers Banner */}
        <div className="mb-14 rounded-2xl border border-white/12 bg-[#0C0C10]/95 p-6 sm:p-9 shadow-[0_24px_70px_rgba(0,0,0,0.85)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Special Launch Bundles &amp; Free Architecture Audit Available</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ready to ship your Next.js storefront, Sanity CMS platform, or AI agent?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Explore exclusive launch packages with bonus support, or start a direct WhatsApp conversation with Syed Mujtaba Abbas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onOpenOffersPopup && (
              <button
                type="button"
                onClick={onOpenOffersPopup}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-black hover:bg-zinc-200 transition-all cursor-pointer shadow-lg"
              >
                <Gift className="h-4 w-4" />
                <span>View Special Offers</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            )}

            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#15151C] px-4 py-3 text-xs font-semibold text-white hover:border-white/35 transition-all"
            >
              <MessageSquare className="h-4 w-4 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>

            {onOpenDossier && (
              <button
                type="button"
                onClick={onOpenDossier}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#111116] px-4 py-3 text-xs font-medium text-zinc-300 hover:border-white/25 hover:text-white transition-all cursor-pointer"
              >
                <FileText className="h-4 w-4 text-zinc-400" />
                <span>Resume / CV</span>
              </button>
            )}
          </div>
        </div>

        {/* Main 5-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Column 1 (4 cols): Brand Identity, Live Status & Direct Contact */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-[#131318] font-display text-sm font-bold text-white">
                {profile.monogram}
              </div>
              <div>
                <div className="font-display text-base font-bold text-white">
                  {profile.name}
                </div>
                <div className="text-xs text-zinc-400">
                  Founder — AlphaMind, AlphaTech AI &amp; SetupCI
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              AI-Focused Full-Stack Developer &amp; Agentic AI Engineer architecting Next.js &amp; Sanity CMS e-commerce stores, autonomous WhatsApp &amp; Playwright agents, and PyPI CLI tools.
            </p>

            {/* Live Karachi Time & Availability Badge */}
            <div className="inline-flex flex-wrap items-center gap-2.5 rounded-xl border border-white/[0.08] bg-[#0D0D12] px-3.5 py-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-200 font-medium">Available for Projects</span>
              <span className="text-zinc-600">·</span>
              <span className="inline-flex items-center gap-1 text-zinc-400 font-mono-tech text-[11px]">
                <MapPin className="h-3 w-3" />
                Karachi ({pktTime || 'PKT'})
              </span>
            </div>

            {/* Direct Email & Phone Copy Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(contact.email);
                  setCopiedEmail(true);
                  setTimeout(() => setCopiedEmail(false), 2000);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#111116] px-3 py-1.5 text-xs text-zinc-300 hover:border-white/25 hover:text-white cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Email Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{contact.email}</span>
                  </>
                )}
              </button>

              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#111116] px-3 py-1.5 text-xs text-zinc-300 hover:border-white/25 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 text-zinc-400" />
                <span>{contact.phone}</span>
              </a>
            </div>
          </div>

          {/* Column 2 (2 cols): Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home &amp; Intro
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Featured Work (4)
                </a>
              </li>
              {onOpenAllProjects && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenAllProjects}
                    className="text-zinc-300 font-medium hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>All Projects ({projects.length})</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </li>
              )}
              <li>
                <a href="#lab" className="hover:text-white transition-colors">
                  Engineering Lab
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">
                  3D Tech Stack
                </a>
              </li>
              <li>
                <a href="#agentic-ai" className="hover:text-white transition-colors">
                  Agentic AI Systems
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">
                  Present Work &amp; Exp
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Brief
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 (2 cols): Flagship Systems */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Flagship Systems
            </div>
            <ul className="space-y-2 text-xs">
              {flagshipProjects.map((proj) => (
                <li key={proj.id}>
                  {onSelectProject ? (
                    <button
                      type="button"
                      onClick={() => onSelectProject(proj)}
                      className="text-left hover:text-white transition-colors cursor-pointer truncate max-w-full"
                    >
                      {proj.name}
                    </button>
                  ) : (
                    <a
                      href={proj.liveUrl || '#projects'}
                      target={proj.liveUrl ? '_blank' : undefined}
                      rel={proj.liveUrl ? 'noopener noreferrer' : undefined}
                      className="hover:text-white transition-colors"
                    >
                      {proj.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (2 cols): Offers & Quick Actions */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Offers &amp; Tools
            </div>
            <ul className="space-y-2.5 text-xs">
              {onOpenOffersPopup && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenOffersPopup}
                    className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold hover:underline cursor-pointer"
                  >
                    <Gift className="h-3.5 w-3.5" />
                    <span>Special Offers Popup</span>
                  </button>
                </li>
              )}
              {onOpenAllProjects && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenAllProjects}
                    className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <Layers className="h-3.5 w-3.5 text-zinc-500" />
                    <span>25-Project Archive</span>
                  </button>
                </li>
              )}
              {onOpenDossier && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenDossier}
                    className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <FileText className="h-3.5 w-3.5 text-zinc-500" />
                    <span>Printable Resume / CV</span>
                  </button>
                </li>
              )}
              {onOpenCommandPalette && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenCommandPalette}
                    className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <Command className="h-3.5 w-3.5 text-zinc-500" />
                    <span>Command Palette (⌘K)</span>
                  </button>
                </li>
              )}
              <li>
                <a
                  href="https://pypi.org/project/setupci/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>SetupCI on PyPI</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5 (2 cols): Verified Socials */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Verified Profiles
            </div>
            <ul className="space-y-2.5 text-xs">
              {contact.socials.map((soc) => (
                <li key={soc.id}>
                  <a
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between hover:text-white transition-colors"
                  >
                    <span>{soc.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center justify-between hover:text-white transition-colors"
                >
                  <span>Direct Email</span>
                  <Mail className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} {profile.name}.</span>
            <span>·</span>
            <span>Engineered in Karachi, Pakistan (PKT / UTC+5)</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/syed-mujtaba-stack"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#101014] text-zinc-400 hover:border-white/25 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/creative-mujtaba"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#101014] text-zinc-400 hover:border-white/25 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#101014] text-zinc-400 hover:border-white/25 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="ml-1 inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-[#121217] px-3.5 py-1.5 text-xs font-medium text-zinc-200 hover:border-white/30 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
