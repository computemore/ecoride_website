<!-- markdownlint-disable MD024 MD060 MD022 MD032 -->
# Changelog

All notable changes to the **ecoride_website** project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Contents

- [Changelog](#changelog)
  - [Contents](#contents)
  - [\[1.0.0.1\] - 2026-04-19](#1001---2026-04-19)
    - [Added](#added)
    - [Resolved](#resolved)
    - [Validated](#validated)
    - [Documentation](#documentation)
    - [Pending](#pending)
  - [\[1.0.0\] - 2026-04-19](#100---2026-04-19)
    - [Added](#added)
    - [Resolved](#resolved)
    - [Validated](#validated)
    - [Documentation](#documentation)
    - [Pending](#pending)

---

## [1.0.0.1] - 2026-04-19

### Added

- Expanded the homepage into a fuller marketing flow with clearer CTAs, route handoff cards, trust signals, and stronger local credibility framing.
- Enriched the Ride, Drive, Corporate, and About pages with more complete but still minimal storytelling, stronger pacing, and better internal linking.
- Added a desktop corporate hero treatment using the existing `public/corporate-hero.svg` asset while keeping the heading centered and image hidden on mobile.
- Added config-driven phase-two marketing data for homepage signals, journey cards, rider confidence, driver support, corporate outcomes, and About overview content.
- Added link-aware marketing cards so shared content blocks can drive stronger internal navigation without one-off page markup.
- Expanded the footer with social and app-download access while keeping the public shell consistent across routes.

### Resolved

- Changed the Login button text treatment to black while preserving the existing rounded white CTA style.
- Strengthened CTA button typography across the site by moving all shared button text to a bold style.
- Improved mobile spacing, section rhythm, shared heading scale, and footer responsiveness across the public marketing routes.
- Aligned the corporate support CTA with the shared `appSettings` email source instead of leaving a separate hardcoded address.
- Fixed the `SiteTitleIcon` prop typing so ESLint passes cleanly.

### Validated

- `npm run lint` passes.
- `npm run build` passes.
- The production build completes successfully with static generation for the public routes.

### Documentation

- Replaced the stale Vite-era `REACT_DEV_GUIDE.md` with guidance aligned to the current Next.js App Router architecture.
- Updated this changelog to record the phase-two marketing and UX refinement pass.

### Pending

- Real auth flows and profile-aware public entry points remain deferred.
- Live corporate dashboards, analytics backends, and account management workflows remain deferred.
- Rich editorial blog content and deeper enterprise workflow depth remain deferred beyond the current public-site scope.

## [1.0.0] - 2026-04-19

### Added

- Rebuilt the public website foundation around Next.js App Router, TypeScript, Tailwind CSS, and a typed src architecture.
- Added core public marketing routes for Home, Ride, Drive, Corporate, About, and a branded not-found page.
- Added shared public layout, reusable header/footer/widgets, route-level page views, and config-driven content/theme structure.
- Added route-specific color surfaces with the requested soft diagonal intensity treatment and rounded marketing UI system.
- Added typed SEO helpers, route metadata, JSON-LD structured data support, robots generation, and sitemap generation.
- Added future-facing app settings, feature flags, icons, utility helpers, service scaffolding, and state placeholders for later phases.
- Added public branding assets and static host config files under public.

### Resolved

- Removed the old single-page entry approach and completed the migration to a server-first Next.js setup for SEO.
- Fixed the App Router build conflict caused by placing route view files under src/pages by moving them to src/page-views.
- Updated lint configuration to ignore archived legacy files and Next-generated artifacts.

### Validated

- Lint passes for the new website codebase.
- Production build passes successfully.
- Local development preview was verified in the browser after startup on port 3003.

### Documentation

- Rewrote README.md to describe the Next.js App Router project structure and run/build workflow.
- Updated API_INTEGRATION_GUIDE.md to replace old Vite assumptions with NEXT_PUBLIC environment usage and Next.js patterns.

### Pending

- Expand route content depth, imagery, and interaction polish for the main marketing pages.
- Implement deeper corporate/about storytelling sections and stronger mobile refinement.
- Connect real backend integrations and auth flows in later phases when public-site scope is extended.

---
