import { socials } from "@/data/header";
import { productDetails } from "@/data/productDetails";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Col, Image, Row } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";
import weDOSection from "@/data/weDOSection";
import RelatedProductsCarousel from "./RelatedProductsCarousel";

// Destructure with defaults
const { image, title, price, stars, customerReviews, text, text2 } =
  productDetails;

const { currentFaq, faqs } = weDOSection;

const ProductDetailsPage = ({ product, applications, solutions }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfFileName, setPdfFileName] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [iframeTimeout, setIframeTimeout] = useState(false);
  const [timeoutIds, setTimeoutIds] = useState([]);
  
  // Debug log for initial state - only log once
  useEffect(() => {
    console.log('ProductDetailsPage initial state:', { isMobile, showPdfModal, pdfUrl });
  }, []);
  
  // Safety check for product
  const safeProduct = product || {};
  
  // Process tabs from API in the correct order
  const tabs = [
    { key: 'tab_description', label: 'Description' },
    { key: 'tab_features', label: 'Features' },
    { key: 'tab_applications', label: 'Applications' },
    { key: 'tab_specifications', label: 'Specifications' },
    { key: 'tab_resources', label: 'Resources' }
  ];

  // Function to handle PDF link clicks
  const handlePdfClick = (e, url) => {
    console.log('handlePdfClick called with:', url);
    console.log('Event object:', e);
    console.log('Is mobile device:', isMobile, 'Type:', typeof isMobile);
    
    // On mobile, just open PDF in new tab instead of modal
    if (isMobile === true) {
      console.log('Mobile device detected, opening PDF in new tab');
      window.open(url, '_blank');
      return;
    }
    
    console.log('Desktop device detected, opening PDF in modal');
    e.preventDefault();
    e.stopPropagation();
    
    // Validate PDF URL
    if (!url || typeof url !== 'string') {
      console.error('Invalid PDF URL:', url);
      return;
    }
    
    // Clear any existing timeouts before setting new ones
    timeoutIds.forEach(id => clearTimeout(id));
    setTimeoutIds([]);
    
    console.log('Setting PDF modal with URL:', url);
    setPdfUrl(url);
    // Extract filename from URL for display
    const fileName = url.split('/').pop() || 'Document';
    setPdfFileName(fileName);
    setShowPdfModal(true);
    console.log('PDF modal state set to show');
    console.log('PDF modal should now be visible');
    console.log('PDF URL set to:', url);
    console.log('PDF filename set to:', fileName);
    console.log('Current state after setting:', { showPdfModal: true, pdfUrl: url, pdfFileName: fileName });
    
    // Set a timeout to show fallback if PDF takes too long to load
    const timeoutId1 = setTimeout(() => {
      if (!iframeLoaded && !iframeError) {
        setIframeTimeout(true);
        console.log('PDF loading timeout reached, showing fallback');
      }
    }, 10000); // 10 second timeout
    
    // Additional fallback: if PDF fails to load after 15 seconds, automatically open in new tab
    const timeoutId2 = setTimeout(() => {
      if (!iframeLoaded && !iframeError) {
        console.log('PDF failed to load after 15 seconds, automatically opening in new tab');
        window.open(url, '_blank');
        handleClosePdfModal();
      }
    }, 15000); // 15 second fallback
    
    // Store the timeout IDs for cleanup
    setTimeoutIds([timeoutId1, timeoutId2]);
  };

  // Function to close PDF modal
  const handleClosePdfModal = () => {
    setShowPdfModal(false);
    setPdfUrl('');
    setPdfFileName('');
    setIframeLoaded(false);
    setIframeError(false);
    setIframeTimeout(false);
    // Clear all timeout IDs associated with this modal
    timeoutIds.forEach(id => clearTimeout(id));
    setTimeoutIds([]);
  };

  // Function to download PDF
  const handleDownloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = pdfFileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Function to process Resources tab content and add CSS classes to links
  const processResourcesContent = (htmlContent) => {
    // Check if htmlContent is a string and has content
    if (typeof htmlContent !== 'string' || !htmlContent.trim()) {
      console.log('processResourcesContent: htmlContent is not a string or is empty:', htmlContent);
      return '';
    }
    
    console.log('processResourcesContent called with:', htmlContent.substring(0, 200) + '...');

    // Create a temporary div to parse and modify the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    // Process links in Resources tab
    const links = tempDiv.querySelectorAll('a');
    console.log('processResourcesContent: Found', links.length, 'links in HTML content');
    
    links.forEach((link, index) => {
      const href = link.getAttribute('href');
      if (href) {
        // Check if this is a PDF link
        console.log(`Processing Resources link ${index} with href:`, href);
        if (href.toLowerCase().endsWith('.pdf') || href.toLowerCase().includes('pdf')) {
          console.log('Found PDF link in Resources:', href);
          // Always add PDF classes and attributes - mobile detection will be handled in click handlers
          link.classList.add('pdf-link', 'resource-link', 'datasheet-link');
          link.setAttribute('data-pdf-url', href);
          link.setAttribute('target', '_blank');
          console.log('Added PDF classes and attributes to Resources link:', link);
          console.log('Link classes after modification:', link.className);
        } else {
          // For non-PDF links, add general resource link classes
          link.classList.add('resource-link');
          console.log('Added resource-link class to Resources link:', link);
          console.log('Link classes after modification:', link.className);
        }
        
        // Ensure the link is clickable by checking its properties
        console.log(`Link ${index} final state:`, {
          href: link.getAttribute('href'),
          className: link.className,
          hasClickHandler: !!link._resourceClickHandler,
          isClickable: link.style.pointerEvents !== 'none'
        });
      }
    });

    const processedHtml = tempDiv.innerHTML;
    console.log('processResourcesContent: Returning processed HTML:', processedHtml.substring(0, 200) + '...');
    return processedHtml;
  };

  // Function to refine HTML content
  const refineHtmlContent = (htmlContent) => {
    if (!htmlContent) return '';
    
    console.log('refineHtmlContent called with:', htmlContent.substring(0, 200) + '...');

    // Create a temporary div to parse and modify the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    // Remove duplicate content that's already in other tabs
    const duplicateKeywords = ['applications', 'features', 'specifications', 'specs', 'technical specifications'];
    
    // Find and remove elements containing duplicate content
    duplicateKeywords.forEach(keyword => {
      const elements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li');
      elements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(keyword)) {
          // Check if this content exists in other tabs
          let isDuplicate = false;
          
          if (keyword === 'applications' && applications && applications.length > 0) {
            isDuplicate = true;
          } else if (keyword === 'features' && solutions && solutions.length > 0) {
            isDuplicate = true;
          } else if (keyword === 'specifications' || keyword === 'specs' || keyword === 'technical specifications') {
            // Check if specifications tab has content
            const specsTab = document.querySelector('[data-tab="tab_specifications"]');
            if (specsTab && specsTab.textContent.trim()) {
              isDuplicate = true;
            }
          }
          
          if (isDuplicate) {
            element.remove();
          }
        }
      });
    });

    // Clean up empty containers
    const cleanupEmptyContainers = (element) => {
      const children = Array.from(element.children);
      children.forEach(child => {
        if (child.children.length === 0 && child.textContent.trim() === '') {
          child.remove();
        } else if (child.children.length > 0) {
          cleanupEmptyContainers(child);
        }
      });
    };
    cleanupEmptyContainers(tempDiv);

    // Apply styling to elements and process links
    const links = tempDiv.querySelectorAll('a');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href) {
        // Check if this is a PDF link
        console.log('Processing link with href:', href);
        if (href.toLowerCase().endsWith('.pdf') || href.toLowerCase().includes('pdf')) {
          console.log('Found PDF link:', href);
          // Always add PDF classes and attributes - mobile detection will be handled in click handlers
          link.classList.add('pdf-link', 'resource-link', 'datasheet-link');
          link.setAttribute('data-pdf-url', href);
          link.setAttribute('target', '_blank');
          console.log('Added PDF classes and attributes to element:', link);
        } else {
          // For non-PDF links, add general resource link classes
          link.classList.add('resource-link');
          console.log('Added resource-link class to element:', link);
        }
      }
    });

    // Apply styling to elements
    const elements = tempDiv.querySelectorAll('*');
    elements.forEach(element => {
      const tagName = element.tagName.toLowerCase();
      
      // Headings
      if (tagName.match(/^h[1-6]$/)) {
        element.style.fontFamily = 'var(--thm-font)';
        element.style.fontWeight = '700';
        element.style.color = 'var(--thm-black)';
        element.style.marginBottom = '15px';
        element.style.marginTop = '25px';
        
        if (tagName === 'h1') element.style.fontSize = '32px';
        else if (tagName === 'h2') element.style.fontSize = '28px';
        else if (tagName === 'h3') element.style.fontSize = '24px';
        else if (tagName === 'h4') element.style.fontSize = '20px';
        else if (tagName === 'h5') element.style.fontSize = '18px';
        else if (tagName === 'h6') element.style.fontSize = '16px';
      }
      
      // Paragraphs
      if (tagName === 'p') {
        element.style.fontFamily = 'var(--thm-font)';
        element.style.fontSize = '16px';
        element.style.lineHeight = '1.6';
        element.style.color = 'var(--thm-text)';
        element.style.marginBottom = '15px';
      }
      
      // Lists
      if (tagName === 'ul' || tagName === 'ol') {
        element.style.marginLeft = '20px';
        element.style.marginBottom = '15px';
      }
      
      if (tagName === 'li') {
        element.style.fontFamily = 'var(--thm-font)';
        element.style.fontSize = '16px';
        element.style.lineHeight = '1.6';
        element.style.color = 'var(--thm-text)';
        element.style.marginBottom = '8px';
      }
      
      // Links
      if (tagName === 'a') {
        element.style.color = 'var(--thm-base)';
        element.style.textDecoration = 'none';
        element.style.transition = 'all 0.3s ease';
        element.style.fontWeight = '500';
        
        // Check if this is a PDF link
        const href = element.getAttribute('href');
        console.log('Processing link with href:', href);
        if (href && (href.toLowerCase().endsWith('.pdf') || href.toLowerCase().includes('pdf'))) {
          console.log('Found PDF link:', href);
          // Add PDF-specific styling
          element.style.cursor = 'pointer';
          element.setAttribute('data-pdf-url', href);
          element.classList.add('pdf-link');
          console.log('Added pdf-link class and data-pdf-url attribute to element:', element);
          
          // Add PDF icon to the link text
          if (!element.innerHTML.includes('📄')) {
            element.innerHTML = `📄 ${element.innerHTML}`;
          }
        }
        
        // Add hover effect
        element.addEventListener('mouseenter', () => {
          element.style.textDecoration = 'underline';
          element.style.color = 'var(--thm-black)';
        });
        
        element.addEventListener('mouseleave', () => {
          element.style.textDecoration = 'none';
          element.style.color = 'var(--thm-base)';
        });
      }
      
      // Images
      if (tagName === 'img') {
        element.style.maxWidth = '100%';
        element.style.height = 'auto';
        element.style.borderRadius = '8px';
        element.style.margin = '15px 0';
        element.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        
        element.addEventListener('mouseenter', () => {
          element.style.transform = 'scale(1.02)';
          element.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
        });
        
        element.addEventListener('mouseleave', () => {
          element.style.transform = 'scale(1)';
          element.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
      }
    });

    return tempDiv.innerHTML;
  };



  const getTabContent = (tabKey) => {
    // Special handling for description tab - use product.description directly
    if (tabKey === 'tab_description' && safeProduct?.description) {
      return refineHtmlContent(safeProduct.description);
    }
    
    // Special handling for resources tab - process links and add CSS classes
    if (tabKey === 'tab_resources') {
      if (!safeProduct?.tabs || !Array.isArray(safeProduct.tabs)) return null;
      const tab = safeProduct.tabs.find(t => t && t.key === tabKey);
      if (tab?.value) {
        // Extract HTML content from the tab value object
        if (tab.value.items && Array.isArray(tab.value.items)) {
          // Join all items into a single HTML string
          const htmlContent = tab.value.items.join('');
          console.log('Resources tab: Extracted HTML content:', htmlContent.substring(0, 200) + '...');
          return processResourcesContent(htmlContent);
        } else if (typeof tab.value === 'string') {
          // Fallback if value is already a string
          return processResourcesContent(tab.value);
        }
        console.log('Resources tab: No valid content found in tab.value:', tab.value);
        return null;
      }
      return null;
    }
    
    // For other tabs, look in the tabs array
    if (!safeProduct?.tabs || !Array.isArray(safeProduct.tabs)) return null;
    const tab = safeProduct.tabs.find(t => t && t.key === tabKey);
    return tab?.value;
  };

  // Find the first available tab to set as default
  const getFirstAvailableTab = () => {
    // If product has a description, prioritize the description tab
    if (safeProduct?.description) {
      return 'tab_description';
    }
    
    // Otherwise, look for the first available tab
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
  
  // Debug logging for tabs
  useEffect(() => {
    console.log('ProductDetailsPage: Initial state:', {
      activeTab,
      availableTabs: safeProduct?.tabs,
      hasDescription: !!safeProduct?.description,
      tabsArray: tabs
    });
  }, [activeTab, safeProduct?.tabs, safeProduct?.description]);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      const shouldBeMobile = isMobileDevice || isSmallScreen;
      setIsMobile(shouldBeMobile);
      console.log('Mobile detection:', { isMobileDevice, isSmallScreen, shouldBeMobile });
    };
    
    // Set initial state immediately
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Cleanup timeouts when component unmounts
  useEffect(() => {
    return () => {
      // Clear all timeouts when component unmounts
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [timeoutIds]);
  
  // const [magnifier, setMagnifier] = useState({ show: false, x: 0, y: 0 }); // Commented out magnifier
  const imageRef = useRef(null);
  const thumbnailRefs = useRef([]);
  const descriptionRef = useRef(null);

  // Use useEffect to attach event listeners to PDF links after HTML is rendered (desktop only)
  useEffect(() => {
    // Skip on mobile devices
    if (isMobile === true) {
      console.log('Mobile device detected, skipping PDF modal event listeners');
      return;
    }
    
    // Add a small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      // Look for PDF links in the entire document since the ref might not be available yet
      const pdfLinks = document.querySelectorAll('.pdf-link');
      console.log('Found PDF links:', pdfLinks.length);

      pdfLinks.forEach((link, index) => {
        const url = link.getAttribute('data-pdf-url');
        console.log(`PDF link ${index}:`, url);

        if (url) {
          // Remove any existing click listeners to prevent duplicates
          if (link._pdfClickHandler) {
            link.removeEventListener('click', link._pdfClickHandler);
          }

          // Create new click handler and store it for removal
          const clickHandler = (e) => {
            console.log('PDF link clicked, preventing default...');
            e.preventDefault();
            e.stopPropagation();
            handlePdfClick(e, url);
          };
          link._pdfClickHandler = clickHandler;

          // Add click listener
          link.addEventListener('click', clickHandler);
          console.log(`Event listener attached to PDF link ${index}`);
        }
      });
    }, 200); // Increased delay to ensure DOM is fully rendered

    return () => clearTimeout(timer); // Cleanup timer
  }, [product?.description, applications, solutions, activeTab, isMobile]); // Re-run when description, tab data, active tab, or mobile status changes

  // Additional useEffect specifically for when description tab becomes active (desktop only)
  useEffect(() => {
    if (activeTab === 'tab_description' && isMobile === false) {
      console.log('Description tab is now active on desktop, looking for PDF links...');
      const timer = setTimeout(() => {
        const pdfLinks = document.querySelectorAll('.pdf-link');
        console.log('Found PDF links in active description tab:', pdfLinks.length);
        
        pdfLinks.forEach((link, index) => {
          const url = link.getAttribute('data-pdf-url');
          console.log(`PDF link ${index} in description tab:`, url);
          
          if (url && !link._pdfClickHandler) {
            const clickHandler = (e) => {
              console.log('PDF link clicked in description tab, preventing default...');
              e.preventDefault();
              e.stopPropagation();
              handlePdfClick(e, url);
            };
            link._pdfClickHandler = clickHandler;
            link.addEventListener('click', clickHandler);
            console.log(`Event listener attached to PDF link ${index} in description tab`);
          }
        });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [activeTab, isMobile]);

  // Additional useEffect specifically for when resources tab becomes active
  useEffect(() => {
    if (activeTab === 'tab_resources') {
      console.log('Resources tab is now active, looking for resource links...');
      const timer = setTimeout(() => {
        // Look for both PDF links and general resource links in the resources tab
        const resourceLinks = document.querySelectorAll('.resource-link, .datasheet-link');
        console.log('Found resource links in active resources tab:', resourceLinks.length);
        
        resourceLinks.forEach((link, index) => {
          const href = link.getAttribute('href');
          const isPdfLink = link.classList.contains('pdf-link');
          console.log(`Resource link ${index} in resources tab:`, href, 'isPdfLink:', isPdfLink);
          
          if (href && !link._resourceClickHandler) {
            const clickHandler = (e) => {
              console.log('Resource link clicked in resources tab:', href);
              
              if (isPdfLink && isMobile === false) {
                // For PDF links on desktop, prevent default and open in modal
                e.preventDefault();
                e.stopPropagation();
                const url = link.getAttribute('data-pdf-url') || href;
                handlePdfClick(e, url);
              } else if (isPdfLink && isMobile === true) {
                // For PDF links on mobile, let them open normally in new tab
                console.log('Mobile PDF link clicked, allowing normal navigation to new tab');
              } else {
                // For non-PDF links, allow normal navigation but ensure they're clickable
                console.log('Non-PDF resource link clicked, allowing normal navigation');
                // The link should work normally since it has href
              }
            };
            link._resourceClickHandler = clickHandler;
            link.addEventListener('click', clickHandler);
            console.log(`Event listener attached to resource link ${index} in resources tab`);
          }
        });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [activeTab, isMobile]);

  // Additional useEffect to watch for Resources tab content changes
  useEffect(() => {
    // Get the Resources tab content
    const resourcesContent = getTabContent('tab_resources');
    if (resourcesContent) {
      console.log('Resources tab content changed, processing links...');
      const timer = setTimeout(() => {
        // Look for resource links in the entire document
        const resourceLinks = document.querySelectorAll('.resource-link, .datasheet-link');
        console.log('Found resource links after content change:', resourceLinks.length);
        
        resourceLinks.forEach((link, index) => {
          const href = link.getAttribute('href');
          const isPdfLink = link.classList.contains('pdf-link');
          console.log(`Processing resource link ${index}:`, href, 'isPdfLink:', isPdfLink);
          
          if (href && !link._resourceClickHandler) {
            const clickHandler = (e) => {
              console.log('Resource link clicked:', href);
              
              if (isPdfLink && isMobile === false) {
                // For PDF links on desktop, prevent default and open modal
                e.preventDefault();
                e.stopPropagation();
                const url = link.getAttribute('data-pdf-url') || href;
                handlePdfClick(e, url);
              } else if (isPdfLink && isMobile === true) {
                // For PDF links on mobile, let them open normally in new tab
                console.log('Mobile PDF link clicked, allowing normal navigation to new tab');
              } else {
                // For non-PDF links, allow normal navigation
                console.log('Non-PDF resource link clicked, allowing normal navigation');
              }
            };
            link._resourceClickHandler = clickHandler;
            link.addEventListener('click', clickHandler);
            console.log(`Event listener attached to resource link ${index}`);
          }
        });
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [safeProduct?.tabs, isMobile]); // Watch for changes in the tabs data and mobile status

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
                  passHref
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
                const hasContent = tab.key === 'tab_description' ? (safeProduct?.description || content) : content;
                const isClickable = hasContent;
                
                console.log(`Tab ${tab.key}:`, {
                  hasContent: !!hasContent,
                  isClickable,
                  label: tab.label,
                  contentType: typeof content,
                  contentLength: typeof content === 'string' ? content.length : 'N/A'
                });
                
                return (
                  <li
                    key={tab.key}
                    onClick={isClickable ? () => setActiveTab(tab.key) : undefined}
                    className={`tab-btn${activeTab === tab.key ? " active-btn" : ""}${!isClickable ? " disabled-tab" : ""}`}
                    style={{ 
                      cursor: isClickable ? 'pointer' : 'not-allowed',
                      opacity: isClickable ? 1 : 0.6
                    }}
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
                const hasContent = tab.key === 'tab_description' ? (safeProduct?.description || content) : content;
                
                console.log(`Rendering tab ${tab.key}:`, {
                  hasContent: !!hasContent,
                  contentType: typeof content,
                  contentLength: typeof content === 'string' ? content.length : 'N/A',
                  isActive: activeTab === tab.key,
                  tabValue: safeProduct?.tabs?.find(t => t?.key === tab.key)?.value
                });
                
                return (
                  <div
                    key={tab.key}
                    className={`tab animated${activeTab === tab.key ? " active-tab fadeInUp" : ""}`}
                  >
                    {hasContent ? (
                      <div className="text-col">
                        <div className="inner">
                          {/* For description tab, don't show title since it's just HTML content */}
                          {tab.key !== 'tab_description' && content.title && (
                            <h3 className="product-tabs__panel-title">{content.title}</h3>
                          )}
                          {content.items && content.items.length > 0 ? (
                            <ul className="product-tabs__panel-list">
                              {content.items.map((item, index) => (
                                <li key={index} className="product-tabs__panel-item">
                                  <div 
                                    dangerouslySetInnerHTML={{ __html: item }}
                                  />
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div 
                              className="product-tabs__panel-text"
                              dangerouslySetInnerHTML={{ 
                                __html: typeof content === 'string' ? content : 'Content available' 
                              }}
                              ref={tab.key === 'tab_description' ? descriptionRef : null}
                            />
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

            {/* PDF Modal - Only show on desktop */}
      {showPdfModal && isMobile === false && (
        <div className="pdf-modal-overlay" onClick={handleClosePdfModal}>
          <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-header">
              <h3 className="pdf-modal-title">
                <i className="fa fa-file-pdf-o"></i>
                {pdfFileName}
              </h3>
              <button className="pdf-modal-close" onClick={handleClosePdfModal}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="pdf-modal-body">
              {/* Loading indicator */}
              {!iframeLoaded && !iframeError && !iframeTimeout && (
                <div className="pdf-loading">
                  <div className="pdf-loading-spinner">
                    <i className="fa fa-spinner fa-spin"></i>
                  </div>
                  <p>Loading PDF...</p>
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
                    Trying to load: {pdfUrl}
                  </p>
                </div>
              )}
              
              {/* Timeout message */}
              {iframeTimeout && !iframeLoaded && !iframeError && (
                <div className="pdf-timeout">
                  <i className="fa fa-clock-o"></i>
                  <p>PDF is taking longer than expected to load.</p>
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
                    URL: {pdfUrl}
                  </p>
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="pdf-fallback-link">
                    Open PDF in new tab
                  </a>
                </div>
              )}
              
              {/* Primary PDF viewer using embed tag - most browser friendly */}
              <embed
                src={`${pdfUrl}#view=FitH`}
                type="application/pdf"
                width="100%"
                height="100%"
                style={{ border: 'none', display: iframeError ? 'none' : 'block' }}
                onLoad={() => {
                  console.log('PDF embed loaded successfully:', pdfUrl);
                  setIframeLoaded(true);
                  setIframeError(false);
                }}
                onError={(e) => {
                  console.log('PDF embed failed to load:', pdfUrl);
                  setIframeError(true);
                  setIframeLoaded(false);
                }}
              />
              
              {/* Fallback iframe if embed tag fails */}
              {iframeError && (
                <iframe
                  src={`${pdfUrl}#view=FitH`}
                  title={pdfFileName}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  onLoad={() => {
                    console.log('PDF iframe fallback loaded successfully:', pdfUrl);
                    setIframeLoaded(true);
                    setIframeError(false);
                  }}
                  onError={(e) => {
                    console.log('PDF iframe fallback failed to load:', e.target.src);
                    setIframeError(true);
                    setIframeLoaded(false);
                  }}
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads"
                  allow="fullscreen"
                  referrerPolicy="no-referrer"
                />
              )}
              
              {/* Final fallback message */}
              {iframeError && (
                <div className="pdf-fallback" style={{ display: 'block' }}>
                  <p>PDF failed to load in viewer.</p>
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
                    URL: {pdfUrl}
                  </p>
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="pdf-fallback-link">
                    Open PDF in new tab
                  </a>
                </div>
              )}
            </div>
            <div className="pdf-modal-footer">
              <button className="pdf-download-btn" onClick={handleDownloadPdf}>
                <i className="fa fa-download"></i>
                Download PDF
              </button>
              <button className="pdf-close-btn" onClick={handleClosePdfModal}>
                <i className="fa fa-times"></i>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Related Products Carousel */}
      <RelatedProductsCarousel currentProduct={safeProduct} />
    </>
  );
};

export default ProductDetailsPage;