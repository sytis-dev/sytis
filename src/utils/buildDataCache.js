/**
 * Build-time data cache for sharing API responses between pages
 * This prevents duplicate API calls during static generation
 */

// In-memory cache for build-time data sharing
const buildCache = new Map();

export class BuildDataCache {
  static async getSolutions() {
    const cacheKey = 'solutions-build-data';
    
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
      console.log(`✅ Cached ${solutions.length} solutions for reuse`);
      
      return solutions;
    } catch (error) {
      console.error('❌ Failed to fetch solutions data:', error);
      return [];
    }
  }

  static async getApplications() {
    const cacheKey = 'applications-build-data';
    
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
      console.log(`✅ Cached ${applications.length} applications for reuse`);
      
      return applications;
    } catch (error) {
      console.error('❌ Failed to fetch applications data:', error);
      return [];
    }
  }

  static async getBlogPosts() {
    const cacheKey = 'blog-posts-build-data';
    
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
      console.log(`✅ Cached ${blogPosts.length} blog posts for reuse`);
      
      return blogPosts;
    } catch (error) {
      console.error('❌ Failed to fetch blog posts data:', error);
      return [];
    }
  }

  static async getProducts() {
    const cacheKey = 'products-build-data';
    
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
      console.log(`✅ Cached ${products.length} products for reuse`);
      
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
}

export default BuildDataCache;
