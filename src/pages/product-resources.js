import PageBanner from "@/components/BannerSection/PageBanner";
import CallToSectionTwo from "@/components/CallToSection/CallToSectionTwo";
import ProductResource from "@/components/FaqsSection/ProductResource";
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
    <Layout pageTitle="Product Resources">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Product Resources</title>
        <meta
          name="description"
          content="Access manuals, spec sheets, software downloads, and product guides for SYTIS thermal imaging systems and monitoring solutions."
        />
        <meta
          property="og:description"
          content="Access manuals, spec sheets, software downloads, and product guides for SYTIS thermal imaging systems and monitoring solutions."
        />
        <meta property="og:title" content="SYTIS | Product Resources" />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Product Resources" />
      <ProductResource />
      <CallToSectionTwo className="alternate" />
      <MainFooter />
    </Layout>
  );
};

export default faq;
