import { productDescription } from "@/data/productDetails";
import React from "react";

// Destructure the default values
const { title, text1, text2 } = productDescription;

const ProductDescription = ({ product }) => {
  // Fallback to default text if product.description is null
  const hasDescription = product?.description != null;

  return (
    <section className="product-description">
      <div className="auto-container">
        <h3 className="product-description__title">{title}</h3>

        {/* Render raw HTML if product.description exists, otherwise render default text */}
        {hasDescription ? (
          <div
            className="product-description__text"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        ) : (
          <>
            <p className="product-description__text">{text1}</p>
            <p className="product-description__text">{text2}</p>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDescription;
