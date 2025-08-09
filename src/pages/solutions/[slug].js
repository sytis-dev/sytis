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

import BuildDataCache from "../../utils/buildDataCache.js";

// getStaticPaths with cached data
export async function getStaticPaths() {
  let solutions = [];

  try {
    // Use cached data from solutions index page - no additional API call needed!
    solutions = await BuildDataCache.getSolutions();
    console.log(`🔍 Solutions getStaticPaths: Found ${solutions.length} solutions`);
    
    // Debug: Log solution data structure
    solutions.forEach((solution, index) => {
      console.log(`🔍 Solution ${index + 1}:`, {
        name: solution.name,
        custom_url: solution.custom_url,
        generated_slug: solution.custom_url?.url?.replace(/\//g, "")
      });
    });
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return {
      paths: [],
      fallback: "blocking", // fallback blocking if fetching fails
    };
  }

  // Since solutions don't have custom_url, use name-based slugs instead
  const paths = solutions
    .filter((solution) => solution && solution.name) // Filter out items without name
    .map((solution) => ({
      params: { 
        slug: solution.name
          .toLowerCase()
          .replace(/&/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim()
      },
    }));

  console.log(`🔍 Solutions getStaticPaths: Generated ${paths.length} paths:`, paths.map(p => p.params.slug));

  return {
    paths,
    fallback: false, // All valid pages must be generated at build time
  };
}

// getStaticProps with cached data
export async function getStaticProps({ params }) {
  console.log(`🔍 Solutions getStaticProps: Looking for slug "${params.slug}"`);
  let solutions = [];

  try {
    // Use cached data from solutions index page - no additional API call needed!
    solutions = await BuildDataCache.getSolutions();
    console.log(`🔍 Solutions getStaticProps: Found ${solutions.length} solutions to search`);

    // Check if json.data is defined and is an array
    if (!Array.isArray(solutions)) {
      console.log("❌ Solutions getStaticProps: solutions is not an array");
      return { notFound: true };
    }
  } catch (error) {
    console.error("Error fetching solution data:", error);
    return { notFound: true };
  }

  // Debug: Log all available slugs
  const availableSlugs = solutions
    .filter(s => s && s.name)
    .map(s => s.name.toLowerCase().replace(/&/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim());
  console.log(`🔍 Solutions getStaticProps: Available slugs:`, availableSlugs);

  // Find solution by matching the name-based slug generation logic
  const solution = solutions.find(
    (s) => s && s.name &&
      s.name
        .toLowerCase()
        .replace(/&/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim() === params.slug
  );

  if (!solution) {
    console.log(`❌ Solutions getStaticProps: No solution found for slug "${params.slug}"`);
    console.log(`❌ Available solutions:`, solutions.map(s => ({
      name: s.name,
      generated_slug: s.name?.toLowerCase().replace(/&/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim()
    })));
    return { notFound: true };
  }

  console.log(`✅ Solutions getStaticProps: Found solution "${solution.name}" for slug "${params.slug}"`);
  

  return {
    props: { solution },
    // No revalidate property = static build at build time
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
