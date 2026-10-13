# Portfolio audit

## Repository and stack

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4.
- `app/page.tsx` is the single server-rendered portfolio route; `app/globals.css`
  holds the visual system.
- GSAP 3 and Three.js are installed; no React Three Fiber, Drei, 3D model, or
  project screenshot assets are present.
- The supplied portrait is `public/syed-mujtaba-abbas-software-engineer-karachi.png`.
- The root layout has metadata and a generated Open Graph image endpoint. A production
  hostname has not been supplied, so canonical URLs must remain unset.
- Existing validation commands are `npm run lint`, `npx tsc --noEmit`, and
  `npm run build`. No test script or test files were found.

## Existing experience

- The existing page already has hero, about, skills, experience, placeholder
  work, education, and contact sections.
- The black editorial direction, portrait, and procedural Three.js artwork
  are useful foundations to retain.
- The initial implementation's navigation lacked a mobile menu and active
  section state; the redesign adds both.
- A generic project placeholder, an unverified LinkedIn URL, invented
  education detail, and unsupported aggregate statistics were removed.
- The Three.js scene now has a client-only loading boundary, WebGL fallback,
  scene-visibility pause, reduced-motion behavior, and lower mobile budgets.
- No booking provider or working-hour schedule was supplied; email is the
  only confirmed direct contact action.

## Evidence limits

- Public GitHub repositories and repository-declared project homepages were
  checked against the `syed-mujtaba-stack` account.
- Public work with a matching repository and/or reachable site can be shown
  with links. A README conflict, unreachable site, or unconfirmed personal
  contribution is called out rather than turned into a case-study claim.
- No genuine 3D avatar, project screenshots, verified LinkedIn profile URL,
  booking link, or published portfolio domain is available.
- A public account search and selected README/site checks found real projects
  but did not substantiate per-project outcomes, screenshots, or all live URLs.
