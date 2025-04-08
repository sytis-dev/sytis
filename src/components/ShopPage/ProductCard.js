import Link from "next/link";
import React from "react";
import { Col, Image } from "react-bootstrap";

const ProductCard = ({ product = {} }) => {
  const { image, title, price, all_images, name, slug } = product;

  const imageUrl = image || (all_images?.[0]?.url_standard ?? "");
  const productTitle = title || name;

  return (
    <Col sm={12} md={8} lg={6}>
      <div className="product-card">
        <div className="product-card__image">
          {imageUrl && <Image src={imageUrl} alt={productTitle} />}

          <div className="product-card__buttons">
            <Link href={`/sytis/products${slug}`}>
              <a className="theme-btn btn-style-one">
                <i className="btn-curve"></i>
                <span className="btn-title">View</span>
              </a>
            </Link>
          </div>
        </div>
        <div className="product-card__content">
          <h3 className="product-card__title">
            <Link href={`/sytis/products${slug}`}>{productTitle}</Link>
          </h3>
          {/* <p className="product-card__price">${price}</p> */}
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
