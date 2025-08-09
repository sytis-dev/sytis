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

// Simple retry utility function for API calls
async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

export async function getStaticProps() {
  try {
    const json = await fetchWithRetry(
      `${process.env.API_URL}/api/applications`,
      5,
      1000 * 60  // 60 seconds for BigCommerce rate limiting
    );
    const applications = json.data || [];

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
