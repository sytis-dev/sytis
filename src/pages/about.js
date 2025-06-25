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
import Head from "next/head";

const About = () => {
  return (
    <Layout pageTitle="About Us">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | About</title>
        <meta
          name="description"
          content="With decades of experience in thermal technology, SYTIS is leading innovation in condition-based monitoring. Learn how we're making critical infrastructure safer worldwide."
        />
        <meta
          property="og:description"
          content="With decades of experience in thermal technology, SYTIS is leading innovation in condition-based monitoring. Learn how we're making critical infrastructure safer worldwide."
        />
        <meta property="og:title" content="SYTIS | About" />
      </Head>
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
