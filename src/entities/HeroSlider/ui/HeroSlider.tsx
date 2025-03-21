/* eslint-disable @next/next/no-img-element */
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const HeroSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      loop={false}
      speed={2000}
      autoplay={false}
    >
      <SwiperSlide className="w-full h-screen">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-screen object-cover max-laptop:h-[500px]"
        >
          <source src="/images/Hero/hero_video.mov" type="video/quicktime" />
          <source src="/images/Hero/heroVid.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSlider;
