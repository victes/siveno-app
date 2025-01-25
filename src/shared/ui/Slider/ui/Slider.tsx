import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ISliders } from "../types/type";

const Slider = ({ slides }: ISliders) => {
  return (
    <>
      <Swiper spaceBetween={20} slidesPerView={6} loop={true}>
        {slides.map(slide => (
          <SwiperSlide key={slide.price}>
            <Swiper spaceBetween={50} slidesPerView={1}>
              {slide.img.map(img => (
                <SwiperSlide key={img.src}>
                  <img src={img.src} alt={img.alt} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="text-center mt-[10px] flex flex-col gap-[10px]">
              <h3>{slide.title}</h3>
              <p>{slide.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
