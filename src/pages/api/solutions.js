const cache = new Map();
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes in milliseconds

export default async function handler(req, res) {
  const storeHash = process.env.BIGCOMMERCE_STORE_HASH;
  const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN;

  if (!storeHash || !accessToken) {
    return res.status(500).json({ error: "Missing API credentials" });
  }

  try {
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
        return res.status(500).json({
          error: `BigCommerce API error: ${categoriesResponse.status} ${categoriesResponse.statusText}`,
        });
      }

      categoriesData = await categoriesResponse.json();
      setCache(cacheKeyCategories, categoriesData);
    }

    const filteredCategories = categoriesData.data.filter(
      (cat) => cat.parent_id === 35 && cat.is_visible
    );

    const sortedCategories = filteredCategories.sort(
      (a, b) => a.sort_order - b.sort_order
    );

    const categoriesWithProducts = await Promise.all(
      sortedCategories.map(async (category) => {
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

          if (!productsResponse.ok) {
            return res.status(500).json({
              error: `BigCommerce API error fetching products for category ${category.category_id}: ${productsResponse.status} ${productsResponse.statusText}`,
            });
          }

          productsData = await productsResponse.json();
          setCache(cacheKeyProducts, productsData);
        }

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
              all_images:
                imagesData.data.map((image) => ({
                  id: image.id,
                  is_thumbnail: image.is_thumbnail,
                  sort_order: image.sort_order,
                  description: image.description?.trim() || null,
                  url_zoom: image.url_zoom?.trim() || null,
                  url_standard: image.url_standard?.trim() || null,
                  url_thumbnail: image.url_thumbnail?.trim() || null,
                  url_tiny: image.url_tiny?.trim() || null,
                  date_modified: image.date_modified,
                })) || [],
            };
          })
        );

        return {
          category_id: category.category_id,
          name: category.name?.trim() || null,
          description: category.description?.trim() || null,
          image_url: category.image_url?.trim() || null,
          iconUrl,
          products: productsWithDetails,
        };
      })
    );

    return res.status(200).json({ data: categoriesWithProducts });
  } catch (error) {
    return res.status(500).json({ error: `BigCommerce API error: ${error.message}` });
  }
}

// Helper functions for caching
function getCache(key) {
  const cached = cache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.value;
  }
  cache.delete(key); // Remove expired
  return null;
}

function setCache(key, value) {
  cache.set(key, { value, expiry: Date.now() + CACHE_TTL });
}
