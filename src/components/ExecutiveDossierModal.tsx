import React, { useEffect } from 'react';
import { ExternalLink, FileText, Mail, MapPin, Phone, Printer, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ExecutiveDossierModalProps {
  open: boolean;
  onClose: () => void;
}

export const ExecutiveDossierModal: React.FC<ExecutiveDossierModalProps> = ({ open, onClose }) => {
  const { profile, about, skillCategories, experience, education, projects, contact } =
    PORTFOLIO_DATA;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-modal-title"
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-4xl rounded-2xl border border-white/15 bg-[#0E0E12] p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto print:max-h-none print:border-none print:bg-white print:text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-8 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-zinc-400" />
            <span className="text-xs font-medium text-zinc-300">
              Curriculum Vitae &amp; Technical Summary
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-zinc-200 cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-[#141419] text-zinc-300 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="border-b border-white/10 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="/portraits/mujtaba-executive-studio.png"
              alt={profile.name}
              className="h-20 w-20 rounded-xl object-cover object-top border border-white/15 shrink-0"
            />
            <div>
              <h2
                id="dossier-modal-title"
                className="font-display text-3xl sm:text-4xl font-bold text-white print:text-black"
              >
                {profile.name}
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mt-1">
                Full-Stack Developer · Agentic AI Developer · DevOps &amp; Cloud Engineer
              </p>
            </div>
          </div>
          <div className="space-y-1 text-xs text-zinc-400 print:text-gray-700">
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" />
              <span>{contact.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
              <span>{contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>
                {profile.location} ({profile.timezone})
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
            Summary
          </h3>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed print:text-black">
            {about.leadParagraph} {about.secondaryParagraph}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">
            Experience
          </h3>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="rounded-xl border border-white/[0.08] bg-[#131318] p-4 print:border-gray-300 print:bg-white"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <div className="font-display text-base font-bold text-white print:text-black">
                    {exp.role}{' '}
                    <span className="text-xs font-normal text-zinc-400">
                      — {exp.subtitle}
                    </span>
                  </div>
                  <span className="font-mono-tech text-xs text-zinc-300 print:text-gray-700">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed print:text-gray-800">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">
            Technical Stack
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skillCategories.map((cat) => (
              <div
                key={cat.id}
                className="rounded-xl border border-white/[0.08] bg-[#131318] p-3.5 print:border-gray-300 print:bg-white"
              >
                <div className="text-xs font-semibold text-white mb-1 print:text-black">
                  {cat.title}
                </div>
                <div className="text-xs text-zinc-400 print:text-gray-700">
                  {cat.skills.map((s) => s.name).join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Selected Projects
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {projects.slice(0, 6).map((p) => (
                <li key={p.id} className="border-b border-white/[0.08] pb-2">
                  <div className="flex items-center justify-between font-semibold text-white print:text-black">
                    <span>{p.name}</span>
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-zinc-300 hover:underline"
                      >
                        <span>Live</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 print:text-gray-700">{p.summary}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Education
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {education.items.map((ed) => (
                <li
                  key={ed.id}
                  className="rounded-xl border border-white/[0.08] bg-[#131318] p-3 print:border-gray-300 print:bg-white"
                >
                  <div className="font-bold text-white print:text-black">{ed.degree}</div>
                  <div className="text-xs text-zinc-400">
                    {ed.institution} · {ed.location}
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-zinc-500 leading-relaxed">
              {education.additionalNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
