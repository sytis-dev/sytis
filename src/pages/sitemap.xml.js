const config = require('../../sitemap.config');

// Function to get all static pages
const getStaticPages = () => {
  const fs = require('fs');
  const path = require('path');
  
  const pagesDirectory = path.join(process.cwd(), 'src/pages');
  const pages = [];
  
  const scanDirectory = (dir, basePath = '') => {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip excluded directories
        if (!config.excludeDirs.includes(item)) {
          scanDirectory(fullPath, path.join(basePath, item));
        }
      } else if (item.endsWith('.js') || item.endsWith('.jsx') || item.endsWith('.ts') || item.endsWith('.tsx')) {
        // Skip excluded files and special Next.js files
        if (!item.startsWith('_') && !config.excludeFiles.includes(item)) {
          const pagePath = path.join(basePath, item.replace(/\.(js|jsx|ts|tsx)$/, ''));
          pages.push(pagePath);
        }
      }
    });
  };
  
  scanDirectory(pagesDirectory);
  return pages;
};

// Function to get page settings
const getPageSettings = (pagePath) => {
  const pageName = pagePath.split('/').pop() || 'index';
  return config.pageSettings[pageName] || config.defaultSettings;
};

// Function to generate XML sitemap
const generateSitemapXML = (pages) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => {
  const settings = getPageSettings(page.path);
  return `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${settings.changefreq}</changefreq>
    <priority>${settings.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;
  
  return xml;
};

export const getServerSideProps = async ({ res }) => {
  const staticPages = getStaticPages();
  
  const sitemapEntries = staticPages.map(pagePath => {
    const settings = getPageSettings(pagePath);
    return {
      path: pagePath,
      loc: `${config.siteUrl}${pagePath === 'index' ? '' : `/${pagePath}`}`,
      lastmod: new Date().toISOString(),
      changefreq: settings.changefreq,
      priority: settings.priority,
    };
  });
  
  // Add additional pages
  const additionalEntries = config.additionalPages.map(pagePath => {
    const settings = getPageSettings(pagePath);
    return {
      path: pagePath,
      loc: `${config.siteUrl}${pagePath}`,
      lastmod: new Date().toISOString(),
      changefreq: settings.changefreq,
      priority: settings.priority,
    };
  });
  
  const allEntries = [...sitemapEntries, ...additionalEntries];
  
  const sitemap = generateSitemapXML(allEntries);
  
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();
  
  return {
    props: {},
  };
};

// Default export to prevent build errors
export default function Sitemap() {
  // This component will never be rendered
  return null;
} 