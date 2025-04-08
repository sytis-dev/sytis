import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import React, { useEffect } from "react";
import AgencySection from "@/components/SytisContactCTA/AgencySection";
import ContactSection from "@/components/ContactSection/ContactSection";

const Contact = () => {
  // useEffect hook to dynamically load the HubSpot form script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/47869494.js";
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout pageTitle="Contact">
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Contact" />
      <ContactSection />
      <AgencySection />

      {/* Contact Section with the HubSpot form embedded */}
      <div
        className="contact-section"
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
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

      <MainFooter />
    </Layout>
  );
};

export default Contact;
