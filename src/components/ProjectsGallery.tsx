import React, { useState } from 'react';
import {
  ExternalLink,
  Layers,
  Info,
  X,
  CheckCircle2,
  Cpu,
  Terminal,
  Wrench,
  AlertCircle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Bot,
  ArrowRight,
} from 'lucide-react';
import { PORTFOLIO_DATA, PortfolioProject } from '../data/portfolioData';
import { ProjectsHorizonGridBg } from './SectionBackgrounds';

/**
 * Clean Interactive Live Preview inside the Featured Project Stage
 */
export const InteractiveProjectSandbox: React.FC<{ project: PortfolioProject }> = ({
  project,
}) => {
  const [simStep, setSimStep] = useState(0);
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [ciStack, setCiStack] = useState<'nextjs' | 'fastapi'>('nextjs');

  if (project.previewImage) {
    return (
      <div className="overflow-hidden rounded-xl border border-white/12 bg-[#08080A] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#101014] px-3.5 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          </div>
          <span className="font-mono-tech text-[11px] text-zinc-400">
            {project.liveUrl || project.name}
          </span>
        </div>
        <img
          src={project.previewImage}
          alt={`${project.name} — Live Application Screenshot`}
          className="w-full max-h-[280px] object-cover object-top"
        />
      </div>
    );
  }

  if (project.id === 'edugenius') {
    const options = [
      'A) Retrieval-Augmented Generation (RAG) with grounded context',
      'B) Unconstrained zero-context random generation',
      'C) Static HTML templates',
    ];
    return (
      <div className="rounded-xl border border-white/10 bg-[#08080A] p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-2">
          <span className="text-xs font-medium text-zinc-200 flex items-center gap-1.5">
            <Bot className="h-3.5 w-3.5 text-zinc-400" />
            EduGenius Interactive AI Quiz Preview
          </span>
          <span className="font-mono-tech text-[11px] text-emerald-400">OpenAI + Next.js</span>
        </div>
        <p className="text-xs font-medium text-zinc-200">
          Sample Question: Which architecture keeps AI tutoring responses accurate and grounded?
        </p>
        <div className="space-y-1.5">
          {options.map((opt, idx) => {
            const selected = quizChoice === idx;
            const isCorrect = idx === 0;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setQuizChoice(idx)}
                className={`w-full text-left rounded-lg border px-3 py-2 text-xs transition-all cursor-pointer ${
                  selected
                    ? isCorrect
                      ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-200'
                      : 'border-amber-400/60 bg-amber-500/10 text-amber-200'
                    : 'border-white/[0.08] bg-[#111115] text-zinc-300 hover:border-white/25'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (project.id === 'setupci') {
    return (
      <div className="rounded-xl border border-white/10 bg-[#08080A] p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-2">
          <span className="text-xs font-medium text-zinc-200 flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-zinc-400" />
            SetupCI Pipeline Preview
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setCiStack('nextjs')}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium cursor-pointer ${
                ciStack === 'nextjs'
                  ? 'bg-white text-black'
                  : 'border border-white/10 text-zinc-400'
              }`}
            >
              Next.js + Docker
            </button>
            <button
              type="button"
              onClick={() => setCiStack('fastapi')}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium cursor-pointer ${
                ciStack === 'fastapi'
                  ? 'bg-white text-black'
                  : 'border border-white/10 text-zinc-400'
              }`}
            >
              FastAPI + Actions
            </button>
          </div>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-white/[0.06] bg-[#050507] p-3 font-mono-tech text-[11px] leading-relaxed text-zinc-300">
          {ciStack === 'nextjs'
            ? `name: SetupCI-NextJS-Production\non: [push]\njobs:\n  build-and-deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci && npm run build\n      - run: docker build -t app:prod .`
            : `name: SetupCI-FastAPI-Pipeline\non: [push]\njobs:\n  pytest-and-containerize:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/setup-python@v5\n      - run: pip install -r requirements.txt && pytest`}
        </pre>
      </div>
    );
  }

  const tabs = [
    {
      label: 'Architecture',
      text: project.caseStudy?.solution || project.summary,
    },
    {
      label: 'Stack',
      text: `Built with ${project.stack.join(', ')} for fast load times and clean maintainability.`,
    },
    {
      label: 'Outcome',
      text: project.caseStudy?.verifiedOutcomes?.[0] || project.tagline,
    },
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-[#08080A] p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-2">
        <span className="text-xs font-medium text-zinc-200">
          Engineering Highlights
        </span>
        <div className="flex gap-1.5">
          {tabs.map((t, idx) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setSimStep(idx)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium cursor-pointer ${
                simStep === idx
                  ? 'bg-white text-black'
                  : 'border border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
        {tabs[simStep].text}
      </p>
    </div>
  );
};

export const CleanAnimatedProjectPreview: React.FC<{
  project: PortfolioProject;
  isHovered: boolean;
}> = ({ project, isHovered }) => {
  if (project.previewImage) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#08080B] select-none">
        <img
          src={project.previewImage}
          alt={`${project.name} — Live Website Screenshot`}
          className="h-full w-full object-cover object-top transition-transform duration-700"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1.0)',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0C0C0F] to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#08080B] select-none flex items-center justify-center p-6">
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 0.9 : 0.45,
          background:
            'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08), transparent 70%)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          transform: isHovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      <div
        style={{
          transform: isHovered ? 'translateY(-4px) scale(1.03)' : 'translateY(0) scale(1)',
          transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative z-10 w-full max-w-[290px] rounded-xl border border-white/12 bg-[#111116]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-zinc-600" />
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
          </div>
          <span className="font-mono-tech text-[10px] text-zinc-400">
            {project.category}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-base font-bold text-white">
              {project.name}
            </div>
            <div className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
              {project.stack.slice(0, 3).join(' · ')}
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#191920] text-zinc-200">
            <Cpu className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export interface Interactive3DProjectCardProps {
  project: PortfolioProject;
  onSelectProject: (p: PortfolioProject) => void;
  isShortlisted?: boolean;
  onToggleShortlist?: (projectId: string) => void;
}

export const Interactive3DProjectCard: React.FC<Interactive3DProjectCardProps> = ({
  project,
  onSelectProject,
  isShortlisted = false,
  onToggleShortlist,
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0, spotX: 50, spotY: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (0.5 - py) * 8,
      y: (px - 0.5) * 10,
      spotX: px * 100,
      spotY: py * 100,
    });
  };

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ x: 0, y: 0, spotX: 50, spotY: 50 });
      }}
      style={{
        transform: hovered
          ? `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
          : 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: hovered
          ? 'transform 160ms cubic-bezier(0.22, 1, 0.36, 1)'
          : 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0C0C0F]/92 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.8)] hover:border-white/25"
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(460px circle at ${tilt.spotX}% ${tilt.spotY}%, rgba(255, 255, 255, 0.06), transparent 65%)`,
        }}
      />

      <div>
        <div className="relative h-56 w-full overflow-hidden border-b border-white/[0.07]">
          <div
            onClick={() => onSelectProject(project)}
            className="h-full w-full cursor-pointer"
            title="Click to inspect full preview & case study"
          >
            <CleanAnimatedProjectPreview project={project} isHovered={hovered} />
          </div>

          {onToggleShortlist && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleShortlist(project.id);
              }}
              className={`absolute top-3 right-3 z-20 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md transition-all cursor-pointer ${
                isShortlisted
                  ? 'border-white bg-white text-black shadow-md'
                  : 'border-white/15 bg-black/75 text-zinc-300 hover:border-white/40 hover:text-white'
              }`}
            >
              <span>{isShortlisted ? '★ Shortlisted' : '☆ Shortlist'}</span>
            </button>
          )}

          <div className="absolute bottom-3 right-3 z-20">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/85 px-3 py-1 text-[10px] font-medium text-zinc-300 backdrop-blur-md">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  project.liveUrl ? 'bg-emerald-400' : 'bg-zinc-500'
                }`}
              />
              {project.liveUrl ? 'Live Production' : 'Engineered System'}
            </span>
          </div>
        </div>

        <div className="relative z-20 p-6 sm:p-7 space-y-3.5">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
              {project.name}
            </h3>
            <p className="mt-1 text-xs font-medium text-zinc-400">{project.tagline}</p>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">{project.summary}</p>

          {project.verificationNote && (
            <div className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-[#08080A] p-3 text-xs text-zinc-400">
              <Info className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
              <span>{project.verificationNote}</span>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-20 px-6 pb-6 sm:px-7 sm:pb-7 pt-2 space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech: string) => (
            <span
              key={tech}
              className="rounded-md border border-white/[0.08] bg-[#141418] px-2.5 py-1 font-mono-tech text-[11px] text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] pt-4">
          <button
            type="button"
            onClick={() => onSelectProject(project)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#15151A] px-3.5 py-2 text-xs font-medium text-white hover:bg-white hover:text-black transition-all cursor-pointer"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Read Case Study</span>
          </button>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-zinc-300 transition-colors"
              >
                <span>Live Site</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export const ProjectCaseStudyModal: React.FC<{
  selectedProject: PortfolioProject | null;
  onClose: () => void;
}> = ({ selectedProject, onClose }) => {
  if (!selectedProject || !selectedProject.caseStudy) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-3xl rounded-2xl border border-white/15 bg-[#0E0E12] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-[#141419] px-6 py-4">
          <span className="text-xs font-medium text-zinc-300">
            Case Study · {selectedProject.category}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#0B0B0E] text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8 space-y-6">
          {selectedProject.previewImage && (
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#08080A]">
              <img
                src={selectedProject.previewImage}
                alt={selectedProject.name}
                className="w-full max-h-64 object-cover object-top"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3
                id="case-study-modal-title"
                className="font-display text-2xl sm:text-3xl font-bold text-white"
              >
                {selectedProject.name}
              </h3>
              <p className="mt-1 text-sm text-zinc-400">{selectedProject.tagline}</p>
            </div>

            {selectedProject.liveUrl && (
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-zinc-200"
              >
                <span>Visit Live Site</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-[#131318] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                <AlertCircle className="h-4 w-4 text-zinc-400" />
                <span>Problem &amp; Context</span>
              </div>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                {selectedProject.caseStudy.problem}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#131318] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                <Cpu className="h-4 w-4 text-zinc-400" />
                <span>Role &amp; Ownership</span>
              </div>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                {selectedProject.caseStudy.role}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#131318] p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
              <Layers className="h-4 w-4 text-zinc-400" />
              <span>Architecture &amp; Solution</span>
            </div>
            <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
              {selectedProject.caseStudy.solution}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-[#131318] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                <Wrench className="h-4 w-4 text-zinc-400" />
                <span>Key Engineering Decisions</span>
              </div>
              <ul className="mt-2.5 space-y-2">
                {selectedProject.caseStudy.keyDecisions.map((decision: string) => (
                  <li
                    key={decision}
                    className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#131318] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                <Terminal className="h-4 w-4 text-zinc-400" />
                <span>Verified Outcomes</span>
              </div>
              <ul className="mt-2.5 space-y-2">
                {selectedProject.caseStudy.verifiedOutcomes.map((outcome: string) => (
                  <li
                    key={outcome}
                    className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface ProjectsGalleryProps {
  externalSelectedProject?: PortfolioProject | null;
  onClearExternalProject?: () => void;
  onOpenAllProjectsPage?: () => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  externalSelectedProject,
  onClearExternalProject,
  onOpenAllProjectsPage,
}) => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  // Only show the 4 Featured Projects on the Home Page
  const featuredProjects = PORTFOLIO_DATA.projects.filter((p) => p.featured).slice(0, 4);
  const totalCount = PORTFOLIO_DATA.projects.length;

  React.useEffect(() => {
    if (externalSelectedProject) {
      setSelectedProject(externalSelectedProject);
      onClearExternalProject?.();
    }
  }, [externalSelectedProject, onClearExternalProject]);

  const spotlightProject = featuredProjects[spotlightIndex] || featuredProjects[0];

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-24 lg:py-32 border-t border-white/[0.07] bg-[#070709] overflow-hidden"
    >
      {/* SECTION 4 UNIQUE BACKGROUND ANIMATION: Infinite Perspective Grid & Light Beams */}
      <ProjectsHorizonGridBg />

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block rounded-full border border-white/10 bg-[#121216] px-3.5 py-1 text-xs font-medium text-zinc-300">
              Featured Work ({featuredProjects.length} of {totalCount})
            </span>
            <h2
              id="projects-heading"
              className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white"
            >
              Selected production{' '}
              <span className="text-platinum">platforms &amp; systems.</span>
            </h2>
          </div>

          {onOpenAllProjectsPage && (
            <button
              type="button"
              onClick={onOpenAllProjectsPage}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-white px-5 py-3 text-xs font-semibold text-black hover:bg-zinc-200 transition-all cursor-pointer self-start lg:self-end"
            >
              <span>View All {totalCount} Projects</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>

        {/* Clean Interactive Featured Project Showcase */}
        <div className="mb-12 rounded-2xl border border-white/10 bg-[#0D0D11]/95 p-6 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4 mb-6">
            <div>
              <span className="text-xs text-zinc-400">
                Featured Highlight ({spotlightIndex + 1} of {featuredProjects.length})
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                {spotlightProject.name}
              </h3>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  setSpotlightIndex((prev) =>
                    prev === 0 ? featuredProjects.length - 1 : prev - 1
                  )
                }
                aria-label="Previous project"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#141419] text-white hover:border-white/30 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setSpotlightIndex((prev) => (prev + 1) % featuredProjects.length)
                }
                aria-label="Next project"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#141419] text-white hover:border-white/30 cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {spotlightProject.summary}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {spotlightProject.stack.map((tech: string) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-[#15151A] px-2.5 py-1 font-mono-tech text-[11px] text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                {spotlightProject.liveUrl && (
                  <a
                    href={spotlightProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-zinc-200"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedProject(spotlightProject)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#15151A] px-4 py-2 text-xs font-medium text-white hover:border-white/35 cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Read Case Study</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <InteractiveProjectSandbox project={spotlightProject} />
            </div>
          </div>
        </div>

        {/* Curated 4 Featured Projects Grid on Home Page */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {featuredProjects.map((project) => (
            <Interactive3DProjectCard
              key={project.id}
              project={project}
              onSelectProject={setSelectedProject}
            />
          ))}
        </div>

        {/* Bottom CTA Banner to Open Dedicated All Projects Page */}
        {onOpenAllProjectsPage && (
          <div className="mt-12 rounded-2xl border border-white/10 bg-[#0D0D11]/90 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xl">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                Explore the complete engineering archive
              </h3>
              <p className="text-sm text-zinc-400 mt-1">
                View all {totalCount} projects including WhatsApp AI Agent Platform, LeadHunter v2, MJ FTE, Norvia, Fuji Fenix &amp; more.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenAllProjectsPage}
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-all cursor-pointer"
            >
              <span>Open All Projects Page ({totalCount})</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>

      <ProjectCaseStudyModal
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
