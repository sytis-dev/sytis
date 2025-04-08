import PageBanner from "@/components/BannerSection/PageBanner";
import FeaturedSection from "@/components/FeaturedSection/FeaturedSection";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import ParallaxSection from "@/components/ParallaxSection/ParallaxSection";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import SponsorsSectionTwo from "@/components/SponsorsSection/SponsorsSectionTwo";
import TeamThree from "@/components/TeamSection/TeamThree";
import TestimonialsFour from "@/components/TestimonialsSection/TestimonialsFour";
import React from "react";
import VideoOne from "@/components/VideoSection/VideoOne";
import FunFacts from "@/components/FunFacts/FunFacts";
import WeWorkSection from "@/components/WeWorkSection/WeWorkSection";
import CallToSection from "@/components/CallToSection/CallToSection";


const About = () => {
  return (
    <Layout pageTitle="About Us">
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="About" page="About" />
      <VideoOne />
      <FunFacts />
      <WeWorkSection />
      <ParallaxSection />
      <SponsorsSectionTwo />
      {/* <TeamThree showTitle={true} items={8} /> */}
      <CallToSection />
      <MainFooter normalPadding={false} />
    </Layout>
  );
};

export default About;
