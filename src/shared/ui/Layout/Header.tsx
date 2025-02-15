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
  const [localToken, setLocalToken] = useState<string | null>(token);

  const handleCart = () => {
    if (localToken) {
      setCart(prev => !prev);
    } else {
      push("/login");
    }
  };

  const handleFav = () => {
    if (localToken) {
      setFav(prev => !prev);
    } else {
      push("/login");
    }
  };

  useEffect(() => {
    setLocalToken(token); // Синхронизируем состояние с контекстомW
  }, [token]);

  // useEffect(() => {
  //   const handleStorageChange = (event: StorageEvent) => {
  //     if (event.key === "access_token") {
  //       setToken(event.newValue);
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   return () => window.removeEventListener("storage", handleStorageChange);
  // }, []);

  return (
    <header className="bg-white">
      <Container>
        <div className="flex flex-row text-center items-center h-[90px] justify-between">
          <div className="flex justify-center items-center  text-center gap-5">
            <RxHamburgerMenu
              size={30}
              className="hover:text-black transition-colors duration-200 ease-out cursor-pointer"
              onClick={() => setClick(prev => !prev)}
            />
            <Burger onOpen={click} setOpen={() => setClick(prev => !prev)} />
            <Link href="/">
              <p className="text-[30px] text-black max-tablet:text-[20px]">SIVENO</p>
            </Link>
            <Link href="/catalog-categories">
              <p className="text-[20px] hover:text-black transition-colors duration-200 ease-out max-mindesk:hidden">
                Каталог
              </p>
            </Link>
            {/* <a href="">
              <p className="text-[20px] hover:text-black transition-colors duration-200 ease-out max-mindesk:hidden">
                Магазины
              </p>
            </a> */}
          </div>
          <div className="flex text-center items-top ">
            <p className="text-[20px] max-mindesk:hidden">8 (800) 555-25-23</p>
            <div className="flex gap-5 ml-20 text-center items-center max-tablet:ml-0 max-tablet:gap-2">
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

              {!localToken ? (
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
