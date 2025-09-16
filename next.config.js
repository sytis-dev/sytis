/** @type {import('next').NextConfig} */
const path = require('path');
const fs = require('fs');

const isProd = process.env.NODE_ENV === 'production';

// Dynamically exclude files in `pages/demo/` during production builds
function ignoreDemoPages() {
  const demoPath = path.join(__dirname, 'pages/demo');
  const ignored = [];

  if (fs.existsSync(demoPath)) {
    fs.readdirSync(demoPath).forEach((file) => {
      if (file.match(/\.(js|jsx|ts|tsx)$/)) {
        ignored.push(`pages/demo/${file}`);
      }
    });
  }

  return ignored;
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn11.bigcommerce.com",
      "store-f8ph8pgqne-1.mybigcommerce.com",
    ],
  },
  webpack: (config) => {
    // Enable `@/` alias resolution
    config.resolve.alias['@'] = path.resolve(__dirname, './');
    return config;
  },
  // Ignore demo pages in production builds
  excludeFiles: isProd ? ignoreDemoPages : () => [],
  // 301 redirects
  async redirects() {
    return [
      {
        source: '/articles/recognition-nsc-green-cross-for-safety-innovation-award-names-ryan-severe-a-finalist-',
        destination: '/articles/recognition-ryan-severe-wins-nsc-green-cross-for-safety-innovation-award',
        permanent: true, // This creates a 301 redirect
      },
    ];
  },
};

module.exports = nextConfig;
