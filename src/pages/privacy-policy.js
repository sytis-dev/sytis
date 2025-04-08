import PageBanner from "@/components/BannerSection/PageBanner";
import EventsDetails from "@/components/EventsSection/EventsDetails";
import HeaderOne from "@/components/Header/HeaderOne";
import MobileMenu from "@/components/Header/MobileMenu";
import Layout from "@/components/Layout/Layout";
import MainFooter from "@/components/MainFooter/MainFooter";
import Style from "@/components/Reuseable/Style";
import SearchPopup from "@/components/SearchPopup/SearchPopup";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <Layout pageTitle="SYTIS | Privacy Policy">
      <Style />
      <HeaderOne />
      <MobileMenu />
      <SearchPopup />
      <PageBanner title="Privacy Policy" parent="" parentHref="" />
      <div className="max-w-3xl mx-auto px-6 py-8 leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>

        <p>
          We respect your privacy. To this end, our company does not utilize any
          data-harvesting business models.
        </p>

        <p className="mt-4">
          We strive to provide you with a clean and secure experience on our
          websites so you do not have to worry about where your personal
          information will end up. Any information you provide us while
          interacting with our website or making a purchase will not be sold to
          third parties and is gathered solely for our record keeping.
        </p>

        <p className="mt-4">
          If you have any questions or concerns regarding how we handle your
          information, please do not hesitate to contact us through our website,
          email us at{" "}
          <a
            href="mailto:sales@iisales.com"
            className="text-blue-600 underline"
          >
            sales@iisales.com
          </a>
          , or give us a call at{" "}
          <a href="tel:8664512257" className="text-blue-600 underline">
            (866)-451-2257
          </a>
          .
        </p>
      </div>
      <MainFooter />
    </Layout>
  );
};

export default PrivacyPolicy;
