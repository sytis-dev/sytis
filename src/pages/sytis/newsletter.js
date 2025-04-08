import { useEffect } from "react";
import Layout from "@/components/Layout/Layout"; // Assuming your layout component is here
import PageBanner from "@/components/BannerSection/PageBanner";
import CallToSection from "@/components/CallToSection/CallToSection";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup"; // Assuming your page banner component is here

const NewsletterSignUp = () => {
  useEffect(() => {
    const loadHubSpotForm = () => {
      if (window.hbspt && !document.querySelector(".hs-form-frame iframe")) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: "47869494",
          formId: "dfda3382-7205-4031-8452-847a18232e12",
          target: ".hs-form-frame",
        });
      }
    };

    // Wait for the HubSpot script to load before running form creation
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/v2.js";
    script.async = true;
    script.onload = loadHubSpotForm;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  return (
    <Layout pageTitle="Newsletter Signup">
      <PageBanner title="Newsletter Signup" />
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <div className="auto-container">
        <div className="hs-form-frame"></div>
      </div>
      <CallToSection />
      <MainFooter />
    </Layout>
  );
};

export default NewsletterSignUp;
