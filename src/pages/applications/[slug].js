import PageBanner from "@/components/BannerSection/PageBanner";
import CallToSectionTwo from "@/components/CallToSection/CallToSectionTwo";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import SidebarPageContainer from "@/components/SidebarPageContainer/SidebarPageContainer";
import SYTISApplicationContainer from "@/components/SytisApplicationContainer/SytisApplicationContainer";
import { webDevelopment } from "@/data/sidebarPageContainer";
import React from "react";
import Head from "next/head";

// Helper function for retry logic
const fetchWithRetry = async (url, retries = 5, delay = 1000 * 60) => {
  let attempts = 0;
  while (attempts < retries) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Fetch failed with status: ${res.status}`);
      }
      return await res.json(); // Return the parsed JSON data
    } catch (error) {
      attempts++;
      if (attempts >= retries) {
        throw new Error(`Failed after ${retries} attempts: ${error.message}`);
      }
      console.log(`Retrying... Attempt ${attempts}`);
      await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
    }
  }
};

import BuildDataCache from "../../utils/buildDataCache.js";

// getStaticPaths with cached data
export async function getStaticPaths() {
  let applications = [];

  try {
    // Use cached data from applications index page - no additional API call needed!
    applications = await BuildDataCache.getApplications();
  } catch (error) {
    console.error("Error fetching applications:", error);
    return {
      paths: [],
      fallback: false, // Return 404 for missing pages instead of trying to generate at runtime
    };
  }

  console.log(`🔍 Applications found: ${applications.length}`);
  
  const validApplications = applications.filter((application) => application && application.name);
  console.log(`✅ Valid applications with name: ${validApplications.length}`);
  
  const paths = validApplications.map((application) => {
    const slug = application.name
      .toLowerCase()
      .replace(/&/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    console.log(`📄 Generated application path: /applications/${slug} (from: ${application.name})`);
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false, // All valid pages must be generated at build time
  };
}

// getStaticProps with cached data
export async function getStaticProps({ params }) {
  let applications = [];

  try {
    // Use cached data from applications index page - no additional API call needed!
    applications = await BuildDataCache.getApplications();

    // Check if json.data is defined and is an array
    if (!Array.isArray(applications)) {
      return { notFound: true };
    }
  } catch (error) {
    console.error("Error fetching application data:", error);
    return { notFound: true };
  }

  console.log(`🔍 Looking for application with slug: "${params.slug}"`);
  console.log(`📊 Total applications available: ${applications.length}`);
  
  const application = applications.find(
    (a) => a && a.name && 
      a.name
        .toLowerCase()
        .replace(/&/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim() === params.slug
  );

  if (!application) {
    console.log(`❌ No application found for slug: "${params.slug}"`);
    console.log('Available application slugs:', applications
      .filter(a => a && a.name)
      .map(a => a.name
        .toLowerCase()
        .replace(/&/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      )
    );
    return { notFound: true };
  }
  
  console.log(`✅ Found application: ${application.name}`);

  return {
    props: { application },
    // No revalidate property = static build at build time
  };
}

const Application = ({ application }) => {
  return (
    <Layout pageTitle={application.name}>
      <Head>
        <meta
          name="description"
          content={
            application.meta_description ||
            `Learn more about ${application.name} and how it supports your operations.`
          }
        />
        <meta
          name="og:description"
          content={
            application.meta_description ||
            `Learn more about ${application.name} and how it supports your operations.`
          }
        />
        <meta property="og:title" content={`Sytis | ${application.name}`} />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner
        title={application.name}
        parent="Applications"
        parentHref="/applications"
      />
      <SYTISApplicationContainer
        application={application}
        service={webDevelopment}
      />
      <CallToSectionTwo className="alternate" />
      <MainFooter />
    </Layout>
  );
};
export default Application;
