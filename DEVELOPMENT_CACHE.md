# Development Cache System

This project now includes an intelligent caching system that provides fresh data during development while minimizing API calls.

## How It Works

### Development Mode (`npm run dev`)
- **Data is cached for 10 minutes** to provide fresh data without constant API calls
- **All pages use the same cached data** from your existing `BuildDataCache`
- **No duplicate API calls** - data is fetched once and shared across all pages
- **Automatic refresh** - data automatically refreshes after 10 minutes

### Production Build (`npm run build`)
- **Data is cached once during build** and reused across all pages
- **No API calls during runtime** - completely static
- **Maximum performance** - all data is pre-fetched

## Usage

### During Development

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Data will be automatically cached** when you first visit pages that need it:
   - `/solutions` - caches solutions data
   - `/applications` - caches applications data  
   - `/articles` - caches blog posts data
   - `/products` - caches products data

3. **Data stays fresh for 10 minutes** - subsequent page visits use cached data

4. **Restart dev server** to get latest data immediately

### Cache Management

#### Check Cache Status
```bash
npm run cache:status
```
Shows what data is cached and how old it is.

#### Force Refresh (Clear 10-min Cache)
```bash
npm run cache:clear
```
Clears the development cache, forcing fresh API calls on next page visit.

#### Clear All Caches
```bash
npm run cache:clear-all
```
Nuclear option - clears both development and build caches.

#### Direct API Access
You can also manage cache directly via API endpoints:

```bash
# Check status
curl "http://localhost:3000/api/cache-warm?action=status"

# Clear dev cache
curl "http://localhost:3000/api/cache-warm?action=clear"

# Clear all caches
curl "http://localhost:3000/api/cache-warm?action=clear-all"
```

## Benefits

✅ **Fresh Data**: Get data that's at most 10 minutes old  
✅ **No API Spam**: Data is fetched once and shared across all pages  
✅ **Fast Development**: No waiting for API calls on every page visit  
✅ **Easy Refresh**: Clear cache or restart server to get latest data  
✅ **Production Ready**: Same system works for production builds  

## What Gets Cached

- **Solutions** - Product categories and solutions
- **Applications** - Real-world use cases  
- **Blog Posts** - Articles and blog content
- **Products** - Individual product details

## Troubleshooting

### "Data seems stale"
```bash
npm run cache:clear
```
Then refresh your browser.

### "API calls still happening"
Check that you're using `BuildDataCache.getSolutions()` etc. in your pages, not direct API calls.

### "Cache not working"
1. Make sure you're in development mode (`NODE_ENV=development`)
2. Check cache status: `npm run cache:status`
3. Restart dev server if needed

## Technical Details

- **Cache TTL**: 10 minutes (600,000 ms)
- **Storage**: In-memory Map objects
- **Scope**: Per-process (cleared on server restart)
- **Fallback**: Build cache for production, dev cache for development

## Migration Notes

This system is **fully backward compatible** with your existing code:

- ✅ `BuildDataCache.getSolutions()` - works exactly the same
- ✅ `BuildDataCache.getApplications()` - works exactly the same  
- ✅ `BuildDataCache.getBlogPosts()` - works exactly the same
- ✅ `BuildDataCache.getProducts()` - works exactly the same

No changes needed to your existing pages or components!
