import { useEffect } from "react";
import Layout from "@/components/Layout/Layout"; // Assuming your layout component is here
import PageBanner from "@/components/BannerSection/PageBanner";
import CallToSection from "@/components/CallToSection/CallToSection";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup"; // Assuming your page banner component is here
import Head from "next/head"; // Assuming you are using Next.js for SEO and head management

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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Newsletter Signup</title>
        <meta
          name="description"
          content="Sign up for SYTIS' newsletter to get the latest news and updates right in your inbox."
        />
        <meta
          property="og:description"
          content="Sign up for SYTIS' newsletter to get the latest news and updates right in your inbox."
        />
        <meta property="og:title" content="Sytis | Newsletter Signup" />
      </Head>
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
