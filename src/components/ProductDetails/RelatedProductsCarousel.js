import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Image } from 'react-bootstrap';
import { getRelatedProducts } from '@/lib/productService';

const RelatedProductsCarousel = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const related = await getRelatedProducts(currentProduct);

        console.log('Current product solution:', currentProduct?.solution);
        console.log('Current product categories:', currentProduct?.categories);
        console.log('Related products found:', related.length);

        // Limit to 8 products for the carousel
        setRelatedProducts(related.slice(0, 8));
      } catch (error) {
        console.error('Error fetching related products:', error);
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProduct]);

  const scrollLeft = () => {
    if (carouselRef.current && !isScrolling) {
      setIsScrolling(true);
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current && !isScrolling) {
      setIsScrolling(true);
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  if (loading) {
    return (
      <section className="related-products-section">
        <div className="auto-container">
          <div className="related-products__header">
            <h3></h3>
          </div>
          <div className="related-products__loading">
            <div className="loading-spinner"></div>
            <p>Loading solution products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (relatedProducts.length === 0) {
    return (
      <section className="related-products-section">
        <div className="auto-container">
          <div className="related-products__header">
            <h3></h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="related-products-section">
      <div className="auto-container">
        <div className="related-products__header">
          <h3></h3>
        </div>
        
        <div className="related-products__carousel-container">
          {/* Left Arrow - only show if more than 3 products */}
          {relatedProducts.length > 3 && (
            <button 
              className="carousel-arrow carousel-arrow--left"
              onClick={scrollLeft}
              onKeyDown={(e) => e.key === 'Enter' && scrollLeft()}
              aria-label="Scroll left"
              tabIndex={0}
            >
              <i className="fa fa-chevron-left"></i>
            </button>
          )}

          {/* Carousel */}
          <div 
            className="related-products__carousel" 
            ref={carouselRef}
            role="region"
            aria-label="Solution products carousel"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                scrollLeft();
              } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                scrollRight();
              }
            }}
          >
            {relatedProducts.map((product) => {
              const productImage = product.all_images?.[0]?.url_standard || 
                                 product.all_images?.[0]?.url || 
                                 product.all_images?.[0]?.src ||
                                 '/product_images/uploaded_images/picture1.jpg';
              
              const productSlug = product.custom_url?.url?.replace(/\//g, '') || 
                                product.slug?.replace(/\//g, '') || 
                                product.id?.toString();
              
              return (
                <Link 
                  key={product.id} 
                  href={`/products/${productSlug}`}
                >
                  <a>
                    <div className="related-product-card">
                    <div className="related-product-card__image">
                      <Image 
                        src={productImage} 
                        alt={product.name || 'Product'}
                        fluid
                        onError={(e) => {
                          e.target.src = '/product_images/uploaded_images/picture1.jpg';
                        }}
                      />
                    </div>
                    <div className="related-product-card__content">
                      <h4 className="related-product-card__title">
                        {product.name || 'Product Name'}
                      </h4>
                      <p className="related-product-card__sku">
                        SKU: {product.sku || 'N/A'}
                      </p>
                    </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>

          {/* Right Arrow - only show if more than 3 products */}
          {relatedProducts.length > 3 && (
            <button 
              className="carousel-arrow carousel-arrow--right"
              onClick={scrollRight}
              onKeyDown={(e) => e.key === 'Enter' && scrollRight()}
              aria-label="Scroll right"
              tabIndex={0}
            >
              <i className="fa fa-chevron-right"></i>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedProductsCarousel;