import rateLimiter from "../../utils/bigcommerceRateLimiter.js";

const cache = new Map();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes in milliseconds
const IMAGES_CACHE_TTL = 30 * 60 * 1000; // 30 minutes for images (change less frequently)
const METAFIELDS_CACHE_TTL = 30 * 60 * 1000; // 30 minutes for metafields

// Hard-coded solution categories (same as in solutions API)
const SOLUTION_PARENT_ID = 35;

// Helper function to parse tab content from bullet point format
const parseTabContent = (value) => {
  if (!value || typeof value !== 'string') {
    return null;
  }

  try {
    // Try to parse as JSON first
    return JSON.parse(value);
  } catch (e) {
    // If not JSON, parse bullet point format
    const lines = value.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) {
      return null;
    }

    // Check if it starts with a title (like "Features:" or "Applications:")
    const firstLine = lines[0].trim();
    if (firstLine.endsWith(':')) {
      const title = firstLine.slice(0, -1); // Remove the colon
      const items = lines.slice(1)
        .map(line => line.trim())
        .filter(line => line.startsWith('-'))
        .map(line => line.substring(1).trim())
        .filter(line => line.length > 0);
      
      return {
        title,
        items
      };
    } else {
      // If no title, just return as items
      const items = lines
        .map(line => line.trim())
        .filter(line => line.startsWith('-'))
        .map(line => line.substring(1).trim())
        .filter(line => line.length > 0);
      
      return items.length > 0 ? { items } : null;
    }
  }
};

// Enhanced cache helpers
const getCachedData = (key, ttl = CACHE_TTL) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key, data, ttl = CACHE_TTL) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// Helper function to get solution categories (children of the hard-coded parent)
const getSolutionCategories = async (storeHash, accessToken) => {
  const cacheKey = "solution-categories";
  const cachedData = cache.get(cacheKey);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    return cachedData.data;
  }

  try {
    const categoriesResponse = await rateLimiter.fetchWithRateLimit(
      `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/trees/categories`,
      {
        method: "GET",
        headers: {
          "X-Auth-Token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    if (!categoriesResponse.ok) {
      console.error(`Failed to fetch solution categories: ${categoriesResponse.status}`);
      return [];
    }

    const categoriesData = await categoriesResponse.json();
    
    // Get all child categories of the solution parent category
    const solutionCategories = categoriesData.data.filter(
      (cat) => cat.parent_id === SOLUTION_PARENT_ID && cat.is_visible
    );

    console.log(`Found ${solutionCategories.length} solution categories under parent ${SOLUTION_PARENT_ID}`);
    
    cache.set(cacheKey, { data: solutionCategories, timestamp: Date.now() });
    return solutionCategories;
  } catch (error) {
    console.error('Error fetching solution categories:', error);
    return [];
  }
};

// Helper function to determine which solution a product belongs to
const getProductSolution = (productCategories, solutionCategories, productId) => {
  if (!productCategories || !Array.isArray(productCategories)) {
    return null;
  }

  // Extract category IDs from the product's categories
  const productCategoryIds = productCategories.map(cat => cat.id || cat);
  
  // Find the first solution category that matches any of the product's categories
  for (const solutionCategory of solutionCategories) {
    const hasMatch = productCategoryIds.includes(solutionCategory.category_id);
    if (hasMatch) {
      console.log(`Product ${productId} matched solution category ${solutionCategory.category_id} (${solutionCategory.name})`);
      return solutionCategory.category_id;
    }
  }

  // Log when no solution is found for debugging
  console.log(`Product ${productId} has categories [${productCategoryIds.join(', ')}] but no solution match found`);
  return null;
};

export default async function handler(req, res) {
  const storeHash = process.env.BIGCOMMERCE_STORE_HASH;
  const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN;

  if (!storeHash || !accessToken) {
    return res.status(500).json({ error: "Missing API credentials" });
  }

  try {
    const cacheKey = "products";
    const cachedData = cache.get(cacheKey);

    if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
      return res.status(200).json({ data: cachedData.data });
    }

    const productsResponse = await rateLimiter.fetchWithRateLimit(
      `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products`,
      {
        method: "GET",
        headers: {
          "X-Auth-Token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    if (!productsResponse.ok) {
      return res.status(500).json({
        error: `BigCommerce API error: ${productsResponse.status} ${productsResponse.statusText}`,
      });
    }

    const productsData = await productsResponse.json();
    let products = productsData.data || [];

    // Fetch solution categories for mapping
    const solutionCategories = await getSolutionCategories(storeHash, accessToken);
    console.log('Solution categories:', solutionCategories.map(cat => `${cat.category_id}: ${cat.name}`));

    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        // Fetch images with caching
        const imagesCacheKey = `images-${product.id}`;
        let imagesData = getCachedData(imagesCacheKey, IMAGES_CACHE_TTL);
        
        if (!imagesData) {
          const imagesResponse = await rateLimiter.fetchWithRateLimit(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${product.id}/images`,
            {
              method: "GET",
              headers: {
                "X-Auth-Token": accessToken,
                "Content-Type": "application/json",
              },
            }
          );

          if (!imagesResponse.ok) {
            throw new Error(
              `BigCommerce API error fetching images for product ${product.id}: ${imagesResponse.status} ${imagesResponse.statusText}`
            );
          }

          imagesData = await imagesResponse.json();
          setCachedData(imagesCacheKey, imagesData, IMAGES_CACHE_TTL);
        }

        // Fetch metafields with caching
        let tabs = [];
        try {
          const metafieldsCacheKey = `metafields-${product.id}`;
          let metafieldsData = getCachedData(metafieldsCacheKey, METAFIELDS_CACHE_TTL);
          
          if (!metafieldsData) {
            const metafieldsResponse = await rateLimiter.fetchWithRateLimit(
              `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products/${product.id}/metafields`,
              {
                method: "GET",
                headers: {
                  "X-Auth-Token": accessToken,
                  "Content-Type": "application/json",
                },
              }
            );

            if (metafieldsResponse.ok) {
              metafieldsData = await metafieldsResponse.json();
              setCachedData(metafieldsCacheKey, metafieldsData, METAFIELDS_CACHE_TTL);
            }
          }

          if (metafieldsData) {
            
            // Define the tab keys we're looking for
            // Note: tab_specifications is optional and will be filtered out if not present
            const tabKeys = ['tab_features', 'tab_applications', 'tab_description', 'tab_resources', 'tab_specifications'];
            
            tabs = tabKeys
              .map(key => {
                const metafield = metafieldsData.data.find(meta => meta.key === key);
                if (metafield) {
                  const parsedValue = parseTabContent(metafield.value);
                  return {
                    key,
                    value: parsedValue
                  };
                }
                return null;
              })
              .filter(tab => tab !== null && tab.value !== null);
          }
        } catch (error) {
          console.warn(`Failed to fetch metafields for product ${product.id}:`, error.message);
          // Continue without metafields if there's an error
        }

        // Sort images by sort_order before returning
        const sortedImages = imagesData.data
          .map((image) => ({
            id: image.id,
            is_thumbnail: image.is_thumbnail,
            sort_order: image.sort_order,
            description: image.description?.trim() || null,
            url_zoom: image.url_zoom?.trim() || null,
            url_standard: image.url_standard?.trim() || null,
            url_thumbnail: image.url_thumbnail?.trim() || null,
            url_tiny: image.url_tiny?.trim() || null,
            date_modified: image.date_modified,
          }))
          .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

        // Determine which solution this product belongs to
        const solutionId = getProductSolution(product.categories, solutionCategories, product.id);
        const solutionCategory = solutionCategories.find(cat => cat.category_id === solutionId);

        return {
          id: product.id,
          name: product.name?.trim() || null,
          sku: product.sku?.trim() || null,
          description: product.description?.trim() || null,
          slug: product.custom_url?.url?.trim() || null,
          custom_url: product.custom_url,
          brandId: product.brand_id,
          price: product.calculated_price,
          categories: product.categories,
          solution: solutionId, // Solution ID for reference
          solutionName: solutionCategory?.name || "Other Products", // Solution name for display
          is_price_hidden: product.is_price_hidden,
          meta_description: product.meta_description?.trim() || null,
          meta_keywords: product.meta_keywords,
          date_created: product.date_created,
          weight: product.weight || null,
          width: product.width || null,
          depth: product.depth || null,
          height: product.height || null,
          all_images: sortedImages || [],
          tabs: tabs,
        };
      })
    );

    cache.set(cacheKey, { data: productsWithImages, timestamp: Date.now() });

    return res.status(200).json({ data: productsWithImages });
  } catch (error) {
    return res.status(500).json({ error: `BigCommerce API error: ${error.message}` });
  }
}
