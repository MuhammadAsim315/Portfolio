# Muhammad Asim — Portfolio

A Next.js (App Router) + Three.js portfolio site. Built as a static night
scene — stars, a glowing horizon, silhouetted hills — with a scroll-linked
star that descends and morphs into an arrow with a dotted trail as you
scroll through the page.

## Stack

- **Next.js 14** (App Router) — pages and routing
- **React 18**
- **three.js** — the WebGL background scene, wrapped in a client component
- Plain CSS (`app/globals.css`) — no CSS framework, hand-built design system
- Node.js is the runtime Next.js itself runs on (dev server, build, and if
  you add any server-side API routes later under `app/api/`)

## Project structure

```
asim-portfolio/
├── app/
│   ├── layout.js       # root layout — fonts, metadata
│   ├── globals.css     # full design system (colors, type, sections)
│   └── page.js         # page content (resume sections, as JSX)
├── components/
│   ├── SceneBackground.js  # "use client" — the Three.js night scene
│   └── PageEffects.js      # "use client" — scroll UI (progress bar,
│                            # HUD, star→arrow guide, reveal animations)
├── jsconfig.json       # enables the "@/..." import alias
├── next.config.mjs
└── package.json
```

## Getting started

Requires Node.js 18.17+ (Next.js 14's minimum).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build for production

```bash
npm run build
npm start
```

## Notes for future edits

- All resume content lives directly in `app/page.js` as JSX — edit text,
  add/remove `role-card` or `project-card` blocks, etc. there.
- The 3D scene (stars, hills, sun glow, fog) lives entirely in
  `components/SceneBackground.js`. It sets up and tears down the Three.js
  scene in a `useEffect`, so it's safe under React's Strict Mode.
- All scroll-driven behavior (progress bar, the "MILE 0X" HUD, the
  descending star/arrow guide, and the fade-up reveal animations on
  elements with the `.reveal` class) lives in `components/PageEffects.js`.
- Section identity for the HUD comes from `data-mile` /
  `data-milelabel` attributes on each `<section>` in `page.js` — add a
  new section the same way to have it show up in the HUD automatically.
- No backend/API routes are wired up yet — the Contact section just links
  out via `mailto:`, `tel:`, and LinkedIn. If you want a working contact
  form that emails you, that's a good candidate for a `app/api/contact/route.js`
  Node.js API route (e.g. using Resend or Nodemailer) — happy to add that
  if you want it.
