"use client";
import React, { useState } from "react";
import { Container } from "../Container";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { Burger } from "@/widgets/Burger";

const Header = () => {
  const [click, setClick] = useState(false);
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
            <p className="text-[30px] text-black max-tablet:text-[20px]">PremShop</p>
            <a href="/catalog-categories">
              <p className="text-[20px] hover:text-black transition-colors duration-200 ease-out max-mindesk:hidden">
                Каталог
              </p>
            </a>
            <a href="">
              <p className="text-[20px] hover:text-black transition-colors duration-200 ease-out max-mindesk:hidden">
                Магазины
              </p>
            </a>
          </div>
          <div className="flex text-center items-top ">
            <p className="text-[20px] max-mindesk:hidden">8 (800) 555-25-23</p>
            <div className="flex gap-5 ml-20 text-center items-top max-tablet:ml-0 max-tablet:gap-2">
              <p className="text-[20px]">
                <IoIosSearch
                  size={30}
                  className="hover:text-black transition-colors duration-200 ease-out cursor-pointer"
                />
              </p>
              <p className="text-[20px]">
                <IoMdHeartEmpty
                  size={30}
                  className="hover:text-black transition-colors duration-200 ease-out cursor-pointer"
                />
              </p>
              <p className="text-[20px]">
                <IoCartOutline
                  size={30}
                  className="hover:text-black transition-colors duration-200 ease-out cursor-pointer"
                />
              </p>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
