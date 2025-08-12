/**
 * Build-time and development data cache for sharing API responses between pages
 * This prevents duplicate API calls during static generation and provides fresh data in development
 * 
 * DEVELOPMENT MODE:
 * - Data is cached to a temporary file to persist between page compilations
 * - Data is cached for 10 minutes to provide fresh data without constant API calls
 * - Restart dev server to get latest data immediately
 * - Use BuildDataCache.getCacheStatus() to see cache state
 * - Use BuildDataCache.clearDevCache() to force refresh
 * 
 * PRODUCTION BUILD:
 * - Data is cached once during build and reused across all pages
 * - No API calls during runtime
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

// In-memory cache for build-time data sharing
const buildCache = new Map();

// Development mode cache with timestamps for auto-refresh
const devCache = new Map();
const DEV_CACHE_TTL = 10 * 60 * 1000; // 10 minutes in milliseconds

// Helper to check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Helper to get the base URL for API calls
const getApiBaseUrl = () => {
  if (isDevelopment) {
    // Try to use the current host from environment, fallback to localhost
    // Check for common development ports
    const devPort = process.env.PORT || process.env.NEXT_PUBLIC_PORT || 3000;
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
           process.env.HOSTNAME ? `http://${process.env.HOSTNAME}:${devPort}` :
           `http://localhost:${devPort}`;
    console.log(`🌐 Development mode detected, using API base URL: ${baseUrl}`);
    return baseUrl;
  }
  const productionUrl = process.env.API_URL || '';
  console.log(`🏭 Production mode detected, using API base URL: ${productionUrl || 'default'}`);
  return productionUrl;
};

// File-based cache for development mode (persists between page compilations)
const getDevCacheFile = (cacheKey) => {
  const cacheDir = path.join(os.tmpdir(), 'sytis-dev-cache');
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
  return path.join(cacheDir, `${cacheKey}.json`);
};

// Helper to check if dev cache is expired
const isDevCacheExpired = (cacheKey) => {
  if (isDevelopment) {
    // Check file-based cache first
    const cacheFile = getDevCacheFile(cacheKey);
    if (fs.existsSync(cacheFile)) {
      try {
        const cacheData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
        return Date.now() - cacheData.timestamp > DEV_CACHE_TTL;
      } catch (error) {
        console.log(`⚠️ Error reading dev cache file for ${cacheKey}:`, error.message);
        return true;
      }
    }
    return true;
  }
  
  // Fallback to in-memory cache
  if (!devCache.has(cacheKey)) return true;
  const { timestamp } = devCache.get(cacheKey);
  return Date.now() - timestamp > DEV_CACHE_TTL;
};

// Helper to get data from dev cache
const getDevCacheData = (cacheKey) => {
  if (isDevelopment) {
    // Try file-based cache first
    const cacheFile = getDevCacheFile(cacheKey);
    if (fs.existsSync(cacheFile)) {
      try {
        const cacheData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
        if (Date.now() - cacheData.timestamp <= DEV_CACHE_TTL) {
          return cacheData;
        }
      } catch (error) {
        console.log(`⚠️ Error reading dev cache file for ${cacheKey}:`, error.message);
      }
    }
  }
  
  // Fallback to in-memory cache
  return devCache.get(cacheKey);
};

// Helper to set data in dev cache
const setDevCacheData = (cacheKey, data) => {
  if (isDevelopment) {
    // Set file-based cache
    const cacheFile = getDevCacheFile(cacheKey);
    try {
      const cacheData = { data, timestamp: Date.now() };
      fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2));
      console.log(`✅ Cached ${data.length} items in dev cache file (refreshes every 10 minutes)`);
    } catch (error) {
      console.log(`⚠️ Error writing dev cache file for ${cacheKey}:`, error.message);
      // Fallback to in-memory cache
      devCache.set(cacheKey, { data, timestamp: Date.now() });
    }
  } else {
    // Set in-memory cache for production
    devCache.set(cacheKey, { data, timestamp: Date.now() });
  }
};

export class BuildDataCache {
  static async getSolutions() {
    const cacheKey = 'solutions-build-data';
    
    // Check development cache first (if in dev mode)
    if (isDevelopment) {
      const cacheData = getDevCacheData(cacheKey);
      if (cacheData) {
        const ageMinutes = Math.round((Date.now() - cacheData.timestamp) / 60000);
        console.log(`✅ Using dev cache for solutions (${ageMinutes} minutes old)`);
        return cacheData.data;
      }
    }
    
    // Check build cache (for production builds)
    if (buildCache.has(cacheKey)) {
      console.log('✅ Using cached solutions data from index page');
      return buildCache.get(cacheKey);
    }

    console.log('🔄 Fetching solutions data for the first time...');
    
    // Retry utility function with exponential backoff
    const fetchWithRetry = async (url, retries = 3, baseDelay = 2000) => {
      for (let i = 0; i < retries; i++) {
        try {
          console.log(`🔄 Attempt ${i + 1}/${retries} to fetch from ${url}`);
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          console.log(`✅ Successfully fetched data from ${url}`);
          return await response.json();
        } catch (error) {
          console.error(`❌ Attempt ${i + 1} failed:`, error.message);
          if (i === retries - 1) throw error;
          
          // Exponential backoff: 2s, 4s, 8s
          const delay = baseDelay * Math.pow(2, i);
          console.log(`⏳ Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    };

    try {
      // Use the helper function to get the appropriate API base URL
      const apiUrl = getApiBaseUrl();
      console.log(`🔗 Attempting to fetch solutions from: ${apiUrl}/api/solutions`);
      
      // Simple health check - try to fetch the API endpoint
      try {
        const healthCheck = await fetch(`${apiUrl}/api/solutions`);
        if (!healthCheck.ok) {
          console.log(`⚠️ API health check failed: ${healthCheck.status} ${healthCheck.statusText}`);
        } else {
          console.log(`✅ API health check passed`);
        }
      } catch (healthError) {
        console.log(`⚠️ API health check error:`, healthError.message);
      }
      
      const json = await fetchWithRetry(
        `${apiUrl}/api/solutions`,
        3,
        2000
      );
      
      const solutions = json.data || [];
      
      // Cache the data for reuse
      buildCache.set(cacheKey, solutions);
      
      // Also cache in dev cache if in development mode
      if (isDevelopment) {
        setDevCacheData(cacheKey, solutions);
      } else {
        console.log(`✅ Cached ${solutions.length} solutions for reuse`);
      }
      
      return solutions;
    } catch (error) {
      console.error('❌ Failed to fetch solutions data:', error);
      
      // In development, if we can't reach the API, return empty array and log helpful message
      if (isDevelopment && error.message.includes('fetch')) {
        console.log(`💡 Development tip: Make sure your dev server is running (npm run dev)`);
        console.log(`💡 The API routes need to be available during getStaticProps calls`);
      }
      
      return [];
    }
  }

  static async getApplications() {
    const cacheKey = 'applications-build-data';
    
    // Check development cache first (if in dev mode)
    if (isDevelopment) {
      const cacheData = getDevCacheData(cacheKey);
      if (cacheData) {
        const ageMinutes = Math.round((Date.now() - cacheData.timestamp) / 60000);
        console.log(`✅ Using dev cache for applications (${ageMinutes} minutes old)`);
        return cacheData.data;
      }
    }
    
    // Check build cache (for production builds)
    if (buildCache.has(cacheKey)) {
      console.log('✅ Using cached applications data from index page');
      return buildCache.get(cacheKey);
    }

    console.log('🔄 Fetching applications data for the first time...');
    
    // Add stagger delay for applications (first to run)
    const delay = 15000; // 15 seconds
    console.log(`⏳ Applications: Waiting ${delay}ms to avoid rate limits...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Retry utility function with exponential backoff
    const fetchWithRetry = async (url, retries = 3, baseDelay = 2000) => {
      for (let i = 0; i < retries; i++) {
        try {
          console.log(`🔄 Attempt ${i + 1}/${retries} to fetch from ${url}`);
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          console.log(`✅ Successfully fetched data from ${url}`);
          return await response.json();
        } catch (error) {
          console.error(`❌ Attempt ${i + 1} failed:`, error.message);
          if (i === retries - 1) throw error;
          
          // Exponential backoff: 2s, 4s, 8s
          const delay = baseDelay * Math.pow(2, i);
          console.log(`⏳ Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    };

    try {
      // Use the helper function to get the appropriate API base URL
      const apiUrl = getApiBaseUrl();
      console.log(`🔗 Attempting to fetch applications from: ${apiUrl}/api/applications`);
      
      const json = await fetchWithRetry(
        `${apiUrl}/api/applications`,
        3,
        2000
      );
      
      const applications = json.data || [];
      
      // Cache the data for reuse
      buildCache.set(cacheKey, applications);
      
      // Also cache in dev cache if in development mode
      if (isDevelopment) {
        setDevCacheData(cacheKey, applications);
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
      const cacheData = getDevCacheData(cacheKey);
      if (cacheData) {
        const ageMinutes = Math.round((Date.now() - cacheData.timestamp) / 60000);
        console.log(`✅ Using dev cache for blog posts (${ageMinutes} minutes old)`);
        return cacheData.data;
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
    
    // Retry utility function with exponential backoff
    const fetchWithRetry = async (url, retries = 3, baseDelay = 2000) => {
      for (let i = 0; i < retries; i++) {
        try {
          console.log(`🔄 Attempt ${i + 1}/${retries} to fetch from ${url}`);
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          console.log(`✅ Successfully fetched data from ${url}`);
          return await response.json();
        } catch (error) {
          console.error(`❌ Attempt ${i + 1} failed:`, error.message);
          if (i === retries - 1) throw error;
          
          // Exponential backoff: 2s, 4s, 8s
          const delay = baseDelay * Math.pow(2, i);
          console.log(`⏳ Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    };

    try {
      // Use the helper function to get the appropriate API base URL
      const apiUrl = getApiBaseUrl();
      const json = await fetchWithRetry(
        `${apiUrl}/api/blog-posts`,
        3,
        2000
      );
      
      const blogPosts = json.data || [];
      
      // Cache the data for reuse
      buildCache.set(cacheKey, blogPosts);
      
      // Also cache in dev cache if in development mode
      if (isDevelopment) {
        setDevCacheData(cacheKey, blogPosts);
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
      const cacheData = getDevCacheData(cacheKey);
      if (cacheData) {
        const ageMinutes = Math.round((Date.now() - cacheData.timestamp) / 60000);
        console.log(`✅ Using dev cache for products (${ageMinutes} minutes old)`);
        return cacheData.data;
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
    
    // Retry utility function with exponential backoff
    const fetchWithRetry = async (url, retries = 3, baseDelay = 2000) => {
      for (let i = 0; i < retries; i++) {
        try {
          console.log(`🔄 Attempt ${i + 1}/${retries} to fetch from ${url}`);
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          console.log(`✅ Successfully fetched data from ${url}`);
          return await response.json();
        } catch (error) {
          console.error(`❌ Attempt ${i + 1} failed:`, error.message);
          if (i === retries - 1) throw error;
          
          // Exponential backoff: 2s, 4s, 8s
          const delay = baseDelay * Math.pow(2, i);
          console.log(`⏳ Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    };

    try {
      // Use the helper function to get the appropriate API base URL
      const apiUrl = getApiBaseUrl();
      const json = await fetchWithRetry(
        `${apiUrl}/api/products`,
        3,
        2000
      );
      
      const products = json.data || [];
      
      // Cache the data for reuse
      buildCache.set(cacheKey, products);
      
      // Also cache in dev cache if in development mode
      if (isDevelopment) {
        setDevCacheData(cacheKey, products);
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
    // Clear in-memory cache
    devCache.clear();
    
    // Clear file-based cache
    if (isDevelopment) {
      try {
        const cacheDir = path.join(os.tmpdir(), 'sytis-dev-cache');
        if (fs.existsSync(cacheDir)) {
          const files = fs.readdirSync(cacheDir);
          files.forEach(file => {
            if (file.endsWith('.json')) {
              fs.unlinkSync(path.join(cacheDir, file));
            }
          });
        }
        console.log('🗑️  Development cache cleared (both memory and files)');
      } catch (error) {
        console.log('⚠️ Error clearing file cache:', error.message);
        console.log('🗑️  Development memory cache cleared');
      }
    } else {
      console.log('🗑️  Development cache cleared');
    }
  }

  static clearAllCaches() {
    buildCache.clear();
    this.clearDevCache();
    console.log('🗑️  All caches cleared');
  }

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

    // Add file-based cache info for development mode
    if (isDevelopment) {
      try {
        const cacheDir = path.join(os.tmpdir(), 'sytis-dev-cache');
        if (fs.existsSync(cacheDir)) {
          const files = fs.readdirSync(cacheDir);
          status.fileCache = {
            directory: cacheDir,
            files: files.map(file => {
              if (file.endsWith('.json')) {
                try {
                  const cacheData = JSON.parse(fs.readFileSync(path.join(cacheDir, file), 'utf8'));
                  const ageMinutes = Math.round((Date.now() - cacheData.timestamp) / 60000);
                  return { 
                    file, 
                    ageMinutes,
                    dataLength: Array.isArray(cacheData.data) ? cacheData.data.length : 'unknown'
                  };
                } catch (error) {
                  return { file, error: error.message };
                }
              }
              return null;
            }).filter(Boolean)
          };
        }
      } catch (error) {
        status.fileCache = { error: error.message };
      }
    }

    return status;
  }
}

export default BuildDataCache;
