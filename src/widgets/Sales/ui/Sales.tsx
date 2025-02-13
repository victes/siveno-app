"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Container } from "@/shared/ui/Container";
import { useGetProductsPopularQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";

const Sales = () => {
  const { data } = useGetProductsPopularQuery(4);

  // Подготовка данных: берем максимум 4 товара, используем фолбэк для изображений
  const popularItems = Array.isArray(data)
    ? data.slice(0, 2).map(product => ({
        id: product.id,
        title: product.name,
        images:
          product.images?.length >= 2
            ? [product.images[0].image_path, product.images[1].image_path]
            : [product.images?.[0]?.image_path || "/images/MainPage/1.jpg", "/images/MainPage/2.jpg"], // Второй фолбэк
      }))
    : [];

  return (
    <div className="mt-[80px] flex flex-col gap-[40px]">
      <Container>
        <div className="flex tablet:p-6">
          <h1 className="text-3xl title-h1 text-start uppercase tracking-wide">Популярное</h1>
        </div>
      </Container>
      <div className="flex flex-col gap-[120px]">
        {popularItems.map(item => (
          <div key={item.id} className="flex flex-col items-center justify-center">
            <Link href={`/product/${item.id}`}>
              <div className="grid grid-cols-2 h-screen max-minilaptop:grid-cols-1">
                <Image
                  width={2000}
                  height={2000}
                  loading="lazy"
                  quality={100}
                  src={item.images[0]}
                  alt={item.title}
                  className="h-screen w-screen object-cover"
                />
                <Image
                  width={2000}
                  height={2000}
                  loading="lazy"
                  src={item.images[1]}
                  alt={item.title}
                  className="h-screen w-screen object-cover max-minilaptop:hidden"
                />
              </div>
            </Link>
            <h1 className="absolute text-5xl text-center text-white uppercase">{item.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sales;
