import PageBanner from "@/components/BannerSection/PageBanner";
import GridSafeSkidFeaturedSection from "@/components/FeaturedSection/GridSafeSkidFeaturedSection";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import ParallaxSection from "@/components/ParallaxSection/ParallaxSection";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import SponsorsSection from "@/components/SponsorsSection/SponsorsSection";
import TeamThree from "@/components/TeamSection/TeamThree";
import TestimonialsFour from "@/components/TestimonialsSection/TestimonialsFour";
import React from "react";
import CallToSection from "@/components/CallToSection/CallToSection";
import { useEffect } from "react";

const About2 = () => {
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
    <Layout pageTitle="Grid Safe Skid System">
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Grid Safe Skid System" page="Grid Safe Skid System" />
      <GridSafeSkidFeaturedSection className="featured-section__about-two" />
      <SponsorsSection className="sponsors-section__about-two" />
      <div
        className="hs-form-frame"
        style={{
          width: "100%",
          maxWidth: "75%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      ></div>
      <CallToSection />
      <MainFooter />
    </Layout>
  );
};

export default About2;
