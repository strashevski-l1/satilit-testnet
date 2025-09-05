# BeonBet Casino (Academic) — Password-Protected Demo

This repository hosts an academic, password-protected demo of a casino landing website for BeonBet. It includes:

- Modern responsive layout (header, hero, content sections, games, bonuses, FAQ)
- Content infused from the provided BeonBet brief (EN), including FAQ JSON-LD
- Lightweight UI interactions (smooth scroll, modals, FAQ accordion, slot demo modal)
- Simple password gate to restrict public access

## Deploy on Vercel

1. Connect the repo to Vercel via GitHub
2. In Project Settings → Environment Variables add:
   - `SITE_PASSWORD` — your secret password for access
3. Deploy. Open the site and enter the password to view content

## How the protection works

- On first visit, a password prompt overlay is shown
- On success, a localStorage token (`authToken=access_granted`) is set
- Client loads the site shell and mounts full BeonBet page
- API endpoint `/api/auth` validates the password and returns success

## Relevant files

- `api/auth.js` — serverless auth handler (Vercel)
- `auth.js` — client overlay + page renderer (injects HTML after auth)
- `script.js` — UI interactions (nav, modals, FAQ, demo slot)
- `styles.css` — shared theme and components
- `assets/` — logo and banners

## Notes

- Robots are disabled for indexing (robots.txt + meta). This is intentional for an academic demo
- All casino names, offers, and figures are demonstration-only