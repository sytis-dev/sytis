/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn11.bigcommerce.com",
      "store-f8ph8pgqne-1.mybigcommerce.com",
    ], // Allow images from BigCommerce CDN
  },
};

module.exports = nextConfig;
