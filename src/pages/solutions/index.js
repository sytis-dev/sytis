import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import SYTISSolutions from "@/components/ServicesSection/SytisSolutions";
import React from "react";
import Head from "next/head";

const Solutions = () => {
  return (
    <Layout pageTitle="Solutions">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Solutions</title>
        <meta
          name="description"
          content="SYTIS products deliver real-time thermal monitoring and AI-driven alerts to protect critical infrastructure and reduce maintenance costs."
        />
        <meta
          property="og:description"
          content="SYTIS products deliver real-time thermal monitoring and AI-driven alerts to protect critical infrastructure and reduce maintenance costs."
        />
        <meta property="og:title" content="SYTIS | Solutions" />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Solutions" />
      <SYTISSolutions />
      <MainFooter />
    </Layout>
  );
};

export default Solutions;
