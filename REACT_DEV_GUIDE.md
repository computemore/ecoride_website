# React Development Guide

This repository is a Next.js App Router project using TypeScript, Tailwind CSS, and a config-driven public marketing architecture. It is not a Vite application.

## Current stack

- Next.js App Router
- React with TypeScript
- Tailwind CSS
- ESLint with Next.js rules
- Server-first route rendering for SEO-sensitive public pages

## Project expectations

- Keep route files inside `src/app` and keep route-level view composition in `src/page-views`.
- Prefer React Server Components by default. Only use client components where interactivity is required, such as the header dropdowns and mobile navigation.
- Keep marketing content config-driven where practical by extending `src/config/site-content.ts` instead of scattering copy across many files.
- Preserve the current route color identities and shared visual system unless a scoped task explicitly changes them.

## Common workflows

Install dependencies:

```bash
npm install
```

Start development:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## File conventions

- `src/app`: App Router route entry points, metadata-bearing route files, `robots.ts`, and `sitemap.ts`
- `src/page-views`: route-specific presentation components used by App Router pages
- `src/components`: shared UI and reusable marketing widgets
- `src/config`: page content, navigation, themes, and SEO content sources
- `src/layouts`: route wrappers such as the public layout shell
- `src/styles`: global CSS layers and shared visual utilities

## React guidance for this repo

- Prefer simple component boundaries over premature optimization.
- Reuse shared widgets like `BaseButton`, `MarketingCard`, and `SectionHeading` before introducing one-off markup.
- When adding links for marketing cards or CTAs, preserve semantic HTML and internal linking value.
- Keep content sections lean. If a page starts accumulating large copy blocks, move that content into `src/config/site-content.ts`.

## SEO and rendering guidance

- Do not move public pages back into a Pages Router structure.
- Keep metadata changes aligned with `src/config/site-content.ts` and the existing metadata helpers.
- Preserve server-rendered output for public marketing routes unless a task explicitly requires a client-only interaction.

## Responsive UI guidance

- Mobile spacing and typography should be tuned first, then scaled upward.
- Keep light and dark mode visually aligned unless a scoped task explicitly changes that rule.
- Use the existing rounded-pill and rounded-card design system rather than introducing a parallel style language.
