import Layout from "@/components/Layout/Layout";
import LoginWrapper from "@/components/LoginWrapper/LoginWrapper";
import Style from "@/components/Reuseable/Style";
import React from "react";
import Head from "next/head";

const Login = () => {
  return (
    <Layout pageTitle="Login">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYTIS | Login</title>
        <meta
          name="description"
          content="Secure login page for your SYTIS account. Access your dashboard and manage your thermal monitoring system."
        />
        <meta
          property="og:description"
          content="Secure login page for your SYTIS account. Access your dashboard and manage your thermal monitoring system."
        />
        <meta property="og:title" content="SYTIS | Login" />
      </Head>
      <Style />
      <LoginWrapper />
    </Layout>
  );
};

export default Login;
