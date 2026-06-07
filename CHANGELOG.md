<!-- markdownlint-disable MD024 MD060 MD022 MD032 -->
# Changelog

All notable changes to the **ecoride_website** project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Contents

- [Changelog](#changelog)
  - [Contents](#contents)
  - [\[1.0.1\] - 2026-06-07](#101---2026-06-07)
    - [Added](#added)
    - [Validated](#validated)
    - [Documentation](#documentation)
    - [Pending](#pending)
  - [\[1.0.0\] - 2026-04-19](#100---2026-04-19)
    - [Added](#added-1)
    - [Resolved](#resolved)
    - [Validated](#validated-1)
    - [Documentation](#documentation-1)
    - [Pending](#pending-1)

---

## [1.0.1] - 2026-06-07

### Added

- Better padding and scaling for mobile devices on every page.

### Validated

- `npx tsc --noEmit -p tsconfig.json` passes.
- `npm run build` passes without errors.
- `git diff --stat` confirms scope across home page view, marketing card widget, shared CSS variables/main styles, and new screenshot asset directories.
- Home page now references and renders the newly added framed and processed screenshot asset paths.

### Documentation

- Added this `1.0.1.0.txt` release-note file in `.commits/` following the established 1.0.0.9 structure and detail level.

### Pending

- Login and ride sharing hooks natively in the app are still pending and will be scoped in a future release, but the home page now includes the new marketing assets that will support those features once live.  

---

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
