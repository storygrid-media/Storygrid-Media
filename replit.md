# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── storygrid/          # StoryGrid Media website (React + Vite SPA)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── .github/workflows/      # GitHub Actions CI/CD for Vercel deployment
├── DEPLOYMENT.md           # Deployment guide: Vercel, custom domain, Formspree, scheduling
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## StoryGrid Media Website (`artifacts/storygrid`)

Single-page agency landing site for StoryGrid Media — a digital content production agency.

### Tech Stack
- React + Vite (static SPA)
- Tailwind CSS (dark theme, custom design tokens)
- Framer Motion (scroll-triggered animations)
- @formspree/react (contact form)
- Lucide React (icons)
- Fonts: Inter (body) + Space Grotesk (display headlines)

### Brand Colors
- Background: #0B0B0B (dark)
- Primary/Accent: #FFC107 (yellow)
- Destructive: #FF3B30 (red)
- Foreground: #EAEAEA (off-white)
- Muted: #9A9A9A (grey)
- Card: #141414
- Border: #1F1F1F

### Sections
1. Navbar (sticky, glass-morphism, mobile hamburger)
2. Hero (full-viewport YouTube video background loop, centered headline with yellow highlight box, CountUp stats, scroll indicator, mobile static fallback)
3. Work Showcase (6-card click-to-play YouTube iframe grid with thumbnail previews)
4. Case Study (Startup Seekho — 0→3.5K subscribers, growth chart SVG)
5. Services (Podcast Growth System, YouTube Channel Management, Founder Brand Engine)
6. Positioning ("The Choice Is Yours" — two cards: "Work With Us" vs "Stay Stuck", yellow/red accent)
7. Testimonials (text cards + click-to-play YouTube video testimonials)
8. Founder (full-bleed split layout: left photo placeholder, right yellow #FFC107 panel with bio + stats)
9. Contact Form (Formspree integration, VITE_FORMSPREE_ID env var)
10. Footer (nav, social icons, contact email)
- SectionDivider (yellow gradient 1px line) between all sections
- Alternating section backgrounds: #0B0B0B, #080808, #0F0F0F

### Environment Variables
- `VITE_FORMSPREE_ID` — Formspree form ID for the contact form (defaults to placeholder)

### SEO
- Title, meta description, Open Graph, Twitter card meta tags in index.html
- Canonical URL: https://storygridmedia.in/
- `public/sitemap.xml` and `public/robots.txt`
- Keyword-optimized content in all headings
- All images have alt text

### Deployment
- Target: Vercel (free tier) with custom domain storygridmedia.in
- `vercel.json` — SPA routing config
- `.github/workflows/deploy.yml` — GitHub Actions CI/CD
- See `DEPLOYMENT.md` for full setup instructions

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `artifacts/storygrid` (`@workspace/storygrid`)

StoryGrid Media agency website. Static React + Vite SPA with Tailwind CSS, Framer Motion animations, and Formspree contact form.

- Entry: `src/main.tsx` — sets dark mode class, renders App
- App: `src/App.tsx` — single-page layout rendering all sections
- Components: `src/components/` — Navbar, Hero, WorkShowcase, CaseStudy, Services, Positioning, Testimonials, Founder, ContactForm, Footer, SectionDivider
- `pnpm --filter @workspace/storygrid run dev` — run the dev server
- `pnpm --filter @workspace/storygrid run build` — production static build (`dist/public/`)

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages.

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec. Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec.

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`.
