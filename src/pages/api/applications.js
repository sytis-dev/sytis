const cache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes in milliseconds

export default async function handler(req, res) {
  const storeHash = process.env.BIGCOMMERCE_STORE_HASH;
  const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN;

  if (!storeHash || !accessToken) {
    return res.status(500).json({ error: "Missing API credentials" });
  }

  try {
    // Check cache for categories
    const cacheKeyCategories = "categories";
    let categoriesData = getCache(cacheKeyCategories);

    if (!categoriesData) {
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
        throw new Error(
          `BigCommerce API error: ${categoriesResponse.statusText}`
        );
      }

      categoriesData = await categoriesResponse.json();
      setCache(cacheKeyCategories, categoriesData);
    }

    const filteredCategories = categoriesData.data
      .filter((cat) => cat.parent_id === 18 && cat.is_visible !== false)
      .sort((a, b) => a.sort_order - b.sort_order);

    // Fetch metafields and products for each category
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

          metafieldsData = metafieldsResponse.ok
            ? await metafieldsResponse.json()
            : { data: [] };

          setCache(cacheKeyMeta, metafieldsData);
        }

        // Extract iconUrl and content from metafields
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
        let productsData = getCache(cacheKeyProducts);

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

          productsData = productsResponse.ok
            ? await productsResponse.json()
            : { data: [] };

          setCache(cacheKeyProducts, productsData);
        }

        // Helper function to trim all string values
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

              imagesData = imagesResponse.ok
                ? await imagesResponse.json()
                : { data: [] };

              setCache(cacheKeyImages, imagesData);
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
                imagesData.data.map((image) =>
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
                ) || [],
            });
          })
        );

        return trimStrings({
          category_id: category.category_id,
          description: category.description,
          name: category.name,
          image_url: category.image_url || null,
          iconUrl, // Add iconUrl from metafields
          content: content, // Add content from metafields
          products: productsWithDetails,
        });
      })
    );

    return res.status(200).json({ data: categoriesWithDetails });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Helper functions for caching
function getCache(key) {
  const cached = cache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.value;
  }
  cache.delete(key); // Expired, remove from cache
  return null;
}

function setCache(key, value) {
  cache.set(key, { value, expiry: Date.now() + CACHE_TTL });
}
