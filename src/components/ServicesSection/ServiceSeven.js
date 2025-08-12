import { serviceSeven } from "@/data/servicesSection";
import Link from "next/link";
import React from "react";
import { Col, Row } from "react-bootstrap";

const ServiceSeven = () => {
  return (
    (<section className="service-seven">
      <div className="auto-container">
        <div className="sec-title-seven text-center">
          <h2 className="sec-title-seven__title">
            Checkout Our <span>Company</span>
            <br />
            Features Below
          </h2>
        </div>
        <Row>
          {serviceSeven.map(({ id, icon, title, href, text }) => (
            <Col key={id} md={6} lg={3}>
              <div className="service-seven__item animated fadeInLeft">
                <div className="service-seven__icon">
                  <i className={icon}></i>
                </div>
                <h3 className="service-seven__title">
                  <Link href={href} legacyBehavior>{title}</Link>
                </h3>
                <p className="service-seven__text">{text}</p>
                <Link href={href} className="service-seven__link" legacyBehavior>
                  <i className="flaticon-right-arrow"></i>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>)
  );
};

export default ServiceSeven;
