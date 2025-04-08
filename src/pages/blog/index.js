import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import NewsSection from "@/components/NewsSection/NewsSection";
import SYTISBlog from "@/components/NewsSection/SytisBlog";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import React from "react";

const BlogGrid = () => {
  return (
    <Layout pageTitle="Blog Posts">
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Blog" />
      <SYTISBlog showTitle={false} />
      <MainFooter />
    </Layout>
  );
};

export default BlogGrid;
