# Anchor

A React + Vite web app, ready to deploy on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Deploy to Vercel (free)

**Option A — Vercel CLI (fastest)**
```bash
npm install -g vercel
vercel
```
Follow the prompts (accept the defaults — Vercel auto-detects Vite). Run `vercel --prod` to publish the production URL.

**Option B — Vercel dashboard (no CLI)**
1. Push this folder to a GitHub repo.
2. Go to https://vercel.com/new and import that repo.
3. Framework preset: Vite (auto-detected). Build command: `npm run build`. Output directory: `dist`.
4. Click Deploy.

Either way, Vercel gives you a free `*.vercel.app` URL when it finishes.

## Project structure

```
├── index.html          # HTML entry point
├── package.json        # dependencies + scripts
├── vite.config.js       # Vite build config
├── vercel.json          # SPA routing config for Vercel
└── src/
    ├── main.jsx          # mounts the app
    └── App.jsx            # your app code (unchanged)
```
