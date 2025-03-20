"use client";
import React, { useEffect, useState } from "react";
import { Container } from "../Container";
import { RxHamburgerMenu } from "react-icons/rx";

// import { IoIosSearch } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";

import { Burger } from "@/widgets/Burger";
import { Cart } from "@/widgets/Cart";
import { Favourite } from "@/widgets/Favourite";
import { GoPerson } from "react-icons/go";

import { useProductStore } from "@/entities/productStore/store";
import Link from "next/link";
import { useGetWishListQuery } from "@/shared/api/ProfileApi/ProfileApi";
import { useAuth } from "@/shared/hook/AuthContext/ui/AuthContext";
import { useRouter } from "next/navigation";
// import Link from "next/link";

const Header = () => {
  const [click, setClick] = useState(false);
  const [cart, setCart] = useState(false);
  const [fav, setFav] = useState(false);
  const { products } = useProductStore();
  const { data, isSuccess } = useGetWishListQuery({});
  const { push } = useRouter();
  // const [token, setToken] = useState<string | null>(
  //   typeof window !== "undefined" ? localStorage.getItem("access_token") : null,
  // );

  const { token } = useAuth(); // Теперь токен приходит из контекста
  const [localToken, setLocalToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const handleCart = () => {
    // Открываем корзину без проверки авторизации
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
    setIsClient(true);
    setLocalToken(token); // Синхронизируем состояние с контекстом
  }, [token]);

  return (
    <header className="bg-white">
      <Container className="!px-[20px]">
        <div className="flex flex-row text-center items-center  h-[90px] justify-between">
          <div className="flex justify-center items-center  text-center gap-10">
            <RxHamburgerMenu
              size={30}
              className="hover:text-black transition-colors duration-200 ease-out cursor-pointer"
              onClick={() => setClick(prev => !prev)}
            />
            <Burger onOpen={click} setOpen={() => setClick(prev => !prev)} />
            <Link href="/">
              <div className="h-[40px] flex items-center">
                <img 
                  src="/images/Hero/LogoHor.png" 
                  alt="SIVENO" 
                  className="h-full object-contain max-w-[280px] transform -translate-y-1 md:max-w-[200px] lg:max-w-[280px]" 
                  style={{ transform: 'translateY(-4px)' }}
                />
              </div>
            </Link>
            <Link href="/catalog-categories">
              <p className="text-[20px] hover:text-black transition-colors duration-200 ease-out max-mindesk:hidden">
                Каталог
              </p>
            </Link>
            <Link href="/catalog-products">
              <p className="text-[20px] hover:text-black transition-colors duration-200 ease-out max-mindesk:hidden">
                Все товары
              </p>
            </Link>
            {isClient && localToken && (
              <Link href="/account">
                <p className="text-[20px] hover:text-black transition-colors duration-200 ease-out max-mindesk:hidden ml-5">
                  Личный кабинет
                </p>
              </Link>
            )}
            {/* <a href="">
              <p className="text-[20px] hover:text-black transition-colors duration-200 ease-out max-mindesk:hidden">
                Магазины
              </p>
            </a> */}
          </div>
          <div className="flex text-center items-top ">
            <p className="text-[20px] max-mindesk:hidden">8 (800) 555-25-23</p>
            <div className="flex gap-10 ml-20 text-center items-center max-tablet:ml-0 max-tablet:gap-5">
              {/* <IoIosSearch
                size={30}
                className="hover:text-black transition-colors duration-200 ease-out cursor-pointer"
              /> */}

              <div className="relative">
                <div className="absolute text-black ml-5 -mt-4">{isSuccess ? data.data.length : "0"}</div>
                <IoMdHeartEmpty
                  size={30}
                  className="hover:text-black transition-colors duration-200 ease-out cursor-pointer"
                  onClick={() => handleFav()}
                />
              </div>

              <div className="relative">
                <div className="absolute text-black ml-5 -mt-4">{products.length}</div>
                <IoCartOutline
                  size={30}
                  className="hover:text-black transition-colors duration-200 ease-out cursor-pointer"
                  onClick={() => handleCart()}
                />
              </div>

              <Cart click={cart} setClick={() => setCart(prev => !prev)} />
              <Favourite click={fav} setClick={() => setFav(prev => !prev)} />

              {!isClient || !localToken ? (
                <Link href={"/login"}>
                  <IoIosLogIn
                    size={30}
                    className="hover:text-black transition-colors duration-200 ease-out cursor-pointer"
                  />
                </Link>
              ) : (
                <Link href={"/account"}>
                  <GoPerson size={30} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
