import Preloader from "@/components/Preloader/Preloader";
import useScroll from "@/hooks/useScroll";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";

const Layout = ({
  children,
  pageTitle,
  preloader,
  mainClass,
  preloaderClass,
  noIndex, // Add noIndex prop
}) => {
  const [loading, setLoading] = useState(true);
  const { scrollTop } = useScroll(100);

  useEffect(() => {
    if (pageTitle === "Solution inquiry" || pageTitle === "Newsletter Signup") {
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1200);
    } else {
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 400);
    }

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {noIndex && (
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
      )}
      <Preloader className={preloaderClass} loading={loading} bg={preloader} />
      <main
        id="wrapper"
        style={{ opacity: loading ? 0 : 1 }}
        className={`page-wrapper ${mainClass}`}
      >
        {children}
      </main>
      {scrollTop && (
        <ScrollLink
          to="wrapper"
          smooth={true}
          duration={500}
          id="backToTop"
          style={{ cursor: "pointer" }}
          className="scroll-to-target scroll-to-top d-inline-block fadeIn animated"
        >
          <i className="fa fa-angle-up"></i>
        </ScrollLink>
      )}
    </>
  );
};

export default Layout;
