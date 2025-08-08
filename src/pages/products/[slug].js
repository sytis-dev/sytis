import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import ProductDetailsPage from "@/components/ProductDetails/ProductDetailsPage";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
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

// getStaticPaths with retry logic
export async function getStaticPaths() {
  let products = [];

  try {
    const json = await fetchWithRetry(
      `${process.env.API_URL}/api/products`,
      5,
      1000 * 30
    ); // Retries 5 times with 30-second delay
    products = json.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      paths: [],
      fallback: "blocking", // fallback blocking if fetching fails
    };
  }

  const paths = products
    .filter((product) => product && product.custom_url && product.custom_url.url) // Filter out items without custom_url
    .map((product) => ({
      params: { slug: product.custom_url.url.replace(/\//g, "") }, // Generate slugs from custom URLs
    }));

  return {
    paths,
    fallback: "blocking", // Ensures new pages are generated on request
  };
}

// getStaticProps with retry logic
export async function getStaticProps({ params }) {
  let products = [];

  try {
    const json = await fetchWithRetry(
      `${process.env.API_URL}/api/products`,
      5,
      1000 * 30
    ); // Retries 5 times with 30-second delay
    products = json.data || [];

    // Check if json.data is defined and is an array
    if (!Array.isArray(products)) {
      return { notFound: true };
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
    return { notFound: true };
  }

  const product = products.find(
    (p) => p && p.custom_url && p.custom_url.url && p.custom_url.url.replace(/\//g, "") === params.slug
  );

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
    revalidate: 60 * 60, // Revalidates every 60 minutes
  };
}

const ProductDetails = ({ product }) => {
  // Safe fallbacks for product data
  const safeProduct = product || {};
  const safeName = safeProduct.name || safeProduct.product_name || safeProduct.title || 'Product';
  const safeMetaDescription = safeProduct.meta_description || safeProduct.description || `Learn more about ${safeName} and how it supports your operations.`;

  return (
    <Layout pageTitle={safeName}>
      <Head>
        <meta
          name="description"
          content={safeMetaDescription}
        />
        <meta
          property="og:description"
          content={safeMetaDescription}
        />
        <meta property="og:title" content={`Sytis | ${safeName}`} />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title={safeName} page="Shop" />
      <ProductDetailsPage product={safeProduct} />
      <MainFooter />
    </Layout>
  );
};

export default ProductDetails;
