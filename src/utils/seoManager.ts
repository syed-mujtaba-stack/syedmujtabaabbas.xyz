import type { PortfolioProject } from '../data/portfolioData';

const DEFAULT_TITLE =
  'Syed Mujtaba Abbas — Full-Stack Developer, Agentic AI Engineer & Founder (Next.js, Sanity CMS, Python)';
const DEFAULT_DESCRIPTION =
  'Official portfolio of Syed Mujtaba Abbas — Founder of AlphaMind, AlphaTech AI & SetupCI. Full-Stack Next.js & Sanity CMS Developer, Agentic AI Engineer (OpenAI, Gemini, WhatsApp Cloud API, Playwright), and PyPI Maintainer based in Karachi, Pakistan.';
const BASE_URL = 'https://www.syedmujtabaabbas.xyz/';

export function updatePageSEO(options: {
  view: 'home' | 'all-projects';
  activeProject?: PortfolioProject | null;
}) {
  if (typeof document === 'undefined') return;

  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESCRIPTION;
  let canonical = BASE_URL;

  if (options.activeProject) {
    title = `${options.activeProject.name} — Case Study by Syed Mujtaba Abbas (${options.activeProject.category})`;
    description = `${options.activeProject.summary} Engineered by Syed Mujtaba Abbas using ${options.activeProject.stack.join(
      ', '
    )}.`;
    canonical = `${BASE_URL}#projects`;
  } else if (options.view === 'all-projects') {
    title =
      'All 25 Projects & Case Studies — Syed Mujtaba Abbas (Next.js, Sanity CMS, Agentic AI & Python)';
    description =
      'Complete archive of 25 production software platforms, Next.js & Sanity CMS e-commerce storefronts, autonomous WhatsApp & Playwright AI agents, and PyPI CLI tools built by Syed Mujtaba Abbas.';
    canonical = `${BASE_URL}#all-projects`;
  }

  document.title = title;

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) {
    descMeta.setAttribute('content', description);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', title);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', description);
  }

  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute('href', canonical);
  }
}
