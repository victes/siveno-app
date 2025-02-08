"use client";

import ButtonColors from "@/entities/ButtonColors";
import ButtonSizes from "@/entities/ButtonSizes";
import ProductSlider from "@/entities/ProductSlider/ui/ProductSlider";

import { useParams } from "next/navigation";

import React from "react";

import "../styles/product-page.scss";
import ButtonsProduct from "@/features/ButtonsProduct";
import Accordion from "@/shared/ui/Accordion";
import Carousel from "@/shared/ui/Carousel";

import { useGetProductsByIdQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";

// const carousel = [
//   {
//     src: "/images/MainPage/13.jpg",
//   },
//   {
//     src: "/images/MainPage/10.jpg",
//   },
//   {
//     src: "/images/MainPage/11.jpg",
//   },
//   {
//     src: "/images/MainPage/12.jpg",
//   },
// ];

const accordion = [
  { name: "Состав и Уход", value: "" },
  { name: "Обмеры", value: "" },
  { name: "Параметры Модели", value: "" },
];

const Slides = [
  {
    img: [{ src: "/images/MainPage/13.jpg", alt: "Img" }],
    title: "Кардиган из пряжи с Мериносом",
    description: "Description",
    price: 10000,
  },
  {
    img: [{ src: "/images/MainPage/10.jpg", alt: "Img" }],
    title: "Рубашка Декоррованная цветами",
    description: "Description",
    price: 7895,
  },
  {
    img: [{ src: "/images/MainPage/11.jpg", alt: "Img" }],
    title: "Жакет-балон из атласа",
    description: "Description",
    price: 87954,
  },
  {
    img: [{ src: "/images/MainPage/12.jpg", alt: "Img" }],
    title: "Рубашка в пижамном стиле с буфами",
    description: "Description",
    price: 1204,
  },
  {
    img: [{ src: "/images/MainPage/13.jpg", alt: "Img" }],
    title: "Кардиган из пряжи с Мериносом",
    description: "Description",
    price: 20415,
  },
  {
    img: [{ src: "/images/MainPage/14.jpg", alt: "Img" }],
    title: "Жакет-балон из атласа",
    description: "Description",
    price: 45689,
  },
  {
    img: [{ src: "/images/MainPage/10.jpg", alt: "Img" }],
    title: "Кардиган из пряжи с Мериносом",
    description: "Description",
    price: 48986,
  },
  {
    img: [{ src: "/images/MainPage/13.jpg", alt: "Img" }],
    title: "Рубашка в пижамном стиле с буфами",
    description: "Description",
    price: 17894,
  },
];

const ProductPage = () => {
  const { product_id } = useParams();
  const { data: products, isLoading, error } = useGetProductsByIdQuery(Number(product_id));

  const carousel = products?.images;

  return (
    <section className="mb-[60px] pb-[20px] ">
      <div className="breadcrumbs text-sm mx-auto mb-[30px]">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Documents</a>
          </li>
          <li>Add Document</li>
        </ul>
      </div>
      <div className="flex flex-col items-center largeDesk:flex-row justify-between">
        <div className="mb-[40px] largeDesk:mb-0">
          {isLoading && <p>Загрузка...</p>}
          {error && <p>Ошибка загрузки товаров</p>}

          <ProductSlider carousel={carousel ? carousel : []} />
        </div>
        <div className="flex flex-col gap-[20px] items-center tablet:mx-auto tablet:max-w-[500px]">
          {/* ================================================== */}
          <div className="flex flex-col items-center justify-center gap-[20px]">
            <h1 className="title-h1">Двубортный тренч ICONIC</h1>
            <p className="text-center max-w-[200px] tablet:max-w-full text-[10px] tablet:text-[14px]">
              Базовая модель тренча из плотного хлопкового материала надёжно защищает от ветра и лёгких осадков.
              Объёмный крой, спущенная линия плеч, объёмный воротник, декоративные ремешки. Рекомендуем выбирать тренч
              на 1-2 размера меньше, чем вы носите обычно.
            </p>
          </div>
          {/* ================================================== */}
          <div className="flex flex-col items-center justify-center">
            <div className="">
              <ButtonSizes />
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
              price={"68000"}
              name="Двубортный тренч ICONIC"
              img={
                "https://lesyanebo.com/upload/resize_cache/iblock/83e/1380_2760_1/40npmby0a9hw3gcqlj479mpnma91q8xq.jpg"
              }
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
        {/* <Slider slides={Slides} className="mt-[40px]" /> */}
        <Carousel heading="Идеи от стилиста" items={Slides} />
        <Carousel heading="Вам может понравиться" items={Slides} />
      </div>
    </section>
  );
};

export default ProductPage;
