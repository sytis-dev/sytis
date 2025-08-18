import useScroll from "@/hooks/useScroll";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import Preloader from "../Preloader/Preloader";

const Layout = ({
  children,
  pageTitle,
  mainClass,
  noIndex,
  showPreloader = false, // New prop to control preloader
}) => {
  const { scrollTop } = useScroll(100);
  const [loading, setLoading] = useState(showPreloader);

  useEffect(() => {
    if (showPreloader) {
      // Show preloader for longer on pages with external forms
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1200); // 1200ms for external form pages
      
      return () => clearTimeout(timer);
    } else {
      // No preloader for regular pages
      setLoading(false);
    }
  }, [showPreloader]);

  return (
    <>
      {noIndex && (
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
      )}
      <Preloader loading={loading} />
      <main
        id="wrapper"
        className={`page-wrapper ${mainClass}`}
      >
        {children}
      </main>
      {scrollTop && typeof window !== 'undefined' && (
        <ScrollLink
          to="wrapper"
          smooth={true}
          duration={500}
          id="backToTop"
          style={{ cursor: "pointer" }}
          className="scroll-to-target scroll-to-top d-block"
        >
          <i className="icon"></i>
        </ScrollLink>
      )}
    </>
  );
};

export default Layout;
