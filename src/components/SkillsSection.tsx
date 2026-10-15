import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Orbit, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, SkillCategory } from '../data/portfolioData';
import { SkillsGyroRingsBg } from './SectionBackgrounds';

interface CloudTag {
  name: string;
  categoryTitle: string;
  categoryId: string;
  core?: boolean;
  x: number;
  y: number;
  z: number;
}

const Interactive3DSkillCloud: React.FC<{
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}> = ({ activeCategoryId, onSelectCategory }) => {
  const tags = useMemo<CloudTag[]>(() => {
    const all: Array<{ name: string; categoryTitle: string; categoryId: string; core?: boolean }> = [];
    PORTFOLIO_DATA.skillCategories.forEach((cat) => {
      cat.skills.slice(0, 3).forEach((s) => {
        all.push({
          name: s.name,
          categoryTitle: cat.shortTitle,
          categoryId: cat.id,
          core: s.core,
        });
      });
    });

    const n = all.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    return all.map((item, i) => {
      const y = 1 - (i / Math.max(1, n - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      return { ...item, x, y, z };
    });
  }, []);

  const [rotation, setRotation] = useState({ rx: 0.18, ry: 0.35 });
  const velRef = useRef({ vx: 0.002, vy: 0.0045 });
  const draggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number;
    const tick = () => {
      if (!draggingRef.current) {
        setRotation((prev) => ({
          rx: prev.rx + velRef.current.vx,
          ry: prev.ry + velRef.current.vy,
        }));
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    velRef.current = {
      vx: -ny * 0.014,
      vy: nx * 0.018,
    };

    if (draggingRef.current) {
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      setRotation((prev) => ({
        rx: prev.rx - dy * 0.008,
        ry: prev.ry + dx * 0.008,
      }));
    }
  };

  const projected = useMemo(() => {
    const cosX = Math.cos(rotation.rx);
    const sinX = Math.sin(rotation.rx);
    const cosY = Math.cos(rotation.ry);
    const sinY = Math.sin(rotation.ry);

    return tags
      .map((t) => {
        const y1 = t.y * cosX - t.z * sinX;
        const z1 = t.y * sinX + t.z * cosX;
        const x2 = t.x * cosY + z1 * sinY;
        const z2 = -t.x * sinY + z1 * cosY;

        const radiusPx = 155;
        const depth = (z2 + 1.6) / 2.6;
        const scale = Math.max(0.58, Math.min(1.22, depth));
        const opacity = Math.max(0.24, Math.min(1, depth));

        return {
          ...t,
          px: x2 * radiusPx,
          py: y1 * radiusPx,
          pz: z2,
          scale,
          opacity,
        };
      })
      .sort((a, b) => a.pz - b.pz);
  }, [tags, rotation]);

  return (
    <div
      onPointerDown={(e) => {
        draggingRef.current = true;
        lastPosRef.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={() => {
        draggingRef.current = false;
      }}
      onPointerLeave={() => {
        draggingRef.current = false;
        velRef.current = { vx: 0.002, vy: 0.0045 };
      }}
      onPointerMove={handlePointerMove}
      className="relative h-[430px] w-full rounded-2xl border border-white/[0.08] bg-[#0B0B0E]/90 overflow-hidden select-none cursor-grab active:cursor-grabbing flex items-center justify-center backdrop-blur-xl"
    >
      <div className="absolute top-4 left-5 right-5 z-20 flex items-center justify-between text-xs text-zinc-400">
        <span className="flex items-center gap-2 font-medium text-zinc-200">
          <Orbit className="h-4 w-4 text-zinc-400" />
          Interactive 3D Stack Sphere
        </span>
        <span className="text-[11px] text-zinc-500">Drag or move cursor to rotate</span>
      </div>

      <div className="relative h-0 w-0">
        {projected.map((item, idx) => {
          const isMatched = activeCategoryId === 'all' || activeCategoryId === item.categoryId;
          return (
            <button
              key={`${item.name}-${idx}`}
              type="button"
              onClick={() => onSelectCategory(item.categoryId)}
              style={{
                transform: `translate3d(${item.px}px, ${item.py}px, 0) translate(-50%, -50%) scale(${item.scale})`,
                opacity: isMatched ? item.opacity : item.opacity * 0.3,
                zIndex: Math.round((item.pz + 2) * 50),
              }}
              className={`absolute whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200 cursor-pointer ${
                activeCategoryId === item.categoryId
                  ? 'border-white bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : item.core
                  ? 'border-white/20 bg-[#17171C] text-zinc-100 hover:border-white/50'
                  : 'border-white/10 bg-[#111115] text-zinc-400 hover:text-white'
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const SkillsSection: React.FC = () => {
  const categories = PORTFOLIO_DATA.skillCategories;
  const [selectedId, setSelectedId] = useState<string>('all');

  const visibleCategories: SkillCategory[] =
    selectedId === 'all'
      ? categories
      : categories.filter((c) => c.id === selectedId);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative border-t border-white/[0.07] bg-[#050505] py-24 sm:py-32 overflow-hidden"
    >
      {/* SECTION 3 UNIQUE BACKGROUND ANIMATION: 3D Gyroscopic Orbital Rings */}
      <SkillsGyroRingsBg />

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <span className="inline-block rounded-full border border-white/10 bg-[#121216] px-3.5 py-1 text-xs font-medium text-zinc-300">
              Technical Stack &amp; Capabilities
            </span>
            <h2
              id="skills-heading"
              className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white"
            >
              Tools &amp; technologies used in{' '}
              <span className="text-platinum">real production systems.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-zinc-400 leading-relaxed">
            Every technology below is backed by shipped applications or public repositories — no arbitrary percentage bars.
          </p>
        </div>

        {/* Top Split: Interactive 3D Skill Sphere + Domain Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          <div className="lg:col-span-6">
            <Interactive3DSkillCloud
              activeCategoryId={selectedId}
              onSelectCategory={(id) =>
                setSelectedId((prev) => (prev === id ? 'all' : id))
              }
            />
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0D0D11]/90 p-6 sm:p-7 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-300 mb-2">
                <Sparkles className="h-4 w-4 text-zinc-400" />
                <span>Filter by Engineering Domain</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                Select a domain below or click any node inside the 3D sphere to inspect where each tool is used in production.
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedId('all')}
                  className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
                    selectedId === 'all'
                      ? 'bg-white text-black font-semibold'
                      : 'border border-white/10 bg-[#141419] text-zinc-400 hover:text-white'
                  }`}
                >
                  All Domains ({categories.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedId(cat.id)}
                    className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
                      selectedId === cat.id
                        ? 'bg-white text-black font-semibold'
                        : 'border border-white/10 bg-[#141419] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat.shortTitle}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Clean Dark Gray Skill Domain Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleCategories.map((category) => (
            <motion.article
              key={category.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-white/[0.08] bg-[#0C0C0F]/90 p-6 sm:p-7 backdrop-blur-xl hover:border-white/20 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-4 mb-5">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {category.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">{category.summary}</p>
                  </div>
                  <span className="rounded-md border border-white/10 bg-[#15151A] px-2.5 py-1 font-mono-tech text-[11px] text-zinc-300">
                    {category.skills.length} tools
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="rounded-xl border border-white/[0.06] bg-[#121216] p-3.5 hover:border-white/15 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-zinc-100">
                          {skill.name}
                        </span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {skill.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.06] text-xs text-zinc-500">
                {category.architectureNote}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
