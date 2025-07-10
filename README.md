# sytis readme

## Sitemap Implementation

This project includes an auto-generating sitemap that automatically includes all pages except those in the `demo` folder and API routes.

### Files Created

1. **`src/pages/sitemap.xml.js`** - Dynamic sitemap generator
2. **`src/pages/robots.txt.js`** - Robots.txt file with sitemap reference
3. **`sitemap.config.js`** - Configuration file for sitemap settings

### How It Works

The sitemap automatically:
- Scans the `src/pages` directory for all `.js`, `.jsx`, `.ts`, and `.tsx` files
- Excludes the `demo` folder and API routes
- Excludes special Next.js files (`_app.js`, `_document.js`, `404.js`, etc.)
- Generates proper XML sitemap with lastmod, changefreq, and priority
- Updates automatically when you add new pages

### Configuration

Edit `sitemap.config.js` to customize:

#### Site URL
```javascript
siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://sytis.com'
```

#### Excluded Directories
```javascript
excludeDirs: ['demo', 'api', '_app', '_document']
```

#### Page Settings
```javascript
pageSettings: {
  'index': {
    changefreq: 'daily',
    priority: 1.0,
  },
  'about': {
    changefreq: 'monthly',
    priority: 0.8,
  },
  // ... more pages
}
```

#### Additional Pages
Add pages that might not be automatically detected:
```javascript
additionalPages: [
  '/about',
  '/contact',
  '/solutions',
  // ... more pages
]
```

### Usage

1. **Development**: The sitemap is available at `http://localhost:3000/sitemap.xml`
2. **Production**: The sitemap will be available at `https://yoursite.com/sitemap.xml`
3. **Robots.txt**: Available at `/robots.txt` and references the sitemap

### SEO Benefits

- **Automatic Discovery**: Search engines can automatically discover all your pages
- **Priority Control**: Set different priorities for different pages
- **Update Frequency**: Tell search engines how often pages change
- **Demo Exclusion**: Demo pages won't be indexed, keeping your site clean

### Adding New Pages

Simply create new `.js` files in the `src/pages` directory (or subdirectories). The sitemap will automatically include them on the next build/deployment.

### Environment Variables

Set `NEXT_PUBLIC_SITE_URL` in your environment to override the default site URL:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Testing

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000/sitemap.xml` to see the generated sitemap
3. Visit `http://localhost:3000/robots.txt` to see the robots file

### Maintenance

- Update `sitemap.config.js` when you want to change page priorities or update frequencies
- Add new pages to `additionalPages` if they're not automatically detected
- The sitemap updates automatically when you add new pages to the `pages` directory