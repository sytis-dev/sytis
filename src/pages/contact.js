import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import React from "react";
import AgencySection from "@/components/SytisContactCTA/AgencySection";
import FormSection from "@/components/ContactSection/FormSection";
import ConnectWithUs from "@/components/ContactSection/ConnectWithUs";
import ConnectWithPartners from "@/components/ContactSection/ConnectWithPartners";
import Head from "next/head";

const Contact = () => {

  return (
    <Layout pageTitle="Contact" showPreloader={true}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Contact</title>
        <meta
          name="description"
          content="Get in touch with the experts at SYTIS for a quote or with any questions."
        />
        <meta
          property="og:description"
          content="Get in touch with the experts at SYTIS for a quote or with any questions."
        />
        <meta property="og:title" content="SYTIS | Contact" />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Contact" />
      
      {/* 1. Form Section */}
      <FormSection />
      
      {/* 2. Contact Us Section */}
      <ConnectWithUs />
      
      {/* 3. Agency Section */}
      <AgencySection />
      
      {/* 4. Connect with our partners section */}
      <ConnectWithPartners />

      <MainFooter />
    </Layout>
  );
};

export default Contact;
