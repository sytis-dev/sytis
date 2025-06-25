import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import React from "react";
import Head from "next/head";

const CookiePolicy = () => {
  return (
    <Layout pageTitle="SYTIS | Cookie Policy">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Cookie Policy</title>
        <meta
          name="description"
          content="This Cookie Policy explains how SYTIS and its partners use cookies and similar technologies to operate and improve our site, enable features, and support marketing."
        />
        <meta
          property="og:description"
          content="This Cookie Policy explains how SYTIS and its partners use cookies and similar technologies to operate and improve our site, enable features, and support marketing."
        />
        <meta property="og:title" content="SYTIS | Cookie Policy" />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Cookie Policy" parent="" parentHref="" />
      <div
        style={{
          lineHeight: 1.6,
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Cookie Policy</h2>
        <p>
          This site uses cookies and similar technologies, including those from third parties,
          to operate and improve the site, enable features like social media, support marketing efforts,
          and collect usage data.
        </p>
        <p>
          We and our partners use this data to analyze performance, understand user interactions,
          personalize experiences, and deliver relevant content and ads here and on third-party sites.
        </p>
        <p>
          You can review or change your cookie preferences at any time by clicking on Cookie Settings.
          Certain cookies are necessary for the core functionality of the website, while others help us
          improve the user experience or provide personalized content.
        </p>
        <p>
          By continuing to use this site, you consent to our use of cookies as described in this policy.
        </p>
      </div>
      <MainFooter />
    </Layout>
  );
};

export default CookiePolicy;
