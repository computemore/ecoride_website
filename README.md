# Ecoride Official Website Redesign

[![Version](https://img.shields.io/badge/version-0.1.0-blue)](https://github.com/computemore/ecoride-website)
[![React](https://img.shields.io/badge/React-18.0%2B-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0%2B-purple)](https://vitejs.dev/)

> **Premium, responsive, single-page application for the official EcoRide Malawi website.**

This repository contains the reconstructed promotional website for EcoRide (ecoridemw.com). It serves as the main landing page, highlighting core features, services, contact information, and providing users direct links to download the respective Driver and Rider mobile applications.

## Contents

- [Ecoride Official Website Redesign](#ecoride-official-website-redesign)
  - [Contents](#contents)
  - [Developers](#developers)
  - [Technology Stack](#technology-stack)
  - [Repo Layout](#repo-layout)
  - [Features](#features)
  - [Quick Reference](#quick-reference)
  - [Quick Actions](#quick-actions)
  - [Dev Guides for Browser Testing](#dev-guides-for-browser-testing)
  - [Deployment \& External Serving](#deployment--external-serving)
    - [Vercel / Cloudflare Pages](#vercel--cloudflare-pages)
    - [Nginx Configuration](#nginx-configuration)
    - [Apache Configuration](#apache-configuration)
    - [ngrok Tunnel (Local External Testing)](#ngrok-tunnel-local-external-testing)

## Developers

- **Mr. Paul Namalomba** - [GitHub](https://github.com/paulnamalomba) | Backend / Full Stack Engineer

## Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Frontend Framework** | React | 18+ |
| **Language** | TypeScript | 5+ |
| **Bundler / Build Tool** | Vite | 5+ |
| **Styling** | Native CSS3 (Variables, Custom Tokens) | - |
| **Fonts** | Google Fonts (Poppins, Plus Jakarta Sans) | - |

## Repo Layout

```
ecoride-website/
├── public/                 # Static assets (favicons, etc.)
├── src/                    # Source code
│   ├── components/         # Reusable UI elements
│   │   ├── Dropdown.tsx    # App download dropdown menu
│   │   ├── Footer.tsx      # Global page footer
│   │   ├── Navbar.tsx      # Sticky top navigation with glassmorphism
│   │   └── index.ts        # Component exports
│   ├── sections/           # Landing page sections
│   │   ├── Contact.tsx     # Contact info and form
│   │   ├── Features.tsx    # Safety and reliability points
│   │   ├── Hero.tsx        # Main banner and call to action
│   │   └── Services.tsx    # List of offered services
│   ├── App.tsx             # Root component assembling all sections
│   ├── index.css           # Global design tokens and styling
│   └── main.tsx            # React entry point
├── API_INTEGRATION_GUIDE.md# Documentation for linking to backend
├── REACT_DEV_GUIDE.md      # Vite/React boilerplate reference
├── package.json            # Dependencies and npm scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite bundler configuration
```

## Features

- ✅ **Modern Premium UI**: Built completely without bloated CSS frameworks; utilizing custom CSS variables, elegant emerald green accents, and smooth drop-shadows matching the `ecoride-rider` mobile app theme.
- ✅ **Responsive Design**: Fluid and accessible gracefully across mobile phones, tablets, and large desktop screens.
- ✅ **Dynamic Navbar Dropdown**: Integrated dropdown system exclusively for selecting between the Driver and Rider mobile app downloads.
- ✅ **Glassmorphism Elements**: Beautifully styled transparent navbar utilizing CSS backdrop filters.
- ✅ **Animations**: Fluid fade-in effects, micro-interactions, and hover states to boost user engagement.

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm install` | Installs all project dependencies |
| `npm run dev` | Starts the local development server with Hot Module Replacement |
| `npm run build` | Compiles TypeScript and builds the production bundle |
| `npm run preview` | Serves the production build locally to test performance |

## Quick Actions

**To get running in dev mode:**
```bash
# 1. Clone the repository
git clone https://github.com/computemore/ecoride-website.git
cd ecoride-website

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# Vite will output a local URL, typically http://localhost:5173
```

**To test the production build locally:**
```bash
# 1. Build the project
npm run build

# 2. Preview the static output locally
npm run preview
```

## Dev Guides for Browser Testing

When modifying the UI (e.g., in `src/index.css` or individual component files), use your browser's Developer Tools to audit layouts across devices without needing a physical phone.

1. **Open Dev Tools**: Press `F12` or `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Opt+I` (Mac) in Chrome/Edge/Firefox.
2. **Toggle Device Toolbar**: Look for the smartphone/tablet icon (or press `Ctrl+Shift+M`) to switch to responsive design mode.
3. **Select Devices**: Use the dropdown at the top to simulate various viewpoints (e.g., iPhone 14, iPad Mini, responsive sizing).
4. **Inspect CSS Variables**: In the Elements tab, check the explicitly defined `--primary-green` or `--space-xl` rules attached to `:root` to quickly tweak spacing or colors live in the browser before committing them to `index.css`.

## Deployment & External Serving

This React application is a classic SPA (Single Page Application) built statically via `npm run build`. 

### Vercel / Cloudflare Pages

This site is optimized for zero-config deployments on cloud edge servers:
1. Push this repository to GitHub.
2. Log into Vercel/Cloudflare.
3. Import the `ecoride-website` repository.
4. Framework preset: **Vite**.
5. Build command: `npm run build`
6. Output directory: `dist`

### Nginx Configuration

If serving statically on a VPS using Nginx:
```nginx
server {
    listen 80;
    server_name ecoridemw.com www.ecoridemw.com;
    root /path/to/ecoride-website/dist;
    index index.html;

    # Important for React Router (if added later) to fallback to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Browser caching optimization
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

### Apache Configuration

If serving statically using Apache, generate `.htaccess` in your `dist` folder:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### ngrok Tunnel (Local External Testing)

Need to show the website to the client or test it on your actual mobile device while developing locally? Use `ngrok` to expose your Vite localhost port (usually 5173):

```bash
# 1. Start your local dev server
npm run dev

# 2. In a new terminal, tunnel the port
ngrok http 5173

# 3. Share the provided HTTPS link (e.g., https://abc-123.ngrok.app)
```
*Note: The Vite dev server will seamlessly handle the external requests.*
