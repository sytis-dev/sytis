import Layout from "@/components/Layout/Layout";
import LoginWrapper from "@/components/LoginWrapper/LoginWrapper";
import Style from "@/components/Reuseable/Style";
import React from "react";
import Head from "next/head";

const ForgotPassword = () => {
  return (
    <Layout pageTitle="Forgot Password">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Style />
      <LoginWrapper forgot />
    </Layout>
  );
};

export default ForgotPassword;
