import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import SYTISSolutions from "@/components/ServicesSection/SytisSolutions";
import React from "react";

const Solutions = () => {
  return (
    <Layout pageTitle="Solutions">
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
