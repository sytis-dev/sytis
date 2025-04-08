import PageBanner from "@/components/BannerSection/PageBanner";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import ShopPage from "@/components/ShopPage/ShopPage";
import React from "react";

// Fetching the product data for the Shop page
export async function getStaticProps() {
  const res = await fetch(`${process.env.API_URL}/api/products`);
  const json = await res.json();

  // Check if json.data is defined and is an array
  if (!Array.isArray(json.data)) {
    return { notFound: true };
  }

  const products = json.data;

  return {
    props: { products },
    revalidate: 60, // Revalidates every 60 seconds
  };
}

const Shop = ({ products }) => {
  return (
    <Layout pageTitle="Shop Page">
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Products" page="Shop" />
      <ShopPage products={products} /> {/* Pass the products data to ShopPage */}
      <MainFooter />
    </Layout>
  );
};

export default Shop;