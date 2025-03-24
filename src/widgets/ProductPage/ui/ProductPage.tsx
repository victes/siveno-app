"use client";

import ButtonColors from "@/entities/ButtonColors";
import ButtonSizes from "@/entities/ButtonSizes";
import ProductSlider from "@/entities/ProductSlider/ui/ProductSlider";

import ButtonsProduct from "@/features/ButtonsProduct";
import Accordion from "@/shared/ui/Accordion";
import Carousel from "@/shared/ui/Carousel";
import BtnBack from "@/shared/ui/BtnBack";
import delivery from '../icons/delivery.png';
import russia from '../icons/russia.png';
import returnIcon from '../icons/return.png'

import { useParams } from "next/navigation";

import React, { useState, useEffect } from "react";
import Image from 'next/image'

import "../styles/product-page.scss";

import { useGetProductsByIdQuery, useGetProductsPopularQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";
import { IPopular } from "@/shared/api/ProductsApi/types";
import { SliderItem } from "@/shared/ui/Carousel/ui/Carousel";

const ProductPage = () => {
  const { product_id } = useParams();
  const { data: products, isLoading, error } = useGetProductsByIdQuery(Number(product_id));
  const { data } = useGetProductsPopularQuery(10);
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    const handleSizeSelected = (event: CustomEvent) => {
      if (event.detail && event.detail.size) {
        setSelectedSize(event.detail.size);
      }
    };

    window.addEventListener('sizeSelected', handleSizeSelected as EventListener);
    
    return () => {
      window.removeEventListener('sizeSelected', handleSizeSelected as EventListener);
    };
  }, []);

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

  // Преобразуем в комментарий или используем переменную
  // const sizes = Object.entries(products?.measurements || {}).map(([size]) => {
  //   return size;
  // });

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  console.log(products)

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
            {Object.entries(products?.measurements || {}).map(([size, measures]) => (
              <tr key={size}>
                <td>{size}</td>
                <td>{Array.isArray(measures) ? measures.join(", ") : String(measures)}</td>
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
                <td>{Array.isArray(measures) ? measures.join(", ") : String(measures)}</td>
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
            <h1 className="title-h1 lineyka">{products?.name}</h1>
            <p className="product-page__price text-center">{Number(products?.price).toFixed()} руб.</p>
            <p className=" max-w-[200px] tablet:max-w-full text-[14px] tablet:text-[14px] text-gray-600">
              {products?.description}
            </p>
          </div>
          {/* ================================================== */}
          <div className="product-page__controls w-full max-w-[400px] flex flex-col gap-5 mt-2 mb-4">
            <div className="product-page__sizes">
              <p className="text-xs uppercase mb-2 font-medium tracking-wider">Размер</p>
              <ButtonSizes 
                selectedSize={selectedSize} 
                onSizeSelect={handleSizeSelect}
              />
            </div>
            <div className="product-page__colors">
              <p className="text-xs uppercase mb-2 font-medium tracking-wider">Цвет</p>
              <ButtonColors />
            </div>
          </div>
          {/* ================================================== */}

          {/* ================================================== */}
          <div className="product-page__actions w-full max-w-[400px]">
            <ButtonsProduct
              id={Number(product_id)}
              price={Number(products?.price).toFixed()}
              name={products?.name?.toString()}
              img={products?.images[0]?.image_path || ""}
              selectedSize={selectedSize}
            />
          </div>
          {/* ================================================== */}
          <div className='product-page__premium'>
            <div>
              <Image src={russia} alt="..."></Image>
              <h2>Сделано в<br/>России</h2>
            </div>
            <div>
              <Image src={delivery} alt="..."></Image>
              <h2>Удобная<br/>доставка</h2>
            </div>
            <div>
              <Image src={returnIcon} alt="..."></Image>
              <h2>Бесплатный<br/>возврат</h2>
            </div>
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
        {/* <Carousel heading="Идеи от стилиста" items={slides} /> */}
        <Carousel heading="Вам может понравиться" items={slides} />
      </div>
    </section>
  );
};

export default ProductPage;
