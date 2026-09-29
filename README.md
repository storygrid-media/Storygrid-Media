# StoryGrid Media

Welcome to the internal repository for **StoryGrid Media's** primary web application and content hub. 

StoryGrid Media is a premium digital agency that builds structured content systems. We specialize in expert podcast production, YouTube channel management, and viral short-form distribution for startup founders and content creators.

This repository houses our main production website and its associated backend services.

---

## 🏢 About This Project

This platform serves as the digital storefront and lead generation engine for StoryGrid Media. It is engineered for visual excellence, performance, and seamless user experiences to reflect the high standards of our content production.

### Core Services Highlighted
- **Podcast Growth Systems**: End-to-end studio setup, multi-cam editing, and audio mastering.
- **YouTube Management**: High-retention growth strategies and channel positioning.
- **Founder Brand Engines**: Daily content generation and viral short-form repurposing.

---

## 💻 Technical Architecture

Our stack is designed for speed, SEO, and dynamic visual interactions.

- **Frontend**: React 19, Vite, Tailwind CSS
- **Interactions & Animations**: Framer Motion
- **Icons & Typography**: Lucide React, Google Fonts
- **Deployment**: Vercel (Production Domain: `storygridmedia.in`)

### Repository Structure

```text
├── artifacts/
│   ├── storygrid/      # Main frontend application (React SPA)
│   └── api-server/     # API services, lead gen, and email routing
├── lib/                # Shared utilities and configurations
├── public/             # Static assets, AI discovery files, SEO metadata
└── pnpm-workspace.yaml # Monorepo definition
```

---

## 🚢 Deployment & Infrastructure

The site is hosted on **Vercel** and automatically deploys from the `main` branch. 

- **Production URL**: [https://storygridmedia.in/](https://storygridmedia.in/)
- **Environment Variables**: Managed securely via Vercel dashboard.

To sync environments locally for development:
```bash
# Ensure Vercel CLI is installed and linked to the project
cd artifacts/storygrid && pnpm pull-env
```

---

## 🤖 AI Discovery & SEO

Our platform is fully optimized for both traditional search engines and autonomous AI agents:
- `llms.txt`: Provides AI agents with a comprehensive overview of our services.
- `agents.json` & `ai-plugin.json`: Standardized discovery endpoints.
- **Dynamic Meta Tags**: Handled via `useSeo` hook for social sharing and indexing.

---

*This is a private repository for the StoryGrid Media team.*
