import { sponsorsSectionTwo } from "@/data/sponsorsSection";
import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import sponsors from "@/data/sponsorsSection";

const SponsorsSectionTwo = () => {
  return (
    <section className="sponsors-section-two">
      <div className="auto-container">
        <Row className="clearfix">
          <Col xl={5} lg={12} md={12} className="title-col">
            <div className="sec-title animated fadeInLeft">
              <h2>
                Some of the clients we have worked with
                <span className="dot">.</span>
              </h2>
            </div>
          </Col>

          <Col xl={7} lg={12} md={12} className="logo-col">
            <Row className="clearfix">
              {sponsors.map((image, i) => (
                <Col
                  key={i}
                  xl={4}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}
                  className="logo-block"
                >
                  <div className="image-box">
                    <Image
                      src={require(`@/images/clients/${image}`).default.src}
                      alt=""
                    />{" "}
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default SponsorsSectionTwo;
