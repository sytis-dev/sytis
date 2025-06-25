import PageBanner from "@/components/BannerSection/PageBanner";
import EventsDetails from "@/components/EventsSection/EventsDetails";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import React from "react";
import Head from "next/head";

const Shipping = () => {
  return (
    <Layout pageTitle="SYTIS | Shipping">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Shipping</title>
        <meta
          name="description"
          content="Learn about SYTIS shipping policies, delivery timelines, and how we handle orders across the U.S. and international locations."
        />
        <meta
          property="og:description"
          content="Learn about SYTIS shipping policies, delivery timelines, and how we handle orders across the U.S. and international locations."
        />
        <meta property="og:title" content="SYTIS | Shipping" />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Shipping" parent="" parentHref="" />
      <div
        style={{
          lineHeight: 1.6,
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Returns Policy</h2>
        <p>
          You may return most new, unopened items within 30 days of delivery for
          a full refund. We will also pay the return shipping costs if the
          return is a result of our error (you received an incorrect or
          defective item, etc.).
        </p>

        <p>
          You should expect to receive your refund within four weeks of giving
          your package to the return shipper, however, in many cases you will
          receive a refund more quickly. This time period includes:
        </p>

        <ul style={{ marginLeft: "1.5rem" }}>
          <li>
            The transit time for us to receive your return from the shipper (5
            to 10 business days)
          </li>
          <li>
            The time it takes us to process your return once we receive it (3 to
            5 business days)
          </li>
          <li>
            The time it takes your bank to process our refund request (5 to 10
            business days)
          </li>
        </ul>

        <p>
          If you need to return an item, please <strong>Contact Us</strong> with
          your order number and details about the product you would like to
          return. We will respond quickly with instructions for how to return
          items from your order.
        </p>

        <hr
          style={{
            margin: "2rem 0",
            border: "none",
            borderTop: "1px solid #ccc",
          }}
        />

        <h2 style={{ marginBottom: "1rem" }}>Shipping</h2>
        <p>
          We can ship to virtually any address in the world. Note that there are
          restrictions on some products, and some products cannot be shipped to
          international destinations.
        </p>

        <p>
          When you place an order, we will estimate shipping and delivery dates
          for you based on the availability of your items and the shipping
          options you choose. Depending on the shipping provider you choose,
          shipping date estimates may appear on the shipping quotes page.
        </p>

        <p>
          Please also note that the shipping rates for many items we sell are
          weight-based. The weight of any such item can be found on its detail
          page. To reflect the policies of the shipping companies we use, all
          weights will be rounded up to the next full pound.
        </p>
      </div>
      <MainFooter />
    </Layout>
  );
};

export default Shipping;
