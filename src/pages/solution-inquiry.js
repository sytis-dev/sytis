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
import Head from "next/head";

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
    <Layout pageTitle="Solution inquiry" showPreloader={true}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Solution Inquiry</title>
        <meta
          name="description"
          content="Request a custom thermal monitoring solution from SYTIS. Our experts will help you find the right system for your critical infrastructure."
        />
        <meta
          property="og:description"
          content="Request a custom thermal monitoring solution from SYTIS. Our experts will help you find the right system for your critical infrastructure."
        />
        <meta property="og:title" content="SYTIS | Solution Inquiry" />
      </Head>
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
