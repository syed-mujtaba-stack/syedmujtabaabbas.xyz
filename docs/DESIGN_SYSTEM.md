# Phase 2 — Obsidian & Metallic Gold Design System

## 1. Aesthetic Philosophy: "Sovereign Kinetic Editorial"

Designed as an Awwwards-caliber digital flagship for **Syed Mujtaba Abbas**, blending haute-horology precision, architectural monolith geometry, and live systems telemetry.

## 2. Color Tokens

| Token | Hex | Role |
| :--- | :--- | :--- |
| `--bg-obsidian` | `#080808` | Primary void canvas background |
| `--bg-charcoal` | `#121212` | Elevated architectural surface & card substrate |
| `--bg-surface-elevated` | `#171715` | Interactive hover surface & modal substrate |
| `--gold-primary` | `#D4AF37` | Warm metallic gold accent, active telemetry nodes, key borders |
| `--gold-champagne` | `#F1DFA6` | Specular highlights, hover typography accents, badge shimmer |
| `--text-offwhite` | `#F5F2EA` | Primary editorial headline & body copy |
| `--text-muted` | `#929292` | Secondary narrative, technical captions, metadata |
| `--border-hairline` | `rgba(245, 242, 234, 0.08)` | 1px structural architectural grid hairlines |
| `--border-gold` | `rgba(212, 175, 55, 0.28)` | Active card / node hairline border |

## 3. Typography System

- **Display / Editorial Headlines (`--font-display`):** `'Syne'`, `'Cormorant Garamond'` (italic editorial accents), sans-serif fallback — monumental proportions, tight tracking (`-0.03em`), high contrast.
- **Body / Narrative (`--font-sans`):** `'Plus Jakarta Sans'`, system-ui — crisp geometric legibility (`16px–18px`, `1.65` line-height).
- **Technical Telemetry / Monospace (`--font-mono`):** `'JetBrains Mono'`, monospace — uppercase section indices (`01 // ARCHITECTURE`), coordinates (`24.8607° N, 67.0011° E`), stack tags, and live node logs.

## 4. 3D, Motion & Accessibility Principles

- **Hero 3D Centerpiece (`HeroScene.tsx`):** Custom Three.js / WebGL procedural **"Astrolabe Computational Core"** featuring a faceted metallic gold icosahedral kernel (`#D4AF37`), counter-rotating gimbal rings with champagne specular reflections (`#F1DFA6`), orbital data satellites, and pointer-reactive particle field. Includes automatic WebGL capability detection, offscreen pause via `IntersectionObserver`, and a luxury SVG/Canvas fallback for non-WebGL or `prefers-reduced-motion` environments.
- **Scroll & Micro-Interactions:** GSAP + ScrollTrigger section reveals, Framer Motion tab/drawer transitions, subtle 3D perspective card tilt on desktop, magnetic CTA buttons, and a precision custom cursor ring on fine-pointer devices.
