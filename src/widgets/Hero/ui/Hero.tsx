"use client";
import { HeroSlider } from "@/entities/HeroSlider/ui";
import { LoopSlider } from "@/shared/ui/LoopSlider";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mt-[80px]">
      <div className="relative">
        <HeroSlider />
        
        <div 
          className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center z-10"
          style={{ 
            transform: scrollY > 0 ? `translateY(${scrollY * 0.05}px)` : 'none',
          }}
        >
          <Link href="/catalog-categories">
            <span className="inline-block backdrop-blur-md bg-white/20 border border-white/30 text-white py-3 px-8 text-sm font-light hover:bg-white/30 transition-all duration-300 rounded-sm shadow-lg">
              Смотреть коллекцию
            </span>
          </Link>
        </div>
      </div>
      
      <div className="relative z-20">
        <LoopSlider text="Скидка 10% на первый заказ" />
      </div>
    </div>
  );
};

export default Hero;
