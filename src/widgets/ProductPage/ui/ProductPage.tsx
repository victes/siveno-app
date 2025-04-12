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
import {IPopular, IProductImage} from "@/shared/api/ProductsApi/types";
import { SliderItem } from "@/shared/ui/Carousel/ui/Carousel";
import {useProductStore} from "@/entities/productStore/store";

const ProductPage = () => {
  const { product_id } = useParams();
  const { data: products, isLoading, error } = useGetProductsByIdQuery(Number(product_id));
  const { data } = useGetProductsPopularQuery(10);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const selectedColorId = useProductStore(state => state.selectedColorId);

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

  const filterImages = (images: IProductImage[] | undefined) => {
    const filteredImages = images?.filter(image => image?.color_id == selectedColorId)
    if (!filteredImages?.length) {
      return   images?.filter(image => image?.color_id == images[0]?.color_id)
    }
    return filteredImages
  }
  const popular: IPopular[] = Array.isArray(data) ? data : [];
  const slides: SliderItem[] = transformProductsToSlides(popular);
  const carousel = filterImages(products?.images);
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const accordion = [
    {
      name: "Состав и Уход",
      value: <FormattedText text={products?.composition_care} />
    },
    {
      name: "Обмеры",
      value: products?.name && !accordianCategory.includes(products.name) ? (
          <table className="border-[#dedede] border-2 w-full h-auto">
            <thead className="border-b-2">
            <tr>
              <th className="border-r-2 p-2 tabletProduct">Размер Россия</th>
              <th className="border-r-2 w-[65px] p-2 leading-[18px] tabletProduct">{accordian[0].Head[1]}</th>
              <th className="border-r-2 w-[65px] p-2 leading-[18px] tabletProduct">{accordian[0].Head[2]}</th>
              <th className="w-[65px] p-2 leading-[18px] tabletProduct">{accordian[0].Head[3]}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td className="text-center border-r-2 font-bold border-b-2 leading-[20px] p-2 tabletProduct">Обхват груди</td>
              <td className="text-center border-r-2 p-2 border-b-2">{accordian[0].Bust[1]}</td>
              <td className="text-center border-r-2 p-2 border-b-2">{accordian[0].Bust[2]}</td>
              <td className="text-center p-2 border-b-2">{accordian[0].Bust[3]}</td>
            </tr>
            <tr>
              <td className="text-center border-r-2 font-bold border-b-2 leading-[20px] p-2 tabletProduct">Обхват талии</td>
              <td className="text-center border-r-2 p-2 border-b-2">{accordian[0].Waist[1]}</td>
              <td className="text-center border-r-2 p-2 border-b-2">{accordian[0].Waist[2]}</td>
              <td className="text-center p-2 border-b-2">{accordian[0].Waist[3]}</td>
            </tr>
            <tr>
              <td className="text-center border-r-2 font-bold border-b-2 p-2 leading-[20px] tabletProduct">Обхват бёдер</td>
              <td className="text-center border-r-2 p-2 border-b-2">{accordian[0].Hips[1]}</td>
              <td className="text-center border-r-2 p-2 border-b-2">{accordian[0].Hips[2]}</td>
              <td className="text-center p-2 border-b-2">{accordian[0].Hips[3]}</td>
            </tr>
            <tr>
              <td className="text-center border-r-2 font-bold leading-[20px] p-2 tabletProduct">Рост</td>
              <td className="text-center border-r-2 p-2">{accordian[0].Height[1]}</td>
              <td className="text-center border-r-2 p-2">{accordian[0].Height[2]}</td>
              <td className="text-center p-2">{accordian[0].Height[3]}</td>
            </tr>
            </tbody>
          </table>
      ) : (
          <table className="border-[#dedede] border-2 w-full h-auto">
            <thead className="border-b-2">
            <tr>
              <th className="border-r-2 p-2 tabletProduct">Размер Россия</th>
              <th className="border-r-2 w-[65px] p-2 leading-[18px] tabletProduct">{accordian[1].Head[1]}</th>
              <th className="border-r-2 w-[65px] p-2 leading-[18px] tabletProduct">{accordian[1].Head[2]}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td className="text-center border-r-2 font-bold border-b-2 leading-[20px] p-2 tabletProduct">Обхват груди</td>
              <td className="text-center border-r-2 p-2 border-b-2">{accordian[1].Bust[1]}</td>
              <td className="text-center border-r-2 p-2 border-b-2">{accordian[1].Bust[2]}</td>
            </tr>
            <tr>
              <td className="text-center border-r-2 font-bold border-b-2 leading-[20px] p-2 tabletProduct">Обхват талии</td>
              <td className="text-center border-r-2 p-2 border-b-2">{accordian[1].Waist[1]}</td>
              <td className="text-center border-r-2 p-2 border-b-2">{accordian[1].Waist[2]}</td>
            </tr>
            <tr>
              <td className="text-center border-r-2 font-bold border-b-2 p-2 leading-[20px] tabletProduct">Обхват бёдер</td>
              <td className="text-center border-r-2 p-2 border-b-2">{accordian[1].Hips[1]}</td>
              <td className="text-center p-2 border-b-2">{accordian[1].Hips[2]}</td>
            </tr>
            <tr>
              <td className="text-center border-r-2 font-bold leading-[20px] p-2 tabletProduct">Рост</td>
              <td className="text-center border-r-2 p-2">{accordian[1].Height[1]}</td>
              <td className="text-center p-2">{accordian[1].Height[2]}</td>
            </tr>
            </tbody>
          </table>
      ),
    },
    {
      name: "Параметры Модели",
      value: (
          <table className="border-[#dedede] border-2 w-full h-auto">
            <thead className="border-b-2">
            <tr>
              <th className="border-r-2 p-2 tabletProduct">Размер</th>
              <th className="border-r-2 p-2 leading-[18px] tabletProduct">Параметры</th>
            </tr>
            </thead>
            <tbody>
            {Object.entries(products?.measurements || {}).map(([size, measures]) => (
                <tr key={size}>
                  <td className='border-r-2 text-center'>{size}</td>
                  <td className="text-center">
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
                <ButtonColors colorCode={products.colors} />
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
                  selectedColorId={selectedColorId}
              />
            </div>


            <div className="product-page__premium">
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