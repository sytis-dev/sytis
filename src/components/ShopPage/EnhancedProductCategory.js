import React, { useState, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import Link from 'next/link';
import ProductCategorySpecs from './ProductCategorySpecs';

const ProductCategory = ({ products, categoryName, categoryDescription }) => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

  // Safety check for products array
  const safeProducts = Array.isArray(products) ? products : [];
  const safeCategoryName = categoryName || 'Product Category';
  const safeCategoryDescription = categoryDescription || '';

  const handleProductSelect = (index) => {
    if (index >= 0 && index < safeProducts.length) {
      setSelectedProductIndex(index);
      setSelectedImageIndex(0);
      setThumbnailStartIndex(0);
    }
  };

  const handleImageSelect = (index) => {
    const allImages = getProductImages(safeProducts[selectedProductIndex]);
    if (index >= 0 && index < allImages.length) {
      setSelectedImageIndex(index);
    }
  };

  const handleThumbnailScroll = (direction) => {
    const allImages = getProductImages(safeProducts[selectedProductIndex]);
    if (direction === 'left' && thumbnailStartIndex > 0) {
      setThumbnailStartIndex(thumbnailStartIndex - 1);
    } else if (direction === 'right' && thumbnailStartIndex + 4 < allImages.length) {
      setThumbnailStartIndex(thumbnailStartIndex + 1);
    }
  };

  const getSpecifications = (product) => {
    if (!product) return [];
    
    const specs = [];
    
    // Safe access to SKU with fallback
    const sku = product?.sku || product?.product_sku || product?.id || 'N/A';
    specs.push({ label: "SKU", value: sku });
    
    // Safe access to weight with multiple fallback field names
    const weight = product?.weight || product?.product_weight || product?.shipping_weight || product?.weight_lbs;
    if (weight && weight !== 'N/A') {
      specs.push({ label: "Weight", value: `${weight} lbs` });
    }
    
    // Safe access to dimensions with multiple fallback field names
    const width = product?.width || product?.product_width || product?.shipping_width || product?.width_in;
    if (width && width !== 'N/A') {
      specs.push({ label: "Width", value: `${width} in` });
    }
    
    const depth = product?.depth || product?.product_depth || product?.shipping_depth || product?.depth_in;
    if (depth && depth !== 'N/A') {
      specs.push({ label: "Depth", value: `${depth} in` });
    }
    
    const height = product?.height || product?.product_height || product?.shipping_height || product?.height_in;
    if (height && height !== 'N/A') {
      specs.push({ label: "Height", value: `${height} in` });
    }
    
    return specs;
  };

  const getKeyFeatures = (product) => {
    if (!product) return [];
    
    const features = [];
    
    // Safe access to tabs with fallback
    if (product?.tabs && Array.isArray(product.tabs)) {
      product.tabs.forEach(tab => {
        if (tab?.tab_features && Array.isArray(tab.tab_features)) {
          tab.tab_features.forEach(feature => {
            if (feature?.feature && feature.feature.trim()) {
              features.push(feature.feature.trim());
            }
          });
        }
      });
    }
    
    // Fallback to features array if tabs don't exist
    if (features.length === 0 && product?.features && Array.isArray(product.features)) {
      product.features.forEach(feature => {
        if (typeof feature === 'string' && feature.trim()) {
          features.push(feature.trim());
        } else if (feature?.name && feature.name.trim()) {
          features.push(feature.name.trim());
        }
      });
    }
    
    // Fallback to key_features if neither tabs nor features exist
    if (features.length === 0 && product?.key_features && Array.isArray(product.key_features)) {
      product.key_features.forEach(feature => {
        if (typeof feature === 'string' && feature.trim()) {
          features.push(feature.trim());
        }
      });
    }
    
    return features.slice(0, 6); // Limit to 6 features for 2 columns x 3 rows
  };

  const selectedProduct = safeProducts[selectedProductIndex] || {};
  const specifications = getSpecifications(selectedProduct);
  const keyFeatures = getKeyFeatures(selectedProduct);
  
  // Handle different image data structures with comprehensive fallbacks
  const getProductImages = (product) => {
    if (!product) return [];
    
    // Check for different possible image field names
    if (product.all_images && Array.isArray(product.all_images)) {
      return product.all_images
        .filter(img => img) // Filter out null/undefined
        .map(img => {
          if (typeof img === 'string') return img;
          return img?.url || img?.url_standard || img?.src || img?.image_url || '';
        })
        .filter(url => url && url.trim() !== ''); // Filter out empty strings
    }
    
    if (product.images && Array.isArray(product.images)) {
      return product.images
        .filter(img => img)
        .map(img => {
          if (typeof img === 'string') return img;
          return img?.url || img?.url_standard || img?.src || img?.image_url || '';
        })
        .filter(url => url && url.trim() !== '');
    }
    
    if (product.image) {
      return [product.image];
    }
    
    if (product.product_image) {
      return [product.product_image];
    }
    
    if (product.main_image) {
      return [product.main_image];
    }
    
    return [];
  };
  
  const allImages = getProductImages(selectedProduct);
  const visibleThumbnails = allImages.slice(thumbnailStartIndex, thumbnailStartIndex + 4);

  // Safe fallback for product name
  const getProductName = (product) => {
    return product?.name || product?.product_name || product?.title || product?.product_title || 'Product';
  };

  // Safe fallback for product slug
  const getProductSlug = (product) => {
    return product?.slug || product?.product_slug || product?.id || 'product';
  };

  if (!safeProducts || safeProducts.length === 0) {
    return (
      <div className="product-category">
        <div className="auto-container">
          <div className="sec-title">
            <h2>No Products Found</h2>
            <div className="lower-text">No products are available in this category.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    (<div className="product-category">
      <div className="auto-container">
        <Row>
          {/* Product Selection Sidebar */}
          <Col lg={4}>
            <div className="product-selection-sidebar">
              <h4>Select Product</h4>
              <div className="product-list">
                {safeProducts.map((product, index) => (
                  <div
                    key={product?.id || index}
                    className={`product-item ${index === selectedProductIndex ? 'active' : ''}`}
                    onClick={() => handleProductSelect(index)}
                  >
                    <div className="product-item-image">
                      <Image
                        src={getProductImages(product)[0] || '/product_images/uploaded_images/picture1.jpg'}
                        alt={getProductName(product)}
                        fluid
                        onError={(e) => {
                          console.log('Product image failed to load:', e.target.src);
                          e.target.src = '/product_images/uploaded_images/picture1.jpg';
                        }}
                      />
                    </div>
                    <div className="product-item-info">
                      <div className="product-item-name">{getProductName(product)}</div>
                      <div className="product-item-sku">{product?.sku || product?.product_sku || product?.id || 'N/A'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* Main Product Display */}
          <Col lg={8}>
            <div className="main-product-display">
              {/* Product Images Section */}
              <div className="product-images-section">
                <div className="main-image-container">
                  <Image
                    src={allImages[selectedImageIndex] || '/product_images/uploaded_images/picture1.jpg'}
                    alt={getProductName(selectedProduct)}
                    className="main-image"
                    fluid
                    onError={(e) => {
                      console.log('Image failed to load:', e.target.src);
                      e.target.src = '/product_images/uploaded_images/picture1.jpg';
                    }}
                  />
                </div>
                
                {allImages.length > 1 && (
                  <div className="image-thumbnails">
                    <button
                      className="thumbnail-arrow"
                      onClick={() => handleThumbnailScroll('left')}
                      disabled={thumbnailStartIndex === 0}
                    >
                      ‹
                    </button>
                    <div className="thumbnail-scroll-container">
                      {visibleThumbnails.map((image, index) => (
                        <div
                          key={thumbnailStartIndex + index}
                          className={`thumbnail-item ${thumbnailStartIndex + index === selectedImageIndex ? 'active' : ''}`}
                          onClick={() => handleImageSelect(thumbnailStartIndex + index)}
                        >
                          <Image 
                            src={image} 
                            alt={`${getProductName(selectedProduct)} - Image ${thumbnailStartIndex + index + 1}`} 
                            fluid 
                            onError={(e) => {
                              console.log('Thumbnail image failed to load:', e.target.src);
                              e.target.src = '/product_images/uploaded_images/picture1.jpg';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className="thumbnail-arrow"
                      onClick={() => handleThumbnailScroll('right')}
                      disabled={thumbnailStartIndex + 4 >= allImages.length}
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>

              {/* Product Information Section */}
              <div className="product-info-section">
                <h3 className="product-title">{getProductName(selectedProduct)}</h3>
                {(selectedProduct.meta_description || selectedProduct.description) && (
                  <div className="product-description">
                    {selectedProduct.meta_description || selectedProduct.description}
                  </div>
                )}
              </div>

              {/* Product Specifications Section */}
              {(specifications.length > 0 || keyFeatures.length > 0) && (
                <ProductCategorySpecs 
                  specifications={specifications}
                  features={keyFeatures}
                />
              )}

              {/* Call to Action Section */}
              <div className="cta-section" style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e9ecef', clear: 'both', width: '100%' }}>
                <div className="cta-buttons-container" style={{ display: 'flex', flexDirection: 'row', gap: '10px', width: '100%' }}>
                  <Link
                    href={`/products/${getProductSlug(selectedProduct)}`}
                    passHref
                    style={{
                      flex: '1',
                      display: 'block',
                      textAlign: 'center',
                      padding: '10px',
                      backgroundColor: '#ff0000',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '5px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      border: 'none',
                      cursor: 'pointer',
                      minWidth: '0'
                    }}>
                    
                      View Details
                    
                  </Link>
                  <Link
                    href="/contact"
                    passHref
                    style={{
                      flex: '1',
                      display: 'block',
                      textAlign: 'center',
                      padding: '10px',
                      backgroundColor: 'white',
                      color: '#ff0000',
                      textDecoration: 'none',
                      borderRadius: '5px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      border: '2px solid #ff0000',
                      cursor: 'pointer',
                      minWidth: '0'
                    }}>
                    
                      Contact
                    
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>)
  );
};

export default ProductCategory;
