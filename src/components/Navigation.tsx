import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, Command, FileText, Gift } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const NAV_ITEMS = [
  { id: 'projects', label: 'Work', href: '#projects' },
  { id: 'lab', label: 'Lab', href: '#lab' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Stack', href: '#skills' },
  { id: 'agentic-ai', label: 'AI Systems', href: '#agentic-ai' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

interface NavigationProps {
  onOpenCommandPalette?: () => void;
  onOpenDossier?: () => void;
  onOpenOffersPopup?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenCommandPalette,
  onOpenDossier,
  onOpenOffersPopup,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pktTime, setPktTime] = useState('');

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
        setPktTime('GMT+5');
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const scrollPos = window.scrollY + 260;
      if (window.scrollY < 300) {
        setActiveSection('home');
        return;
      }
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-[#050505]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 sm:px-8">
        {/* Clean Brand Identity */}
        <a
          href="#home"
          className="group flex items-center gap-3 focus:outline-none"
          aria-label="Syed Mujtaba Abbas — Home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-[#121215] text-xs font-semibold tracking-wider text-white transition-all group-hover:border-white/40 group-hover:bg-[#1A1A1E]">
            {PORTFOLIO_DATA.profile.monogram}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-white">
              {PORTFOLIO_DATA.profile.name}
            </span>
            <span className="text-[11px] text-zinc-400">
              Software &amp; AI Engineer · Karachi ({pktTime})
            </span>
          </div>
        </a>

        {/* Clean Pill Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1 rounded-full border border-white/[0.08] bg-[#0E0E11]/90 p-1 backdrop-blur-md"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1F1F24] text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          {onOpenOffersPopup && (
            <button
              type="button"
              onClick={onOpenOffersPopup}
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/35 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:border-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
            >
              <Gift className="h-3.5 w-3.5 text-emerald-400" />
              <span>Offers</span>
            </button>
          )}

          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              title="Search & Quick Jump (⌘K)"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#111114] px-2.5 py-1.5 text-xs text-zinc-400 hover:border-white/25 hover:text-white transition-colors cursor-pointer"
            >
              <Command className="h-3.5 w-3.5" />
              <span>⌘K</span>
            </button>
          )}

          {onOpenDossier && (
            <button
              type="button"
              onClick={onOpenDossier}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#111114] px-3 py-1.5 text-xs font-medium text-zinc-200 hover:border-white/25 hover:text-white transition-colors cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5 text-zinc-400" />
              <span>Resume</span>
            </button>
          )}

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-1.5 text-xs font-semibold text-black transition-all hover:bg-zinc-200"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
          className="inline-flex lg:hidden items-center justify-center h-9 w-9 rounded-lg border border-white/15 bg-[#121215] text-white cursor-pointer"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Clean Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#08080A]/98 px-5 py-5 backdrop-blur-xl">
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-white"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="h-4 w-4 text-zinc-500" />
              </a>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-white/10">
            <div className="grid grid-cols-2 gap-2">
              {onOpenDossier && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDossier();
                  }}
                  className="rounded-lg border border-white/15 bg-[#141418] py-2.5 text-xs font-medium text-white cursor-pointer"
                >
                  View Resume
                </button>
              )}
              {onOpenCommandPalette && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="rounded-lg border border-white/15 bg-[#141418] py-2.5 text-xs font-medium text-white cursor-pointer"
                >
                  Quick Search (⌘K)
                </button>
              )}
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-white py-2.5 text-xs font-semibold text-black"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
