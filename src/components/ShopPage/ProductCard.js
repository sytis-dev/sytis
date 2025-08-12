import Link from "next/link";
import React from "react";
import { Col, Image } from "react-bootstrap";

const ProductCard = ({ product = {} }) => {
  const { image, title, price, all_images, name, slug } = product;

  // Use the first image from the pre-sorted all_images array (API now returns sorted images)
  const firstImage = all_images?.[0];
  const imageUrl = image || (firstImage?.url_standard ?? "");
  const productTitle = title || name;

  return (
    (<Col sm={12} md={8} lg={6}>
      <div className="product-card">
        <div className="product-card__image">
          {imageUrl && <Image src={imageUrl} alt={productTitle} />}

          <div className="product-card__buttons">
            <Link
              href={`/products${slug}`}
              className="theme-btn btn-style-one"
              legacyBehavior>
              <i className="btn-curve"></i>
              <span className="btn-title">View</span>
            </Link>
          </div>
        </div>
        <div className="product-card__content">
          <h3 className="product-card__title">
            <Link href={`/products${slug}`} legacyBehavior>{productTitle}</Link>
          </h3>
          {/* <p className="product-card__price">${price}</p> */}
        </div>
      </div>
    </Col>)
  );
};

export default ProductCard;
