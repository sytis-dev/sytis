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
      `${process.env.API_URL}/api/solutions`,
      5,
      1000 * 60  // 60 seconds for BigCommerce rate limiting
    );
    const solutions = json.data || [];

    return {
      props: { solutions },
      // No revalidate property = static build at build time
    };
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return {
      props: { solutions: [] },
    };
  }
}

const Solutions = ({ solutions = [] }) => {
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
      <SYTISSolutions solutions={solutions} />
      <MainFooter />
    </Layout>
  );
};

export default Solutions;
