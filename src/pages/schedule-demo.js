import { useEffect } from "react";
import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import SponsorsSectionTwo from "@/components/SponsorsSection/SponsorsSectionTwo";
import CallToSection from "@/components/CallToSection/CallToSection";
import React from "react";
import Head from "next/head";
import { Col, Row, Container } from "react-bootstrap";

const ScheduleDemo = () => {
  useEffect(() => {
    const loadHubSpotForm = () => {
      if (window.hbspt && !document.querySelector(".hs-form-frame iframe")) {
        window.hbspt.forms.create({
          region: "na2",
          portalId: "47869494",
          formId: "95bd44b8-db7c-4201-9cc0-9cc6270b0966",
          target: ".hs-form-frame",
        });
      }
    };

    // Wait for the HubSpot script to load before running form creation
    const script = document.createElement("script");
    script.src = "https://js-na2.hsforms.net/forms/embed/v2.js";
    script.async = true;
    script.onload = loadHubSpotForm;
    document.body.appendChild(script);

    return () => {
      // Cleanup: Prevent multiple script insertions
      script.onload = null;
    };
  }, []);

  return (
    <Layout pageTitle="Schedule Demo">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Schedule Demo</title>
        <meta
          name="description"
          content="Schedule a personalized demo of SYTIS thermal monitoring solutions. See how our advanced technology can protect your critical infrastructure."
        />
        <meta
          property="og:description"
          content="Schedule a personalized demo of SYTIS thermal monitoring solutions. See how our advanced technology can protect your critical infrastructure."
        />
        <meta property="og:title" content="SYTIS | Schedule Demo" />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Schedule Demo" page="Schedule Demo" />
      
      {/* Main Content Section with 25% content / 75% HubSpot form */}
      <section className="schedule-demo-section" style={{ padding: "80px 0", backgroundColor: "#fff" }}>
        <div className="auto-container">
          <Row className="clearfix">
            {/* 25% Content Column */}
            <Col lg={3} md={12} className="content-col">
              <div className="content-block" style={{ 
                paddingRight: "0px",
                paddingLeft: "0px",
                marginLeft: "-20px"
              }}>
                <h2 style={{ 
                  fontSize: "40px", 
                  color: "#333", 
                  marginBottom: "20px",
                  lineHeight: "1.2",
                  textAlign: "left"
                }}>
                  REVOLUTIONIZE CONDITION-BASED MAINTENANCE
                  THROUGH SYNERGISTIC REMOTE THERMOGRAPHY.
                </h2>
              </div>
            </Col>

            {/* 75% HubSpot Form Column */}
            <Col lg={9} md={12} className="form-col">
              <div className="form-container">
                {/* HubSpot Form Embed */}
                <div className="hs-form-frame"></div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Predict. Prevent. Protect. Section */}
      <section className="predict-prevent-protect-section" style={{ 
        backgroundColor: "#d32f2f", 
        padding: "80px 0",
        color: "white",
        position: "relative"
      }}>
        {/* Textured Overlay */}
        <div style={{
          position: "absolute",
          right: "0",
          top: "0",
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          backgroundImage: `url(${require('@/images/main-slider/banner-bg-shape-3.png').default.src})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: "1",
          opacity: "0.07"
        }}></div>
        <div className="auto-container" style={{ position: "relative", zIndex: "2" }}>
          <div className="text-center" style={{ marginBottom: "50px" }}>
            <h2 style={{ 
              fontSize: "52px", 
              marginBottom: "20px",
              lineHeight: "1.2",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white"
            }}>
              <span style={{ display: "block", textAlign: "center", color: "white" }}>PREDICT.</span>
              <span style={{ display: "block", textAlign: "center", color: "white" }}>PREVENT.</span>
              <span style={{ display: "block", textAlign: "center", color: "white" }}>PROTECT.</span>
            </h2>
            <p style={{ 
              fontSize: "18px", 
              lineHeight: "1.6",
              maxWidth: "800px",
              margin: "0 auto 30px"
            }}>
              At SYTIS, we help you make the invisible visible. From turbines and substations to BESS and transformers, our technology uncovers hidden information in unreachable assets. With actionable intelligence, helping you cut costs, save time and keep your people out of harm's way.
            </p>
            <div className="link-box">
              <a className="theme-btn btn-style-two" href="#" style={{ backgroundColor: "#4682b4" }}>
                <i className="btn-curve"></i>
                <span className="btn-title">DISCOVER MORE</span>
              </a>
            </div>
          </div>
          
          <Row className="clearfix">
            <Col lg={4} md={6} sm={12} className="feature-box">
              <div style={{ 
                backgroundColor: "white", 
                padding: "30px", 
                borderRadius: "10px",
                textAlign: "left",
                height: "100%",
                position: "relative"
              }}>
                <div style={{ 
                  fontSize: "24px", 
                  marginBottom: "20px",
                  color: "#d32f2f",
                  position: "absolute",
                  top: "20px",
                  left: "20px"
                }}>⚙️</div>
                <div style={{ paddingTop: "40px" }}>
                  <h4 style={{ 
                    fontSize: "18px", 
                    fontWeight: "700", 
                    color: "#333",
                    marginBottom: "15px",
                    textAlign: "left"
                  }}>
                    REVOLUTIONARY TECHNOLOGY
                  </h4>
                  <p style={{ 
                    fontSize: "14px", 
                    color: "#666",
                    lineHeight: "1.5",
                    textAlign: "left"
                  }}>
                    Condition-based maintenance for your nacelle is available for the first time ever.
                  </p>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6} sm={12} className="feature-box">
              <div style={{ 
                backgroundColor: "white", 
                padding: "30px", 
                borderRadius: "10px",
                textAlign: "left",
                height: "100%",
                position: "relative"
              }}>
                <div style={{ 
                  fontSize: "24px", 
                  marginBottom: "20px",
                  color: "#d32f2f",
                  position: "absolute",
                  top: "20px",
                  left: "20px"
                }}>🛡️</div>
                <div style={{ paddingTop: "40px" }}>
                  <h4 style={{ 
                    fontSize: "18px", 
                    fontWeight: "700", 
                    color: "#333",
                    marginBottom: "15px",
                    textAlign: "left"
                  }}>
                    PROTECTING YOUR INVESTMENT
                  </h4>
                  <p style={{ 
                    fontSize: "14px", 
                    color: "#666",
                    lineHeight: "1.5",
                    textAlign: "left"
                  }}>
                    The most cost-effective way to safeguard your mission-critical assets.
                  </p>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6} sm={12} className="feature-box">
              <div style={{ 
                backgroundColor: "white", 
                padding: "30px", 
                borderRadius: "10px",
                textAlign: "left",
                height: "100%",
                position: "relative"
              }}>
                <div style={{ 
                  fontSize: "24px", 
                  marginBottom: "20px",
                  color: "#d32f2f",
                  position: "absolute",
                  top: "20px",
                  left: "20px"
                }}>🕐</div>
                <div style={{ paddingTop: "40px" }}>
                  <h4 style={{ 
                    fontSize: "18px", 
                    fontWeight: "700", 
                    color: "#333",
                    marginBottom: "15px",
                    textAlign: "left"
                  }}>
                    PEACE OF MIND 24/7
                  </h4>
                  <p style={{ 
                    fontSize: "14px", 
                    color: "#666",
                    lineHeight: "1.5",
                    textAlign: "left"
                  }}>
                    Knowing what's going on inside your nacelle has never been this easy.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <SponsorsSectionTwo />
      <CallToSection />
      <MainFooter normalPadding={false} />
    </Layout>
  );
};

export default ScheduleDemo;
