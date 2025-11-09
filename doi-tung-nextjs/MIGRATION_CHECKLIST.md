# Next.js Migration Checklist

This checklist tracks the progress of migrating the HTML prototype to a Next.js project.

## Completed Tasks

- [x] Setup Next.js project
- [x] Move static assets (`image`, `demo-image`, `resources`, `details`, `prompt`)
- [x] Convert `program-hub.html` to `app/page.tsx`
- [x] Convert `line-prototype.html` to `app/line-prototype/page.tsx`
- [x] Convert `dashboard-prototype.html` to `app/dashboard-prototype/page.tsx`
- [x] Convert `pcard-program-prototype.html` to `app/pcard-program-prototype/page.tsx`
- [x] Convert `pcard-report-prototype.html` to `app/pcard-report-prototype/page.tsx`
- [x] Convert `details/*.html` to a dynamic route at `app/details/[id]/page.tsx`

## Remaining Tasks

- [x] Refine UI and components for all pages
  - [x] Refactor `line-prototype/page.tsx`
  - [x] Refactor `dashboard-prototype/page.tsx`
  - [x] Refactor `pcard-program-prototype/page.tsx`
  - [x] Refactor `pcard-report-prototype/page.tsx`
- [x] Add full interactivity for all pages (e.g., sidebar, tabs, chat)
  - [x] Add sidebar toggle to `pcard-report-prototype`
  - [x] Remove placeholder alerts in `line-prototype`
- [x] Add tests (unit, integration, end-to-end)
  - [x] Setup Jest and React Testing Library
  - [x] Add a unit test for the Header component
  - [x] Add a unit test for the Footer component
  - [x] Add a unit test for the Hero component
  - [x] Add a unit test for the ImpactSection component
  - [x] Add a unit test for the ProblemSection component
  - [x] Add a unit test for the SolutionSection component
- [x] Convert `story-board.html` to `app/story-board/page.tsx`
- [x] Convert `prompt/admin-prompt-console.html` to `app/prompt-admin/page.tsx`
- [x] Verify all links and navigation are working correctly
- [x] Clean up unused files from the original project
