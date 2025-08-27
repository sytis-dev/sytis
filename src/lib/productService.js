// lib/productService.js

// Fetch a product by its slug from the API
export async function getProductBySlug(slug) {
    try {
      const res = await fetch(`/api/products?slug=${slug}`);
      const data = await res.json();
      
      if (data && data.length > 0) {
        return data[0]; // Assuming the API returns an array and we want the first item
      }
      
      return null;
    } catch (error) {
      console.error("Error fetching product by slug:", error);
      return null;
    }
  }
  
  // Fetch all products from the API
  export async function getAllProducts() {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
  
      return data?.data || [];
    } catch (error) {
      console.error("Error fetching all products:", error);
      return [];
    }
  }

  // Fetch all solutions (categories with products) from the API
  export async function getAllSolutions() {
    try {
      console.log('Fetching solutions from /api/solutions');
      const res = await fetch("/api/solutions");
      console.log('Solutions API response status:', res.status);
      
      if (!res.ok) {
        console.error('Solutions API error:', res.status, res.statusText);
        return [];
      }
      
      const data = await res.json();
      console.log('Solutions API response data:', data);
  
      return data?.data || [];
    } catch (error) {
      console.error("Error fetching all solutions:", error);
      return [];
    }
  }

  // Simple cache for related products to improve performance
  const relatedProductsCache = new Map();

  // Get related products from the same solution (with backward compatibility)
  export async function getRelatedProducts(currentProduct) {
    try {
      console.log('getRelatedProducts called with:', currentProduct);
      
      if (!currentProduct) {
        console.log('No current product found');
        return [];
      }

      // Check cache first
      const cacheKey = `related-${currentProduct.id}`;
      if (relatedProductsCache.has(cacheKey)) {
        console.log('Returning cached related products');
        return relatedProductsCache.get(cacheKey);
      }

      let relatedProducts = [];

      // NEW API: Try using solution ID if available
      if (currentProduct.solution) {
        console.log('Using NEW API - solution ID:', currentProduct.solution);
        
        try {
          const res = await fetch(`/api/solutions?id=${currentProduct.solution}`);
          
          if (res.ok) {
            const data = await res.json();
            const solution = data.data;
            
            console.log('Solution fetched:', solution?.name);
            console.log('Solution products count:', solution?.products?.length || 0);

            if (solution && solution.products && Array.isArray(solution.products)) {
              // Filter out the current product and return the rest
              relatedProducts = solution.products.filter(product => 
                product.id !== currentProduct.id
              );

              console.log('Related products found via solution API:', relatedProducts.length);
              // Cache the result
              relatedProductsCache.set(cacheKey, relatedProducts);
              return relatedProducts;
            }
          }
        } catch (solutionError) {
          console.warn('Solution API failed, falling back to category matching:', solutionError);
        }
      }

      // FALLBACK: Use category-based matching for backward compatibility
      console.log('Using FALLBACK API - category matching');
      
      if (!currentProduct.categories || !Array.isArray(currentProduct.categories) || currentProduct.categories.length === 0) {
        console.log('No current product categories found for fallback');
        return [];
      }

      // Get current product's category IDs
      const currentCategoryIds = currentProduct.categories.map(cat => cat.id).filter(Boolean);
      console.log('Current category IDs for fallback:', currentCategoryIds);

      if (currentCategoryIds.length === 0) {
        console.log('No valid category IDs found for fallback');
        return [];
      }

      // OPTIMIZATION: Try solutions API first for category-based matching (more efficient)
      try {
        const allSolutions = await getAllSolutions();
        console.log('Trying solutions API for category fallback');
        
        const relatedProducts = [];
        
        for (const solution of allSolutions) {
          if (solution.products && Array.isArray(solution.products)) {
            // Check if any product in this solution matches our categories
            const hasMatchingProduct = solution.products.some(product => 
              product.categories && Array.isArray(product.categories) &&
              product.categories.some(cat => currentCategoryIds.includes(cat.id))
            );
            
            if (hasMatchingProduct) {
              // Add all products from this solution except the current one
              solution.products.forEach(product => {
                if (product.id !== currentProduct.id) {
                  relatedProducts.push(product);
                }
              });
            }
          }
        }
        
        // Remove duplicates
        const uniqueProducts = relatedProducts.filter((product, index, self) => 
          index === self.findIndex(p => p.id === product.id)
        );
        
        console.log('Related products found via solutions fallback:', uniqueProducts.length);
        // Cache the result
        relatedProductsCache.set(cacheKey, uniqueProducts);
        return uniqueProducts;
        
      } catch (solutionsError) {
        console.warn('Solutions fallback failed, using products API as last resort:', solutionsError);
        
        // LAST RESORT: Use products API (slower)
        const allProducts = await getAllProducts();
        console.log('All products fetched for last resort fallback:', allProducts.length);

        // Filter products that share at least one category with the current product
        const related = allProducts.filter(product => {
          if (!product || product.id === currentProduct.id) return false;
          if (!product.categories || !Array.isArray(product.categories)) return false;
          
          return product.categories.some(cat => 
            cat && cat.id && currentCategoryIds.includes(cat.id)
          );
        });

        console.log('Related products found via products fallback:', related.length);
        // Cache the result
        relatedProductsCache.set(cacheKey, related);
        return related;
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
      return [];
    }
  }
  