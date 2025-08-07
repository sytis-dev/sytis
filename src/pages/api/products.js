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
    const cacheKey = "products";
    const cachedData = cache.get(cacheKey);

    if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
      return res.status(200).json({ data: cachedData.data });
    }

    const productsResponse = await fetch(
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

    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        // Fetch images
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
          throw new Error(
            `BigCommerce API error fetching images for product ${product.id}: ${imagesResponse.status} ${imagesResponse.statusText}`
          );
        }

        const imagesData = await imagesResponse.json();

        // Fetch metafields
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
          date_created: product.date_created,
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
