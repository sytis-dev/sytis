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

// getStaticPaths with retry logic
export async function getStaticPaths() {
  let applications = [];

  try {
    const json = await fetchWithRetry(
      `${process.env.API_URL}/api/applications`,
      5,
      2000
    ); // Retries 5 times with 2-second delay
    applications = json.data;
    console.log(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const paths = applications.map((app) => ({
    params: {
      slug: app.name
        .toLowerCase()
        .replace(/&/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim(),
    },
  }));

  return {
    paths,
    fallback: "blocking", // Blocking mode to wait for static page build
  };
}

// getStaticProps with retry logic
export async function getStaticProps({ params }) {
  let applications = [];

  try {
    const json = await fetchWithRetry(
      `${process.env.API_URL}/api/applications`,
      5,
      2000
    ); // Retries 5 times with 2-second delay
    applications = json.data;

    // Check if json.data is defined and is an array
    if (!Array.isArray(applications)) {
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
