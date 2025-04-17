import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import SytisBlogPostPageContainer from "@/components/SytisBlogPostPageContainer/SytisBlogPostPageContainer";
import { blogDetails } from "@/data/sidebarPageContainerTwo";
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
  let blogPosts = [];

  try {
    const json = await fetchWithRetry(
      `${process.env.API_URL}/api/blog-posts`,
      5,
      1000 * 60
    ); // Retries 5 times with 60-second delay
    blogPosts = json.data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      paths: [],
      fallback: "blocking", // fallback blocking if fetching fails
    };
  }

  const paths = blogPosts.map((post) => ({
    params: { slug: post.url }, // Generate slugs from custom URLs
  }));

  return {
    paths,
    fallback: "blocking", // Ensures new pages are generated on request
  };
}

// getStaticProps with retry logic
export async function getStaticProps({ params }) {
  let blogPosts = [];

  try {
    const json = await fetchWithRetry(
      `${process.env.API_URL}/api/blog-posts`,
      5,
      1000 * 60
    ); // Retries 5 times with 60-second delay
    blogPosts = json.data;

    // Check if json.data is defined and is an array
    if (!Array.isArray(blogPosts)) {
      return { notFound: true };
    }
  } catch (error) {
    console.error("Error fetching blog post data:", error);
    return { notFound: true };
  }

  const post = blogPosts.find((p) => p.url.includes(params.slug));

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post, blogPosts },
    revalidate: 60 * 60, // Revalidates every 60 minutes
  };
}

const SYTISBlogSingle = ({ post, blogPosts }) => {
  return (
    <Layout pageTitle={post.title}>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner
        title={post.title}
        page={post.title}
        parent="blog"
        parentHref="/blog"
      />
      <SytisBlogPostPageContainer post={post} blogPosts={blogPosts} isDetails />
      <MainFooter />
    </Layout>
  );
};

export default SYTISBlogSingle;
