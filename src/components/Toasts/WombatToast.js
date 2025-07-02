import React from "react";
import { toast } from "react-hot-toast";

const WombatToast = () => {
  const title = "Boost Field Safety Today!";
  const message =
    "Wombat puts essential safety tasks, training, and docs right in your team’s hands—on-site and offline.";
  const ctaText = "Get a Demo";
  const ctaLink = "https://hub.sytis.com/wombat-access";

  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "1rem",
        maxWidth: "320px",
        position: "relative",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        zIndex: 1000,
      }}
    >
      {/* Close button */}
      <button
        onClick={() => toast.dismiss()}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "transparent",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
          color: "#888",
        }}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Content */}
      <h4 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>{title}</h4>
      <p style={{ margin: "0 0 1rem", fontSize: "0.95rem", lineHeight: 1.4 }}>
        {message}
      </p>

      {/* CTA Button */}
      <a
        href={ctaLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          background: "#0070f3",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "0.95rem",
        }}
      >
        {ctaText}
      </a>
    </div>
  );
};

export default WombatToast;
