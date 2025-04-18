import PageBanner from "@/components/BannerSection/PageBanner";
import EventsDetails from "@/components/EventsSection/EventsDetails";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <Layout pageTitle="SYTIS | Terms of Use">
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
