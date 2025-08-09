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
    console.log(`🔍 Articles getStaticPaths: Found ${blogPosts.length} blog posts`);
    
    // Debug: Log blog post data structure
    blogPosts.forEach((post, index) => {
      console.log(`🔍 Blog Post ${index + 1}:`, {
        title: post.title,
        url: post.url,
        encoded_slug: encodeURIComponent(post.url || '')
      });
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      paths: [],
      fallback: "blocking", // fallback blocking if fetching fails
    };
  }

  const paths = blogPosts
    .filter((post) => post && post.url) // Ensure post has URL
    .map((post) => ({
      params: { slug: encodeURIComponent(post.url) }, // Encode URLs for Next.js routing
    }));

  console.log(`🔍 Articles getStaticPaths: Generated ${paths.length} paths:`, paths.map(p => p.params.slug));

  return {
    paths,
    fallback: false, // All valid pages must be generated at build time
  };
}

// getStaticProps with cached data
export async function getStaticProps({ params }) {
  console.log(`🔍 Articles getStaticProps: Looking for slug "${params.slug}"`);
  let blogPosts = [];

  try {
    // Use cached data from articles index page - no additional API call needed!
    blogPosts = await BuildDataCache.getBlogPosts();
    console.log(`🔍 Articles getStaticProps: Found ${blogPosts.length} blog posts to search`);

    // Check if json.data is defined and is an array
    if (!Array.isArray(blogPosts)) {
      console.log("❌ Articles getStaticProps: blogPosts is not an array");
      return { notFound: true };
    }
  } catch (error) {
    console.error("Error fetching blog post data:", error);
    return { notFound: true };
  }

  // Debug: Log incoming slug and decoding attempts
  console.log(`🔍 Articles getStaticProps: Raw slug: "${params.slug}"`);
  try {
    const decodedSlug = decodeURIComponent(params.slug);
    console.log(`🔍 Articles getStaticProps: Decoded slug: "${decodedSlug}"`);
  } catch (e) {
    console.log(`🔍 Articles getStaticProps: Failed to decode slug: ${e.message}`);
  }

  // Debug: Log all available URLs
  const availableUrls = blogPosts.filter(p => p && p.url).map(p => p.url);
  console.log(`🔍 Articles getStaticProps: Available URLs:`, availableUrls);

  // Find post by exact URL match (handling URL encoding)
  const post = blogPosts.find((p) => {
    if (!p.url) return false;
    
    // Try exact match first
    const exactMatch = p.url === params.slug;
    if (exactMatch) {
      console.log(`✅ Articles getStaticProps: Found exact match with URL "${p.url}"`);
      return true;
    }
    
    // Try decoded match for URL-encoded slugs
    try {
      const decodedSlug = decodeURIComponent(params.slug);
      const decodedMatch = p.url === decodedSlug;
      if (decodedMatch) {
        console.log(`✅ Articles getStaticProps: Found decoded match with URL "${p.url}"`);
        return true;
      }
    } catch (e) {
      console.log(`🔍 Articles getStaticProps: Failed to decode for comparison: ${e.message}`);
    }
    
    return false;
  });

  if (!post) {
    console.log(`❌ Articles getStaticProps: No post found for slug "${params.slug}"`);
    console.log(`❌ Available posts:`, blogPosts.map(p => ({
      title: p.title,
      url: p.url,
      encoded: encodeURIComponent(p.url || '')
    })));
    return { notFound: true };
  }

  console.log(`✅ Articles getStaticProps: Found post "${post.title}" for slug "${params.slug}"`);
  

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
