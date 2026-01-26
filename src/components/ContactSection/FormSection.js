import React, { useEffect } from "react";

const FormSection = ({
  className = "",
  title = "Connect With Us",
  region = "na1",
  portalId = "47869494",
  formId = "581511e6-1209-419b-ac4a-b3f29722d134",
  containerWidth = "72%",
  scriptSrc = "https://js.hsforms.net/forms/embed/47869494.js",
  embedClassName = "hs-form-frame",
}) => {
  // useEffect hook to dynamically load the HubSpot form script
  useEffect(() => {
    // Avoid injecting duplicates (navigating between pages, etc.)
    const existing = document.querySelector(`script[src="${scriptSrc}"]`);
    let script = existing;

    if (!script) {
      script = document.createElement("script");
      script.src = scriptSrc;
      script.defer = true;
      document.body.appendChild(script);
    }

    // Cleanup function to remove the script when the component unmounts
    return () => {
      // Only remove if we injected it (if it already existed, leave it)
      if (!existing && script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [scriptSrc]);

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
            {title}
          </h2>
        </div>
        <div
          style={{
            width: containerWidth,
            margin: "0 auto",
          }}
        >
          <div
            className={embedClassName}
            data-region={region}
            data-form-id={formId}
            data-portal-id={portalId}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
