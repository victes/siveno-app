"use client";
import { Container } from "@/shared/ui/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sales = () => {
  return (
    <div className="mt-[80px] flex flex-col gap-[40px] ">
      <Container>
        <div className="flex tablet:p-6">
          <h1 className="text-3xl  title-h1 text-start uppercase tracking-wide">Популярное</h1>
        </div>
      </Container>
      <div className="flex flex-col gap-[120px]">
        <div className="flex flex-col items-center justify-center">
          <Link href="#">
            <div className="grid grid-cols-2 h-screen max-minilaptop:grid-cols-1">
              <Image
                width={200}
                height={200}
                loading="lazy"
                src="/images/MainPage/5.jpg"
                alt=""
                className="h-screen w-screen object-cover"
              />
              <Image
                width={200}
                height={200}
                loading="lazy"
                src="/images/MainPage/6.jpg"
                alt=""
                className="h-screen w-screen object-cover max-minilaptop:hidden"
              />
            </div>
          </Link>
          <h1 className="absolute text-[50px] text-white uppercase">Костюмы</h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Link href="#">
            <div className="grid grid-cols-2 h-screen max-minilaptop:grid-cols-1">
              <Image
                width={200}
                height={200}
                loading="lazy"
                src="/images/MainPage/8.png"
                alt=""
                className="h-screen w-screen object-cover"
              />
              <Image
                width={200}
                height={200}
                loading="lazy"
                src="/images/MainPage/9.webp"
                alt=""
                className="h-screen w-screen object-cover max-minilaptop:hidden"
              />
            </div>
          </Link>
          <h1 className="absolute text-[50px] text-white">Шапки</h1>
        </div>
      </div>
    </div>
  );
};

export default Sales;
