import { contactSection } from "@/data/contactSection";
import useActive from "@/hooks/useActive";
import dynamic from "next/dynamic";
import React from "react";
import { Col, Row } from "react-bootstrap";

const MapBox = dynamic(() => import("../MapSection/MapBox"));
const FormBox = dynamic(() => import("./FormBox"));

const { title, contacts, inputs, euContacts, canadaContacts, canadaTitle } =
  contactSection;

const ContactSection = ({ className = "", map = false, form = false }) => {
  const ref = useActive("#contact");

  return (
    <section ref={ref} className={`contact-section ${className}`} id="contact">
      <div className="auto-container">
        <div className="sec-title centered">
          {/* Title between the two sections */}
          <h2 style={{ textAlign: "center", color: "#000" }}>
            Connect With Us
          </h2>
        </div>

        <div className="upper-info">
          {/* Contacts block with bottom padding */}
          <div style={{ paddingBottom: "40px" }}>
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
              className="clearfix"
            >
              {contacts.map(({ id, name, address, email, phone }) => (
                <Col
                  key={id}
                  xl={3}
                  lg={3}
                  md={3}
                  sm={3}
                  className="info-block animated fadeInUp"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div className="inner-box" style={{ width: "350px" }}>
                    <h5>{name}</h5>
                    <div className="text">
                      <ul className="info">
                        <li dangerouslySetInnerHTML={{ __html: address }}></li>
                        <li>
                          <a href={`mailto:${email}`}>{email}</a>
                        </li>
                        <li>
                          <a href={`tel:${phone.split(" ").join("")}`}>
                            {phone}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/* Title between the two sections */}
          <div className="sec-title centered">
            {/* Title between the two sections */}
            <h2 style={{ textAlign: "center", color: "#000" }}>{title}</h2>
          </div>

          {/* EU Contacts block with top padding */}
          <div style={{ paddingTop: "40px" }}>
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
              className="clearfix"
            >
              {euContacts.map(
                ({
                  id,
                  name,
                  location,
                  address,
                  email,
                  phone,
                  phone2,
                  web,
                  city,
                }) => (
                  <Col
                    key={id}
                    xl={3}
                    lg={3}
                    md={3}
                    sm={3}
                    className="info-block animated fadeInUp"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <div className="inner-box" style={{ width: "350px" }}>
                      <h5>{location}</h5>
                      <h5>{name}</h5>
                      <div className="text">
                        <ul className="info">
                          {address && (
                            <li
                              dangerouslySetInnerHTML={{ __html: address }}
                            ></li>
                          )}

                          {email && (
                            <li style={{ fontSize: "75%" }}>
                              <a href={`mailto:${email}`}>{email}</a>
                            </li>
                          )}

                          {phone && (
                            <li style={{ fontSize: "75%" }}>
                              <a href={`tel:${phone.replace(/\s+/g, "")}`}>
                                {phone}
                              </a>
                            </li>
                          )}

                          {phone2 && (
                            <li style={{ fontSize: "75%" }}>
                              <a href={`tel:${phone2.replace(/\s+/g, "")}`}>
                                {phone2}
                              </a>
                            </li>
                          )}

                          {web && (
                            <li>
                              <a
                                href={web}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {web}
                              </a>
                            </li>
                          )}

                          {city && <li>{city}</li>}
                        </ul>
                      </div>
                    </div>
                  </Col>
                )
              )}
            </Row>
          </div>
        </div>

        {form && <FormBox inputs={inputs} />}
      </div>
    </section>
  );
};

export default ContactSection;
