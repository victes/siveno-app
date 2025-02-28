"use client";
import React from "react";

import { IPopular } from "@/shared/api/ProductsApi/types";
import { useGetProductsPopularQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";
import Carousel, { SliderItem } from "@/shared/ui/Carousel/ui/Carousel";
import { Container } from "@/shared/ui/Container";

const Category = () => {
  const { data } = useGetProductsPopularQuery(10);
  const transformProductsToSlides = (items: IPopular[] = []): SliderItem[] => {
    return [...items] // Создаем копию массива, чтобы избежать мутаций
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) // Сортировка по дате
      .slice(0, 10) // Берем только 10 новых товаров
      .map(product => ({
        id: product.id,
        img: product.images?.length
          ? product.images.map(image => ({ src: image.image_path, alt: product.name }))
          : [{ src: "/images/MainPage/1.jpg", alt: "Нет изображения" }], // Фолбэк на случай отсутствия фото
        title: product.name,
        price: product.price,
      }));
  };

  const popular: IPopular[] = Array.isArray(data) ? data : [];

  const slides: SliderItem[] = transformProductsToSlides(popular);

  //   {
  //     img: [{ src: "/images/MainPage/13.jpg", alt: "Img" }],
  //     title: "Кардиган из пряжи с Мериносом",
  //     description: "Description",
  //     price: 10000,
  //   },
  //   {
  //     img: [{ src: "/images/MainPage/10.jpg", alt: "Img" }],
  //     title: "Рубашка Декоррованная цветами",
  //     description: "Description",
  //     price: 7895,
  //   },
  //   {
  //     img: [{ src: "/images/MainPage/11.jpg", alt: "Img" }],
  //     title: "Жакет-балон из атласа",
  //     description: "Description",
  //     price: 87954,
  //   },
  //   {
  //     img: [{ src: "/images/MainPage/12.jpg", alt: "Img" }],
  //     title: "Рубашка в пижамном стиле с буфами",
  //     description: "Description",
  //     price: 1204,
  //   },
  //   {
  //     img: [{ src: "/images/MainPage/13.jpg", alt: "Img" }],
  //     title: "Кардиган из пряжи с Мериносом",
  //     description: "Description",
  //     price: 20415,
  //   },
  //   {
  //     img: [{ src: "/images/MainPage/14.jpg", alt: "Img" }],
  //     title: "Жакет-балон из атласа",
  //     description: "Description",
  //     price: 45689,
  //   },
  //   {
  //     img: [{ src: "/images/MainPage/10.jpg", alt: "Img" }],
  //     title: "Кардиган из пряжи с Мериносом",
  //     description: "Description",
  //     price: 48986,
  //   },
  //   {
  //     img: [{ src: "/images/MainPage/13.jpg", alt: "Img" }],
  //     title: "Рубашка в пижамном стиле с буфами",
  //     description: "Description",
  //     price: 17894,
  //   },
  // ];
  return (
    <>
      <Container>
        <Carousel heading="Новые модели" items={slides} />
      </Container>
    </>
  );
};

export default Category;
