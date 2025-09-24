import discoverSection from "@/data/discoverSection";
import Link from "next/link";
import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";

const { title, discovers } = discoverSection;

const DiscoverSection = ({ ShowTitle = true }) => {
  return (
    <section className="discover-section">
      <div className="auto-container">
        {ShowTitle && (
          <div className="sec-title centered">
            <h2>
              <TextSplit color="#9b9fa6" text={title} />
              <span className="dot">.</span>
            </h2>
          </div>
        )}
        <Row className="clearfix">
          {discovers.map(({ id, image, title, href }) => (
            <Col key={id} lg={6} md={12} sm={12} className="discover-block">
              <div className="inner-box">
                <div className="image-box">
                  <Image
                    src={require(`@/images/resource/${image}`).default.src}
                    alt=""
                  />
                </div>
                <div className="cap-box animated fadeInUp">
                  <div className="cap-inner">
                    <h5 style={{ color: 'white', fontSize: '1.6em' }}>{title}</h5>
                    <div className="more-link" style={{ color: "#4682B4" }}>
                      <Link href={href}>
                        <a aria-label={`Discover more about ${title}`}>
                          <span
                            className="fa fa-angle-right"
                            style={{ color: "white" }}
                          ></span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default DiscoverSection;
