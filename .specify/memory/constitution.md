# Responsive (Mobile‑First) Web App Constitution

## Core Principles

### I. Mobile‑First, Progressive Enhancement
Design first for small screens (single‑column baseline at 320–360px width), then progressively enhance with layout and interactions as space and capabilities grow. No feature may depend solely on a specific viewport size or hover interaction.

### II. Accessibility by Default (WCAG 2.1 AA)
All interactive features must be keyboard accessible, screen‑reader understandable, and meet color contrast ratios. Accessibility is a release blocker, not a nice‑to‑have.

### III. Performance Budgets
Set and enforce Core Web Vitals and asset size budgets. Optimize for real‑world mobile networks and devices.

### IV. Semantic HTML + Design Tokens
Use semantic elements for structure and CSS Custom Properties for a single source of truth across color, spacing, typography, and elevation.

### V. Resilience Across Devices and Inputs
Support touch, mouse, and keyboard; handle orientation changes; degrade gracefully on older/limited browsers without breaking core tasks.

## Minimum Technical Constraints

- HTML Head
  - `meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"`.
  - Declare `color-scheme="light dark"` and `theme-color` per theme.
  - Preconnect only to required origins; avoid render‑blocking third‑party scripts.
- Layout & CSS
  - Use Flexbox/Grid; avoid fixed widths/heights for primary layout.
  - Define tokens in `:root` (color, spacing, radii, shadows, z-index, breakpoints, typography).
  - Fluid typography with `clamp()`; responsive units (`rem`, `%`, `vw`, `vh`, `svh`, `lvh`). Base font ≥ 16px; comfortable line length 45–75ch.
  - Container queries where supported; otherwise use named breakpoint tokens (xs, sm, md, lg, xl).
  - Respect safe areas: `padding: env(safe-area-inset-*)` for notch devices when relevant.
  - Motion sensitivity: wrap non‑essential animation in `@media (prefers-reduced-motion: reduce)`.
  - Visible focus styles using `:focus-visible` and logical focus order.
- Media
  - Images: `width`/`height` attributes set, `loading="lazy"`, `decoding="async"`, `srcset`/`sizes` for responsive images; `<picture>` for art direction/DPR.
  - Videos: captions/subtitles, no autoplay with sound, provide poster and controls.
- Forms & Inputs
  - Labels explicitly associated; `aria-describedby` for errors/hints.
  - Mobile‑friendly inputs: use `type`, `autocomplete`, `inputmode`, and appropriate `pattern`s.
  - Touch targets ≥ 44×44 CSS px; minimum 8px spacing between interactive elements; no hover‑only affordances.
- Navigation & Overlays
  - Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`; provide a skip‑to‑content link.
  - Menus and dialogs must be keyboard navigable with proper focus trapping and dismissal.
  - Support sticky headers/footers without obscuring content and with safe‑area padding.
- JavaScript & Delivery
  - Defer/async scripts; code‑split route/features; avoid long main‑thread tasks (>50 ms).
  - Initial JS ≤ 150 KB gzip; total critical CSS ≤ 50 KB.
  - Use IntersectionObserver for lazy features; avoid heavy polyfills except for critical features.
  - Optimize for mobile CPU/network: evaluate on Slow 4G and ~6× CPU slowdown profiles.
- Security & Policies
  - CSP with `object-src 'none'`, `base-uri 'none'`; avoid `unsafe-inline` by default.
  - Use SRI for third‑party scripts/styles; HTTPS only.
- Browser Support Matrix
  - Evergreen browsers (last 2 versions) and iOS Safari (last 2). Provide graceful degradation when features are unavailable.
- Internationalization & Text Scaling
  - UTF‑8, support dynamic text scaling (up to 200%), avoid clipped text; plan RTL support where required.
  - Avoid truncation; prefer wrapping with hyphenation/soft wraps; test with long locales.

- Mobile Baseline Targets
  - Viewports: minimum 320×640; baseline 360×800; support orientation changes.
  - One‑hand use: primary actions reachable within thumb zone; avoid fixed top‑only controls without alternatives.
  - Readability: base font ≥ 16px; line height 1.4–1.7; content widths adhere to 45–75ch.
  - Images: avoid text in images; use `aspect-ratio` to prevent layout shifts; prefer vector where possible.
  - Data saving: honor `Save-Data` header and `prefers-reduced-data` (if available) to reduce media/JS.

## Quality Gates

- Preflight
  - Viewport meta present; semantic landmarks; tokens and breakpoint map defined.
  - Safe‑area handling verified on iOS notch devices; reduced‑motion styles in place.
- Accessibility
  - Automated checks (axe/ equivalent) pass with zero critical violations.
  - Keyboard: tab order, focus visibility, and escape routes work; screen reader labels and roles present.
  - Color contrast ≥ 4.5:1 for text (3:1 for large text).
- Performance
  - Budgets enforced in CI: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms (p75 on 4G/slow CPU profile).
  - Initial JS ≤ 150 KB gzip; critical CSS ≤ 50 KB; hero image ≤ 200 KB.
  - No layout shift on primary content during first interaction; avoid blocking toasts/dialogs on load.
- Cross‑Browser & Viewports
  - Validate at breakpoints: 320×640, 360×800, 390×844, 768×1024, 1280×800, 1440×900, both orientations where applicable.
  - Safari (iOS), Chrome/Android, Chrome, Edge, Firefox desktop covered.

## Governance

- Tokens as the source of truth: any change to color/spacing/typography/breakpoints requires design and engineering approval.
- Accessibility and performance budgets are release blockers; cannot be waived without written risk acceptance.
- Browser support matrix documented and versioned; changes require announcement and deprecation plan.
- Avoid pixel‑perfect mandates; design specifies intent via tokens and constraints.
- Amendments to this constitution require documentation, review, and rollback plan.

**Version**: 1.0.0 | **Ratified**: 2025-11-08 | **Last Amended**: 2025-11-08
