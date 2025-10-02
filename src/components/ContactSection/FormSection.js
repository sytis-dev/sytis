import React, { useEffect } from "react";

const FormSection = ({ className = "" }) => {
  // useEffect hook to dynamically load the HubSpot form script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/47869494.js";
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className={`form-section ${className}`}>
      <div
        className="contact-section"
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <div className="sec-title centered">
          <h2 style={{ textAlign: "center", color: "#000" }}>
            Connect With Us
          </h2>
        </div>
        <div
          style={{
            width: "72%",
            margin: "0 auto",
          }}
        >
          <div
            className="hs-form-frame"
            data-region="na1"
            data-form-id="581511e6-1209-419b-ac4a-b3f29722d134"
            data-portal-id="47869494"
          ></div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
