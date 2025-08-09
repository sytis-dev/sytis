/**
 * BigCommerce Rate Limiter Utility
 * Handles rate limiting with BigCommerce API headers and intelligent delays
 */

class BigCommerceRateLimiter {
  constructor() {
    this.lastRequestTime = 0;
    this.currentQuota = null;
    this.requestsLeft = null;
    this.timeResetMs = null;
    this.minDelayBetweenRequests = 1000; // 1 second minimum between requests
  }

  /**
   * Smart fetch that respects BigCommerce rate limits
   */
  async fetchWithRateLimit(url, options = {}, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        // Add delay before request if needed
        await this.waitIfNeeded();

        const response = await fetch(url, options);
        
        // Update rate limit info from response headers
        this.updateRateLimitInfo(response);
        
        // Handle rate limiting (429)
        if (response.status === 429) {
          console.log(`Rate limited (attempt ${attempt}/${retries}). Waiting ${this.timeResetMs || 30000}ms...`);
          
          if (attempt < retries) {
            await new Promise(resolve => setTimeout(resolve, this.timeResetMs || 30000));
            continue;
          } else {
            throw new Error(`Rate limited after ${retries} attempts`);
          }
        }

        // Handle other HTTP errors
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // Log successful request with rate limit status
        console.log(`✅ BigCommerce API success: ${this.requestsLeft}/${this.currentQuota} requests left`);
        
        return response;

      } catch (error) {
        console.error(`Attempt ${attempt}/${retries} failed:`, error.message);
        
        if (attempt === retries) {
          throw error;
        }
        
        // Exponential backoff for non-rate-limit errors
        const backoffDelay = Math.min(1000 * Math.pow(2, attempt - 1), 30000);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
      }
    }
  }

  /**
   * Update rate limit tracking from BigCommerce response headers
   */
  updateRateLimitInfo(response) {
    this.lastRequestTime = Date.now();
    
    const timeWindowMs = parseInt(response.headers.get('X-Rate-Limit-Time-Window-Ms')) || 30000;
    this.timeResetMs = parseInt(response.headers.get('X-Rate-Limit-Time-Reset-Ms')) || 30000;
    this.currentQuota = parseInt(response.headers.get('X-Rate-Limit-Requests-Quota')) || 150;
    this.requestsLeft = parseInt(response.headers.get('X-Rate-Limit-Requests-Left')) || 0;

    console.log(`📊 Rate Limit Status: ${this.requestsLeft}/${this.currentQuota} requests left, reset in ${this.timeResetMs}ms`);
    
    // Adjust delay strategy based on remaining requests
    if (this.requestsLeft < 10) {
      this.minDelayBetweenRequests = Math.min(this.timeResetMs / this.requestsLeft, 10000);
      console.log(`⚠️  Low on requests! Increased delay to ${this.minDelayBetweenRequests}ms`);
    } else if (this.requestsLeft > 50) {
      this.minDelayBetweenRequests = 500; // Faster when we have plenty of quota
    } else {
      this.minDelayBetweenRequests = 1000; // Standard delay
    }
  }

  /**
   * Wait if needed based on rate limiting strategy
   */
  async waitIfNeeded() {
    const timeSinceLastRequest = Date.now() - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minDelayBetweenRequests) {
      const waitTime = this.minDelayBetweenRequests - timeSinceLastRequest;
      console.log(`⏳ Waiting ${waitTime}ms before next BigCommerce API call...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  /**
   * Get current rate limit status
   */
  getRateLimitStatus() {
    return {
      requestsLeft: this.requestsLeft,
      currentQuota: this.currentQuota,
      timeResetMs: this.timeResetMs,
      minDelayBetweenRequests: this.minDelayBetweenRequests,
      lastRequestTime: this.lastRequestTime
    };
  }
}

// Create a singleton instance to share across all API routes
const rateLimiter = new BigCommerceRateLimiter();

export default rateLimiter;
