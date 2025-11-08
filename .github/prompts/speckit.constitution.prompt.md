---
description: Create or update the project constitution from interactive or provided principle inputs, ensuring all dependent templates stay in sync
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

You are updating the project constitution at `.specify/memory/constitution.md`. This file is a TEMPLATE containing placeholder tokens in square brackets (e.g. `[PROJECT_NAME]`, `[PRINCIPLE_1_NAME]`). Your job is to (a) collect/derive concrete values, (b) fill the template precisely, and (c) propagate any amendments across dependent artifacts.

Follow this execution flow:

1. Load the existing constitution template at `.specify/memory/constitution.md`.
   - Identify every placeholder token of the form `[ALL_CAPS_IDENTIFIER]`.
   **IMPORTANT**: The user might require less or more principles than the ones used in the template. If a number is specified, respect that - follow the general template. You will update the doc accordingly.

2. Collect/derive values for placeholders:
   - If user input (conversation) supplies a value, use it.
   - Otherwise infer from existing repo context (README, docs, prior constitution versions if embedded).
   - For governance dates: `RATIFICATION_DATE` is the original adoption date (if unknown ask or mark TODO), `LAST_AMENDED_DATE` is today if changes are made, otherwise keep previous.
   - `CONSTITUTION_VERSION` must increment according to semantic versioning rules:
     - MAJOR: Backward incompatible governance/principle removals or redefinitions.
     - MINOR: New principle/section added or materially expanded guidance.
     - PATCH: Clarifications, wording, typo fixes, non-semantic refinements.
   - If version bump type ambiguous, propose reasoning before finalizing.

3. Draft the updated constitution content:
   - Replace every placeholder with concrete text (no bracketed tokens left except intentionally retained template slots that the project has chosen not to define yet—explicitly justify any left).
   - Preserve heading hierarchy and comments can be removed once replaced unless they still add clarifying guidance.
   - Ensure each Principle section: succinct name line, paragraph (or bullet list) capturing non‑negotiable rules, explicit rationale if not obvious.
   - Ensure Governance section lists amendment procedure, versioning policy, and compliance review expectations.

   Responsive Mobile‑First Web App Minimums (include when the product is a web application):
   - Minimum Technical Constraints (MUST unless explicitly waived):
     - HTML head: `meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"`; declare `color-scheme` and `theme-color`; avoid render‑blocking third‑party.
     - Layout: Flexbox/Grid; avoid fixed widths; tokens in `:root` (color, spacing, typography, breakpoints); fluid type with `clamp()`; safe‑area padding using `env()`; reduced‑motion styles; visible `:focus-visible`.
     - Media: responsive images with `width`/`height`, `loading="lazy"`, `decoding="async"`, `srcset`/`sizes`; `<picture>` for DPR/art direction; videos with captions, no autoplay with sound.
     - Forms: explicit labels; `aria-describedby` for hints/errors; mobile‑friendly `type`, `inputmode`, `autocomplete`; touch targets ≥ 44×44px and spacing ≥ 8px; no hover‑only affordances.
     - Navigation/Overlays: semantic landmarks (`header/nav/main/footer`), skip‑link; dialogs/menus keyboard accessible with focus trapping and dismissal.
     - JS & Delivery: defer/async; code‑split; avoid long main‑thread tasks (>50ms); initial JS ≤ 150 KB gzip; critical CSS ≤ 50 KB; lazy load via IntersectionObserver.
     - Performance: set budgets and target p75 on Slow 4G + ~6× CPU; LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms.
     - Security: CSP with `object-src 'none'`, `base-uri 'none'`; SRI for third‑party; HTTPS only.
     - Browser Support: last 2 evergreen versions and iOS Safari last 2; graceful degradation for unsupported features.
     - Internationalization: UTF‑8; support text scaling up to 200%; plan RTL where required; avoid clipping/overflow on long locales.
   - Mobile Baseline Targets:
     - Viewports: min 320×640, baseline 360×800; support orientation changes.
     - Readability: base font ≥ 16px; line height 1.4–1.7; content width 45–75ch.
     - One‑hand use: primary actions reachable within thumb zone; avoid fixed top‑only controls without alternatives.
     - Data saving: honor `Save-Data`/`prefers-reduced-data` by reducing media/JS.
   - Quality Gates for CI:
     - Accessibility: WCAG 2.1 AA; zero critical axe violations; keyboard and screen‑reader checks pass.
     - Performance: enforce budgets; hero image ≤ 200 KB; no layout shift on first interaction.
     - Cross‑browser/viewports: validate at 320×640, 360×800, 390×844, 768×1024, 1280×800, 1440×900 across Safari iOS, Chrome/Android, Chrome, Edge, Firefox.
     - Visual regression: snapshot key templates/components across breakpoints.
     - Observability: RUM for Web Vitals (LCP, CLS, INP) and JS errors with release tags.

4. Consistency propagation checklist (convert prior checklist into active validations):
   - Read `.specify/templates/plan-template.md` and ensure any "Constitution Check" or rules align with updated principles.
   - Read `.specify/templates/spec-template.md` for scope/requirements alignment—update if constitution adds/removes mandatory sections or constraints.
   - Read `.specify/templates/tasks-template.md` and ensure task categorization reflects new or removed principle-driven task types (e.g., observability, versioning, testing discipline).
   - Read each command file in `.specify/templates/commands/*.md` (including this one) to verify no outdated references (agent-specific names like CLAUDE only) remain when generic guidance is required.
   - Read any runtime guidance docs (e.g., `README.md`, `docs/quickstart.md`, or agent-specific guidance files if present). Update references to principles changed.

5. Produce a Sync Impact Report (prepend as an HTML comment at top of the constitution file after update):
   - Version change: old → new
   - List of modified principles (old title → new title if renamed)
   - Added sections
   - Removed sections
   - Templates requiring updates (✅ updated / ⚠ pending) with file paths
   - Follow-up TODOs if any placeholders intentionally deferred.

6. Validation before final output:
   - No remaining unexplained bracket tokens.
   - Version line matches report.
   - Dates ISO format YYYY-MM-DD.
   - Principles are declarative, testable, and free of vague language ("should" → replace with MUST/SHOULD rationale where appropriate).
   - If the product is a web app: confirm Mobile‑First Minimums, Mobile Baseline Targets, and CI Quality Gates are present with normative (MUST/SHOULD) language and measurable thresholds.

7. Write the completed constitution back to `.specify/memory/constitution.md` (overwrite).

8. Output a final summary to the user with:
   - New version and bump rationale.
   - Any files flagged for manual follow-up.
   - Suggested commit message (e.g., `docs: amend constitution to vX.Y.Z (principle additions + governance update)`).

Formatting & Style Requirements:

- Use Markdown headings exactly as in the template (do not demote/promote levels).
- Wrap long rationale lines to keep readability (<100 chars ideally) but do not hard enforce with awkward breaks.
- Keep a single blank line between sections.
- Avoid trailing whitespace.

If the user supplies partial updates (e.g., only one principle revision), still perform validation and version decision steps.

If critical info missing (e.g., ratification date truly unknown), insert `TODO(<FIELD_NAME>): explanation` and include in the Sync Impact Report under deferred items.

Do not create a new template; always operate on the existing `.specify/memory/constitution.md` file.
