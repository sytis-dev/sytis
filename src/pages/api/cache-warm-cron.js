/**
 * Vercel Cron endpoint for automatic cache warming
 * This endpoint is called automatically by Vercel Cron every 10 minutes
 */

export default async function handler(req, res) {
  // Verify this is being called by Vercel Cron
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized - Invalid cron secret' });
  }

  // Only allow GET requests from Vercel Cron
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : `https://${req.headers.host}`;

    console.log('🔥 Vercel Cron: Starting cache warming...');

    const warmingResults = {};

    // Warm up critical endpoints in parallel
    const warmingPromises = [
      fetch(`${baseUrl}/api/products`).then(res => {
        warmingResults.products = res.ok ? 'success' : `failed: ${res.status}`;
        console.log('Products cache warming:', warmingResults.products);
        return res.ok;
      }).catch(err => {
        warmingResults.products = `error: ${err.message}`;
        return false;
      }),
      
      fetch(`${baseUrl}/api/solutions`).then(res => {
        warmingResults.solutions = res.ok ? 'success' : `failed: ${res.status}`;
        console.log('Solutions cache warming:', warmingResults.solutions);
        return res.ok;
      }).catch(err => {
        warmingResults.solutions = `error: ${err.message}`;
        return false;
      }),
      
      fetch(`${baseUrl}/api/applications`).then(res => {
        warmingResults.applications = res.ok ? 'success' : `failed: ${res.status}`;
        console.log('Applications cache warming:', warmingResults.applications);
        return res.ok;
      }).catch(err => {
        warmingResults.applications = `error: ${err.message}`;
        return false;
      }),
      
      fetch(`${baseUrl}/api/blog-posts`).then(res => {
        warmingResults.blogPosts = res.ok ? 'success' : `failed: ${res.status}`;
        console.log('Blog posts cache warming:', warmingResults.blogPosts);
        return res.ok;
      }).catch(err => {
        warmingResults.blogPosts = `error: ${err.message}`;
        return false;
      })
    ];

    // Wait for all warming requests to complete
    const results = await Promise.allSettled(warmingPromises);
    
    const successCount = results.filter(result => 
      result.status === 'fulfilled' && result.value === true
    ).length;

    console.log(`🔥 Vercel Cron: Cache warming completed: ${successCount}/${results.length} endpoints warmed successfully`);

    // Set cache headers for this response
    res.setHeader('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes

    return res.status(200).json({ 
      success: true, 
      message: 'Vercel Cron cache warming completed',
      results: warmingResults,
      successCount,
      totalEndpoints: results.length,
      timestamp: new Date().toISOString(),
      vercel: true
    });

  } catch (error) {
    console.error('❌ Vercel Cron: Cache warming failed:', error);
    return res.status(500).json({ 
      error: 'Vercel Cron cache warming failed', 
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
