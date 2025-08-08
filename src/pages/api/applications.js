import { VercelCacheManager, VERCEL_CACHE_CONFIG, vercelCachedApiCall, addVercelCacheHeaders } from '../../lib/vercelCacheUtils';

const cache = new Map();
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes in milliseconds

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

export default async function handler(req, res) {
  const storeHash = process.env.BIGCOMMERCE_STORE_HASH;
  const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN;

  if (!storeHash || !accessToken) {
    return res.status(500).json({ error: "Missing API credentials" });
  }

  try {
    const cacheKeyCategories = "categories";
    
    // Use Vercel-optimized caching with stale-while-revalidate
    const { data: categoriesData, fromCache, isStale } = await vercelCachedApiCall(
      cacheKeyCategories,
      async () => {
        const categoriesResponse = await fetch(
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
          throw new Error(`BigCommerce API error: ${categoriesResponse.status} ${categoriesResponse.statusText}`);
        }

        return await categoriesResponse.json();
      },
      VERCEL_CACHE_CONFIG.CATEGORIES
    );

    if (fromCache && !isStale) {
      console.log('Applications: Using fresh cached categories');
    } else if (fromCache && isStale) {
      console.log('Applications: Using stale cached categories, revalidating in background');
    } else {
      console.log('Applications: Fetched fresh categories from API');
    }

    const filteredCategories = categoriesData.data
      .filter((cat) => cat.parent_id === 18 && cat.is_visible)
      .sort((a, b) => a.sort_order - b.sort_order);

    const categoriesWithDetails = await Promise.all(
      filteredCategories.map(async (category) => {
        const cacheKeyMeta = `metafields-${category.category_id}`;
        let metafieldsData = getCache(cacheKeyMeta);

        if (!metafieldsData) {
          const metafieldsResponse = await fetch(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories/${category.category_id}/metafields`,
            {
              method: "GET",
              headers: {
                "X-Auth-Token": accessToken,
                "Content-Type": "application/json",
              },
            }
          );

          if (!metafieldsResponse.ok) {
            return res.status(500).json({
              error: `BigCommerce API error fetching metafields for category ${category.category_id}: ${metafieldsResponse.status} ${metafieldsResponse.statusText}`,
            });
          }

          metafieldsData = await metafieldsResponse.json();
          setCache(cacheKeyMeta, metafieldsData);
        }

        const iconMetafield = metafieldsData.data.find(
          (meta) => meta.key === "iconUrl"
        );
        const iconUrl = iconMetafield ? iconMetafield.value : null;

        const contentMetafield = metafieldsData.data.find(
          (meta) => meta.key === "content"
        );
        const content = contentMetafield
          ? JSON.parse(contentMetafield.value)
          : null;

        const cacheKeyProducts = `products-${category.category_id}`;
        var productsData = getCache(cacheKeyProducts);

        if (!productsData) {
          const productsResponse = await fetch(
            `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products?categories:in=${category.category_id}`,
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
              error: `BigCommerce API error fetching products for category ${category.category_id}: ${productsResponse.status} ${productsResponse.statusText}`,
            });
          }

          productsData = await productsResponse.json();
          setCache(cacheKeyProducts, productsData);
        }

        const trimStrings = (obj) => {
          if (typeof obj === "string") return obj.trim();
          if (Array.isArray(obj)) return obj.map(trimStrings);
          if (obj !== null && typeof obj === "object") {
            return Object.fromEntries(
              Object.entries(obj).map(([key, value]) => [
                key,
                trimStrings(value),
              ])
            );
          }
          return obj;
        };

        const productsWithDetails = await Promise.all(
          productsData.data.map(async (product) => {
            const cacheKeyImages = `images-${product.id}`;
            let imagesData = getCache(cacheKeyImages);

            if (!imagesData) {
              const imagesResponse = await fetch(
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
                return res.status(500).json({
                  error: `BigCommerce API error fetching images for product ${product.id}: ${imagesResponse.status} ${imagesResponse.statusText}`,
                });
              }

              imagesData = await imagesResponse.json();
              setCache(cacheKeyImages, imagesData);
            }

            // Fetch metafields for tabs
            let tabs = [];
            try {
              const metafieldsResponse = await fetch(
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
                const metafieldsData = await metafieldsResponse.json();
                
                // Define the tab keys we're looking for
                const tabKeys = ['tab_features', 'tab_applications', 'tab_description', 'tab_resources'];
                
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

            return trimStrings({
              id: product.id,
              name: product.name,
              sku: product.sku,
              description: product.description,
              slug: product.custom_url ? product.custom_url.url : null,
              custom_url: product.custom_url,
              brandId: product.brand_id,
              price: product.calculated_price,
              categories: product.categories,
              is_price_hidden: product.is_price_hidden,
              all_images:
                imagesData.data
                  .map((image) =>
                    trimStrings({
                      id: image.id,
                      is_thumbnail: image.is_thumbnail,
                      sort_order: image.sort_order,
                      description: image.description,
                      url_zoom: image.url_zoom,
                      url_standard: image.url_standard,
                      url_thumbnail: image.url_thumbnail,
                      url_tiny: image.url_tiny,
                      date_modified: image.date_modified,
                    })
                  )
                  .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) || [],
              tabs: tabs,
            });
          })
        );

        return trimStrings({
          category_id: category.category_id,
          description: category.description,
          name: category.name,
          image_url: category.image_url || null,
          iconUrl,
          meta_description: category.meta_description?.trim() || null,
          meta_keywords: category.meta_keywords,
          content,
          products: productsWithDetails,
        });
      })
    );

    // Add Vercel-optimized cache headers
    addVercelCacheHeaders(res, VERCEL_CACHE_CONFIG.APPLICATIONS);

    return res.status(200).json({ data: categoriesWithDetails });
  } catch (error) {
    console.error('Applications API error:', error);
    
    // During build or if we have cached data, return partial data instead of failing
    const cachedCategories = getCache("categories");
    if (cachedCategories || process.env.VERCEL_ENV !== 'production') {
      console.log('Returning cached/fallback data due to API error');
      return res.status(200).json({ 
        data: [],
        warning: 'Using fallback data due to API unavailability'
      });
    }
    
    return res
      .status(500)
      .json({ error: `BigCommerce API error: ${error.message}` });
  }
}

// Cache helpers
function getCache(key) {
  const cached = cache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.value;
  }
  cache.delete(key);
  return null;
}

function setCache(key, value) {
  cache.set(key, { value, expiry: Date.now() + CACHE_TTL });
}
