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
        original_price: product.original_price,
        discount_percent: product.discount_percent,
      }));
  };

  const popular: IPopular[] = Array.isArray(data) ? data : [];

  const slides: SliderItem[] = transformProductsToSlides(popular);

  return (
    <>
      <Container>
        <Carousel heading="Новые модели" items={slides} />
      </Container>
    </>
  );
};

export default Category;
