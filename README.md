# StoryGrid Media

A premium, high-conversion web application for content creators and founders. Built with a focus on visual excellence, performance, and seamless user experiences.

## 🚀 Overview

StoryGrid Media is designed to showcase content systems and growth strategies for modern brands. The project features a dynamic, interactive interface with custom video players, portfolio carousels, and a streamlined lead generation flow.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: PNPM (Monorepo)
- **Deployment**: Optimized for Vercel

## 📁 Project Structure

```text
├── artifacts/
│   ├── storygrid/      # Main frontend application (Vite + React)
│   └── api-server/     # API services and backend logic
├── lib/               # Shared libraries and integrations
├── package.json       # Root workspace configuration
└── pnpm-workspace.yaml # PNPM monorepo definition
```

## 🏗️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS)
- [PNPM](https://pnpm.io/installation) (`npm install -g pnpm`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/storygrid-media/Storygrid-Media.git
   cd Storygrid-Media
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running Locally

To start the development server for the frontend:

```bash
pnpm --filter @workspace/storygrid dev
```

The app will be available at `http://localhost:5173`.

### 🔐 Environment Management

We use Vercel's multi-environment system (Local, Preview, Production). To sync your local machine with the project's secrets:

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Link Project**: `vercel link` (Follow prompts for `storygridmedia.in`)
3. **Pull Variables**:
   - For API: `cd artifacts/api-server && pnpm pull-env`
   - For Frontend: `cd artifacts/storygrid && pnpm pull-env`

This will create a `.env.local` file that is ignored by Git but used by your local development server.

## 🚢 Deployment (Vercel)

This project is configured as a PNPM monorepo.
- **Production Domain**: `storygridmedia.in`
- **Framework Preset**: Vite
- **Root Directory**: `artifacts/storygrid`
- **Build Command**: `pnpm build`
- **Install Command**: `pnpm install`

## 🧹 Codebase Cleanup

We maintain a lean codebase. Recent optimizations include:
- Removed 46+ unused UI components to reduce bundle size.
- Streamlined project structure for faster builds.
- Cleaned up unreferenced assets and hooks.

---

Built with ❤️ by StoryGrid Media Team.
