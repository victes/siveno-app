/* eslint-disable */
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

const HeroSlider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        {isMounted ? (
          <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-screen object-cover video-slider"
        >
          {/* Приоритет отдаем MP4 формату, так как он лучше поддерживается */}
          <source src="/images/Hero/hero_video.mp4" type="video/mp4" />
          <source src="/images/Hero/hero_video.mov" type="video/quicktime" />
          Ваш браузер не поддерживает видео.
        </video>
        ) : (
          <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Загрузка видео...</p>
          </div>
        )}
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSlider;
