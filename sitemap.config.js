module.exports = {
  // Your site URL - update this to your actual domain
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://sytis.com',
  
  // Directories to exclude from sitemap
  excludeDirs: ['demo', 'api', '_app', '_document'],
  
  // Files to exclude from sitemap
  excludeFiles: ['404.js', 'sitemap.xml.js', 'robots.txt.js'],
  
  // Default settings for pages
  defaultSettings: {
    changefreq: 'weekly',
    priority: 0.8,
  },
  
  // Custom settings for specific pages
  pageSettings: {
    'index': {
      changefreq: 'daily',
      priority: 1.0,
    },
    'about': {
      changefreq: 'monthly',
      priority: 0.8,
    },
    'contact': {
      changefreq: 'monthly',
      priority: 0.7,
    },
    'solutions': {
      changefreq: 'weekly',
      priority: 0.9,
    },
    'products': {
      changefreq: 'weekly',
      priority: 0.9,
    },
    'articles': {
      changefreq: 'weekly',
      priority: 0.8,
    },
    'faq': {
      changefreq: 'monthly',
      priority: 0.6,
    },
    'privacy-policy': {
      changefreq: 'yearly',
      priority: 0.3,
    },
    'terms-of-use': {
      changefreq: 'yearly',
      priority: 0.3,
    },
    'cookie-policy': {
      changefreq: 'yearly',
      priority: 0.3,
    },
  },
  
  // Additional pages to include manually
  additionalPages: [
    '/about',
    '/contact',
    '/solutions',
    '/products',
    '/articles',
    '/faq',
    '/privacy-policy',
    '/terms-of-use',
    '/cookie-policy',
    '/shipping',
    '/product-resources',
    '/solution-inquiry',
    '/newsletter',
    '/grid-safe-skid-system',
    '/history',
  ],
}; 