import PageBanner from "@/components/BannerSection/PageBanner";
import CallToSectionTwo from "@/components/CallToSection/CallToSectionTwo";
import FaqsSection from "@/components/FaqsSection/FaqsSection";
import GetQuoteThree from "@/components/GetQuote/GetQuoteThree";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import React from "react";
import Head from "next/head";

const faq = () => {
  return (
    <Layout pageTitle="FAQs">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | FAQs</title>
        <meta
          name="description"
          content="Explore frequently asked questions about SYTIS condition-based monitoring, safety features and system compatibility."
        />
        <meta
          property="og:description"
          content="Explore frequently asked questions about SYTIS condition-based monitoring, safety features and system compatibility."
        />
        <meta property="og:title" content="SYTIS | FAQs" />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="FAQ" />
      <FaqsSection />
      <CallToSectionTwo className="alternate" />
      <MainFooter />
    </Layout>
  );
};

export default faq;
