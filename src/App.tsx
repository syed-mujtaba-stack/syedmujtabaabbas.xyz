import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gift } from 'lucide-react';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsGallery } from './components/ProjectsGallery';
import { AllProjectsPage } from './components/AllProjectsPage';
import { InteractiveEngineeringLab } from './components/InteractiveEngineeringLab';
import { AIAgentVisualization } from './components/AIAgentVisualization';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { ExecutiveDossierModal } from './components/ExecutiveDossierModal';
import { MujtabaAICopilot } from './components/MujtabaAICopilot';
import { SpecialOffersPopupModal } from './components/SpecialOffersPopupModal';
import { SEOFAQSection } from './components/SEOFAQSection';
import { updatePageSEO } from './utils/seoManager';
import type { PortfolioProject } from './data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string | undefined>(
    undefined
  );
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [dossierOpen, setDossierOpen] = useState(false);
  const [offersPopupOpen, setOffersPopupOpen] = useState(false);
  const [externalProjectForCaseStudy, setExternalProjectForCaseStudy] =
    useState<PortfolioProject | null>(null);
  const [showAllProjectsPage, setShowAllProjectsPage] = useState<boolean>(() => {
    return window.location.hash === '#all-projects';
  });

  // Auto-open the Special Offers Popup once per session after 3.2 seconds
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem('mujtaba_offers_popup_shown');
      if (!seen) {
        const timer = setTimeout(() => {
          setOffersPopupOpen(true);
          sessionStorage.setItem('mujtaba_offers_popup_shown', '1');
        }, 3200);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    updatePageSEO({
      view: showAllProjectsPage ? 'all-projects' : 'home',
      activeProject: externalProjectForCaseStudy,
    });
  }, [showAllProjectsPage, externalProjectForCaseStudy]);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === '#all-projects') {
        setShowAllProjectsPage(true);
      } else if (showAllProjectsPage) {
        setShowAllProjectsPage(false);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [showAllProjectsPage]);

  const openAllProjects = () => {
    window.history.pushState(null, '', '#all-projects');
    setShowAllProjectsPage(true);
  };

  const closeAllProjects = () => {
    window.history.pushState(null, '', '#projects');
    setShowAllProjectsPage(false);
  };

  const handleSelectProjectAnywhere = (proj: PortfolioProject) => {
    if (proj.featured && !showAllProjectsPage) {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setExternalProjectForCaseStudy(proj);
    } else {
      setExternalProjectForCaseStudy(proj);
      openAllProjects();
    }
  };

  const handleClaimOfferInForm = (offerTitle: string) => {
    if (showAllProjectsPage) {
      setShowAllProjectsPage(false);
      window.history.pushState(null, '', '#contact');
    }
    setSelectedServiceForInquiry(offerTitle);
    setTimeout(() => {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (showAllProjectsPage) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('main > section:not(#home)');
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { y: 24, opacity: 0.94 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [showAllProjectsPage]);

  const floatingOffersTrigger = !offersPopupOpen && (
    <div className="fixed bottom-[5.25rem] left-4 z-[84] sm:bottom-5 sm:left-5">
      <button
        type="button"
        onClick={() => setOffersPopupOpen(true)}
        className="group flex items-center gap-2 rounded-full border border-emerald-500/35 bg-[#0D0D11]/95 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_16px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl hover:border-emerald-400 hover:bg-[#14141B] transition-all cursor-pointer"
      >
        <Gift className="h-4 w-4 text-emerald-400" />
        <span>Special Offers</span>
        <span className="hidden rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono-tech text-[10px] font-bold text-emerald-300 min-[420px]:inline-flex">
          From $69
        </span>
      </button>
    </div>
  );

  if (showAllProjectsPage) {
    return (
      <div className="relative min-h-screen bg-[#050505] text-[#FAFAFA] selection:bg-white/20 selection:text-white">
        <CustomCursor />
        <AllProjectsPage
          onBackHome={closeAllProjects}
          initialSelectedProject={externalProjectForCaseStudy}
        />
        <SpecialOffersPopupModal
          open={offersPopupOpen}
          onClose={() => setOffersPopupOpen(false)}
          onClaimOfferInForm={handleClaimOfferInForm}
        />
        {floatingOffersTrigger}
        <MujtabaAICopilot
          onSelectProject={handleSelectProjectAnywhere}
          onOpenAllProjects={openAllProjects}
          onOpenOffersPopup={() => setOffersPopupOpen(true)}
          onOpenDossier={() => setDossierOpen(true)}
        />
        <Footer
          onOpenOffersPopup={() => setOffersPopupOpen(true)}
          onOpenDossier={() => setDossierOpen(true)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenAllProjects={openAllProjects}
          onSelectProject={handleSelectProjectAnywhere}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#FAFAFA] selection:bg-white/20 selection:text-white">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:bg-white focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:text-black"
      >
        Skip to main content
      </a>

      <CustomCursor />
      <Navigation
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenDossier={() => setDossierOpen(true)}
        onOpenOffersPopup={() => setOffersPopupOpen(true)}
      />

      <CommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenDossier={() => setDossierOpen(true)}
        onOpenProjectCaseStudy={handleSelectProjectAnywhere}
      />

      <ExecutiveDossierModal open={dossierOpen} onClose={() => setDossierOpen(false)} />

      <SpecialOffersPopupModal
        open={offersPopupOpen}
        onClose={() => setOffersPopupOpen(false)}
        onClaimOfferInForm={handleClaimOfferInForm}
      />

      <main className="relative z-10">
        <HeroSection
          onOpenDossier={() => setDossierOpen(true)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />
        <AboutSection />
        <SkillsSection />
        <ProjectsGallery
          externalSelectedProject={externalProjectForCaseStudy}
          onClearExternalProject={() => setExternalProjectForCaseStudy(null)}
          onOpenAllProjectsPage={openAllProjects}
        />
        <InteractiveEngineeringLab
          onSelectProjectCaseStudy={handleSelectProjectAnywhere}
          onSelectServiceForInquiry={(serviceTitle) =>
            setSelectedServiceForInquiry(serviceTitle)
          }
        />
        <AIAgentVisualization />
        <ExperienceTimeline />
        <ServicesSection
          onSelectServiceForInquiry={(serviceTitle) =>
            setSelectedServiceForInquiry(serviceTitle)
          }
        />
        <SEOFAQSection
          onOpenOffersPopup={() => setOffersPopupOpen(true)}
          onOpenAllProjects={openAllProjects}
        />
        <ContactSection preselectedService={selectedServiceForInquiry} />
      </main>

      {floatingOffersTrigger}

      <MujtabaAICopilot
        onSelectProject={handleSelectProjectAnywhere}
        onOpenAllProjects={openAllProjects}
        onOpenOffersPopup={() => setOffersPopupOpen(true)}
        onOpenDossier={() => setDossierOpen(true)}
      />

      <Footer
        onOpenOffersPopup={() => setOffersPopupOpen(true)}
        onOpenDossier={() => setDossierOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenAllProjects={openAllProjects}
        onSelectProject={handleSelectProjectAnywhere}
      />
    </div>
  );
}

export default App;
