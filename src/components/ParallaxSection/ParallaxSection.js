import parallaxSection from "@/data/parallaxSection";
import React from "react";

const { bg, icon, title, title2 } = parallaxSection;

const ParallaxSection = () => {
  return (
    <div
      className="parallax-section"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="auto-container">
        <div className="content-box">
          <div className="icon-box" style={{ visibility: "hidden" }}>
            <span className={icon}></span>
          </div>
          <h2 style={{ visibility: "hidden" }}>
            {title} <span>{title2}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ParallaxSection;
