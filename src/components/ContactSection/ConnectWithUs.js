import { contactSection } from "@/data/contactSection";
import useActive from "@/hooks/useActive";
import React from "react";
import { Col, Row } from "react-bootstrap";

const { contacts } = contactSection;

const ConnectWithUs = ({ className = "" }) => {
  const ref = useActive("#connect-with-us");

  return (
    <section ref={ref} className={`contact-section ${className}`} id="connect-with-us" style={{ marginBottom: "-20px" }}>
      <div className="auto-container">


        <div className="upper-info">
          <div style={{ paddingBottom: "20px" }}>
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
        </div>
      </div>
    </section>
  );
};

export default ConnectWithUs;
