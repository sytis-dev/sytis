import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import SytisBlogPostPageContainer from "@/components/SytisBlogPostPageContainer/SytisBlogPostPageContainer";
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
  let blogPosts = [];

  try {
    // Use cached data from articles index page - no additional API call needed!
    blogPosts = await BuildDataCache.getBlogPosts();
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
    fallback: false, // All valid pages must be generated at build time
  };
}

// getStaticProps with cached data
export async function getStaticProps({ params }) {
  let blogPosts = [];

  try {
    // Use cached data from articles index page - no additional API call needed!
    blogPosts = await BuildDataCache.getBlogPosts();

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
    // No revalidate property = static build at build time
  };
}

const SYTISBlogSingle = ({ post, blogPosts }) => {
  return (
    <Layout pageTitle={post.title}>
          <Head>
        <meta
          name="description"
          content={
            post.meta_description ||
            `Learn more about ${post.title} and how it supports your operations.`
          }
        />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner
        title={post.title}
        page={post.title}
        parent="articles"
        parentHref="/articles"
      />
      <SytisBlogPostPageContainer post={post} blogPosts={blogPosts} isDetails />
      <MainFooter />
    </Layout>
  );
};

export default SYTISBlogSingle;
