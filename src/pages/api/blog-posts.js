const cache = new Map();
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes
const FETCH_TIMEOUT = 10000; // 10 seconds
const RETRIES = 3;

// In-memory cache
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

// Fetch with timeout and retry logic
async function fetchWithRetry(
  url,
  options = {},
  retries = RETRIES,
  timeout = FETCH_TIMEOUT
) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (err) {
      console.warn(`Fetch attempt ${attempt} failed: ${err.message}`);
      if (attempt === retries) {
        throw err;
      }
      await new Promise((res) => setTimeout(res, 1000 * attempt)); // Backoff
    }
  }
}

export default async function handler(req, res) {
  const storeHash = process.env.BIGCOMMERCE_STORE_HASH;
  const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN;

  if (!storeHash || !accessToken) {
    return res.status(500).json({ error: "Missing API credentials" });
  }

  const cacheKeyBlogs = "blogs";
  let postsData = getCache(cacheKeyBlogs);

  if (!postsData) {
    try {
      const response = await fetchWithRetry(
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

      postsData = await response.json();
      setCache(cacheKeyBlogs, postsData); // Cache only successful response
    } catch (error) {
      console.error("Failed to fetch blog posts:", error.message);
      return res.status(504).json({ error: "Upstream timeout or failure." });
    }
  }

  const publishedPosts = (postsData || [])
    .filter((post) => post.is_published)
    .map((post) => ({
      id: post.id,
      author: post.author,
      title: post.title,
      body: post.body,
      summary: post.summary,
      published_date: post.published_date?.date,
      tags: post.tags,
      meta_description: post.meta_description,
      meta_keywords: post.meta_keywords,
      thumbnail_path: post.thumbnail_path,
      url: post.url.replace(/\/$/, "").replace(/^\/blog/, ""),
      preview_url: post.preview_url,
    }));

  return res.status(200).json({ data: publishedPosts });
}
