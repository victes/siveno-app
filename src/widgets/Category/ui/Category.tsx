"use client";
import React from "react";

import { IPopular, ProductResponse } from "@/shared/api/ProductsApi/types";
import { useGetProductsPopularQuery, useGetProductsByCategoryQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";
import Carousel, { SliderItem } from "@/shared/ui/Carousel/ui/Carousel";
import { Container } from "@/shared/ui/Container";

const Category = () => {
  const { data: popularData } = useGetProductsPopularQuery(10);
  const { data: dressesData } = useGetProductsByCategoryQuery("dresses");
  const { data: tshirtsData } = useGetProductsByCategoryQuery("TshirtsAndLongsleeves");
  const { data: businessData } = useGetProductsByCategoryQuery("delovye-i-vechernie");

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

  const transformCategoryProductsToSlides = (data: any): SliderItem[] => {
    if (!data) return [];

    // Handle both array and ProductResponse formats
    const products = Array.isArray(data) ? data : data?.data || [];

    return products.slice(0, 10).map((product: any) => ({
      id: product.id,
      img: product.images?.length
        ? product.images.map((image: any) => ({ src: image.image_path, alt: product.name }))
        : [{ src: "/images/MainPage/1.jpg", alt: "Нет изображения" }],
      title: product.name,
      price: Number(product.price),
      original_price: product.original_price,
      discount_percent: product.discount_percent,
    }));
  };

  const popular: IPopular[] = Array.isArray(popularData) ? popularData : [];
  const slides: SliderItem[] = transformProductsToSlides(popular);
  const dressesSlides: SliderItem[] = transformCategoryProductsToSlides(dressesData);
  const tshirtsSlides: SliderItem[] = transformCategoryProductsToSlides(tshirtsData);
  const businessSlides: SliderItem[] = transformCategoryProductsToSlides(businessData);

  return (
    <>
      <Container>
        <div className="flex flex-col gap-3">
          <Carousel heading="Новые модели" items={slides} id="popular" />
          <Carousel heading="Платья" items={dressesSlides} id="dresses" />
          <Carousel heading="Футболки и лонгсливы" items={tshirtsSlides} id="tshirts" />
          <Carousel heading="Деловые и вечерние" items={businessSlides} id="business" />
        </div>
      </Container>
    </>
  );
};

export default Category;
