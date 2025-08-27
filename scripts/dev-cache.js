#!/usr/bin/env node

/**
 * Development Cache Management Utility
 * 
 * Usage:
 * node scripts/dev-cache.js status    - View cache status
 * node scripts/dev-cache.js clear     - Clear development cache
 * node scripts/dev-cache.js clear-all - Clear all caches
 * node scripts/dev-cache.js help      - Show this help
 */

const action = process.argv[2] || 'help';

const BASE_URL = 'http://localhost:3000';

async function manageCache() {
  try {
    let url;
    
    switch (action) {
      case 'status':
        url = `${BASE_URL}/api/cache-warm?action=status`;
        break;
      case 'clear':
        url = `${BASE_URL}/api/cache-warm?action=clear`;
        break;
      case 'clear-all':
        url = `${BASE_URL}/api/cache-warm?action=clear-all`;
        break;
      case 'help':
      default:
        console.log(`
🔄 Development Cache Management Utility

Usage:
  node scripts/dev-cache.js status     - View cache status
  node scripts/dev-cache.js clear      - Clear development cache (10-min TTL)
  node scripts/dev-cache.js clear-all  - Clear all caches
  node scripts/dev-cache.js help       - Show this help

Examples:
  # Check what's in your cache
  node scripts/dev-cache.js status
  
  # Force refresh all data (clears 10-min cache)
  node scripts/dev-cache.js clear
  
  # Nuclear option - clear everything
  node scripts/dev-cache.js clear-all

Note: Make sure your dev server is running on port 3000!
        `);
        return;
    }

    console.log(`🔄 ${action === 'status' ? 'Checking' : 'Clearing'} cache...`);
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok) {
      if (action === 'status') {
        console.log('\n📊 Cache Status:');
        console.log(JSON.stringify(data.cacheStatus, null, 2));
      } else {
        console.log(`✅ ${data.message}`);
      }
    } else {
      console.error(`❌ Error: ${data.error}`);
    }
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Connection refused. Make sure your dev server is running on port 3000!');
      console.error('   Run: npm run dev');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

manageCache();
