import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import SytisApplications from "@/components/ServicesSection//SytisApplications";
import React from "react";

const Applications = () => {
  return (
    <Layout pageTitle="Applications">
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Applications" />
      <SytisApplications />
      <MainFooter />
    </Layout>
  );
};

export default Applications;
