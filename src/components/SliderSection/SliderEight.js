import { sliderEight } from "@/data/slider";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

import SingleSliderEight from "./SingleSliderEight";

const options = {
  modules: [Autoplay, EffectFade],
  slidesPerView: 1,
  loop: true,
  effect: "fade",
  autoplay: { delay: 5000 },
};

const SliderEight = () => {
  return (
    <section className="slider-eight">
      <Swiper {...options} className="thm-swiper__slider">
        <div className="swiper-wrapper">
          {sliderEight.map((slide) => (
            <SingleSliderEight key={slide} slide={slide} />
          ))}
        </div>
      </Swiper>
    </section>
  );
};

export default SliderEight;
