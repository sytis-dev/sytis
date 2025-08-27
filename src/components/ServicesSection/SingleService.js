import React, { useState } from "react";
import { Col, Image } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";

const SingleService = ({ service = {} }) => {
  const { icon, title, text, image, href, altText } = service;
  const [isHovered, setIsHovered] = useState(false);

  const limitedText = text ? text.slice(0, 10) : "";

  return (
    <Col xl={3} lg={6} md={6} sm={12} className="service-block-two">
      <div
        className="inner-box animated fadeInUp"
        style={{
          minHeight: "275px",
          minWidth: "250px",
          backgroundColor: isHovered ? "#0e0e0e" : "white",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="icon-box"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
            marginBottom: "10px",
            color: "black",
            ...(typeof window !== 'undefined' && window.innerWidth <= 599
              ? { marginBottom: '32px', height: '80px' }
              : {}),
          }}
        >
          <a href={href}>
            <Image
              src={image.src}
              alt={altText}
              style={{
                transform: typeof window !== 'undefined' && window.innerWidth <= 599 ? 'scale(0.5)' : 'scale(0.6)',
              }}
            />
          </a>
        </div>

        <h5
          className="service-title"
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: isHovered ? "white" : "black",
            transition: "color 0.3s ease",
            fontSize: "1.05em",
            lineHeight: "1.3",
            maxWidth: "100%",
            overflow: "hidden",
            padding: "0 4px",
          }}
        >
          <a
            href={href}
            style={{
              color: isHovered ? "white" : "black",
              textDecoration: "none",
            }}
          >
            <TextSplit hovered={isHovered} text={title} />
          </a>
        </h5>

        <div
          className="link-box"
          style={{
            textAlign: "center",
          }}
        >
          <a href={href} aria-label={`Learn more about ${title}`}>
            <span
              className="fa fa-angle-right"
              style={{
                color: "white",
              }}
            ></span>
          </a>
        </div>
      </div>
    </Col>
  );
};

export default SingleService;
