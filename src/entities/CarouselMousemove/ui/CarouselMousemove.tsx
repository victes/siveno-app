"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

type RawSlide = { src: string; alt: string } | { image_path: string };

type Props = {
  slides: RawSlide[];
};

type NormalizedSlide = {
  src: string;
  alt: string;
};

export default function CarouselMousemove({ slides }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const normalizedSlides: NormalizedSlide[] = slides.map(slide =>
    "image_path" in slide ? { src: slide.image_path, alt: "image" } : slide,
  );

  useEffect(() => {
    setIsMobile("ontouchstart" in window || window.innerWidth <= 768);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const percent = mouseX / rect.width;

    const maxTranslate = inner.scrollWidth - rect.width;
    inner.style.transform = `translateX(-${percent * maxTranslate}px)`;

    const totalWidth = inner.scrollWidth;
    const slideWidth = totalWidth / normalizedSlides.length;
    const currentIndex = Math.floor((percent * maxTranslate) / slideWidth);
    setActiveIndex(Math.max(0, Math.min(normalizedSlides.length - 1, currentIndex)));
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const totalWidth = inner.scrollWidth;
    const slideWidth = totalWidth / normalizedSlides.length;
    const targetTranslate = slideWidth * activeIndex;

    inner.style.transition = "transform 0.4s ease";
    inner.style.transform = `translateX(-${targetTranslate}px)`;

    setTimeout(() => {
      if (inner) inner.style.transition = "";
    }, 400);
  };

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0 && activeIndex < normalizedSlides.length - 1) {
        setActiveIndex(prev => prev + 1);
      } else if (delta < 0 && activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const rect = container.getBoundingClientRect();
    const slideWidth = rect.width;
    inner.style.transition = "transform 0.3s ease";
    inner.style.transform = `translateX(-${activeIndex * slideWidth}px)`;
  }, [activeIndex]);

  return (
    <div className=" w-full h-full">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full h-full overflow-hidden bg-gray-100"
      >
        <div ref={innerRef} className="flex transition-transform duration-300 relative">
          {normalizedSlides.map((slide, idx) => (
            <Image
              key={idx}
              src={slide.src}
              alt={slide.alt}
              width={400}
              height={600}
              className="w-full min-h-[400] h-full object-cover flex-shrink-0  rounded max-sm:min-h-[250px] max-sm:h-[250px]"
              priority
              
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
        {normalizedSlides.map((_, idx) => (
          <div
            key={idx}
            className={`w-1.5 h-1.5 rounded-full bg-[#fff] transition-transform duration-200 ${
              idx === activeIndex ? "scale-125" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
