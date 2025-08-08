/**
 * Vercel-optimized caching utilities
 * Uses a combination of memory cache and edge caching
 */

// In-memory cache for the current function execution
let memoryCache = new Map();

// Cache configuration optimized for serverless
export const VERCEL_CACHE_CONFIG = {
  PRODUCTS: { ttl: 5 * 60 * 1000, staleTime: 10 * 60 * 1000 }, // 5min fresh, 10min stale
  SOLUTIONS: { ttl: 5 * 60 * 1000, staleTime: 10 * 60 * 1000 },
  APPLICATIONS: { ttl: 5 * 60 * 1000, staleTime: 10 * 60 * 1000 },
  IMAGES: { ttl: 15 * 60 * 1000, staleTime: 30 * 60 * 1000 },
  METAFIELDS: { ttl: 10 * 60 * 1000, staleTime: 20 * 60 * 1000 },
  CATEGORIES: { ttl: 10 * 60 * 1000, staleTime: 20 * 60 * 1000 },
};

/**
 * Vercel-optimized cache manager
 * Combines memory cache with HTTP cache headers
 */
export class VercelCacheManager {
  static setCachedData(key, data, config = VERCEL_CACHE_CONFIG.PRODUCTS) {
    memoryCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: config.ttl,
      staleTime: config.staleTime
    });
  }

  static getCachedData(key, config = VERCEL_CACHE_CONFIG.PRODUCTS) {
    const cached = memoryCache.get(key);
    if (!cached) return { data: null, isStale: false, needsRevalidation: false };

    const now = Date.now();
    const age = now - cached.timestamp;

    // Data is fresh
    if (age < cached.ttl) {
      return { data: cached.data, isStale: false, needsRevalidation: false };
    }

    // Data is stale but still usable
    if (age < cached.staleTime) {
      return { data: cached.data, isStale: true, needsRevalidation: true };
    }

    // Data is too old
    return { data: null, isStale: false, needsRevalidation: false };
  }

  static deleteCachedData(key) {
    memoryCache.delete(key);
  }

  static clearAll() {
    memoryCache.clear();
  }

  static getCacheStats() {
    return {
      totalItems: memoryCache.size,
      memoryUsage: JSON.stringify([...memoryCache.entries()]).length
    };
  }
}

/**
 * Add appropriate cache headers for Vercel Edge Network
 */
export function addVercelCacheHeaders(res, config = VERCEL_CACHE_CONFIG.PRODUCTS) {
  const maxAge = Math.floor(config.ttl / 1000); // Convert to seconds
  const staleWhileRevalidate = Math.floor(config.staleTime / 1000);
  
  res.setHeader('Cache-Control', `public, max-age=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`);
  res.setHeader('CDN-Cache-Control', `public, max-age=${maxAge}`);
  res.setHeader('Vercel-CDN-Cache-Control', `public, max-age=${maxAge}`);
}

/**
 * Vercel-optimized API call wrapper
 * Uses memory cache + HTTP cache headers
 */
export async function vercelCachedApiCall(key, fetchFunction, config = VERCEL_CACHE_CONFIG.PRODUCTS) {
  const { data: cachedData, isStale, needsRevalidation } = VercelCacheManager.getCachedData(key, config);

  // If we have fresh data, return it immediately
  if (cachedData && !isStale) {
    return { data: cachedData, fromCache: true, isStale: false };
  }

  // If we have stale data, return it but trigger background revalidation
  if (cachedData && isStale && needsRevalidation) {
    // Return stale data immediately
    const result = { data: cachedData, fromCache: true, isStale: true };
    
    // Trigger background revalidation (don't await in Vercel)
    fetchFunction()
      .then(freshData => {
        VercelCacheManager.setCachedData(key, freshData, config);
        console.log(`Background revalidation completed for key: ${key}`);
      })
      .catch(error => {
        console.warn(`Background revalidation failed for key: ${key}`, error);
      });

    return result;
  }

  // No cached data or data is too old, fetch fresh data
  try {
    const freshData = await fetchFunction();
    VercelCacheManager.setCachedData(key, freshData, config);
    return { data: freshData, fromCache: false, isStale: false };
  } catch (error) {
    // If fresh fetch fails and we have stale data, return stale data as fallback
    if (cachedData) {
      console.warn(`Fresh fetch failed, returning stale data for key: ${key}`, error);
      return { data: cachedData, fromCache: true, isStale: true, error };
    }
    throw error;
  }
}
