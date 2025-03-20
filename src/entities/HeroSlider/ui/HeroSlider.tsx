/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";

const HeroSlider = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Автоматически запускаем видео при монтировании компонента
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Ошибка автовоспроизведения видео:", error);
      });
    }
  }, []);

  return (
    <div className="w-full h-auto overflow-hidden">
      <video
        ref={videoRef}
        src="/images/Hero/heroVid.mp4"
        className="w-full h-auto"
        muted
        loop
        playsInline
        autoPlay
        poster="/images/Hero/Slide.jpg"
      />
      <div className="absolute inset-0 bg-black opacity-10 pointer-events-none"></div>
    </div>
  );
};

export default HeroSlider;
