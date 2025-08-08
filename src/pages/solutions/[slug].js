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
import ProductCategory from "@/components/ShopPage/ProductCategory";
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
    console.log('🚫 Skipping solutions static path generation');
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  let solutions = [];

  try {
    solutions = await safeBuildApiCall('solutions', []);
    
    // Limit the number of pages generated at build time
    solutions = limitStaticPaths(solutions, 'solutions');
    
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return {
      paths: [],
      fallback: "blocking", // fallback blocking if fetching fails
    };
  }

  const paths = solutions
    .filter((solution) => solution && solution.custom_url && solution.custom_url.url) // Filter out items without custom_url
    .map((solution) => ({
      params: { slug: solution.custom_url.url.replace(/\//g, "") }, // Generate slugs from custom URLs
    }));

  return {
    paths,
    fallback: "blocking", // Ensures new pages are generated on request
  };
}

// getStaticProps with build safety
export async function getStaticProps({ params }) {
  // Skip API calls during build if needed
  if (shouldSkipBuildApiCalls()) {
    return { notFound: true };
  }

  let solutions = [];

  try {
    solutions = await safeBuildApiCall('solutions', []);

    // Check if solutions data is valid
    if (!Array.isArray(solutions)) {
      return { notFound: true };
    }
  } catch (error) {
    console.error("Error fetching solution data:", error);
    return { notFound: true };
  }

  const solution = solutions.find(
    (a) => a && a.name &&
      a.name
        .toLowerCase()
        .replace(/&/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim() === params.slug
  );

  if (!solution) {
    return { notFound: true };
  }

  return {
    props: { solution },
    revalidate: 60 * 60, // Revalidates every 60 minutes
  };
}

const Solution = ({ solution }) => {
  // Safe fallbacks for solution data
  const safeSolution = solution || {};
  const safeName = safeSolution.name || 'Solution';
  const safeMetaDescription = safeSolution.meta_description || safeSolution.description || `Learn more about ${safeName} and how it supports your operations.`;
  const safeProducts = Array.isArray(safeSolution.products) ? safeSolution.products : [];
  const safeDescription = safeSolution.description || '';

  return (
    <Layout pageTitle={safeName}>
      <Head>
        <meta
          name="description"
          content={safeMetaDescription}
        />
        <meta
          name="og:description"
          content={safeMetaDescription}
        />
        <meta property="og:title" content={`Sytis | ${safeName}`} />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner
        title={safeName}
        parent="Solutions"
        parentHref="/solutions"
      />
      <ProductCategory 
        products={safeProducts} 
        categoryName={safeName} 
        categoryDescription={safeDescription} 
      />
      <CallToSectionTwo className="alternate" />
      <MainFooter />
    </Layout>
  );
};

export default Solution;
