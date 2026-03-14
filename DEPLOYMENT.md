# StoryGrid Media — Deployment Guide

## Quick Start (Vercel)

### 1. Push to GitHub
Push this repository to your GitHub account.

### 2. Set Up Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project" and import your repository
3. Configure the build:
   - **Framework Preset**: Other
   - **Root Directory**: `artifacts/storygrid`
   - **Build Command**: `cd ../.. && pnpm install && pnpm --filter @workspace/storygrid run build`
   - **Output Directory**: `dist/public`
4. Add environment variables:
   - `PORT` = `3000`
   - `BASE_PATH` = `/`
   - `VITE_FORMSPREE_ID` = your Formspree form ID (see below)

### 3. Custom Domain (storygridmedia.in)
1. In Vercel project settings, go to **Domains**
2. Add `storygridmedia.in`
3. Add DNS records at your domain registrar:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME Record**: `www` → `cname.vercel-dns.com`
4. Wait for DNS propagation (usually 5-30 minutes)

## Formspree Setup (Free Contact Form)
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form
3. Copy the form ID (looks like `xrgvknqj`)
4. Add it as the `VITE_FORMSPREE_ID` environment variable in Vercel
5. Redeploy

## GitHub Actions CI/CD (Alternative)
If you prefer automated deploys via GitHub Actions:
1. In Vercel, go to Settings → Tokens and create a token
2. In your GitHub repo, add these secrets:
   - `VERCEL_TOKEN` — your Vercel API token
   - `VERCEL_ORG_ID` — from `.vercel/project.json`
   - `VERCEL_PROJECT_ID` — from `.vercel/project.json`
   - `VITE_FORMSPREE_ID` — your Formspree form ID
3. The `.github/workflows/deploy.yml` workflow will auto-deploy on push to main

## Future: Frictionless Call Scheduling (Free)
To add a "Schedule a Call" feature without any cost:

### Option A: Cal.com (Recommended — completely free)
1. Create a free account at [cal.com](https://cal.com)
2. Set up your availability
3. Get your booking link (e.g., `https://cal.com/yourname/30min`)
4. Embed it on the site by replacing the contact form CTA or adding a modal:
   ```html
   <iframe src="https://cal.com/yourname/30min" width="100%" height="600" frameBorder="0"></iframe>
   ```
   Or use Cal.com's embed script for a popup widget.

### Option B: Calendly (Free tier)
1. Sign up at [calendly.com](https://calendly.com)
2. Create a 30-minute event type
3. Embed using their widget script

Both options are completely free, require no backend, and provide a smooth booking experience with automatic calendar sync.

## Email Setup
Professional email is already configured via GoDaddy. Use:
- `hello@storygridmedia.in` for the contact form replies
- `founder@storygridmedia.in` for personal outreach
