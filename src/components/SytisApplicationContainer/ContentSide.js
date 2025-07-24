import React, { useRef, useState, useEffect } from "react";
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
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="content-details">
      {/* Embedded styling for video */}

      {isFireDetection ? (
        <div className="video-wrapper" style={{ marginBottom: "20px", position: 'relative', width: '100%', paddingTop: '56.25%' }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="background-video"
            src="/video/sytis-fire-detection.mp4"
            type="video/mp4"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: isMobile ? 'contain' : 'cover',
              borderRadius: '8px',
              maxHeight: '400px',
              background: isMobile ? 'white' : undefined,
              cursor: isMobile ? 'pointer' : 'default',
            }}
            onClick={isMobile ? handleFullscreen : undefined}
          >
            Your browser does not support the video tag.
          </video>
          {/* Fullscreen button overlay, only on mobile */}
          {isMobile && (
            <button
              onClick={handleFullscreen}
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                zIndex: 2,
                background: 'rgba(0,0,0,0.6)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 12px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
              aria-label="Fullscreen video"
            >
              ⛶
            </button>
          )}
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
