import React from "react";
import { Col, Image, Row } from "react-bootstrap";

const ContentSide = ({ application = {} }) => {
  const {
    images = [],
    title,
    sections = [],
    featureList = [],
    conclusion,
  } = application.content;

  const topImage = images.length > 0 ? images[0] : null;
  const bottomImage = images.length > 0 ? images[images.length - 1] : null;

  const isFireDetection = application.name === "Fire Detection";

  return (
    <div className="content-details">
      {/* Embedded styling for video */}


      {isFireDetection ? (
        <div className="video-wrapper" style={{ marginBottom: "20px" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="background-video"
            src="/video/sytis-fire-detection.mp4"
            type="video/mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        topImage && (
          <div className="main-image image" style={{ marginBottom: "20px" }}>
            <Image src={topImage} alt="Top Image" fluid />
          </div>
        )
      )}

      <div className="text-content">
        {sections.map((section, index) => (
          <div
            key={index}
            style={{ paddingTop: "20px", paddingBottom: "20px" }}
          >
            <h4>{section.title}</h4>
            <div
              className="section-content"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        ))}

        {featureList.length > 0 && (
          <div
            className="features-list"
            style={{ paddingTop: "20px", paddingBottom: "20px" }}
          >
            <h4>Features</h4>
            <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
              {featureList.map((feature, i) => (
                <li
                  key={i}
                  style={{
                    marginBottom: "10px",
                    position: "relative",
                    paddingLeft: "20px",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "-2px",
                      color: "red",
                      fontSize: "18px",
                    }}
                  >
                    •
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {conclusion && (
          <div
            className="conclusion"
            style={{ paddingTop: "20px", paddingBottom: "20px" }}
          >
            <h4>Conclusion</h4>
            <div
              className="conclusion-content"
              dangerouslySetInnerHTML={{ __html: conclusion }}
            />
          </div>
        )}
      </div>

      {bottomImage && (
        <div className="bottom-image image" style={{ marginTop: "20px" }}>
          <Image src={bottomImage} alt="Bottom Image" fluid />
        </div>
      )}
    </div>
  );
};

export default ContentSide;
