# Ecoride Website

[![Version](https://img.shields.io/badge/version-1.0.0.1.1-blue)](https://github.com/computemore/ecoride/releases/tag/1.0.0.1.1)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-blue)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-blue)](https://tailwindcss.com/)
[![Poppins Font](https://img.shields.io/badge/Poppins-Font-green)](https://fonts.google.com/specimen/Poppins)
[![SEO](https://img.shields.io/badge/SEO-Optimized-green)](https://developers.google.com/search/docs/appearance/seo-starter-guide)
[![SignalR](https://img.shields.io/badge/SignalR-8.0-blue)](https://dotnet.microsoft.com/apps/aspnet/signalr) 
[![Google Maps API](https://img.shields.io/badge/Google%20Maps-APIs-green)](https://developers.google.com/maps)
[![Google Sign-In](https://img.shields.io/badge/Google%20Sign--In-OAuth%202.0-red)](https://developers.google.com/identity)
[![Microsoft Identity](https://img.shields.io/badge/Microsoft-OIDC-blue)](https://learn.microsoft.com/en-us/entra/identity-platform/)


> Next.js App Router marketing website for Ecoride Malawi, built for strong SEO, fast server-rendered public pages, and a clean path to future rider, driver, and corporate growth.

## Contents

- [Ecoride Website](#ecoride-website)
  - [Contents](#contents)
  - [Stack](#stack)
  - [Current Scope](#current-scope)
  - [Commands](#commands)
  - [Structure](#structure)
  - [SEO Notes](#seo-notes)
  - [Deployment](#deployment)

---

## Stack

- Next.js 15 App Router
- React 19
- Strict TypeScript
- Tailwind CSS
- `next/font` with Poppins
- Typed metadata and JSON-LD for SEO

## Current Scope

The first implementation pass includes:

- Home page with the red brand surface
- Ride page with the teal brand surface
- Drive page with the red brand surface
- Corporate page with the blue brand surface
- About page with anchored sections for the dropdown targets
- Shared rounded header and footer system
- `robots.txt` and `sitemap.xml`

Auth is intentionally deferred. The header reserves a login/profile slot without implementing identity flows yet.

## Commands

| Command | Description |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev -- --port 3003` | Start the Next.js dev server on port 3003 |
| `npm run lint` | Run ESLint |
| `npm run build` | Build the production app |
| `npm run start` | Start the production server |

## Structure

```text
ecoride-website/
├── public/
├── src/
│   ├── app/                # Next.js App Router routes, sitemap, robots
│   ├── components/         # Shared UI and widgets
│   ├── config/             # Navigation, theme, SEO, and app settings
│   ├── icons/              # Local icon components and barrels
│   ├── layouts/            # Shared page shells
│   ├── page-views/         # Route-level view components
│   ├── services/           # API utilities
│   ├── state/              # Deferred app state scaffolding
│   ├── styles/             # Global CSS and tokens
│   ├── types/              # Shared TypeScript types
│   └── utils/              # Stateless helpers
├── API_INTEGRATION_GUIDE.md
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

`src/pages` is intentionally not used for reusable route views because Next.js reserves that folder for the legacy Pages Router.

## SEO Notes

- Public routes are server-rendered by default.
- Metadata is generated from typed config per route.
- Organization and website JSON-LD are injected at the root layout.
- `robots.ts` blocks admin, account, and API paths.
- `sitemap.ts` publishes the current public route set.

## Deployment

Use a platform with first-class `Next.js` support. Vercel is the cleanest default for this project because it handles App Router rendering, metadata, and image optimization without extra server glue.

If you deploy elsewhere, make sure the host supports running a `Next.js` server or a compatible build output rather than expecting a static SPA bundle.
