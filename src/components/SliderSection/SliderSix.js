import { sliderSix } from "@/data/slider";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import SingleSlideSix from "./SingleSlideSix";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const options = {
  modules: [Autoplay, Pagination, Navigation, EffectFade],
  slidesPerView: 1,
  loop: true,
  effect: "fade",
  autoplay: { delay: 5000 },
  pagination: {
    el: "#slider-six-pagination",
    type: "bullets",
    clickable: true,
  },
  navigation: {
    nextEl: "#slider-six__swiper-button-next",
    prevEl: "#slider-six__swiper-button-prev",
  },
};

const SliderSix = () => {
  return (
    <section className="slider-six">
      <div className="slider-six__curv">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 122"
        >
          <path
            fill="currentColor"
            d="M0,122.005S80.814,20.129,283.871,2.426C526.255-18.706,550.388,91.2,792.025,102.115c243.565,11.006,299.815-108,520.765-97.662,220.1,10.3,273.86,88.036,415.09,98.26C1878.57,113.62,1920,51.068,1920,51.068V-862.995H0v985Z"
          />
        </svg>
      </div>
      <Swiper {...options} className="thm-swiper__slider">
        <div className="swiper-wrapper">
          {sliderSix.map((slide) => (
            <SwiperSlide key={slide.id}>
              <SingleSlideSix slide={slide} />
            </SwiperSlide>
          ))}
        </div>
        <div className="slider-bottom-box clearfix">
          <div className="main-slider__nav">
            <div
              className="swiper-button-prev"
              id="main-slider__swiper-button-next"
            >
              <span className="fa fa-angle-left"></span>
            </div>
            <div
              className="swiper-button-next"
              id="main-slider__swiper-button-prev"
            >
              <span className="fa fa-angle-right"></span>
            </div>
          </div>
        </div>
      </Swiper>
    </section>
  );
};

export default SliderSix;
