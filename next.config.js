/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn11.bigcommerce.com',
      },
      {
        protocol: 'https',
        hostname: 'store-f8ph8pgqne-1.mybigcommerce.com',
      },
    ],
  },
  webpack: (config) => {
    // Enable `@/` alias resolution
    config.resolve.alias['@'] = path.resolve(__dirname, './');
    return config;
  },
};

module.exports = nextConfig;
