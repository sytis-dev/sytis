import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import SytisApplications from "@/components/ServicesSection//SytisApplications";
import React from "react";
import Head from "next/head";

import BuildDataCache from "../../utils/buildDataCache.js";

export async function getStaticProps() {
  try {
    // Use shared cache to fetch applications data
    const applications = await BuildDataCache.getApplications();

    return {
      props: { applications },
      // No revalidate property = static build at build time
    };
  } catch (error) {
    console.error("Error fetching applications:", error);
    return {
      props: { applications: [] },
    };
  }
}

const Applications = ({ applications = [] }) => {
  return (
    <Layout pageTitle="Applications">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Applications</title>
        <meta
          name="description"
          content="Explore real-world applications of SYTIS solutions—from electrical panel monitoring and fire detection to infrastructure protection."
        />
        <meta
          property="og:description"
          content="Explore real-world applications of SYTIS solutions—from electrical panel monitoring and fire detection to infrastructure protection."
        />
        <meta property="og:title" content="SYTIS | Applications" />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Applications" />
      <SytisApplications applications={applications} />
      <MainFooter />
    </Layout>
  );
};

export default Applications;
