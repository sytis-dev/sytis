import { socials } from "@/data/header";
import { productDetails } from "@/data/productDetails";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { Col, Image, Row } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";
import weDOSection from "@/data/weDOSection";

// Destructure with defaults
const { image, title, price, stars, customerReviews, text, text2 } =
  productDetails;

const { currentFaq, faqs } = weDOSection;

const ProductDetailsPage = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showZoomModal, setShowZoomModal] = useState(false);
  
  // Safety check for product
  const safeProduct = product || {};
  
  // Process tabs from API in the correct order
  const tabs = [
    { key: 'tab_description', label: 'Description' },
    { key: 'tab_features', label: 'Features' },
    { key: 'tab_applications', label: 'Applications' },
    { key: 'tab_resources', label: 'Resources' }
  ];

  const getTabContent = (tabKey) => {
    if (!safeProduct?.tabs || !Array.isArray(safeProduct.tabs)) return null;
    const tab = safeProduct.tabs.find(t => t && t.key === tabKey);
    return tab?.value;
  };

  // Find the first available tab to set as default
  const getFirstAvailableTab = () => {
    if (!safeProduct?.tabs || !Array.isArray(safeProduct.tabs) || safeProduct.tabs.length === 0) return 'tab_description';
    for (const tab of tabs) {
      if (getTabContent(tab.key)) {
        return tab.key;
      }
    }
    return 'tab_description'; // fallback
  };

  // Set initial active tab to first available tab
  const [activeTab, setActiveTab] = useState(getFirstAvailableTab());
  // const [magnifier, setMagnifier] = useState({ show: false, x: 0, y: 0 }); // Commented out magnifier
  const imageRef = useRef(null);
  const thumbnailRefs = useRef([]);

  // Get all images from the product, sorted by sort_order with safety checks
  const allImages = Array.isArray(safeProduct?.all_images) ? safeProduct.all_images : [];
  const selectedImage = allImages[selectedImageIndex] || allImages[0];
  
  // Fallback to default values if the product prop doesn't contain values
  const productImage = selectedImage?.url_standard || selectedImage?.url || selectedImage?.src || image.src;
  const productImageZoom = selectedImage?.url_zoom || productImage;
  const productTitle = safeProduct?.name || safeProduct?.product_name || safeProduct?.title || title;
  const productPrice = safeProduct?.price || price;
  const productStars = safeProduct?.stars || stars;
  const productCustomerReviews = safeProduct?.customerReviews || customerReviews;
  const productText = safeProduct?.text || text;
  const productText2 = safeProduct?.text2 || text2;

  // Safe access to product specifications with multiple fallback field names
  const getProductSpecs = () => {
    const specs = [];
    
    // SKU with fallbacks
    const sku = safeProduct?.sku || safeProduct?.product_sku || safeProduct?.id;
    if (sku) specs.push({ label: 'SKU', value: sku });
    
    // Weight with fallbacks
    const weight = safeProduct?.weight || safeProduct?.product_weight || safeProduct?.shipping_weight || safeProduct?.weight_lbs;
    if (weight && weight !== 'N/A') specs.push({ label: 'Weight', value: `${weight} lbs` });
    
    // Width with fallbacks
    const width = safeProduct?.width || safeProduct?.product_width || safeProduct?.shipping_width || safeProduct?.width_in;
    if (width && width !== 'N/A') specs.push({ label: 'Width', value: `${width} in` });
    
    // Depth with fallbacks
    const depth = safeProduct?.depth || safeProduct?.product_depth || safeProduct?.shipping_depth || safeProduct?.depth_in;
    if (depth && depth !== 'N/A') specs.push({ label: 'Depth', value: `${depth} in` });
    
    // Height with fallbacks
    const height = safeProduct?.height || safeProduct?.product_height || safeProduct?.shipping_height || safeProduct?.height_in;
    if (height && height !== 'N/A') specs.push({ label: 'Height', value: `${height} in` });
    
    return specs;
  };

  const productSpecs = getProductSpecs();

  const handleImageClick = (index) => {
    if (index >= 0 && index < allImages.length) {
      setSelectedImageIndex(index);
    }
  };

  const handleZoomClick = () => {
    setShowZoomModal(true);
  };

  const handleCloseZoom = () => {
    setShowZoomModal(false);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowZoomModal(false);
    }
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage positions
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    // Ensure the magnifier stays within bounds
    const clampedX = Math.max(0, Math.min(100, xPercent));
    const clampedY = Math.max(0, Math.min(100, yPercent));
    
    // setMagnifier({ // Commented out magnifier
    //   show: true,
    //   x: clampedX,
    //   y: clampedY
    // });
  };

  const handleMouseLeave = () => {
    // setMagnifier({ show: false, x: 0, y: 0 }); // Commented out magnifier
  };

  const handlePreviousImage = () => {
    if (allImages.length > 1) {
      setSelectedImageIndex((prevIndex) => {
        const newIndex = prevIndex === 0 ? allImages.length - 1 : prevIndex - 1;
        // Scroll to the previous thumbnail after state update
        setTimeout(() => {
          if (thumbnailRefs.current[newIndex]) {
            thumbnailRefs.current[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 0);
        return newIndex;
      });
    }
  };

  const handleNextImage = () => {
    if (allImages.length > 1) {
      setSelectedImageIndex((prevIndex) => {
        const newIndex = prevIndex === allImages.length - 1 ? 0 : prevIndex + 1;
        // Scroll to the next thumbnail after state update
        setTimeout(() => {
          if (thumbnailRefs.current[newIndex]) {
            thumbnailRefs.current[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 0);
        return newIndex;
      });
    }
  };

  return (
    <>
      <section className="product-details">
        <div className="auto-container">
          <Row>
            {/* Image Gallery Section */}
            <Col lg={12} xl={6}>
              <div className="product-gallery">
                {/* Thumbnails on the left */}
                {allImages.length > 1 && (
                  <div className="product-thumbnails">
                    {allImages.map((img, index) => (
                      <div
                        key={img?.id || index}
                        className={`thumbnail-item ${index === selectedImageIndex ? 'active' : ''}`}
                        onClick={() => handleImageClick(index)}
                        ref={el => thumbnailRefs.current[index] = el}
                      >
                        <Image 
                          src={img?.url_thumbnail || img?.url_standard || img?.url || img?.src || img} 
                          alt={img?.description || `Product image ${index + 1}`}
                          fluid
                          onError={(e) => {
                            console.log('Thumbnail image failed to load:', e.target.src);
                            e.target.src = '/product_images/uploaded_images/picture1.jpg';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Main image on the right */}
                <div className="product-main-image">
                  <div className="main-image-container">
                    <div 
                      className="image-with-magnifier"
                      // onMouseMove={handleMouseMove} // Commented out magnifier
                      // onMouseLeave={handleMouseLeave} // Commented out magnifier
                      ref={imageRef}
                    >
                      <Image 
                        src={productImage} 
                        alt={selectedImage?.description || productTitle}
                        fluid
                        onError={(e) => {
                          console.log('Product image failed to load:', e.target.src);
                          e.target.src = '/product_images/uploaded_images/picture1.jpg';
                        }}
                      />
                       {/* {magnifier.show && ( // Commented out magnifier */}
                       {/*   <div  // Commented out magnifier */}
                       {/*     className="magnifier" // Commented out magnifier */}
                       {/*     style={{ // Commented out magnifier */}
                       {/*       left: `${magnifier.x}%`, // Commented out magnifier */}
                       {/*       top: `${magnifier.y}%`, // Commented out magnifier */}
                       {/*       transform: 'translate(-50%, -50%)', // Commented out magnifier */}
                       {/*       position: 'absolute' // Commented out magnifier */}
                       {/*     }} // Commented out magnifier */}
                       {/*   > // Commented out magnifier */}
                       {/*     <Image  // Commented out magnifier */}
                       {/*       src={productImageZoom}  // Commented out magnifier */}
                       {/*       alt={selectedImage?.description || productTitle} // Commented out magnifier */}
                       {/*       style={{ // Commented out magnifier */}
                       {/*         width: '400px', // Commented out magnifier */}
                       {/*         height: '400px', // Commented out magnifier */}
                       {/*         objectFit: 'cover', // Commented out magnifier */}
                       {/*         objectPosition: `${magnifier.x}% ${magnifier.y}%`, // Commented out magnifier */}
                       {/*         transform: 'scale(2)', // Commented out magnifier */}
                       {/*         transformOrigin: 'center', // Commented out magnifier */}
                       {/*         position: 'absolute', // Commented out magnifier */}
                       {/*         left: `-${magnifier.x * 2}%`, // Commented out magnifier */}
                       {/*         top: `-${magnifier.y * 2}%` // Commented out magnifier */}
                       {/*       }} // Commented out magnifier */}
                       {/*     /> // Commented out magnifier */}
                       {/*   </div> // Commented out magnifier */}
                       {/* )} // Commented out magnifier */}
                    </div>
                    
                    {/* Navigation Arrows */}
                    {allImages.length > 1 && (
                      <>
                        <button 
                          className="image-nav-button image-nav-prev"
                          onClick={handlePreviousImage}
                          title="Previous image"
                        >
                          <i className="fa fa-chevron-left"></i>
                        </button>
                        <button 
                          className="image-nav-button image-nav-next"
                          onClick={handleNextImage}
                          title="Next image"
                        >
                          <i className="fa fa-chevron-right"></i>
                        </button>
                      </>
                    )}
                    
                    {productImageZoom && (
                      <button 
                        className="zoom-button"
                        onClick={handleZoomClick}
                        title="Click to view full size"
                      >
                        <i className="fa fa-search-plus"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Col>

            {/* Product Information Section */}
            <Col lg={12} xl={6}>
              <div className="product-details__top">
                <h3 className="product-details__title">{productTitle}</h3>
                {/* <p className="product-details__price">${productPrice}</p> */}
              </div>
              {/* <div className="product-details__reveiw">
                {Array.from(Array(productStars)).map((_, i) => (
                  <i key={i} className="fa fa-star"></i>
                ))}
                <span>{productCustomerReviews} Customer Reviews</span>
              </div> */}
              {/* <div className="product-details__content">
                <p>{productText}</p>
                <p>
                  <TextSplit text={productText2} />
                </p>
              </div> */}
              {/* <div className="inner">
                  <div className="faq-box">
                    <ul className="accordion-box clearfix">
                      {faqs.map(({ id, title, text }) => (
                        <li
                          key={id}
                          className={`accordion block${
                            currentFaq === id ? " active-block" : ""
                          }`}
                        >
                          <div
                            onClick={() => setCurrentFaq(id)}
                            className={`acc-btn${
                              currentFaq === id ? " active" : ""
                            }`}
                          >
                            <span className="count">{id}.</span> {title}
                          </div>
                          <div
                            className={`acc-content animated${
                              currentFaq === id ? " current slideInUp" : ""
                            }`}
                          >
                            <div className="content">
                              <div className="text">{text}</div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div> */}

              {/* <div className="product-details__quantity">
                <h3 className="product-details__quantity-title">
                  Choose quantity
                </h3>
                <div className="quantity-box">
                  <button
                    onClick={() =>
                      setQuantity((preQuantity) =>
                        preQuantity > 1 ? preQuantity - 1 : preQuantity
                      )
                    }
                    type="button"
                    className="sub"
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                  <input
                    onChange={(e) => setQuantity(+e.target.value)}
                    type="number"
                    id="1"
                    value={quantity}
                  />
                  <button
                    onClick={() => setQuantity((preQuantity) => preQuantity + 1)}
                    type="button"
                    className="add"
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div> */}
              {/* <div className="product-details__buttons">
                <Link href="/cart">
                  <a className="theme-btn btn-style-two">
                    <i className="btn-curve"></i>
                    <span className="btn-title">Add to wishlist</span>
                  </a>
                </Link>
                <Link href="/cart">
                  <a className="theme-btn btn-style-one">
                    <i className="btn-curve"></i>
                    <span className="btn-title">Add to cart</span>
                  </a>
                </Link>
              </div> */}
              <div className="product-details__social">
                <span>Share</span>
                {socials.map(({ id, icon, href }) => (
                  <a key={id} href={href} className={icon}></a>
                ))}
              </div>
              
              {/* Product Meta Description */}
              {(safeProduct?.meta_description || safeProduct?.description) && (
                <div className="product-details__meta-description">
                  <p>{safeProduct.meta_description || safeProduct.description}</p>
                </div>
              )}
              
              {/* Product Specifications */}
              {productSpecs.length > 0 && (
                <div className="product-specifications">
                  <h4 className="product-specifications__title">Product Specifications</h4>
                  <div className="product-specifications__grid">
                    {productSpecs.map((spec, index) => (
                      <div key={`spec-${index}`} className="spec-item">
                        <span className="spec-label">{spec.label}:</span>
                        <span className="spec-value">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="contact-pricing-btn-wrapper">
                <Link
                  className="theme-btn btn-style-one demo-purchase-btn"
                  href="/contact"
                >
                  <a
                    className="theme-btn btn-style-one demo-purchase-btn contact-pricing-btn"
                    style={{ color: "white !important" }}
                  >
                    <i className="btn-curve"></i>
                    <span className="btn-title">Contact Us for pricing</span>
                  </a>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Product Tabs Section */}
      <section className="product-tabs-section">
        <div className="auto-container">
          <div className="work-tabs tabs-box">
            {/* Tab Navigation */}
            <ul className="tab-btns tab-buttons clearfix">
              {tabs.map((tab) => {
                const content = getTabContent(tab.key);
                return (
                  <li
                    key={tab.key}
                    onClick={() => content && setActiveTab(tab.key)}
                    className={`tab-btn${activeTab === tab.key ? " active-btn" : ""}`}
                    style={{ cursor: content ? 'pointer' : 'not-allowed', opacity: content ? 1 : 0.5 }}
                  >
                    <span>{tab.label}</span>
                  </li>
                );
              })}
            </ul>

            {/* Tab Content */}
            <div className="tabs-content">
              {tabs.map((tab) => {
                const content = getTabContent(tab.key);
                return (
                  <div
                    key={tab.key}
                    className={`tab animated${activeTab === tab.key ? " active-tab fadeInUp" : ""}`}
                  >
                    {content ? (
                      <div className="text-col">
                        <div className="inner">
                          {content.title && (
                            <h3 className="product-tabs__panel-title">{content.title}</h3>
                          )}
                          {content.items && content.items.length > 0 ? (
                            <ul className="product-tabs__panel-list">
                              {content.items.map((item, index) => (
                                <li key={index} className="product-tabs__panel-item">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="product-tabs__panel-text">
                              {typeof content === 'string' ? content : 'Content available'}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-col">
                        <div className="inner">
                          <div className="product-tabs__coming-soon">
                            <i className="fa fa-clock-o"></i>
                            <h3>Coming Soon</h3>
                            <p>This content will be available soon. Please check back later.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Zoom Modal */}
      {showZoomModal && (
        <div className="zoom-modal-overlay" onClick={handleModalClick}>
          <div className="zoom-modal-content">
            <button className="zoom-modal-close" onClick={handleCloseZoom}>
              <i className="fa fa-times"></i>
            </button>
            <div className="zoom-modal-image-container">
              <Image 
                src={productImageZoom} 
                alt={selectedImage?.description || productTitle}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
                onError={(e) => {
                  console.log('Zoom image failed to load:', e.target.src);
                  e.target.src = '/product_images/uploaded_images/picture1.jpg';
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailsPage;
