import React, { useEffect, useState } from "react";
import bg from "@/images/background/sytis-image-7.jpg";
import Link from "next/link";

const PageBanner = ({
  title = "",
  page = "",
  parent = "",
  parentHref = "/",
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    (<section className="page-banner">
      <div
        className="image-layer"
        style={{ backgroundImage: `url(${bg.src})` }}
      ></div>
      <div className="shape-1"></div>
      <div className="shape-2"></div>
      <div className="banner-inner">
        <div className="auto-container">
          <div
            className="inner-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: isMobile ? "center" : "center",
              textAlign: isMobile ? "center" : "center",
              gap: "16px",
            }}
          >
            <h1 style={{ margin: 0 }}>{title}</h1>
            <div className="page-nav" style={{ width: "100%" }}>
              <ul
                className="bread-crumb clearfix"
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "center" : "center",
                  justifyContent: isMobile ? "center" : "center",
                  gap: "8px",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  textAlign: isMobile ? "center" : "center",
                }}
              >
                <li>
                  <Link href="/" legacyBehavior>Home</Link>
                </li>
                {parent && (
                  <li>
                    <Link href={parentHref} legacyBehavior>{parent}</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>)
  );
};

export default PageBanner;
