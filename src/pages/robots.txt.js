export const getServerSideProps = async ({ res }) => {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sytis.com';
  
  const robotsTxt = `User-agent: *
Allow: /

# Disallow demo pages
Disallow: /demo/

# Disallow API routes
Disallow: /api/

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
};

export default function Robots() {
  return null;
} 