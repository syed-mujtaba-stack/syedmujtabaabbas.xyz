import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ServicesDotMatrixBg } from './SectionBackgrounds';

interface ServicesSectionProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForInquiry,
}) => {
  const services = PORTFOLIO_DATA.services;
  const [activeId, setActiveId] = useState<string>(services[0].id);

  const activeService = services.find((s) => s.id === activeId) || services[0];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative border-t border-white/[0.07] bg-[#050505] py-24 sm:py-32 overflow-hidden"
    >
      {/* SECTION 7 UNIQUE BACKGROUND ANIMATION: Interactive Dot-Matrix Wave Field */}
      <ServicesDotMatrixBg />

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <span className="inline-block rounded-full border border-white/10 bg-[#121216] px-3.5 py-1 text-xs font-medium text-zinc-300">
              Engineering Services
            </span>
            <h2
              id="services-heading"
              className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white"
            >
              Practical systems built for{' '}
              <span className="text-platinum">real-world impact.</span>
            </h2>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#121216] px-5 py-2.5 text-xs font-medium text-zinc-200 hover:border-white/35 hover:text-white transition-colors self-start lg:self-end"
          >
            <span>Discuss a custom scope</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (6 cols): Clean Service List */}
          <div className="lg:col-span-6 space-y-2.5">
            {services.map((service) => {
              const isSelected = service.id === activeId;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveId(service.id)}
                  className={`w-full rounded-2xl text-left p-5 border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'border-white/35 bg-[#15151B] shadow-lg'
                      : 'border-white/[0.07] bg-[#0C0C0F]/90 hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono-tech text-xs text-zinc-400">
                        {service.index}
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-bold text-white">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 pl-7">
                      {service.tagline}
                    </p>
                  </div>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all ${
                      isSelected
                        ? 'border-white bg-white text-black'
                        : 'border-white/10 text-zinc-400'
                    }`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column (6 cols): Clean Service Details Card */}
          <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#0D0D11]/95 p-6 sm:p-8 lg:sticky lg:top-28 backdrop-blur-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="border-b border-white/[0.08] pb-4 mb-5">
                  <span className="font-mono-tech text-xs text-zinc-400">
                    Service {activeService.index}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                    {activeService.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                  {activeService.description}
                </p>

                <div className="mb-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                    Deliverables
                  </div>
                  <ul className="space-y-2">
                    {activeService.deliverables.map((del) => (
                      <li key={del} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <CheckCircle2 className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-7">
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
                    Technologies Used
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeService.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-[#141419] px-3 py-1 font-mono-tech text-xs text-zinc-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/[0.08] pt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <span className="text-xs text-zinc-400">
                    Need {activeService.title}?
                  </span>
                  <a
                    href="#contact"
                    onClick={() => onSelectServiceForInquiry(activeService.title)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
                  >
                    <span>Start a Conversation</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
