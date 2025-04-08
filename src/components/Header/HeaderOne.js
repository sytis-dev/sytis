import { useRootContext } from "@/context/context";
import headerData from "@/data/header";
import useScroll from "@/hooks/useScroll";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import NavItem from "./NavItem";

const {
  title,
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo9,
  title2,
  navItems,
  navItemsSYTIS,
  navItemsTwo,
  phone,
  socials,
} = headerData;

// ✅ Custom hook to detect mobile
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
};

const HeaderOne = ({
  headerStyle = "header-style-one",
  logo = 1,
  onePage = false,
  topBar = true,
  autoContainer = false,
  links = true,
  rightMenu = false,
}) => {
  const { scrollTop } = useScroll(120);
  const { toggleMenu, toggleSearch } = useRootContext();
  const isMobile = useIsMobile();
  const newNavItemsSYTIS = onePage ? navItemsTwo : navItemsSYTIS;

  let Logo =
    logo === 2
      ? logo2
      : logo === 3
      ? logo3
      : logo === 5
      ? logo5
      : logo === 9
      ? logo9
      : logo1;

  if (logo === 4) {
    if (scrollTop) {
      Logo = logo1;
    } else {
      Logo = logo4;
    }
  }

  return (
    <header
      className={`main-header${scrollTop ? " fixed-header" : ""} ${headerStyle}`}
    >
      {topBar && (
        <div
          className="topbar-four"
          style={{
            backgroundColor: "#000000",
            color: "white",
            textAlign: "center",
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1000,
            padding: "10px 0",
          }}
        >
          <div
            className="auto-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="right-content"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <p style={{ margin: 0 }}>
                INTRODUCING SYTIS (PREVIOUSLY OPERATING UNDER THE NAME IIS) - A
                STEP INTO THE FUTURE OF TECHNOLOGY.
              </p>
            </div>
          </div>
        </div>
      )}
      <div
        className="header-upper"
        style={{ paddingTop: topBar ? "60px" : "0" }}
      >
        <div
          style={{
            marginTop: topBar && isMobile ? "60px" : "0",
          }}
          className={autoContainer ? "inner-container clearfix" : ""}
        >
          <div
            className={
              autoContainer ? "auto-container" : "inner-container clearfix"
            }
          >
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <a title={title}>
                    <Image
                      id="thm-logo"
                      src={Logo.src}
                      alt={title}
                      title={title}
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="nav-outer clearfix">
              <div onClick={toggleMenu} className="mobile-nav-toggler">
                <span className="icon flaticon-menu-2"></span>
                <span className="txt">Menu</span>
              </div>

              <nav className="main-menu navbar-expand-md navbar-light">
                <div
                  className={
                    autoContainer
                      ? ""
                      : "collapse navbar-collapse show clearfix"
                  }
                  id={autoContainer ? "" : "navbarSupportedContent"}
                >
                  <ul className="navigation clearfix">
                    {newNavItemsSYTIS.map((navItem) => (
                      <NavItem
                        navItem={navItem}
                        key={navItem.id}
                        onePage={onePage}
                      />
                    ))}
                  </ul>
                </div>
              </nav>
            </div>

            {links && (
              <div className="other-links clearfix">
                <div className="login-btn" style={{ marginRight: "30px" }}>
                  <Link href="/login">
                    <a className="theme-btn login-toggler">
                      <span className="flaticon-user"></span>
                    </a>
                  </Link>
                </div>
                <div className="search-btn">
                  <button
                    onClick={toggleSearch}
                    type="button"
                    className="theme-btn search-toggler"
                  >
                    <span className="flaticon-loupe"></span>
                  </button>
                </div>
                <div className="link-box">
                  <div>
                    <Link
                      className="theme-btn btn-style-one demo-purchase-btn"
                      href="/contact"
                    >
                      <a
                        className="theme-btn btn-style-one demo-purchase-btn"
                        style={{ color: "white !important" }}
                      >
                        <i className="btn-curve"></i>
                        <span className="btn-title">Contact Us</span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {rightMenu && (
              <div className="right-menu">
                <div className="search-btn">
                  <button
                    onClick={toggleSearch}
                    type="button"
                    className="theme-btn search-toggler"
                  >
                    <span className="flaticon-loupe"></span>
                  </button>
                </div>
                <div onClick={toggleMenu} className="mobile-nav-toggler">
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="txt">Menu</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderOne;
