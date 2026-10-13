# Design system

## Direction

Editorial cyber-tech: quiet near-black surfaces, warm gold as a deliberate
signal, cinematic light, asymmetric compositions, and technical details only
where they support the story. Retain the existing portrait and abstract
orbital geometry; do not portray the portrait as a 3D model.

## Tokens

- Background: `#080808`; raised surfaces: `#10100F` / `#151411`.
- Gold: `#D6B477`; highlight: `#F2D7A0`.
- Text: `#F5F2EC`; muted text: `#A5A198`.
- Borders: low-opacity neutral/gold hairlines.
- Geist for interface/body; Georgia italic for a restrained editorial accent.

## Composition and type

- Desktop: large asymmetric hero, spacious editorial section intros, one
  featured work treatment followed by smaller alternating work.
- Tablet: preserve the asymmetric hierarchy while reducing scene size and
  splitting dense layouts.
- Mobile: single-column editorial flow, compact accessible menu, touch-sized
  actions, static/low-cost scene fallback.
- One clear H1, section H2s, project H3s, small monospaced annotations used
  sparingly.

## Interaction and accessibility

- Use gold for selected states, focus, and purposeful calls to action, not
  blanket decoration.
- Keyboard-visible focus, semantic navigation, labeled menu controls, image
  alt text, and `prefers-reduced-motion` support are required.
- Avoid scroll hijacking, hover-only actions, illegible annotation, and fake
  application screenshots.
