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

import { useGetProductsByIdQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";

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
        <Carousel heading="Идеи от стилиста" items={Slides} />
        <Carousel heading="Вам может понравиться" items={Slides} />
      </div>
    </section>
  );
};

export default ProductPage;
