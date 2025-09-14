# Cycle Care — PWA (Vite + React + Tailwind)

Quick start:

```bash
npm install
npm run dev
```

Open http://localhost:5173 — the app is PWA-ready. To test installability, open in Chrome on mobile or desktop and look for "Install" in the address bar or in the menu.

Notes:
- Login (signup) stores user in localStorage (key `cc_user`).
- Logs stored in `cc_logs`, cycle start stored in `cycleStart` when a log mentions the word "period".
- Service worker and manifest included for offline shell caching (simple cache strategy).
- Icons are placeholders (SVG + small PNG). Replace `public/icons/*` with your real icons for production.
