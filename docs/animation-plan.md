# Animation plan

## Entrance and scroll

- Use one staggered hero entrance, then section-specific editorial reveals.
- Reveal project artwork and copy on entry; do not use identical motion on every
  element or pin/hijack the document scroll.
- Keep a single GSAP context per mounted animation component and revert it on
  cleanup so remounts do not duplicate triggers.

## Three.js scene

- Load the browser-only scene dynamically and keep the portrait visible without
  WebGL.
- Animate the abstract orbital geometry subtly on desktop only; no fabricated
  face, breathing, or avatar rig.
- Reduce pixel ratio/particles on mobile and low-power devices, honor reduced
  motion, render only while the scene is visible, and release GPU resources.
- If WebGL initialization fails, retain the CSS/portrait composition and
  report the failure in the browser console.

## Interaction

- Respect native anchor scrolling and keyboard operation.
- Use transitions for navigation/mobile-menu state; avoid magnetic pointer
  movement and effects that interfere with touch or focus.
