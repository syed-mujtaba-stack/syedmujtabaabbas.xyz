import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Search,
  Layers,
  LayoutGrid,
  Rows3,
  MessageSquare,
  ArrowUpRight,
  Trash2,
} from 'lucide-react';
import { PORTFOLIO_DATA, PortfolioProject } from '../data/portfolioData';
import {
  Interactive3DProjectCard,
  ProjectCaseStudyModal,
} from './ProjectsGallery';
import { ProjectsHorizonGridBg } from './SectionBackgrounds';

type FilterCategory = PortfolioProject['filterCategory'] | '★ Shortlisted';

const CATEGORIES: FilterCategory[] = [
  'All',
  'E-Commerce & B2B',
  'AI & Agents',
  'Full-Stack & Web',
  'Dev Tooling & Automation',
  '★ Shortlisted',
];

interface AllProjectsPageProps {
  onBackHome: () => void;
  initialSelectedProject?: PortfolioProject | null;
}

export const AllProjectsPage: React.FC<AllProjectsPageProps> = ({
  onBackHome,
  initialSelectedProject = null,
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [gridDensity, setGridDensity] = useState<'comfortable' | 'compact'>('comfortable');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(
    initialSelectedProject
  );
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mujtaba_shortlisted_projects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        'mujtaba_shortlisted_projects',
        JSON.stringify(shortlistedIds)
      );
    } catch {
      // ignore storage errors
    }
  }, [shortlistedIds]);

  const toggleShortlist = (projectId: string) => {
    setShortlistedIds((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const q = searchQuery.trim().toLowerCase();
  const filteredProjects = PORTFOLIO_DATA.projects.filter((project) => {
    const matchesCategory =
      activeCategory === 'All'
        ? true
        : activeCategory === '★ Shortlisted'
        ? shortlistedIds.includes(project.id)
        : project.filterCategory === activeCategory;
    const matchesSearch =
      !q ||
      project.name.toLowerCase().includes(q) ||
      project.summary.toLowerCase().includes(q) ||
      project.category.toLowerCase().includes(q) ||
      project.stack.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const shortlistedProjects = PORTFOLIO_DATA.projects.filter((p) =>
    shortlistedIds.includes(p.id)
  );

  const shortlistWhatsAppUrl =
    shortlistedProjects.length > 0
      ? `https://wa.me/923460630802?text=${encodeURIComponent(
          `Hi Mujtaba! I shortlisted these ${shortlistedProjects.length} reference project(s) from your portfolio:\n` +
            shortlistedProjects.map((p) => `• ${p.name} (${p.category})`).join('\n') +
            `\nLet's discuss building something similar!`
        )}`
      : PORTFOLIO_DATA.contact.whatsappHref;

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#FAFAFA]">
      {/* Dedicated Top Bar for All Projects Page */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#050505]/88 backdrop-blur-xl py-4">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 sm:px-8">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#121216] px-4 py-2 text-xs font-semibold text-white hover:border-white/35 hover:bg-[#19191F] transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Grid Density Switcher */}
            <div className="hidden sm:flex items-center gap-1 rounded-lg border border-white/10 bg-[#101014] p-1">
              <button
                type="button"
                onClick={() => setGridDensity('comfortable')}
                title="2-Column Detailed Grid"
                className={`rounded px-2 py-1 text-[11px] font-medium cursor-pointer flex items-center gap-1 ${
                  gridDensity === 'comfortable'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Rows3 className="h-3 w-3" />
                <span>2-Col</span>
              </button>
              <button
                type="button"
                onClick={() => setGridDensity('compact')}
                title="3-Column Gallery Grid"
                className={`rounded px-2 py-1 text-[11px] font-medium cursor-pointer flex items-center gap-1 ${
                  gridDensity === 'compact'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="h-3 w-3" />
                <span>3-Col</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-zinc-400" />
              <span className="text-xs font-medium text-zinc-300">
                Complete Project Archive ({PORTFOLIO_DATA.projects.length} Systems)
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden py-16 sm:py-24">
        {/* Background Animation */}
        <ProjectsHorizonGridBg />

        <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8">
          {/* Page Title & Search Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-block rounded-full border border-white/10 bg-[#121216] px-3.5 py-1 text-xs font-medium text-zinc-300">
                All Projects &amp; Case Studies
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Complete engineering{' '}
                <span className="text-platinum">work archive.</span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Explore all {PORTFOLIO_DATA.projects.length} production platforms, Next.js &amp; Sanity CMS stores, autonomous AI agents, and CLI tools. Tip: Click <span className="text-white font-medium">☆ Shortlist</span> on any project to compare or send reference picks to Mujtaba.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Next.js, Sanity, AI, Python..."
                className="w-full rounded-xl border border-white/12 bg-[#0E0E12] pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:border-white/35 focus:outline-none"
              />
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-white/[0.08]"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              const count =
                category === 'All'
                  ? PORTFOLIO_DATA.projects.length
                  : category === '★ Shortlisted'
                  ? shortlistedIds.length
                  : PORTFOLIO_DATA.projects.filter((p) => p.filterCategory === category)
                      .length;

              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-black font-semibold'
                      : 'border border-white/10 bg-[#111115] text-zinc-400 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                      isActive
                        ? 'bg-black/15 text-black'
                        : 'bg-white/10 text-zinc-300'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* All Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div
              className={
                gridDensity === 'compact'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'grid grid-cols-1 md:grid-cols-2 gap-7'
              }
            >
              {filteredProjects.map((project) => (
                <Interactive3DProjectCard
                  key={project.id}
                  project={project}
                  onSelectProject={setSelectedProject}
                  isShortlisted={shortlistedIds.includes(project.id)}
                  onToggleShortlist={toggleShortlist}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#0C0C0F] p-12 text-center space-y-4">
              <p className="text-base font-medium text-white">
                {activeCategory === '★ Shortlisted'
                  ? 'You have not shortlisted any projects yet.'
                  : `No projects matched "${searchQuery}" in ${activeCategory}.`}
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-zinc-200 cursor-pointer"
              >
                Show All {PORTFOLIO_DATA.projects.length} Projects
              </button>
            </div>
          )}

          {/* Bottom Back Button */}
          <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={onBackHome}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#121216] px-5 py-3 text-xs font-semibold text-white hover:border-white/35 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Home Page</span>
            </button>

            <a
              href="/#contact"
              onClick={onBackHome}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-semibold text-black hover:bg-zinc-200 transition-all"
            >
              <span>Have a similar project in mind? Let&apos;s Talk</span>
            </a>
          </div>
        </div>

        {/* Floating Shortlist Bar when 1+ projects are shortlisted */}
        {shortlistedProjects.length > 0 && (
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] w-[92vw] max-w-2xl rounded-2xl border border-white/20 bg-[#0E0E13]/95 px-5 py-3.5 shadow-[0_24px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-black">
                {shortlistedProjects.length}
              </span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white">
                  Shortlisted Reference Projects
                </div>
                <div className="text-[11px] text-zinc-400 truncate max-w-[260px] sm:max-w-[340px]">
                  {shortlistedProjects.map((p) => p.name).join(' · ')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShortlistedIds([])}
                title="Clear shortlist"
                className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-[#17171E] px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
              <a
                href={shortlistWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-black hover:bg-zinc-200"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Discuss Shortlist on WhatsApp</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )}

        <ProjectCaseStudyModal
          selectedProject={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </main>
    </div>
  );
};
