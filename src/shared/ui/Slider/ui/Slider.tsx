import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Slider = () => {
  return (
    <>
      <Swiper>
        <SwiperSlide>Slide1</SwiperSlide>
        <SwiperSlide>Slide2</SwiperSlide>
        <SwiperSlide>Slide3</SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
