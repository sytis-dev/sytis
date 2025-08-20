import NavItem from "@/components/Header/NavItem";
import { useRootContext } from "@/context/context";
import headerData from "@/data/header";
import React from "react";
import { Image } from "react-bootstrap";

const { icon, text, email, phone, socials, navItemsSYTIS, navItemsTwo } =
  headerData;

const MobileMenu = ({ onePage = false }) => {
  const { menuStatus, toggleMenu } = useRootContext();

  const newNavItems = onePage ? navItemsTwo : navItemsSYTIS;

  return (
    <div className={`side-menu__block${menuStatus ? " active" : ""}`}>
      <div
        onClick={toggleMenu}
        className="side-menu__block-overlay custom-cursor__overlay"
      >
        <div className="cursor"></div>
        <div className="cursor-follower"></div>
      </div>
      <div className="side-menu__block-inner">
        <div className="side-menu__top justify-content-end">
          <a
            href=""
            onClick={toggleMenu}
            className="side-menu__toggler side-menu__close-btn"
            aria-label="Close mobile menu"
          >
            <Image src={icon.src} alt="Close menu" />
          </a>
        </div>

        <nav className="mobile-nav__container">
          <div
            className="collapse navbar-collapse show clearfix"
            id="navbarSupportedContent"
          >
            <ul className="navigation clearfix">
              {newNavItems.map((navItem) => (
                <NavItem navItem={navItem} key={navItem.id} mobile />
              ))}
            </ul>
          </div>
        </nav>
        <div className="side-menu__sep"></div>
        <div className="side-menu__content">
          <p>{text}</p>
          <p>
            <a href={`/contact`}>Contact Us</a> <br />{" "}
            <a href={`mailto:${email}`}>{email}</a> <br />{" "}
            <a href={`tel:${phone.split(" ").join("")}`}>{phone}</a>
          </p>
          <div className="side-menu__social">
            {socials.map(({ id, icon, href }) => (
              <a key={id} href={href} aria-label={`Visit our ${icon.replace('fab fa-', '').replace('fa-', '')} page`}>
                <i className={icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
