// Cache warming endpoint to improve performance
export default async function handler(req, res) {
  // Only allow warming from internal requests or with proper key
  const { key } = req.query;
  const validKey = process.env.CACHE_WARM_KEY || 'warm-cache-2024';
  
  if (key !== validKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? `https://${req.headers.host}` 
      : `http://${req.headers.host}`;

    console.log('Starting cache warming...');

    // Warm up products API
    const productsResponse = await fetch(`${baseUrl}/api/products`);
    if (productsResponse.ok) {
      console.log('Products cache warmed');
    }

    // Warm up solutions API
    const solutionsResponse = await fetch(`${baseUrl}/api/solutions`);
    if (solutionsResponse.ok) {
      console.log('Solutions cache warmed');
    }

    // If running in production, you could add this endpoint to a cron job
    // to run every 10-15 minutes to keep the cache fresh

    return res.status(200).json({ 
      success: true, 
      message: 'Cache warming completed',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Cache warming failed:', error);
    return res.status(500).json({ 
      error: 'Cache warming failed', 
      details: error.message 
    });
  }
}
