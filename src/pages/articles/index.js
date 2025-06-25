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
import Head from "next/head";

const BlogGrid = () => {
  return (
    <Layout pageTitle="Articles">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Articles</title>
        <meta
          name="description"
          content="Stay ahead with expert articles from SYTIS on AI-driven thermal monitoring, electrical asset protection and safety innovations."
        />
        <meta
          property="og:description"
          content="Stay ahead with expert articles from SYTIS on AI-driven thermal monitoring, electrical asset protection and safety innovations."
        />
        <meta property="og:title" content="SYTIS | Articles" />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Articles" />
      <SYTISBlog showTitle={false} />
      <MainFooter />
    </Layout>
  );
};

export default BlogGrid;
