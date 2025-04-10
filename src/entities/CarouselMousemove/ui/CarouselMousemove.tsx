'use client';
import { useRef, useState } from 'react';
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

    // 🧹 Приводим slides к одному формату
    const normalizedSlides: NormalizedSlide[] = slides.map((slide) =>
        'image_path' in slide
            ? { src: slide.image_path, alt: 'image' }
            : slide
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
        const container = containerRef.current;
        const inner = innerRef.current;
        if (!container || !inner) return;

        const rect = container.getBoundingClientRect();
        const maxTranslate = inner.scrollWidth - rect.width;
        const totalWidth = inner.scrollWidth;
        const slideWidth = totalWidth / normalizedSlides.length;

        const targetTranslate = slideWidth * activeIndex;
        inner.style.transition = 'transform 0.4s ease';
        inner.style.transform = `translateX(-${targetTranslate}px)`;

        setTimeout(() => {
            if (inner) inner.style.transition = '';
        }, 400);
    };

    return (
        <div className="relative w-full h-full">
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full h-full overflow-hidden bg-gray-100"
            >
                <div ref={innerRef} className="flex">
                    {normalizedSlides.map((slide, idx) => (
                        <Image
                            key={idx}
                            src={slide.src}
                            alt={slide.alt}
                            width={400}
                            height={600}
                            className="w-full h-full object-cover rounded-sm"
                            unoptimized
                        />
                    ))}
                </div>
            </div>

            {/* Навигационные точки */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                {normalizedSlides.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full bg-[#fff] transition-transform duration-200 ${
                            idx === activeIndex ? 'scale-125' : ''
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
