import { socials } from "@/data/header";
import { productDetails } from "@/data/productDetails";
import Link from "next/link";
import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";
import weDOSection from "@/data/weDOSection";

// Destructure with defaults
const { image, title, price, stars, customerReviews, text, text2 } =
  productDetails;

const { currentFaq, faqs } = weDOSection;

const ProductDetailsPage = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  // Fallback to default values if the product prop doesn't contain values
  const productImage = product?.all_images?.[0]?.url_standard || image.src;
  const productTitle = product?.name || title;
  const productPrice = product?.price || price;
  const productStars = product?.stars || stars;
  const productCustomerReviews = product?.customerReviews || customerReviews;
  const productText = product?.text || text;
  const productText2 = product?.text2 || text2;

  return (
    <section className="product-details">
      <div className="auto-container">
        <Row>
          <Col lg={12} xl={6}>
            <a className="product-details__image lightbox-image">
              <Image src={productImage} alt="" />
            </a>
          </Col>
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
            <div>
              <Link
                className="theme-btn btn-style-one demo-purchase-btn"
                href="/contact"
              >
                <a
                  className="theme-btn btn-style-one demo-purchase-btn"
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
  );
};

export default ProductDetailsPage;
