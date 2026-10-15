import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, GraduationCap, ShieldAlert } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ExperienceAuroraPillarsBg } from './SectionBackgrounds';

export const ExperienceTimeline: React.FC = () => {
  const { experience, education } = PORTFOLIO_DATA;

  // Guarantee Present (current === true) work is always at the very beginning
  const sortedExperience = useMemo(
    () =>
      [...experience].sort(
        (a, b) => Number(Boolean(b.current)) - Number(Boolean(a.current))
      ),
    [experience]
  );

  const [filterMode, setFilterMode] = useState<'all' | 'present' | 'past'>('all');
  const [expandedRoleId, setExpandedRoleId] = useState<string>(
    sortedExperience[0]?.id || ''
  );

  const visibleExperience = useMemo(() => {
    if (filterMode === 'present') {
      return sortedExperience.filter((item) => item.current);
    }
    if (filterMode === 'past') {
      return sortedExperience.filter((item) => !item.current);
    }
    return sortedExperience;
  }, [sortedExperience, filterMode]);

  const presentCount = sortedExperience.filter((i) => i.current).length;
  const pastCount = sortedExperience.filter((i) => !i.current).length;

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative border-t border-white/[0.07] bg-[#070709] py-24 sm:py-32 overflow-hidden"
    >
      {/* SECTION 6 UNIQUE BACKGROUND ANIMATION: Diagonal Aurora Light Pillars */}
      <ExperienceAuroraPillarsBg />

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <span className="inline-block rounded-full border border-white/10 bg-[#121216] px-3.5 py-1 text-xs font-medium text-zinc-300">
              Experience &amp; Education
            </span>
            <h2
              id="experience-heading"
              className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white"
            >
              Present leadership &amp;{' '}
              <span className="text-platinum">engineering progression.</span>
            </h2>
          </div>

          {/* Filter Pills: Present Work First */}
          <div className="flex flex-wrap gap-2 self-start lg:self-end">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-white text-black font-semibold'
                  : 'border border-white/10 bg-[#111116] text-zinc-400 hover:text-white'
              }`}
            >
              All Roles ({sortedExperience.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('present')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
                filterMode === 'present'
                  ? 'bg-white text-black font-semibold'
                  : 'border border-white/10 bg-[#111116] text-zinc-400 hover:text-white'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Present Work ({presentCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('past')}
              className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
                filterMode === 'past'
                  ? 'bg-white text-black font-semibold'
                  : 'border border-white/10 bg-[#111116] text-zinc-400 hover:text-white'
              }`}
            >
              Career Progression ({pastCount})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 7 Columns: Present Work at the Top, Followed by Career Progression */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between gap-2.5 mb-4">
              <div className="flex items-center gap-2.5">
                <Briefcase className="h-4 w-4 text-zinc-400" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Present Work First · Chronological Engineering Timeline
                </h3>
              </div>
              <span className="font-mono-tech text-[11px] text-emerald-400">
                {presentCount} Active Present Roles
              </span>
            </div>

            <div className="relative border-l border-white/10 pl-6 space-y-4">
              {visibleExperience.map((item, idx) => {
                const isExpanded = expandedRoleId === item.id;
                const prevItem = idx > 0 ? visibleExperience[idx - 1] : null;
                const showPastDivider =
                  filterMode === 'all' && prevItem?.current && !item.current;

                return (
                  <React.Fragment key={item.id}>
                    {showPastDivider && (
                      <div className="pt-4 pb-1">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111116] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                          Previous Career Progression (AlphaTach Track)
                        </div>
                      </div>
                    )}

                    <motion.div whileHover={{ x: 3 }} className="relative">
                      <span
                        className={`absolute -left-[29px] top-6 h-2.5 w-2.5 rounded-full border transition-all ${
                          item.current
                            ? 'border-emerald-400 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]'
                            : isExpanded
                            ? 'border-white bg-white'
                            : 'border-zinc-600 bg-[#09090B]'
                        }`}
                      />

                      <div
                        onClick={() => setExpandedRoleId(item.id)}
                        className={`rounded-2xl p-5 sm:p-6 border transition-all cursor-pointer ${
                          isExpanded
                            ? 'border-white/25 bg-[#121217]'
                            : 'border-white/[0.07] bg-[#0C0C0F]/90 hover:border-white/15'
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="flex flex-wrap items-center gap-2.5">
                              <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                                {item.role}
                              </h4>
                              {item.current && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/35 bg-emerald-500/12 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  Present
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-zinc-400 mt-0.5">
                              <span className="text-zinc-200 font-medium">
                                {item.organization}
                              </span>{' '}
                              · {item.subtitle}
                            </div>
                          </div>

                          <span
                            className={`rounded-md border px-2.5 py-1 font-mono-tech text-[11px] ${
                              item.current
                                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                                : 'border-white/10 bg-[#17171D] text-zinc-300'
                            }`}
                          >
                            {item.period}
                          </span>
                        </div>

                        <p className="text-sm text-zinc-300 leading-relaxed mt-2">
                          {item.description}
                        </p>

                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-3">
                            <ul className="space-y-1.5">
                              {item.highlights.map((hl) => (
                                <li
                                  key={hl}
                                  className="flex items-start gap-2 text-xs text-zinc-400"
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                                  <span>{hl}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-md border border-white/[0.08] bg-[#0B0B0E] px-2.5 py-1 font-mono-tech text-[10px] text-zinc-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Right 5 Columns: Executive Portrait + Academic Credentials */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0D0D11]/90 p-4 backdrop-blur-xl">
              <img
                src="/portraits/mujtaba-keynote-speaker.png"
                alt="Syed Mujtaba Abbas — Executive Portrait"
                className="h-20 w-20 rounded-xl object-cover object-top border border-white/15 shrink-0"
              />
              <div>
                <div className="text-sm font-bold text-white">Syed Mujtaba Abbas</div>
                <div className="text-xs text-zinc-300 mt-0.5">
                  Founder (AlphaMind, AlphaTech AI, SetupCI) &amp; Consultant
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">
                  B.S. in Robotics · GIAIC Agentic AI
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 mb-2">
              <GraduationCap className="h-4 w-4 text-zinc-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Academic Foundation
              </h3>
            </div>

            <div className="space-y-4">
              {education.items.map((edu) => (
                <div
                  key={edu.id}
                  className="rounded-2xl border border-white/[0.08] bg-[#0C0C0F]/90 p-6 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.07] pb-3 mb-3">
                    <span className="font-mono-tech text-xs text-zinc-400">
                      {edu.index}
                    </span>
                    <span className="text-xs text-zinc-400">{edu.location}</span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-white mb-1">
                    {edu.degree}
                  </h4>
                  <div className="text-xs font-medium text-zinc-300 mb-2.5">
                    {edu.institution}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {edu.focus}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111116] p-5 space-y-3">
              <div className="text-xs font-semibold text-zinc-200">
                Additional Applied AI Training
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed flex items-start gap-2">
                <ShieldAlert className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <span>{education.additionalNote}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
