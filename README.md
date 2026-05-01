# Daddy Leads Cricket Club

Official site of Daddy Leads CC — cream & black, built on leads, driven by legacy.

## Tech Stack

- **React 18** — component-based UI
- **Vite 5** — build tool & dev server
- **Tailwind CSS 3** — utility-first styling
- **PostCSS + Autoprefixer**

Fonts: Bebas Neue (display), Playfair Display (serif), Inter (body) — loaded via Google Fonts.

## Getting Started

```bash
# 1. install dependencies
npm install

# 2. run dev server (opens on http://localhost:5173)
npm run dev

# 3. build for production
npm run build

# 4. preview the production build locally
npm run preview
```

## Project Structure

```
daddy-leads-cc-vite/
├── index.html              # Vite entry
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            # React entry
    ├── App.jsx             # composes all sections
    ├── index.css           # Tailwind + custom layer styles
    ├── data/
    │   └── content.js      # NAV / STATS / PLAYERS / FIXTURES / RESULTS / NEWS / GALLERY / FAQ
    ├── hooks/
    │   └── useReveal.js    # IntersectionObserver scroll-reveal
    └── components/
        ├── Logo.jsx
        ├── Nav.jsx
        ├── Hero.jsx
        ├── Ticker.jsx
        ├── StatsBar.jsx
        ├── About.jsx
        ├── Squad.jsx
        ├── Fixtures.jsx
        ├── Gallery.jsx
        ├── News.jsx
        ├── Sponsor.jsx
        ├── Join.jsx
        ├── FAQ.jsx
        └── Footer.jsx
```

## Editing Content

All site copy lives in **`src/data/content.js`** — players, fixtures, results, news posts, gallery tags, FAQ, and nav links. Edit the arrays there and the UI updates automatically.

## Theme

Colours and fonts are defined in `tailwind.config.js`:

- **Cream**: `#FBF8F1` / `#F5EFE0` / `#EDE2C9` / `#D9C9A3`
- **Ink (black)**: `#0A0A0A` / `#111111` / `#1A1A1A` / `#2A2A2A`
- **Ember (accent red)**: `#C8553D`
- **Gold (highlight)**: `#C9A24A`

Custom component classes (`.btn-primary`, `.polaroid`, `.ticker`, etc.) live in `src/index.css`.

## Deploy

Run `npm run build` → upload `dist/` to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3 + CloudFront, plain web hosting).
