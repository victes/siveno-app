"use client";
import React, { useEffect, useState } from "react";
import { Container } from "../Container";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { Burger } from "@/widgets/Burger";
import { Cart } from "@/widgets/Cart";
import { Favourite } from "@/widgets/Favourite";
import { GoPerson } from "react-icons/go";
import { useAuth } from "@/shared/hook/AuthContext/ui/AuthContext";
import { useProductStore } from "@/entities/productStore/store";
import Link from "next/link";
import Image from "next/image";
import { FaTelegram } from "react-icons/fa";
import { useFavStore } from '@/entities/favouriteStore/store'

const Header = () => {
  const [click, setClick] = useState(false);
  const [cart, setCart] = useState(false);
  const [fav, setFav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { products } = useProductStore();
  const {favourites} = useFavStore();
  const { token } = useAuth();
  const [localToken, setLocalToken] = useState<string | null>(token);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCart = () => {
    setCart(prev => !prev);
  };

  const handleFav = () => {
      setFav(prev => !prev);
  };

  useEffect(() => {
    setLocalToken(token);
  }, [token]);

  return (
    <header className={`fixed   top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${scrolled ? 'bg-white shadow-sm ' : 'bg-white '}`}>
      <Container>
        <div className="flex items-center justify-between  h-full">
          {/* Левая часть шапки */}
          <div className="flex items-center">
            <button 
              className="mr-6 text-black hover:text-gray-500 transition-colors"
              onClick={() => setClick(prev => !prev)}
            >
              <RxHamburgerMenu size={20} />
            </button>
            
            <Burger onOpen={click} setOpen={() => setClick(prev => !prev)} />
            
            <Link href="/" className="mr-6 lg:mr-10 flex-shrink-0">
              <div className="logo" style={{ transform: 'translateY(-2px)' }}>
                <Image 
                  src="/images/Hero/LogoHor.png" 
                  alt="SIVENO" 
                  width={140} 
                  height={46}
                  className="w-[120px] md:w-[140px] lg:w-[160px] h-auto"
                />
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-10 text-primary ">
              <Link href="/catalog-products" className="text-sm whitespace-nowrap hover:text-primaryHover transition-colors">
                Каталог
              </Link>
              {localToken && (
                <Link href="/account" className="text-sm whitespace-nowrap hover:text-primaryHover transition-colors">
                  Личный кабинет
                </Link>
              )}
              <Link href="/about" className="text-sm whitespace-nowrap hover:text-primaryHover transition-colors">
                О нас
              </Link>
              <Link href="/contacts" className="text-sm whitespace-nowrap hover:text-primaryHover transition-colors">
                Контакты
              </Link>
            </nav>
          </div>
          
          {/* Правая часть шапки */}
          <div className="flex items-center space-x-3 md:space-x-5 lg:space-x-10">
            <div className="hidden lg:block flex-shrink-0">
              <a href="tel:+79134702311" target="_blank" className="text-sm text-primary whitespace-nowrap">8 (913) 470-23-11</a>
            </div>
            
            {/* Социальные сети - видны только на экранах шириной более 600px */}
            <div className="hidden sm:flex items-center space-x-3">
              <a href="https://t.me/+pnsEBODRdPJiNmNi" className="text-primary hover:text-primaryHover transition-colors" target="_blank" rel="noopener noreferrer">
                <FaTelegram size={18} />
              </a>
              <a href="https://vk.com/siveno.store" className="text-primary hover:text-primaryHover transition-colors" target="_blank" rel="noopener noreferrer">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M31.4907 63.4907C0 94.9813 0 145.671 0 247.04V264.96C0 366.329 0 417.019 31.4907 448.509C62.9813 480 113.671 480 215.04 480H232.96C334.329 480 385.019 480 416.509 448.509C448 417.019 448 366.329 448 264.96V247.04C448 145.671 448 94.9813 416.509 63.4907C385.019 32 334.329 32 232.96 32H215.04C113.671 32 62.9813 32 31.4907 63.4907ZM75.6 168.267H126.747C128.427 253.76 166.133 289.973 196 297.44V168.267H244.16V242C273.653 238.827 304.64 205.227 315.093 168.267H363.253C359.313 187.435 351.46 205.583 340.186 221.579C328.913 237.574 314.461 251.071 297.733 261.227C316.41 270.499 332.907 283.63 346.132 299.751C359.357 315.873 369.01 334.618 374.453 354.747H321.44C316.555 337.262 306.614 321.61 292.865 309.754C279.117 297.899 262.173 290.368 244.16 288.107V354.747H238.373C136.267 354.747 78.0267 284.747 75.6 168.267Z" />
                </svg>
              </a>
            </div>
            
            <div className="flex items-center space-x-3 md:space-x-5">
              {/* Избранное */}
              <button 
                className="relative text-black hover:text-gray-500 transition-colors"
                onClick={handleFav}
                aria-label="Избранное"
              >
                <IoMdHeartEmpty size={20} />
                {favourites.length > 0 && (
                  <span className="absolute -top-2.5 -right-1.5 bg-white border border-gray-400 text-gray-700 text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full">
                    {favourites.length}
                  </span>
                )}
              </button>
              
              {/* Корзина */}
              <button 
                className="relative text-black hover:text-gray-500 transition-colors"
                onClick={handleCart}
                aria-label="Корзина"
              >
                <IoCartOutline size={20} />
                {products.length > 0 && (
                  <span className="absolute -top-2.5 -right-1.5 bg-white border border-gray-400 text-gray-700 text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full">
                    {products.length}
                  </span>
                )}
              </button>
              
              {/* Вход/Аккаунт */}
              {!localToken ? (
                <Link href="/login" className="text-black hover:text-gray-500 transition-colors">
                  <IoIosLogIn size={20} />
                </Link>
              ) : (
                <Link href="/account" className="text-black hover:text-gray-500 transition-colors">
                  <GoPerson size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
      
      <Cart click={cart} setClick={() => setCart(prev => !prev)} />
      <Favourite click={fav} setClick={() => setFav(prev => !prev)} />
    </header>
  );
};

export default Header;
