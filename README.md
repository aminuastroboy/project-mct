
# Menstrual Tracker v2 - Ready for Vercel

This project is prepared for Create React App and Vercel/Netlify deployments.

Key notes:
- No demo data; app starts empty. Data persists to localStorage when user adds cycles/reminders.
- package.json includes "homepage": "." to avoid blank page on Vercel.
- vercel.json includes a route rewrite to index.html for SPA routing.

Local dev:
1. npm install
2. npm start

Build for production:
1. npm run build
Deploy: push to GitHub and connect to Vercel (Output Directory = build) or deploy to Netlify.
