import PageBanner from "@/components/BannerSection/PageBanner";
import EventsDetails from "@/components/EventsSection/EventsDetails";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import React from "react";
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <Layout pageTitle="SYTIS | Terms of Use">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Terms of Use</title>
        <meta
          name="description"
          content="Review the terms of use for SYTIS' software and services. Learn about your rights and responsibilities as a site visitor."
        />
        <meta
          property="og:description"
          content="Review the terms of use for SYTIS' software and services. Learn about your rights and responsibilities as a site visitor."
        />
        <meta property="og:title" content="Sytis | Terms of Use" />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Terms of Use" parent="" parentHref="" />
      <MainFooter />
    </Layout>
  );
};

export default PrivacyPolicy;
