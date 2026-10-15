import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Command,
  Compass,
  FileText,
  Github,
  Mail,
  MessageSquare,
  Search,
} from 'lucide-react';
import { PORTFOLIO_DATA, PortfolioProject } from '../data/portfolioData';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onOpenDossier: () => void;
  onOpenProjectCaseStudy: (project: PortfolioProject) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  onOpenDossier,
  onOpenProjectCaseStudy,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) onClose();
      } else if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const q = query.trim().toLowerCase();

  const sections = [
    { label: 'Home & Introduction', href: '#home' },
    { label: 'About & Engineering Philosophy', href: '#about' },
    { label: 'Technical Stack & 3D Sphere', href: '#skills' },
    { label: 'Selected Work & Case Studies', href: '#projects' },
    { label: 'Agentic AI Workflows', href: '#agentic-ai' },
    { label: 'Experience & Education', href: '#experience' },
    { label: 'Engineering Services', href: '#services' },
    { label: 'Contact & Project Brief', href: '#contact' },
  ].filter((s) => !q || s.label.toLowerCase().includes(q));

  const matchingProjects = PORTFOLIO_DATA.projects.filter(
    (p) =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.stack.some((st) => st.toLowerCase().includes(q))
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick navigation and command palette"
      className="fixed inset-0 z-[95] flex items-start justify-center bg-black/80 backdrop-blur-xl pt-20 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-white/15 bg-[#0E0E12] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5 bg-[#09090C]">
          <Search className="h-4 w-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, jump to section, or open resume..."
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="rounded border border-white/15 px-2 py-0.5 text-[10px] text-zinc-400 hover:text-white cursor-pointer"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-6">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-2 px-2">
              Quick Actions
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDossier();
                }}
                className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#141419] p-3 text-left hover:border-white/25 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2 text-xs font-medium text-white">
                  <FileText className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Open Full Resume / CV</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
              </button>

              <a
                href={`mailto:${PORTFOLIO_DATA.contact.email}?subject=Let%27s%20engineer%20something`}
                onClick={onClose}
                className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#141419] p-3 text-left hover:border-white/25 transition-colors"
              >
                <span className="flex items-center gap-2 text-xs font-medium text-white">
                  <Mail className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Email Syed Mujtaba Abbas</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
              </a>

              <a
                href={PORTFOLIO_DATA.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#141419] p-3 text-left hover:border-white/25 transition-colors"
              >
                <span className="flex items-center gap-2 text-xs font-medium text-white">
                  <MessageSquare className="h-3.5 w-3.5 text-zinc-400" />
                  <span>WhatsApp (+92 346 0630802)</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
              </a>

              <a
                href="https://github.com/syed-mujtaba-stack"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#141419] p-3 text-left hover:border-white/25 transition-colors"
              >
                <span className="flex items-center gap-2 text-xs font-medium text-white">
                  <Github className="h-3.5 w-3.5 text-zinc-400" />
                  <span>GitHub (syed-mujtaba-stack)</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
              </a>
            </div>
          </div>

          {sections.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-2 px-2">
                Sections
              </div>
              <div className="space-y-1">
                {sections.map((sec) => (
                  <a
                    key={sec.href}
                    href={sec.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Compass className="h-3.5 w-3.5 text-zinc-400" />
                      <span>{sec.label}</span>
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {matchingProjects.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-2 px-2">
                Projects ({matchingProjects.length})
              </div>
              <div className="space-y-1">
                {matchingProjects.map((proj) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenProjectCaseStudy(proj);
                    }}
                    className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {proj.name}{' '}
                        <span className="text-xs font-normal text-zinc-400">
                          · {proj.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-500">
                        {proj.stack.slice(0, 4).join(' · ')}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-zinc-300">
                      <BookOpen className="h-3 w-3 text-zinc-400" />
                      <span>Case Study</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-[#09090C] px-4 py-2.5 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Command className="h-3 w-3" />
            <span>Press ⌘K / Ctrl+K anytime</span>
          </span>
          <span className="text-zinc-300">Syed Mujtaba Abbas</span>
        </div>
      </div>
    </div>
  );
};
