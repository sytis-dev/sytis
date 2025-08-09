import rateLimiter from "@/utils/bigcommerceRateLimiter";

const cache = new Map();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes in milliseconds
const PRODUCTS_CACHE_TTL = 10 * 60 * 1000; // 10 minutes for products within solutions
const IMAGES_CACHE_TTL = 30 * 60 * 1000; // 30 minutes for images

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

  // Check if we have an ID parameter for specific solution
  const { id } = req.query;

  try {
    const cacheKeyCategories = "categories";
    let categoriesData = getCache(cacheKeyCategories);

    if (!categoriesData) {
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
        return res.status(500).json({
          error: `BigCommerce API error: ${categoriesResponse.status} ${categoriesResponse.statusText}`,
        });
      }

      categoriesData = await categoriesResponse.json();
      setCache(cacheKeyCategories, categoriesData);
    }

    let filteredCategories = categoriesData.data.filter(
      (cat) => cat.parent_id === 35 && cat.is_visible
    );

    // If ID is specified, filter to only that category
    if (id) {
      const categoryId = parseInt(id, 10);
      filteredCategories = filteredCategories.filter(
        (cat) => cat.category_id === categoryId
      );
      
      if (filteredCategories.length === 0) {
        return res.status(404).json({ error: "Solution not found" });
      }
    }

    const sortedCategories = filteredCategories.sort(
      (a, b) => a.sort_order - b.sort_order
    );

    const categoriesWithProducts = await Promise.all(
      sortedCategories.map(async (category) => {
        const cacheKeyMeta = `metafields-${category.category_id}`;
        let metafieldsData = getCache(cacheKeyMeta);

        if (!metafieldsData) {
          const metafieldsResponse = await rateLimiter.fetchWithRateLimit(
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

        const cacheKeyProducts = `products-${category.category_id}`;
        var productsData = getCache(cacheKeyProducts);

        if (!productsData) {
          const productsResponse = await rateLimiter.fetchWithRateLimit(
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

        const productsWithDetails = await Promise.all(
          productsData.data
            .filter((product) => product.is_visible)
            .map(async (product) => {
              const cacheKeyImages = `images-${product.id}`;
              let imagesData = getCache(cacheKeyImages);

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
                is_price_hidden: product.is_price_hidden,
                meta_description: product.meta_description?.trim() || null,
                meta_keywords: product.meta_keywords,
                // Add specification fields
                weight: product.weight,
                width: product.width,
                depth: product.depth,
                height: product.height,
                all_images:
                  imagesData.data
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
                    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) || [],
                tabs: tabs,
              };
            })
        );

        return {
          category_id: category.category_id,
          name: category.name?.trim() || null,
          description: category.description?.trim() || null,
          image_url: category.image_url?.trim() || null,
          iconUrl,
          meta_description: category.meta_description?.trim() || null,
          meta_keywords: category.meta_keywords,
          products: productsWithDetails,
        };
      })
    );

    // If ID was specified, return single solution, otherwise return array
    if (id) {
      return res.status(200).json({ data: categoriesWithProducts[0] });
    } else {
      return res.status(200).json({ data: categoriesWithProducts });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: `BigCommerce API error: ${error.message}` });
  }
}

// Enhanced cache helpers
function getCache(key, ttl = CACHE_TTL) {
  const cached = cache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.value;
  }
  cache.delete(key); // Remove expired
  return null;
}

function setCache(key, value, ttl = CACHE_TTL) {
  cache.set(key, { value, expiry: Date.now() + ttl });
}
