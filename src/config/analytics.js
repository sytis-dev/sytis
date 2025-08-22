// Analytics Configuration
// This file contains settings for Vercel Analytics and IP blocking

// List of blocked IP addresses that should not send analytics data
export const BLOCKED_IPS = [
  // Add your blocked IPs here
  "35.132.115.165", // User's IP address - analytics disabled
  
  // Example: "192.168.1.1",
  // Example: "10.0.0.1",
  // Example: "172.16.0.1",
  
  // You can also block IP ranges by adding CIDR notation
  // Example: "192.168.0.0/16", // Blocks entire 192.168.x.x range
  
  // Common local/private IP ranges (uncomment if you want to block these)
  // "127.0.0.1",        // localhost
  // "10.0.0.0/8",       // Private network range
  // "172.16.0.0/12",    // Private network range
  // "192.168.0.0/16",   // Private network range
];

// IP checking configuration
export const IP_CHECK_CONFIG = {
  // Primary IP service
  primaryService: "https://api.ipify.org?format=json",
  
  // Fallback IP service
  fallbackService: "https://ipapi.co/json/",
  
  // Timeout for IP fetch requests (in milliseconds)
  timeout: 5000,
  
  // Whether to log IP detection (useful for debugging)
  enableLogging: process.env.NODE_ENV === 'development',
};

// Analytics filtering configuration
export const ANALYTICS_FILTERS = {
  // URLs that should not send analytics
  blockedPaths: [
    '/private',
    '/admin',
    '/internal',
    '/test',
  ],
  
  // User agents that should not send analytics
  blockedUserAgents: [
    'bot',
    'crawler',
    'spider',
    'scraper',
  ],
  
  // Whether to enable debug mode
  debug: process.env.NODE_ENV === 'development',
};

// Helper function to check if an IP is blocked
export const isIPBlocked = (ip) => {
  if (!ip) return false;
  
  // Check exact IP match
  if (BLOCKED_IPS.includes(ip)) {
    return true;
  }
  
  // Check CIDR range matches
  for (const blockedRange of BLOCKED_IPS) {
    if (blockedRange.includes('/')) {
      if (isIPInRange(ip, blockedRange)) {
        return true;
      }
    }
  }
  
  return false;
};

// Helper function to check if IP is in CIDR range
export const isIPInRange = (ip, cidr) => {
  try {
    const [range, bits = "32"] = cidr.split("/");
    const mask = ~((2 ** (32 - bits)) - 1);
    const ipLong = ipToLong(ip);
    const rangeLong = ipToLong(range);
    return (ipLong & mask) === (rangeLong & mask);
  } catch (error) {
    console.error('Error checking IP range:', error);
    return false;
  }
};

// Helper function to convert IP to long integer
export const ipToLong = (ip) => {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
};

// Helper function to check if user agent should be blocked
export const isUserAgentBlocked = (userAgent) => {
  if (!userAgent) return false;
  
  const lowerUA = userAgent.toLowerCase();
  return ANALYTICS_FILTERS.blockedUserAgents.some(blocked => 
    lowerUA.includes(blocked)
  );
};

// Helper function to check if URL should be blocked
export const isURLBlocked = (url) => {
  if (!url) return false;
  
  return ANALYTICS_FILTERS.blockedPaths.some(path => 
    url.includes(path)
  );
};
