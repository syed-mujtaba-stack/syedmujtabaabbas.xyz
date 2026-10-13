# Syed Mujtaba Abbas — Portfolio

A responsive portfolio built with Next.js, TypeScript, GSAP, and Three.js.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run `npm run lint`,
`npx tsc --noEmit`, and `npm run build` before deploying.

## Personalize before publishing

- LinkedIn and booking links are intentionally omitted until verified URLs
  and a schedule are supplied.
- Review the verified-project evidence and the caveats in
  `docs/project-content.md` before adding further case-study claims.
- Add real project screenshots only when available; the current case-study
  imagery is explicitly labeled original portfolio artwork.
- The profile portrait is `public/syed-mujtaba-abbas-software-engineer-karachi.png`.
  Keep descriptive filenames and useful alt text when adding project images.
- Set `NEXT_PUBLIC_SITE_URL` to your real production origin when known. This
  enables canonical URLs, social-preview metadata, and a populated sitemap;
  never set a placeholder domain. The generated share card is served at
  `/api/og` when a real origin is configured.
