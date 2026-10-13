# Implementation plan

## Progress

- [x] Audit the existing Next.js App Router project, dependencies, portrait,
  metadata, and public project evidence.
- [x] Record design, animation, and content constraints before implementation.
- [x] Refine brand headline, server-rendered portfolio sections, expertise,
  experience, education, process, and evidence-backed projects.
- [x] Add responsive accessible navigation with active-section state.
- [x] Split the Three.js scene behind a client-only boundary; add visibility,
  reduced-motion, low-cost-device, and unsupported-WebGL fallbacks.
- [x] Add domain-conditional robots and sitemap; remove unverified social
  profile references and unsupported claims.
- [x] Run lint, TypeScript, production build, and browser/mobile checks.

## Scope and acceptance

- Preserve Next.js, TypeScript, GSAP, and the existing Next metadata APIs.
- Do not invent contact channels, credentials, project results, customer
  claims, or screenshot assets.
- Keep copy statically rendered; isolate browser-only motion and WebGL.
- Only emit canonical/sitemap absolute URLs when `NEXT_PUBLIC_SITE_URL` is a
  real configured production origin.
- Every navigation action and project link must have a meaningful destination.
