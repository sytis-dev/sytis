// Cache warming and development cache management endpoint
// 
// DEVELOPMENT MODE USAGE (no key required):
// GET /api/cache-warm?action=status     - View cache status
// GET /api/cache-warm?action=clear      - Clear development cache
// GET /api/cache-warm?action=clear-all - Clear all caches
//
// PRODUCTION USAGE (requires key):
// GET /api/cache-warm?key=warm-cache-2024
export default async function handler(req, res) {
  const { key, action } = req.query;
  const validKey = process.env.CACHE_WARM_KEY || 'warm-cache-2024';
  
  // Development cache management (no key required in dev mode)
  if (process.env.NODE_ENV === 'development' && action) {
    try {
      const BuildDataCache = (await import('../../utils/buildDataCache.js')).default;
      
      switch (action) {
        case 'status':
          return res.status(200).json({
            success: true,
            cacheStatus: BuildDataCache.getCacheStatus(),
            message: 'Development cache status retrieved'
          });
          
        case 'clear':
          BuildDataCache.clearDevCache();
          return res.status(200).json({
            success: true,
            message: 'Development cache cleared'
          });
          
        case 'clear-all':
          BuildDataCache.clearAllCaches();
          return res.status(200).json({
            success: true,
            message: 'All caches cleared'
          });
          
        default:
          return res.status(400).json({ error: 'Invalid action. Use: status, clear, or clear-all' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Cache management failed', details: error.message });
    }
  }
  
  // Production cache warming (requires key)
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
