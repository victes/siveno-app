"use client";

import ButtonColors from "@/entities/ButtonColors";
import ButtonSizes from "@/entities/ButtonSizes";
import ProductSlider from "@/entities/ProductSlider/ui/ProductSlider";

import ButtonsProduct from "@/features/ButtonsProduct";
import Accordion from "@/shared/ui/Accordion";
import Carousel from "@/shared/ui/Carousel";
import BtnBack from "@/shared/ui/BtnBack";

import { useParams } from "next/navigation";

import React from "react";

import "../styles/product-page.scss";

import { useGetProductsByIdQuery, useGetProductsPopularQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";
import { IPopular } from "@/shared/api/ProductsApi/types";
import { SliderItem } from "@/shared/ui/Carousel/ui/Carousel";

const ProductPage = () => {
  const { product_id } = useParams();
  const { data: products, isLoading, error } = useGetProductsByIdQuery(Number(product_id));
  const { data } = useGetProductsPopularQuery(10);

  console.log(data);

  const transformProductsToSlides = (items: IPopular[] = []): SliderItem[] => {
    return items.map(product => ({
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

  const carousel = products?.images;

  const sizes = Object.entries(products?.measurements || {}).map(([size]) => {
    return size;
  });

  const accordion = [
    { name: "Состав и Уход", value: <>{products?.composition_care}</> },
    {
      name: "Обмеры",
      value: (
        <table>
          <thead>
            <tr>
              <th>Размер</th>
              <th>Параметры</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(products?.preference || {}).map(([size, measures]) => (
              <tr key={size}>
                <td>{size}</td>
                <td>{measures.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    {
      name: "Параметры Модели",
      value: (
        <table>
          <thead>
            <tr>
              <th>Размер</th>
              <th>Параметры</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(products?.measurements || {}).map(([size, measures]) => (
              <tr key={size}>
                <td>{size}</td>
                <td>{measures.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
  ];

  return (
    <section className="mb-[60px] pb-[20px] ">
      <div className="text-sm mx-auto mb-[30px]">
        <BtnBack />
      </div>
      <div className="flex flex-col items-center largeDesk:flex-row justify-between">
        <div className="mb-[40px] largeDesk:mb-0">
          {isLoading && <p className="mx-auto">Загрузка...</p>}
          {error && <p>Ошибка загрузки товаров</p>}

          <ProductSlider carousel={carousel ? carousel : []} />
        </div>
        <div className="flex flex-col gap-[20px] items-center tablet:mx-auto tablet:max-w-[500px]">
          {/* ================================================== */}
          <div className="flex flex-col items-center justify-center gap-[20px]">
            <h1 className="title-h1">{products?.name}</h1>
            <p className="text-center max-w-[200px] tablet:max-w-full text-[10px] tablet:text-[14px]">
              {products?.description}
            </p>
          </div>
          {/* ================================================== */}
          <div className="flex flex-col items-center justify-center">
            <div className="">
              <ButtonSizes selectedSize={sizes.toString()} />
            </div>
            <div className="py-2">
              <ButtonColors />
            </div>
          </div>
          {/* ================================================== */}

          <div className="producti-page-price mx-auto mb-[10px]">
            <span>{Number(products?.price).toFixed()} руб.</span>
          </div>

          {/* ================================================== */}
          <div className="">
            <ButtonsProduct
              id={Number(product_id)}
              price={Number(products?.price).toFixed()}
              name={products?.name.toString()}
              img={products?.images[0]?.image_path || ""}
            />
          </div>
          {/* ================================================== */}
          <div className="w-full">
            {accordion.map((item, idx) => {
              return <Accordion key={idx} name={item.name} context={item.value} />;
            })}
          </div>
        </div>
      </div>
      {/* ================================================== */}
      <div className="flex flex-col gap-5 mt-8">
        <Carousel heading="Идеи от стилиста" items={slides} />
        <Carousel heading="Вам может понравиться" items={slides} />
      </div>
    </section>
  );
};

export default ProductPage;
