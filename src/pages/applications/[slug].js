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

import { shouldSkipBuildApiCalls, safeBuildApiCall, limitStaticPaths } from '../../lib/buildSafetyUtils';

// getStaticPaths with build safety
export async function getStaticPaths() {
  // Skip API calls during build if needed
  if (shouldSkipBuildApiCalls()) {
    console.log('🚫 Skipping applications static path generation');
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  let applications = [];

  try {
    applications = await safeBuildApiCall('applications', []);
    
    // Limit the number of pages generated at build time
    applications = limitStaticPaths(applications, 'applications');
    
  } catch (error) {
    console.error("Error fetching applications:", error);
    return {
      paths: [],
      fallback: "blocking", // fallback blocking if fetching fails
    };
  }

  const paths = applications
    .filter((application) => application.custom_url && application.custom_url.url) // Filter out items without custom_url
    .map((application) => ({
      params: { slug: application.custom_url.url.replace(/\//g, "") }, // Generate slugs from custom URLs
    }));

  return {
    paths,
    fallback: "blocking", // Ensures new pages are generated on request
  };
}

// getStaticProps with runtime API calls
export async function getStaticProps({ params }) {
  let applications = [];

  try {
    // At runtime (when user visits), make API call to the deployed endpoint
    // We know we're at runtime because getStaticProps with fallback: "blocking" 
    // only runs when a user actually visits the page
    
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'https://sytis-qzu7jtjzh-tech-savagery.vercel.app'; // Use your preview URL as fallback
    
    console.log(`🔄 Runtime: Fetching applications from ${baseUrl}/api/applications`);
    
    const response = await fetch(`${baseUrl}/api/applications`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`API call failed: ${response.status} ${response.statusText}`);
      throw new Error(`API call failed: ${response.status}`);
    }
    
    const data = await response.json();
    applications = data?.data || [];

    console.log(`✅ Runtime: Fetched ${applications.length} applications`);

    // Check if applications data is valid
    if (!Array.isArray(applications)) {
      console.error('Applications data is not an array:', applications);
      return { notFound: true };
    }
  } catch (error) {
    console.error("Error fetching application data:", error);
    return { notFound: true };
  }

  const application = applications.find(
    (a) =>
      a.name
        .toLowerCase()
        .replace(/&/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim() === params.slug
  );

  if (!application) {
    return { notFound: true };
  }

  return {
    props: { application },
    revalidate: 60 * 60, // Revalidates every 60 minutes
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
