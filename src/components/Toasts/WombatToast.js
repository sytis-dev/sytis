import React from "react";
import { toast } from "react-hot-toast";

const WombatToast = () => {
  const title = "Boost Field Safety Today!";
  const message =
    "Wombat puts essential safety tasks, training, and docs right in your team's hands—on-site and offline.";
  const ctaText = "Get a Demo";
  const ctaLink = "https://hub.sytis.com/wombat-access";

  return (
    <div
      style={{
        background: "white",
        borderRadius: "7px",
        boxShadow: "0px 0px 40px 5px rgba(0, 0, 0, 0.05)",
        padding: "1.5rem",
        maxWidth: "350px",
        position: "relative",
        fontFamily: "'Rubik', sans-serif",
        color: "#686a6f",
        zIndex: 1000,
        border: "1px solid rgba(230, 25, 25, 0.1)", // #e61919
      }}
    >
      {/* Close button */}
      <button
        onClick={() => toast.dismiss()}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "transparent",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
          color: "#888",
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#e61919";
          e.target.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
          e.target.style.color = "#888";
        }}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Content */}
      <h4 style={{ 
        margin: "0 0 0.75rem", 
        fontSize: "1.25rem", 
        fontFamily: "'Teko', sans-serif",
        color: "#222429",
        fontWeight: "400",
        lineHeight: "1.2"
      }}>
        {title}
      </h4>
      <p style={{ 
        margin: "0 0 1.25rem", 
        fontSize: "0.95rem", 
        lineHeight: "1.6",
        color: "#686a6f"
      }}>
        {message}
      </p>

      {/* CTA Button */}
      <a
        href={ctaLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "relative",
          display: "inline-block",
          background: "#e61919",
          color: "#ffffff",
          padding: "0.75rem 1.5rem",
          borderRadius: "5px",
          textDecoration: "none",
          fontFamily: "'Teko', sans-serif",
          fontSize: "16px",
          fontWeight: "400",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          overflow: "hidden",
          transition: "all 0.3s ease",
          border: "none",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#222429";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "#e61919";
        }}
      >
        <span style={{ position: "relative", zIndex: 1 }}>
          {ctaText}
        </span>
        <div
          style={{
            position: "absolute",
            right: "-15px",
            top: "0",
            width: "26px",
            height: "100%",
            background: "#222429",
            opacity: "0.2",
            zIndex: 0,
            transform: "skewX(-22deg)",
            transition: "all 0.5s ease",
          }}
          className="btn-curve"
        />
      </a>
    </div>
  );
};

export default WombatToast;
