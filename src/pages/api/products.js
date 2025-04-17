const cache = new Map();
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes in milliseconds

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
    const products = productsData.data || [];

    const productsWithImages = await Promise.all(
      products.map(async (product) => {
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

    cache.set(cacheKey, { data: productsWithImages, timestamp: Date.now() });

    return res.status(200).json({ data: productsWithImages });
  } catch (error) {
    return res.status(500).json({ error: `BigCommerce API error: ${error.message}` });
  }
}
