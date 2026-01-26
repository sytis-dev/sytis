import PageBanner from "@/components/BannerSection/PageBanner";
import FormSection from "@/components/ContactSection/FormSection";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import Head from "next/head";
import React from "react";

const RequestDemo = () => {
  return (
    <Layout pageTitle="Request a Demo" showPreloader={true}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Request a Demo</title>
        <meta
          name="description"
          content="Request a demo of SYTIS solutions. Share a few details and our team will follow up."
        />
        <meta
          property="og:description"
          content="Request a demo of SYTIS solutions. Share a few details and our team will follow up."
        />
        <meta property="og:title" content="SYTIS | Request a Demo" />
      </Head>

      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Request a Demo" />

      <FormSection
        title="Request a Demo"
        region="na2"
        formId="ced6c0be-5aeb-44e1-a828-77ea9b94349e"
        portalId="47869494"
        scriptSrc="https://js-na2.hsforms.net/forms/embed/developer/47869494.js"
        embedClassName="hs-form-html"
      />

      <MainFooter />
    </Layout>
  );
};

export default RequestDemo;

