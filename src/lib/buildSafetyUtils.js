/**
 * Build Safety Utilities
 * Prevents build process from overwhelming production APIs
 */

// Build-time safety configuration
const BUILD_SAFETY_CONFIG = {
  // Limit static page generation during build
  MAX_STATIC_PAGES: {
    products: 20,    // Generate top 20 product pages at build time (most important for SEO)
    solutions: 10,   // Generate top 10 solution pages at build time
    applications: 10 // Generate top 10 application pages at build time
  },
  
  // Build-time API call limits
  MAX_API_CALLS_PER_ENDPOINT: 5,
  API_CALL_DELAY: 1000, // 1 second between calls
  
  // Retry configuration for build
  BUILD_RETRIES: 2, // Fewer retries during build
  BUILD_TIMEOUT: 15000, // 15 second timeout
};

/**
 * Safe fetch function for build time
 * Includes rate limiting and error handling
 */
export async function safeBuildFetch(url, options = {}) {
  // Check if we're in build environment
  const isBuild = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'production';
  
  if (isBuild) {
    console.log('🏗️  Build environment detected - using safe fetch');
    
    // Add delay between API calls during build
    await new Promise(resolve => setTimeout(resolve, BUILD_SAFETY_CONFIG.API_CALL_DELAY));
  }

  const fetchOptions = {
    ...options,
    timeout: BUILD_SAFETY_CONFIG.BUILD_TIMEOUT,
  };

  let lastError;
  
  for (let attempt = 1; attempt <= BUILD_SAFETY_CONFIG.BUILD_RETRIES; attempt++) {
    try {
      const response = await fetch(url, fetchOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      lastError = error;
      console.warn(`🔄 Build fetch attempt ${attempt} failed:`, error.message);
      
      if (attempt < BUILD_SAFETY_CONFIG.BUILD_RETRIES) {
        const delay = attempt * 2000; // Exponential backoff
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

/**
 * Limit static paths generation for build safety
 */
export function limitStaticPaths(items, type, limit = null) {
  // Allow environment variable override
  const envLimit = process.env[`MAX_STATIC_${type.toUpperCase()}`];
  const maxItems = limit || (envLimit ? parseInt(envLimit, 10) : null) || BUILD_SAFETY_CONFIG.MAX_STATIC_PAGES[type] || 10;
  
  if (items.length > maxItems) {
    console.log(`🚧 Build safety: Limiting ${type} static paths from ${items.length} to ${maxItems}`);
    
    // Prioritize items with custom URLs for better SEO
    const prioritized = items
      .filter(item => item && item.custom_url && item.custom_url.url)
      .slice(0, maxItems);
    
    return prioritized;
  }
  
  return items;
}

/**
 * Safe build-time API call with circuit breaker
 */
export async function safeBuildApiCall(endpoint, fallbackData = []) {
  try {
    const baseUrl = process.env.API_URL || 'http://localhost:3000';
    const response = await safeBuildFetch(`${baseUrl}/api/${endpoint}`);
    const data = await response.json();
    
    return data?.data || fallbackData;
  } catch (error) {
    console.warn(`⚠️  Build API call failed for ${endpoint}:`, error.message);
    console.log(`🛡️  Using fallback data for ${endpoint}`);
    
    // Return empty fallback data to allow build to continue
    return fallbackData;
  }
}

/**
 * Check if build should skip API calls entirely
 */
export function shouldSkipBuildApiCalls() {
  // Skip API calls if specific environment variable is set
  if (process.env.SKIP_BUILD_API_CALLS === 'true') {
    console.log('🚫 Skipping all build-time API calls (SKIP_BUILD_API_CALLS=true)');
    return true;
  }
  
  // Skip if no API credentials are available
  if (!process.env.BIGCOMMERCE_STORE_HASH || !process.env.BIGCOMMERCE_ACCESS_TOKEN) {
    console.log('🚫 Skipping build-time API calls (no BigCommerce credentials)');
    return true;
  }
  
  return false;
}
