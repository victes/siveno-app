"use client";

import ButtonColors from "@/entities/ButtonColors";
import ButtonSizes from "@/entities/ButtonSizes";
import ProductSlider from "@/entities/ProductSlider/ui/ProductSlider";
import { accordian, accordianCategory } from './index.data';
import ButtonsProduct from "@/features/ButtonsProduct";
import Accordion from "@/shared/ui/Accordion";
import Carousel from "@/shared/ui/Carousel";
import BtnBack from "@/shared/ui/BtnBack";
import delivery from "../icons/delivery.png";
import russia from "../icons/russia.png";
import returnIcon from "../icons/return.png";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../styles/product-page.scss";
import { useGetProductsByIdQuery, useGetProductsPopularQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";
import {IPopular} from "@/shared/api/ProductsApi/types";
import { SliderItem } from "@/shared/ui/Carousel/ui/Carousel";

const ProductPage = () => {
  const { product_id } = useParams();
  const { data: products, isLoading, error } = useGetProductsByIdQuery(Number(product_id));
  const { data } = useGetProductsPopularQuery(10);
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    const handleSizeSelected = (event: CustomEvent) => {
      if (event.detail?.size) {
        setSelectedSize(event.detail.size);
      }
    };

    window.addEventListener("sizeSelected", handleSizeSelected as EventListener);
    return () => window.removeEventListener("sizeSelected", handleSizeSelected as EventListener);
  }, []);

  const FormattedText = ({ text }: { text?: string }) => {
    if (!text) return null;
    return (
        <div className="whitespace-pre-line">
          {text}
        </div>
    );
  };
  const selectedSizeId =  products?.sizes?.find(size => size?.name == selectedSize);

  const transformProductsToSlides = (items: IPopular[] = []): SliderItem[] => {
    return items.map(product => ({
      id: product.id,
      img: product.images?.length
          ? product.images.map(image => ({ src: image.image_path, alt: product.name }))
          : [{ src: "/images/MainPage/1.jpg", alt: "Нет изображения" }],
      title: product.name,
      price: product.price,
    }));
  };

  const popular: IPopular[] = Array.isArray(data) ? data : [];
  const slides: SliderItem[] = transformProductsToSlides(popular);
  const carousel = products?.images;
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const accordion = [
    {
      name: "Состав и Уход",
      value: <FormattedText text={products?.composition_care} />
    },
    {
      name: "Размеры",
      value: products?.preference && Object.keys(products.preference).length > 0 ? (
        <table className="border-[#dedede] border-2 w-full h-auto">
          <tbody>
          <tr>
            <th className="border-r-2 border-2 p-2 text-left tabletProduct">Размер Россия</th>
            {products.preference.map((item, idx) => (
              <td key={idx} className="text-center border-2 p-2 font-bold">{item.size_label}</td>
            ))}
          </tr>
          <tr>
            <th className="border-r-2 border-2 p-2 text-left tabletProduct">Обхват груди</th>
            {products.preference.map((item, idx) => (
              <td key={idx} className="text-center border-2 p-2">{item.chest}</td>
            ))}
          </tr>
          <tr>
            <th className="border-r-2 border-2 p-2 text-left tabletProduct">Обхват талии</th>
            {products.preference.map((item, idx) => (
              <td key={idx} className="text-center border-2 p-2">{item.waist}</td>
            ))}
          </tr>
          <tr>
            <th className="border-r-2 border-2 p-2 text-left tabletProduct">Обхват бёдер</th>
            {products.preference.map((item, idx) => (
              <td key={idx} className="text-center border-2 p-2">{item.hips}</td>
            ))}
          </tr>
          <tr>
            <th className="border-r-2 border-2 p-2 text-left tabletProduct">Рост</th>
            <td className="text-center border-2 p-2" colSpan={100}>164-174</td>
          </tr>
          </tbody>
        </table>
      ) : (
        <p className="tabletProduct">Нет данных об размерах</p>
      ),
    },
    {
      name: "Обмеры",
      value: products?.size_characteristics && products.size_characteristics.length > 0 ? (
        <table className="border-[#dedede] border-2 w-full h-auto">
          <tbody>
          {products.size_characteristics.some(p => p.size_label) && (
            <tr>
              <th className="border-r-2 border-2 p-2 text-left tabletProduct">Размер Россия</th>
              {products.size_characteristics.map((item, idx) =>
                item.size_label ? (
                  <td key={idx} className="text-center border-2 p-2 font-bold">{item.size_label}</td>
                ) : null
              )}
            </tr>
          )}
          {products.size_characteristics.some(p => p.length_back) && (
            <tr>
              <th className="border-r-2 border-2 p-2 text-left tabletProduct">Длина по спинке</th>
              {products.size_characteristics.map((item, idx) =>
                item.length_back ? (
                  <td key={idx} className="text-center border-2 p-2">{item.length_back}</td>
                ) : null
              )}
            </tr>
          )}
          {products.size_characteristics.some(p => p.chest) && (
            <tr>
              <th className="border-r-2 border-2 p-2 text-left tabletProduct">Обхват груди</th>
              {products.size_characteristics.map((item, idx) =>
                item.chest ? (
                  <td key={idx} className="text-center border-2 p-2">{item.chest}</td>
                ) : null
              )}
            </tr>
          )}
          {products.size_characteristics.some(p => p.bottom_girth) && (
            <tr>
              <th className="border-r-2 border-2 p-2 text-left tabletProduct">Обхват по низу</th>
              {products.size_characteristics.map((item, idx) =>
                item.bottom_girth ? (
                  <td key={idx} className="text-center border-2 p-2">{item.bottom_girth}</td>
                ) : null
              )}
            </tr>
          )}
          {products.size_characteristics.some(p => p.sleeve_length_from_neck) && (
            <tr>
              <th className="border-r-2 border-2 p-2 text-left tabletProduct">Длина рукава от горловины</th>
              {products.size_characteristics.map((item, idx) =>
                item.sleeve_length_from_neck ? (
                  <td key={idx} className="text-center border-2 p-2">{item.sleeve_length_from_neck}</td>
                ) : null
              )}
            </tr>
          )}
          {products.size_characteristics.some(p => p.sleeve_girth_under_armhole) && (
            <tr>
              <th className="border-r-2 border-2 p-2 text-left tabletProduct">Обхват рукава под проймой</th>
              {products.size_characteristics.map((item, idx) =>
                item.sleeve_girth_under_armhole ? (
                  <td key={idx} className="text-center border-2 p-2">{item.sleeve_girth_under_armhole}</td>
                ) : null
              )}
            </tr>
          )}
          {products.size_characteristics.some(p => p.side_seam_length) && (
            <tr>
              <th className="border-r-2 border-2 p-2 text-left tabletProduct">Длина по боковому шву</th>
              {products.size_characteristics.map((item, idx) =>
                item.side_seam_length ? (
                  <td key={idx} className="text-center border-2 p-2">{item.side_seam_length}</td>
                ) : null
              )}
            </tr>
          )}
          {products.size_characteristics.some(p => p.waist) && (
            <tr>
              <th className="border-r-2 border-2 p-2 text-left tabletProduct">Обхват талии</th>
              {products.size_characteristics.map((item, idx) =>
                item.waist ? (
                  <td key={idx} className="text-center border-2 p-2">{item.waist}</td>
                ) : null
              )}
            </tr>
          )}
          {products.size_characteristics.some(p => p.hips) && (
            <tr>
              <th className="border-r-2 border-2 p-2 text-left tabletProduct">Обхват бёдер</th>
              {products.size_characteristics.map((item, idx) =>
                item.hips ? (
                  <td key={idx} className="text-center border-2 p-2">{item.hips}</td>
                ) : null
              )}
            </tr>
          )}
          {products.size_characteristics.some(p => p.inseam_length) && (
            <tr>
              <th className="border-r-2 border-2 p-2 text-left tabletProduct">Длина по внутреннему шву</th>
              {products.size_characteristics.map((item, idx) =>
                item.inseam_length ? (
                  <td key={idx} className="text-center border-2 p-2">{item.inseam_length}</td>
                ) : null
              )}
            </tr>
          )}
          </tbody>
        </table>
      ) : (
        <p className="tabletProduct">Нет данных об обмерах изделия</p>
      ),
    },
    {
      name: "Параметры Модели",
      value: (
        <table className="border-[#dedede] border-2 w-full h-auto">
          <thead className="border-2">
          <tr>
            <th className="border-r-2 border-2 p-2 tabletProduct">Размер</th>
            <th className="border-2 p-2 leading-[18px] tabletProduct">Параметры</th>
          </tr>
          </thead>
          <tbody>
          {Object.entries(products?.measurements || {}).map(([size, measures]) => (
            <tr key={size}>
              <td className="border-r-2 border-2 text-center p-2">{size}</td>
              <td className="border-2 text-center p-2">
                {Array.isArray(measures) ? measures.join(", ") : String(measures)}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      ),
    },
  ];

  if (isLoading) return <p className="mx-auto">Загрузка...</p>;
  if (error) return <p>Ошибка загрузки товаров</p>;
  if (!products) return <p>Товар не найден</p>;

  return (
      <section className="mb-[60px] pb-[20px]">
        <div className="text-sm mx-auto mb-[30px]">
          <BtnBack />
        </div>

        <div className="flex flex-col items-center largeDesk:flex-row justify-between">
          <div className="mb-[40px] largeDesk:mb-0">
            <ProductSlider carousel={carousel || []} />
          </div>

          <div className="flex flex-col gap-[20px] items-center tablet:mx-auto tablet:max-w-[500px]">
            <div className="flex flex-col items-center justify-center gap-[20px]">
              <h1 className="title-h1 lineyka">{products.name}</h1>
              <p className="product-page__price text-center">{Number(products.price).toFixed()} руб.</p>
              <p className="tablet:max-w-full text-[14px] tablet:text-[14px] text-gray-600">
                {products.description}
              </p>
            </div>

            <div className="product-page__controls w-full max-w-[400px] flex flex-col gap-5 mt-2 mb-4">
              <div className="product-page__sizes">
                <p className="text-xs uppercase mb-2 font-medium tracking-wider">Размер</p>
                <ButtonSizes
                    selectedSize={selectedSize}
                    onSizeSelect={handleSizeSelect}
                    id={Number(product_id)}
                />
              </div>
              <div className="product-page__colors">
                <p className="text-xs uppercase mb-2 font-medium tracking-wider">Цвет</p>
                <ButtonColors colorOptions={products.color_options} productId={products.id}/>
              </div>
            </div>


            <div className="product-page__actions w-full max-w-[400px]">
              <ButtonsProduct
                  id={Number(product_id)}
                  price={Number(products.price).toFixed()}
                  name={products.name?.toString()}
                  img={products.images[0]?.image_path || ""}
                  selectedSize={selectedSize}
                  selectedSizeId={selectedSizeId?.id}
              />
            </div>


            <div className="product-page__premium text-primary">
              <div>
                <Image src={russia} alt="Сделано в России" />
                <h2>Сделано в<br />России</h2>
              </div>
              <div>
                <Image src={delivery} alt="Удобная доставка" />
                <h2>Удобная<br />доставка</h2>
              </div>
              <div>
                <Image src={returnIcon} alt="Бесплатный возврат" />
                <h2>Бесплатный<br />возврат</h2>
              </div>
            </div>

            <div className="w-full">
              {accordion.map((item, idx) => (
                  <Accordion key={idx} name={item.name} context={item.value} />
              ))}
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-5 mt-8">
          <Carousel heading="Вам может понравиться" items={slides} />
        </div>
      </section>
  );
};

export default ProductPage;