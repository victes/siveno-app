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
import { useGetWishListQuery } from "@/shared/api/ProfileApi/ProfileApi";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const [click, setClick] = useState(false);
  const [cart, setCart] = useState(false);
  const [fav, setFav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { products } = useProductStore();
  const { data, isSuccess } = useGetWishListQuery({});
  const { push } = useRouter();
  const { token } = useAuth();
  const [localToken, setLocalToken] = useState<string | null>(token);

  // Обработка скролла для изменения стиля шапки
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
    if (localToken) {
      setFav(prev => !prev);
    } else {
      push("/login");
    }
  };

  useEffect(() => {
    setLocalToken(token);
  }, [token]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm py-2' : 'bg-white py-4'}`}>
      <Container>
        <div className="flex items-center justify-between">
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
            
            <nav className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-10">
              <Link href="/catalog-categories" className="text-sm whitespace-nowrap hover:text-gray-500 transition-colors">
                Каталог
              </Link>
              {localToken && (
                <Link href="/account" className="text-sm whitespace-nowrap hover:text-gray-500 transition-colors">
                  Личный кабинет
                </Link>
              )}
              <Link href="/about" className="text-sm whitespace-nowrap hover:text-gray-500 transition-colors">
                О нас
              </Link>
              <Link href="/contacts" className="text-sm whitespace-nowrap hover:text-gray-500 transition-colors">
                Контакты
              </Link>
            </nav>
          </div>
          
          {/* Правая часть шапки */}
          <div className="flex items-center space-x-3 md:space-x-5 lg:space-x-10">
            <div className="hidden lg:block flex-shrink-0">
              <p className="text-sm font-light whitespace-nowrap">8 (800) 555-25-23</p>
            </div>
            
            <div className="flex items-center space-x-3 md:space-x-5">
              {/* Избранное */}
              <button 
                className="relative text-black hover:text-gray-500 transition-colors"
                onClick={handleFav}
                aria-label="Избранное"
              >
                <IoMdHeartEmpty size={20} />
                {isSuccess && data.data.length > 0 && (
                  <span className="absolute -top-2.5 -right-1.5 bg-white border border-gray-400 text-gray-700 text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full">
                    {data.data.length}
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
