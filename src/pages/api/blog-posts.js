const cache = new Map();
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes

export default async function handler(req, res) {
  const storeHash = process.env.BIGCOMMERCE_STORE_HASH;
  const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN;

  if (!storeHash || !accessToken) {
    return res.status(500).json({ error: "Missing API credentials" });
  }

  try {
    const cacheKeyBlogs = "blogs";
    let postsData = getCache(cacheKeyBlogs);

    if (!postsData) {
      const postsResponse = await fetch(
        `https://api.bigcommerce.com/stores/${storeHash}/v2/blog/posts`,
        {
          method: "GET",
          headers: {
            "X-Auth-Token": accessToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!postsResponse.ok) {
        return res
          .status(500)
          .json({ error: `BigCommerce API error: ${postsResponse.status} ${postsResponse.statusText}` });
      }

      postsData = await postsResponse.json();
      setCache(cacheKeyBlogs, postsData); // Only cache on successful response
    }

    const publishedPosts = postsData
      .filter((post) => post.is_published)
      .map((post) => ({
        id: post.id,
        author: post.author,
        title: post.title,
        body: post.body,
        summary: post.summary,
        published_date: post.published_date.date,
        tags: post.tags,
        meta_description: post.meta_description,
        meta_keywords: post.meta_keywords,
        thumbnail_path: post.thumbnail_path,
        url: post.url.replace(/\/$/, "").replace(/^\/blog/, ""),
        preview_url: post.preview_url,
      }));

    return res.status(200).json({ data: publishedPosts });
  } catch (error) {
    return res.status(500).json({ error: `Unexpected error: ${error.message}` });
  }
}

// Simple in-memory cache
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