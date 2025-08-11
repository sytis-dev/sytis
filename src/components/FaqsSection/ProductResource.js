import { resourcesSection } from "@/data/faqsSection";
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";

const ProductResources = ({ allResources = {}, onPdfClick }) => {
  const { resources, defaultCurrent } = allResources;
  const [current, setCurrent] = useState(defaultCurrent);

  return (
    <Col lg={12} md={12} sm={12} className="faq-block">
      <ul className="accordion-box clearfix">
        {resources.map(({ id, title, links }) => (
          <li
            key={id}
            className={`accordion block${
              current === id ? " active-block" : ""
            }`}
          >
            <div
              onClick={() => setCurrent(id)}
              className={`acc-btn${current === id ? " active" : ""}`}
            >
              {title}
            </div>
            <div
              className={`acc-content animated${
                current === id ? " current slideInUp" : ""
              }`}
            >
              <div className="content">
                <ul className="text">
                  {links.map(({ href, text }, index) => (
                    <li key={index}>
                      <a 
                        href={href} 
                        onClick={(e) => onPdfClick(e, href)}
                        className="resource-link"
                      >
                        {text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Col>
  );
};

const ProductResource = () => {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfFileName, setPdfFileName] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [iframeTimeout, setIframeTimeout] = useState(false);
  const [timeoutIds, setTimeoutIds] = useState([]);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Function to handle PDF link clicks
  const handlePdfClick = (e, url) => {
    // On mobile, just open PDF in new tab instead of modal
    if (isMobile) {
      window.open(url, '_blank');
      return;
    }
    
    // Desktop: open PDF in modal
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
    
    setPdfUrl(url);
    // Extract filename from URL for display
    const fileName = url.split('/').pop() || 'Document';
    setPdfFileName(fileName);
    setShowPdfModal(true);
    
    // Reset states
    setIframeLoaded(false);
    setIframeError(false);
    setIframeTimeout(false);
    
    // Set a timeout to show fallback if PDF takes too long to load
    const timeoutId1 = setTimeout(() => {
      if (!iframeLoaded && !iframeError) {
        setIframeTimeout(true);
      }
    }, 10000); // 10 second timeout
    
    // Additional fallback: if PDF fails to load after 15 seconds, automatically open in new tab
    const timeoutId2 = setTimeout(() => {
      if (!iframeLoaded && !iframeError) {
        window.open(url, '_blank');
        handleClosePdfModal();
      }
    }, 15000); // 15 second fallback
    
    setTimeoutIds([timeoutId1, timeoutId2]);
  };

  const handleClosePdfModal = () => {
    setShowPdfModal(false);
    setPdfUrl('');
    setPdfFileName('');
    setIframeLoaded(false);
    setIframeError(false);
    setIframeTimeout(false);
    
    // Clear all timeouts
    timeoutIds.forEach(id => clearTimeout(id));
    setTimeoutIds([]);
  };

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

  return (
    <>
      <section
        className="resources-section"
        style={{ paddingTop: "40px", paddingBottom: "40px" }}
      >
        <div className="auto-container">
          <h5 padding="200px" color="#999b9f">
            Select a document from below to download. If you cant find what you
            are looking for, feel free to reach out.
          </h5>
          <Row className="clearfix">
            {resourcesSection.map((allResources) => (
              <ProductResources
                key={allResources.id}
                allResources={allResources}
                onPdfClick={handlePdfClick}
              />
            ))}
          </Row>
        </div>
      </section>

      {/* PDF Modal - Only show on desktop */}
      {showPdfModal && !isMobile && (
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
                  setIframeLoaded(true);
                  setIframeError(false);
                }}
                onError={() => {
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
                    setIframeLoaded(true);
                    setIframeError(false);
                  }}
                  onError={() => {
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
    </>
  );
};

export default ProductResource;
