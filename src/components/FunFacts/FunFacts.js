import funFacts from "@/data/funFacts";
import React from "react";
import { Col, Row } from "react-bootstrap";
import VisibilityCountUp from "../VisibilityCountUp/VisibilityCountUp";

const FunFacts = () => {
  return (
    <section className="facts-section alternate">
      <div className="auto-container">
        <div
          className="inner-container"
          style={{ display: "flex", justifyContent: "center" }} // Center fact-counter horizontally
        >
          <div
            className="fact-counter"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: "100%",
            }}
          >
            <Row
              className="clearfix"
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {funFacts.map(({ id, title, count }) => (
                <Col
                  key={id}
                  lg={3}
                  md={6}
                  sm={12}
                  className="column counter-column"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div className="inner">
                    <div className="content">
                      <div className="count-outer count-box">
                        <VisibilityCountUp count={count} />
                      </div>
                      <div className="counter-title">{title}</div>
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

export default FunFacts;
