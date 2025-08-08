import React from 'react';

const ProductCategorySpecs = ({ specifications, features }) => {
  // Safe fallbacks for props
  const safeSpecifications = Array.isArray(specifications) ? specifications : [];
  const safeFeatures = Array.isArray(features) ? features : [];
  
  // Combine specifications and features with safety checks
  const allSpecs = [
    ...safeSpecifications.filter(spec => spec && spec.label && spec.value),
    ...safeFeatures
      .filter(feature => feature && feature.trim())
      .map((feature, index) => ({
        label: `Feature ${index + 1}`,
        value: feature
      }))
  ];

  // Don't render if no specs or features
  if (allSpecs.length === 0) {
    return null;
  }

  return (
    <div className="product-category-specs-section">
      <h4 className="product-category-specs-title">Product Specifications</h4>
      <div className="product-category-specs-grid">
        {allSpecs.map((spec, index) => (
          <div key={`category-spec-${index}`} className="category-spec-item">
            <span className="category-spec-label">{spec.label || 'Specification'}</span>
            <span className="category-spec-value">{spec.value || 'N/A'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategorySpecs;
