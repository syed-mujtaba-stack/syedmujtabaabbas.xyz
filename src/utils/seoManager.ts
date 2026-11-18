import type { PortfolioProject } from '../data/portfolioData';

// Hash views are part of the same page. Keep its canonical and search/social
// metadata in index.html; only change the tab title for visitors.
export function updatePageTitle(options: {
  view: 'home' | 'all-projects';
  activeProject?: PortfolioProject | null;
}) {
  if (typeof document === 'undefined') return;
  if (!options.activeProject && options.view === 'home') return;

  const previousTitle = document.title;
  document.title = options.activeProject
    ? `${options.activeProject.name} — Case Study by Syed Mujtaba Abbas`
    : 'Projects & Case Studies | Syed Mujtaba Abbas';

  return () => {
    document.title = previousTitle;
  };
}
