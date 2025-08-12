import { sliderSeven } from "@/data/slider";
import React from "react";
import { Swiper } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import SingleSliderSeven from "./SingleSliderSeven";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

const options = {
  modules: [EffectFade, Autoplay],
  slidesPerView: 1,
  loop: true,
  effect: "fade",
  autoplay: { delay: 5000 },
};

const SliderSeven = () => {
  return (
    <section className="slider-seven">
      {Array.from(Array(5)).map((_, i) => (
        <div key={i} className={`slider-seven__shape-${i + 1}`}></div>
      ))}

      <Swiper {...options} className="thm-swiper__slider">
        <div className="swiper-wrapper">
          {sliderSeven.map((slider) => (
            <SingleSliderSeven slider={slider} key={slider.id} />
          ))}
        </div>
      </Swiper>
    </section>
  );
};

export default SliderSeven;
