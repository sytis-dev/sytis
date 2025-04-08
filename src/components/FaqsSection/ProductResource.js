import { resourcesSection } from "@/data/faqsSection";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";

const ProductResources = ({ allResources = {} }) => {
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
                      <a href={href} target="_blank" rel="noopener noreferrer">
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
  return (
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
            />
          ))}
        </Row>
      </div>
    </section>
  );
};

export default ProductResource;
