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
  
      return data || [];
    } catch (error) {
      console.error("Error fetching all products:", error);
      return [];
    }
  }
  