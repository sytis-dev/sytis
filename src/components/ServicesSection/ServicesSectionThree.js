import { servicesSectionThree } from "@/data/servicesSection";
import useActive from "@/hooks/useActive";
import React from "react";
import { Row } from "react-bootstrap";
import SingleService from "./SingleService";

const { title, services } = servicesSectionThree;

const ServicesSectionThree = ({ className = "" }) => {
  const ref = useActive("#services");

  return (
    <section
      ref={ref}
      className={`services-section-three ${className}`}
      id="services"
      style={{
        paddingTop: "90px",

        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        className="auto-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="sec-title centered">
          <h2>
            {title} <span className="dot">.</span>
          </h2>
        </div>
        <div
          className="services"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            color: "black",
          }}
        >
          <Row
            className="clearfix"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              color: "black",
            }}
          >
            {services.slice(0, 3).map((service) => (
              <SingleService service={service} key={service.id} />
            ))}
          </Row>
          <Row
            className="clearfix"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              color: "black",
            }}
          >
            {services.slice(3, 6).map((service) => (
              <SingleService service={service} key={service.id} />
            ))}
          </Row>
        </div>
      </div>
    </section>
  );
};

export default ServicesSectionThree;
