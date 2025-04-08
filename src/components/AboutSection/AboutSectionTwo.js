import { aboutSectionTwo } from "@/data/aboutSection";
import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";
import CounterBlock from "./CounterBlock";
import Link from "next/link";

const { title, text, counters, image, since, ctaTitle } = aboutSectionTwo;

const AboutSectionTwo = () => {
  return (
    <section className="about-section-two">
      <div className="auto-container">
        <Row className="clearfix">
          <Col lg={6} md={12} sm={12} className="left-col">
            <div className="inner">
              <div className="sec-title">
                <h2>
                  <TextSplit color="#9b9fa6" text={title} />
                  <span className="dot">.</span>
                </h2>
                <div
                  className="lower-text"
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              </div>
              <div className="counter">
                <Row className="clearfix">
                  {counters.map((counter) => (
                    <CounterBlock key={counter.id} counter={counter} />
                  ))}
                  <div className="link-box">
                    <Link href={`/blog`}>
                      <a className="theme-btn btn-style-two">
                        <i className="btn-curve"></i>
                        <span className="btn-title">{ctaTitle}</span>
                      </a>
                    </Link>
                  </div>
                </Row>
              </div>
            </div>
          </Col>
          <Col lg={6} md={12} sm={12} className="right-col">
            <div className="inner">
              <div className="image-box animated fadeInRight">
                <div className="image">
                  <Image src={image.src} alt="" />
                </div>
                <div className="since">
                  
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
