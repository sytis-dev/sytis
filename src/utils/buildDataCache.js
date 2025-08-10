/**
 * Build-time and development data cache for sharing API responses between pages
 * This prevents duplicate API calls during static generation and provides fresh data in development
 * 
 * DEVELOPMENT MODE:
 * - Data is cached for 10 minutes to provide fresh data without constant API calls
 * - Restart dev server to get latest data immediately
 * - Use BuildDataCache.getCacheStatus() to see cache state
 * - Use BuildDataCache.clearDevCache() to force refresh
 * 
 * PRODUCTION BUILD:
 * - Data is cached once during build and reused across all pages
 * - No API calls during runtime
 */

// In-memory cache for build-time data sharing
const buildCache = new Map();

// Development mode cache with timestamps for auto-refresh
const devCache = new Map();
const DEV_CACHE_TTL = 10 * 60 * 1000; // 10 minutes in milliseconds

// Helper to check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Helper to check if dev cache is expired
const isDevCacheExpired = (cacheKey) => {
  if (!devCache.has(cacheKey)) return true;
  const { timestamp } = devCache.get(cacheKey);
  return Date.now() - timestamp > DEV_CACHE_TTL;
};

export class BuildDataCache {
  static async getSolutions() {
    const cacheKey = 'solutions-build-data';
    
    // Check development cache first (if in dev mode)
    if (isDevelopment) {
      if (!isDevCacheExpired(cacheKey) && devCache.has(cacheKey)) {
        const { data, timestamp } = devCache.get(cacheKey);
        const ageMinutes = Math.round((Date.now() - timestamp) / 60000);
        console.log(`✅ Using dev cache for solutions (${ageMinutes} minutes old)`);
        return data;
      }
    }
    
    // Check build cache (for production builds)
    if (buildCache.has(cacheKey)) {
      console.log('✅ Using cached solutions data from index page');
      return buildCache.get(cacheKey);
    }

    console.log('🔄 Fetching solutions data for the first time...');
    
    // Retry utility function
    const fetchWithRetry = async (url, retries = 3, delay = 5000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return await response.json();
        } catch (error) {
          console.error(`Attempt ${i + 1} failed:`, error);
          if (i === retries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    };

    try {
      const json = await fetchWithRetry(
        `${process.env.API_URL}/api/solutions`,
        3,
        5000
      );
      
      const solutions = json.data || [];
      
      // Cache the data for reuse
      buildCache.set(cacheKey, solutions);
      
      // Also cache in dev cache if in development mode
      if (isDevelopment) {
        devCache.set(cacheKey, { data: solutions, timestamp: Date.now() });
        console.log(`✅ Cached ${solutions.length} solutions in dev cache (refreshes every 10 minutes)`);
      } else {
        console.log(`✅ Cached ${solutions.length} solutions for reuse`);
      }
      
      return solutions;
    } catch (error) {
      console.error('❌ Failed to fetch solutions data:', error);
      return [];
    }
  }

  static async getApplications() {
    const cacheKey = 'applications-build-data';
    
    // Check development cache first (if in dev mode)
    if (isDevelopment) {
      if (!isDevCacheExpired(cacheKey) && devCache.has(cacheKey)) {
        const { data, timestamp } = devCache.get(cacheKey);
        const ageMinutes = Math.round((Date.now() - timestamp) / 60000);
        console.log(`✅ Using dev cache for applications (${ageMinutes} minutes old)`);
        return data;
      }
    }
    
    // Check build cache (for production builds)
    if (buildCache.has(cacheKey)) {
      console.log('✅ Using cached applications data from index page');
      return buildCache.get(cacheKey);
    }

    console.log('🔄 Fetching applications data for the first time...');
    
    // Add stagger delay for applications
    const delay = 15000; // 15 seconds after solutions
    console.log(`⏳ Applications: Waiting ${delay}ms to avoid rate limits...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Retry utility function  
    const fetchWithRetry = async (url, retries = 3, delay = 5000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return await response.json();
        } catch (error) {
          console.error(`Attempt ${i + 1} failed:`, error);
          if (i === retries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    };

    try {
      const json = await fetchWithRetry(
        `${process.env.API_URL}/api/applications`,
        3,
        5000
      );
      
      const applications = json.data || [];
      
      // Cache the data for reuse
      buildCache.set(cacheKey, applications);
      
      // Also cache in dev cache if in development mode
      if (isDevelopment) {
        devCache.set(cacheKey, { data: applications, timestamp: Date.now() });
        console.log(`✅ Cached ${applications.length} applications in dev cache (refreshes every 10 minutes)`);
      } else {
        console.log(`✅ Cached ${applications.length} applications for reuse`);
      }
      
      return applications;
    } catch (error) {
      console.error('❌ Failed to fetch applications data:', error);
      return [];
    }
  }

  static async getBlogPosts() {
    const cacheKey = 'blog-posts-build-data';
    
    // Check development cache first (if in dev mode)
    if (isDevelopment) {
      if (!isDevCacheExpired(cacheKey) && devCache.has(cacheKey)) {
        const { data, timestamp } = devCache.get(cacheKey);
        const ageMinutes = Math.round((Date.now() - timestamp) / 60000);
        console.log(`✅ Using dev cache for blog posts (${ageMinutes} minutes old)`);
        return data;
      }
    }
    
    // Check build cache (for production builds)
    if (buildCache.has(cacheKey)) {
      console.log('✅ Using cached blog posts data from index page');
      return buildCache.get(cacheKey);
    }

    console.log('🔄 Fetching blog posts data for the first time...');
    
    // Add stagger delay for blog posts (after applications)
    const delay = 30000; // 30 seconds after applications
    console.log(`⏳ Blog Posts: Waiting ${delay}ms to avoid rate limits...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Retry utility function  
    const fetchWithRetry = async (url, retries = 3, delay = 5000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return await response.json();
        } catch (error) {
          console.error(`Attempt ${i + 1} failed:`, error);
          if (i === retries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    };

    try {
      const json = await fetchWithRetry(
        `${process.env.API_URL}/api/blog-posts`,
        3,
        5000
      );
      
      const blogPosts = json.data || [];
      
      // Cache the data for reuse
      buildCache.set(cacheKey, blogPosts);
      
      // Also cache in dev cache if in development mode
      if (isDevelopment) {
        devCache.set(cacheKey, { data: blogPosts, timestamp: Date.now() });
        console.log(`✅ Cached ${blogPosts.length} blog posts in dev cache (refreshes every 10 minutes)`);
      } else {
        console.log(`✅ Cached ${blogPosts.length} blog posts for reuse`);
      }
      
      return blogPosts;
    } catch (error) {
      console.error('❌ Failed to fetch blog posts data:', error);
      return [];
    }
  }

  static async getProducts() {
    const cacheKey = 'products-build-data';
    
    // Check development cache first (if in dev mode)
    if (isDevelopment) {
      if (!isDevCacheExpired(cacheKey) && devCache.has(cacheKey)) {
        const { data, timestamp } = devCache.get(cacheKey);
        const ageMinutes = Math.round((Date.now() - timestamp) / 60000);
        console.log(`✅ Using dev cache for products (${ageMinutes} minutes old)`);
        return data;
      }
    }
    
    // Check build cache (for production builds)
    if (buildCache.has(cacheKey)) {
      console.log('✅ Using cached products data from index page');
      return buildCache.get(cacheKey);
    }

    console.log('🔄 Fetching products data for the first time...');
    
    // Add stagger delay for products (after blog posts)
    const delay = 45000; // 45 seconds after blog posts
    console.log(`⏳ Products: Waiting ${delay}ms to avoid rate limits...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Retry utility function  
    const fetchWithRetry = async (url, retries = 3, delay = 5000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return await response.json();
        } catch (error) {
          console.error(`Attempt ${i + 1} failed:`, error);
          if (i === retries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    };

    try {
      const json = await fetchWithRetry(
        `${process.env.API_URL}/api/products`,
        3,
        5000
      );
      
      const products = json.data || [];
      
      // Cache the data for reuse
      buildCache.set(cacheKey, products);
      
      // Also cache in dev cache if in development mode
      if (isDevelopment) {
        devCache.set(cacheKey, { data: products, timestamp: Date.now() });
        console.log(`✅ Cached ${products.length} products in dev cache (refreshes every 10 minutes)`);
      } else {
        console.log(`✅ Cached ${products.length} products for reuse`);
      }
      
      return products;
    } catch (error) {
      console.error('❌ Failed to fetch products data:', error);
      return [];
    }
  }

  static clearCache() {
    buildCache.clear();
    console.log('🗑️  Build cache cleared');
  }

  static clearDevCache() {
    devCache.clear();
    console.log('🗑️  Development cache cleared');
  }

  static clearAllCaches() {
    buildCache.clear();
    devCache.clear();
    console.log('🗑️  All caches cleared');
  }

  // Get cache status for debugging
  static getCacheStatus() {
    const status = {
      buildCache: {
        size: buildCache.size,
        keys: Array.from(buildCache.keys())
      },
      devCache: {
        size: devCache.size,
        keys: Array.from(devCache.keys()).map(key => {
          const entry = devCache.get(key);
          const ageMinutes = Math.round((Date.now() - entry.timestamp) / 60000);
          return { key, ageMinutes };
        })
      },
      isDevelopment,
      devCacheTTL: DEV_CACHE_TTL / 60000 // in minutes
    };
    return status;
  }
}

export default BuildDataCache;
