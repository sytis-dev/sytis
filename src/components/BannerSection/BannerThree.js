import { bannerOne } from "@/data/bannerSection";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import SlideItemThree from "./SlideItemThree";

const TinySlider = dynamic(() => import("@/components/TinySlider/TinySlider"), {
  ssr: false,
});

const settings = {
  container: ".my-slider-17",
  loop: true,
  lazyload: true,
  nav: false,
  mouseDrag: true,
  items: 1,
  autoplay: true,
  autoHeight: true,
  controls: true,
  gutter: 0,
  autoplayButton: false,
  autoplayButtonOutput: false,
  autoplayTimeout: 15000,
  speed: 600,
};

const { dayRange, timeRange, socials, bg, bannersTwo } = bannerOne;

const BannerThree = () => {
  const listRef = useRef(null);

  return (
    <section
      style={{ paddingTop: "60px" }}
      className="relative banner-section banner-three"
    >
      {/* Operating hours and social links */}
      <div className="left-based-text">
        <div className="base-inner">
          <div className="hours">
            <ul className="clearfix">
              <li>
                <span style={{ color: "white" }}>{dayRange}</span>
              </li>
              <li>
                <span style={{ color: "white" }}>{timeRange}</span>
              </li>
            </ul>
          </div>
          <div className="social-links">
            <ul className="clearfix">
              {socials.map(({ id, title, href }) => (
                <li style={{ color: "white" }} key={id}>
                  <a href={href}>
                    <span style={{ color: "white" }}>{title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div
        className="bg-image"
        style={{ backgroundImage: `url(${bg.src})` }}
      ></div>

      {/* Slider */}
      <div className="banner-carousel">
        <TinySlider options={settings} ref={listRef}>
          {bannersTwo.map((banner) => (
            <SlideItemThree key={banner.id} ref={listRef} slide={banner} />
          ))}
        </TinySlider>
      </div>

      {/* LDES Logo Overlay */}

    </section>
  );
};

export default BannerThree;
