import { useEffect } from "react";
import Script from "next/script";
import Layout from "@/components/Layout/Layout";
import PageBanner from "@/components/BannerSection/PageBanner";
import CallToSection from "@/components/CallToSection/CallToSection";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";

const SolutionInquiry = () => {
  useEffect(() => {
    const loadHubSpotForm = () => {
      if (window.hbspt && !document.querySelector(".hs-form-frame iframe")) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: "47869494",
          formId: "8fbb4fbe-3985-406b-98f7-a53877bc5cdf",
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
      // Cleanup: Prevent multiple script insertions
      script.onload = null;
    };
  }, []);

  return (
    <Layout pageTitle="Solution inquiry">
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Solution inquiry" />

      {/* HubSpot form container */}
      <div className="hs-form-frame"></div>

      <CallToSection />
      <MainFooter />
    </Layout>
  );
};

export default SolutionInquiry;
