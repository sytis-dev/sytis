# SYTIS Web Application

Welcome to the SYTIS web application codebase! This document will help you get started as a developer, understand the project structure, and maintain key features like SEO sitemaps.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Sitemap & SEO](#sitemap--seo)
- [Adding New Pages](#adding-new-pages)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Support](#support)

---

## Project Overview

SYTIS is a modern, responsive web application for showcasing high-definition infrared and optical camera solutions, applications, and resources. The site features product listings, articles, applications, solutions, and a robust marketing/SEO setup.

---

## Tech Stack

- **Framework:** [Next.js 12](https://nextjs.org/)
- **Language:** JavaScript (ES6+), React 18
- **Styling:** CSS, Bootstrap 5, custom styles
- **State/Context:** React Context API
- **Other Libraries:** Swiper, react-bootstrap, react-hook-form, react-hot-toast, react-modal-video, and more (see `package.json` for full list)
- **SEO:** Static sitemap and robots.txt for search engine indexing

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd sytis
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in any required values.
   - At minimum, set:
     ```
     NEXT_PUBLIC_SITE_URL=https://yourdomain.com
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   - The app will be available at [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
sytis/
├── public/                  # Static assets (images, videos, sitemap.xml, robots.txt, etc.)
├── src/
│   ├── assets/              # Fonts, images, vendor CSS
│   ├── components/          # React components (organized by feature/section)
│   ├── context/             # React context providers
│   ├── data/                # Static data for sections, navigation, etc.
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries (e.g., productService.js)
│   ├── pages/               # Next.js pages (route = file name)
│   │   ├── api/             # API routes (serverless functions)
│   │   ├── demo/            # Demo pages (excluded from sitemap/SEO)
│   │   └── ...              # Main site pages
│   └── styles/              # CSS files
├── .env                     # Environment variables
├── package.json             # NPM dependencies and scripts
├── sitemap.config.js        # Sitemap configuration (legacy, now static)
└── README.md                # This file
```

---

## Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm start` – Start the production server
- `npm run lint` – Run ESLint

---

## Environment Variables

- `NEXT_PUBLIC_SITE_URL` – The canonical URL for your site (used in sitemap, SEO, etc.)

---

## Sitemap & SEO

**Production and development now use static files for SEO:**

- `public/sitemap.xml` – The sitemap for search engines.  
  - **Edit this file directly** to update your sitemap.
  - Demo pages and API routes are excluded.
- `public/robots.txt` – Tells search engines what to crawl.
  - Disallows `/demo/` and `/api/`
  - Points to your sitemap.

**How to update:**
- When you add or remove pages, update `public/sitemap.xml` accordingly.
- No dynamic sitemap route is used (for maximum reliability in all environments).

**Testing:**
- Visit `/sitemap.xml` and `/robots.txt` in your browser or with `curl` to verify.

---

## Adding New Pages

- Add new pages as `.js` files in `src/pages/` or subfolders.
- For API routes, use `src/pages/api/`.
- For demo-only pages, use `src/pages/demo/` (these are excluded from SEO).
- **Remember:** Update `public/sitemap.xml` if you want new pages indexed by search engines.

---

## Deployment

- **Vercel** automatically deploys all branches. Each branch gets its own preview deployment; the main branch is deployed to production.
- Static files in `public/` are always served at the root.
- No special configuration is needed for sitemap/robots.txt.
- For custom domains, set them up in the Vercel dashboard.

---

## Contributing

- Follow best practices for React and Next.js.
- Use feature branches and submit pull requests for review.
- Keep the codebase clean and well-documented.
- Update this README if you add major features or change project structure.

---

## Support

- For questions, contact the project maintainer or open an issue.
- For urgent production issues, check deployment logs and static file availability first.

---

**Welcome to the team!**