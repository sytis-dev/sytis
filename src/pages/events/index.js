import PageBanner from "@/components/BannerSection/PageBanner";
import CallToSection from "@/components/CallToSection/CallToSection";
import EventsOne from "@/components/EventsSection/EventsOne";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import React from "react";
import Head from "next/head";

const Events = () => {
  return (
    <Layout pageTitle="Events Page">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Events</title>
        <meta
          name="description"
          content="A comprehensive list of all events, trade shows, and conferences you will find SYTIS at."
        />
        <meta
          property="og:description"
          content="A comprehensive list of all events, trade shows, and conferences you will find SYTIS at."
        />
        <meta property="og:title" content="Sytis | Events " />
      </Head>
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Events" parent="" />
      <EventsOne />
      <CallToSection />
      <MainFooter normalPadding={false} />
    </Layout>
  );
};

export default Events;
