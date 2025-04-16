import gridSafeSkidFeaturedSection from "@/data/gridSafeSkidFeaturedSection";
import React from "react";
import { Col, Image, Row } from "react-bootstrap";

const GridSafeSkidFeaturedSection = ({ className = "" }) => {
  return (
    <section className={`featured-section ${className}`}>
      <div className="auto-container">
        {gridSafeSkidFeaturedSection.map((section, index) => (
          <Row
            key={index}
            className={`row clearfix mb-5 ${
              index % 2 === 0 ? "" : "flex-row-reverse"
            }`}
          >
            <Col lg={6} md={12} sm={12} className="left-col">
              <div className="inner animated fadeInLeft">
                <div className="image-box">
                  <Image src={section.image.src} alt="" />
                </div>
              </div>
            </Col>
            <Col lg={6} md={12} sm={12} className="right-col">
              <div className="inner">
                <div className="sec-title">
                  <h2>
                    {section.title}
                    <span className="dot">.</span>
                  </h2>
                  <div
                    className="lower-text"
                    dangerouslySetInnerHTML={{
                      __html: section.text,
                    }}
                  />
                </div>
                <div className="features">
                  <ul className="list-unstyled process-one__list">
                    {section.features.map(({ id, title, text }) => (
                      <li key={id}>
                        <i className="flaticon-check"></i>{" "}
                        <strong>{title}</strong>
                        {text ? `: ${text}` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        ))}
      </div>
    </section>
  );
};

export default GridSafeSkidFeaturedSection;
