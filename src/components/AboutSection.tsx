import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Cpu, Layers, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { AboutConstellationBg } from './SectionBackgrounds';

export const AboutSection: React.FC = () => {
  const { about } = PORTFOLIO_DATA;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative border-t border-white/[0.07] bg-[#070709] py-24 sm:py-32 overflow-hidden"
    >
      {/* SECTION 2 UNIQUE BACKGROUND ANIMATION: Drifting Neural Constellation */}
      <AboutConstellationBg />

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="mb-16 max-w-4xl space-y-5">
            <span className="inline-block rounded-full border border-white/10 bg-[#121216] px-3.5 py-1 text-xs font-medium text-zinc-300">
              About &amp; Engineering Philosophy
            </span>
            <h2
              id="about-heading"
              className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1]"
            >
              Connecting product experience,{' '}
              <span className="text-platinum">autonomous intelligence</span> &amp; cloud infrastructure.
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed pt-1">
              {about.leadParagraph}
            </p>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {about.secondaryParagraph}
            </p>

            {/* Philosophy Callout */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#141419]/90 to-[#0B0B0E]/90 p-6 sm:p-7 backdrop-blur-xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {about.philosophyTitle}
              </span>
              <blockquote className="mt-2 text-base sm:text-lg font-medium leading-relaxed text-zinc-100">
                &ldquo;{about.philosophyQuote}&rdquo;
              </blockquote>
              <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-wrap gap-4 text-xs text-zinc-300">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-zinc-400" />
                  End-to-End Ownership
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-zinc-400" />
                  Production-First Architecture
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-zinc-400" />
                  B.S. in Robotics
                </span>
              </div>
            </div>
        </div>

        {/* 3 Core Engineering Pillars in Clean Dark Gray Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {about.pillars.map((pillar, i) => {
            const Icons = [Layers, Cpu, Terminal];
            const Icon = Icons[i % Icons.length];
            return (
              <motion.div
                key={pillar.title}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-white/[0.08] bg-[#0E0E12]/88 p-7 backdrop-blur-xl hover:border-white/20 transition-colors"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#16161C] text-zinc-200">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs font-medium text-zinc-400 mt-1 mb-3">
                  {pillar.subtitle}
                </p>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* 4-Step Delivery Process */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {about.processSteps.map((step) => (
            <div
              key={step.id}
              className="rounded-2xl border border-white/[0.07] bg-[#0D0D10]/88 p-6 backdrop-blur-xl hover:border-white/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono-tech text-xs font-semibold text-zinc-400">
                  Step {step.id}
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-white mb-2">
                {step.title}
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-400">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
