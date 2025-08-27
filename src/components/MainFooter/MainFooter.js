import { mainFooter } from "@/data/mainFooter";
import Link from "next/link";
import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";

const {
  year,
  author,
  logo,
  text,
  socials,
  links,
  address,
  addressLink,
  phone,
  email,
  textBottom,
} = mainFooter;

const MainFooter = ({ normalPadding = true }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("email"));
  };

  return (
    <footer className={`main-footer${normalPadding ? " normal-padding" : ""}`}>
      <div className="auto-container">
        <div className="widgets-section">
          <Row className="clearfix">
            <Col xl={3} lg={6} md={6} sm={12} className="column">
              <div className="footer-widget logo-widget">
                <div className="widget-content">
                  <div className="logo">
                    <Link href="/">
                      <a>
                        <Image id="fLogo" src={logo.src} alt="" />
                      </a>
                    </Link>
                  </div>
                  <div className="text">{text}</div>
                  <ul className="social-links clearfix">
                    {socials.map(({ id, icon, href }) => (
                      <li key={id}>
                        <a href={href}>
                          <span className={icon}></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Col>
            <Col xl={3} lg={6} md={6} sm={12} className="column">
              <div className="footer-widget links-widget">
                <div className="widget-content">
                  <h6>Explore</h6>
                  <Row className="clearfix">
                    <Col md={6} sm={12}>
                      <ul>
                        {links.slice(0, 5).map(({ id, href, title }) => (
                          <li key={id}>
                            <Link href={href}>{title}</Link>
                          </li>
                        ))}
                      </ul>
                    </Col>
                    <Col md={6} sm={12}>
                      <ul>
                        {links.slice(5).map(({ id, href, title }) => (
                          <li key={id}>
                            <Link href={href}>{title}</Link>
                          </li>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col xl={3} lg={6} md={6} sm={12} className="column">
              <div className="footer-widget info-widget">
                <div className="widget-content">
                  <h6>Contact</h6>
                  <ul className="contact-info">
                    <li className="address">
                      <span
                        className="icon flaticon-pin-1"
                        style={{ color: "#4682B4" }}
                      ></span>{" "}
                      <a href={addressLink}>
                        {" "}
                        <TextSplit color="#999b9f" text={address} />
                      </a>
                    </li>
                    <li>
                      <span
                        className="icon flaticon-call"
                        style={{ color: "#4682B4" }}
                      ></span>
                      <a href={`tel:${phone.split(" ").join("")}`}>{phone}</a>
                    </li>
                    <li>
                      <span
                        className="icon flaticon-email-2"
                        style={{ color: "#4682B4" }}
                      ></span>
                      <a href={`mailto:${email}`}>{email}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col xl={3} lg={6} md={6} sm={12} className="column">
              <div className="footer-widget newsletter-widget">
                <div className="widget-content">
                  <h6 style={{ marginBottom: "20px" }}>Newsletter</h6>
                  <div className="text" style={{ marginBottom: "25px" }}>{textBottom}</div>
                  <div className="newsletter-form">
                    <div className="link-box" style={{ marginBottom: "15px" }}>
                      <Link href="/newsletter">
                        <a className="theme-btn btn-style-two">
                          <i className="btn-curve"></i>
                          <span className="btn-title">Sign Up Now</span>
                        </a>
                      </Link>
                    </div>
                    <div className="privacy-notice" style={{ 
                      fontSize: "12px", 
                      color: "#999b9f", 
                      lineHeight: "1.4" 
                    }}>
                      <Link href="/privacy-policy">
                        <a style={{ color: "#999b9f", textDecoration: "underline" }}>
                          We do not sell or share your personal information.
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="auto-container">
          <div className="inner clearfix">
            <div className="copyright">
              &copy; Copyright {year} by {author}
            </div>
            <br />
            <div className="copyright">
              We do not sell or share your personal information. For more
              details, please read our{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
