import AboutSectionTwo from "@/components/AboutSection/AboutSectionTwo";
import BannerThree from "@/components/BannerSection/BannerThree";
import CallToSectionTwo from "@/components/CallToSection/CallToSectionTwo";
import DiscoverSection from "@/components/DiscoverSection/DiscoverSection";
import FeaturesSectionTwo from "@/components/SytisFeaturedSolution/FeaturesSectionTwo";
import GallerySection from "@/components/GallerySection/GallerySection";
import GetQuoteTwo from "@/components/GetQuote/GetQuoteTwo";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import MapSection from "@/components/MapSection/MapSection";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import ServicesSectionThree from "@/components/ServicesSection/ServicesSectionThree";
import SponsorsSectionTwo from "@/components/SponsorsSection/SponsorsSectionTwo";
import TestimonialsSectionTwo from "@/components/TestimonialsSection/TestimonialsSectionTwo";
import WeWorkSection from "@/components/WeWorkSection/WeWorkSection";
import React from "react";
import FeaturedSection from "@/components/FeaturedSection/FeaturedSection";
import SponsorsSection from "@/components/SponsorsSection/SponsorsSection";
import NewsSection from "@/components/NewsSection/NewsSection";
import CallToSection from "@/components/CallToSection/CallToSection";
import SYTISBlog from "@/components/NewsSection/SytisBlog";
import Head from "next/head";

const Home3 = () => {
  return (
    <Layout pageTitle="Home">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Home</title>
        <meta
          name="description"
          content="SYTIS redefines predictive maintenance with wireless thermal imaging and AI alerts for utility and industrial systems. Predict, prevent and protect with condition-based monitoring."
        />
        <meta
          property="og:description"
          content="SYTIS redefines predictive maintenance with wireless thermal imaging and AI alerts for utility and industrial systems. Predict, prevent and protect with condition-based monitoring."
        />
        <meta
          property="og:title"
          content="Sytis | Home"
        />
      </Head>
      <Style />
      <HeaderOne headerStyle="header-style-two" logo={4} />
      <MobileMenu />
      <SearchPopup />
      <BannerThree
        style={{ paddingTop: "1000px" }} // adjust if your top bar is taller/shorter
      />
      {/* <CallToSectionTwo btnClassName="btn-style-one" /> */}

      <ServicesSectionThree />
      <FeaturesSectionTwo />
      <FeaturedSection className="featured-section__about-two" />
      <SponsorsSection className="sponsors-section__about-two" />
      <DiscoverSection />
      {/* <GetQuoteTwo /> */}
      {/* <WeWorkSection /> */}
      <TestimonialsSectionTwo />

      <AboutSectionTwo />
      <SYTISBlog showTitle={true} />
      {/* <GallerySection carousel="project-carousel-two" className="alternate" /> */}

      {/* <MapSection /> */}
      {/* <SponsorsSectionTwo /> */}
      <CallToSection />
      <MainFooter normalPadding={true} />
    </Layout>
  );
};

export default Home3;
