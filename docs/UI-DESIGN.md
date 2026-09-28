# Moleculium — Curiosity Studio

## Design direction

A bright science learning space with cobalt blue, sunny yellow, rounded molecular shapes, and clear steps. The persistent desktop sidebar groups exploration, learning, and personal tools. Phones use a compact header, a complete expandable menu, and four bottom shortcuts.

The home page provides a starting lesson, 3D molecule link, catalogue search, daily discoveries, and a learning path based on the selected level. Progress uses existing local lesson and laboratory records; no invented streaks or scores.

## Shared system

- `css/moleculium.css`: visual tokens, responsive shell, home composition, shared cards, headers, reading layouts, laboratories, quizzes, print, and reduced motion.
- Primary blue: `#2563eb`; strong blue: `#194dc5`; yellow: `#ffda66`; page: `#f7f9fd`; ink: `#192c4b`.
- Plus Jakarta Sans is served locally from `assets/fonts/` under the included SIL Open Font License. No font service is contacted by the app.
- Light mode is fixed in HTML, preferences, CSS, and the web manifest. Previous dark preferences are ignored. The theme switch is removed.
- Animations use opacity and transforms. Decorative motion stops after four seconds and is disabled for reduced-motion preferences.
- Chemistry-specific category and hazard colours retain their scientific meaning.

## Generated brand assets

The new logo was generated using the built-in image generation tool. The selected original is `assets/brand/logo.png`. Header and footer use this asset. `npm run icons` creates favicon, Apple/PWA icons, a maskable icon, and the sharing image from it. The previous SVG is retained as an unused historical asset.

Final generation prompt:

> Use case: logo-brand. Create a single polished brand symbol for Moleculium, a friendly professional chemistry learning platform for children. A bold rounded lowercase m made from three blue spherical molecule nodes connected by thick smooth blue curved bonds, with one small sunny yellow satellite node at the upper right. Compact memorable silhouette, clever scientific identity, cobalt blue #2563EB, deep blue #173B8F, sunny yellow #FFD34E. Clean flat vector-like design with very subtle dimensional highlights, approachable geometric curves. Symbol only, no text, no letters other than the abstract m implied by the molecule, no watermark, no presentation mockup. Centered generously filling a square canvas with a pure white background. Must read clearly at favicon and navigation icon sizes. One mark only.

## Maintenance and verification

Run `npm run icons` after updating the source logo, then `npm run build` to refresh offline assets. `npm run build:site` assembles the deployable site. Both logo and local font are precached.

Regression coverage includes routing, stored preferences, catalogue searches, molecular views, periodic table, every virtual lab, quiz scoring, teacher worksheets, saved content, PWA installation/offline use, narrow-screen overflow, and automated WCAG 2.1 AA checks. Remote chemistry APIs are stubbed in the browser tests, so those tests verify app behaviour without asserting external API availability.
