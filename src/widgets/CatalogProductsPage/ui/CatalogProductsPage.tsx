"use client";

import React from "react";

// import CatalogCard from "@/entities/CatalogCard";
import ButtonSizes from "@/entities/ButtonSizes";

import "../styles/catalog-products-page.scss";

import Select from "@/shared/ui/Select";

import { useGetProductsByCategoryQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";

const CatalogProductsPage = () => {
  const { data: products, isLoading, error } = useGetProductsByCategoryQuery(0);

  console.log(products);

  return (
    <div className="flex flex-col gap-4 mt-[10px] justify-center mb-[70px]">
      <div className="breadcrumbs text-sm mx-auto mb-[70px]">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Catalog</a>
          </li>
          <li>{"Категория не найдена"}</li>
        </ul>
      </div>

      <div className="mb-[40px]">
        <h1 className="title-h1">{"Категория не найдена"}</h1>
      </div>

      <div className="flex flex-col gap-8 mindesk:gap-0 mindesk:flex-row mindesk:justify-between items-center mb-[30px]">
        <div className="flex flex-col tablet:flex-row gap-[20px]">
          <Select
            name="По Популярности"
            options={[
              { option: "Сначала старые", value: "oldest" },
              { option: "Сначала новые", value: "newest" },
              { option: "Цена по возрастанию", value: "price_asc" },
              { option: "Цена по убыванию", value: "price_desc" },
            ]}
          />
          <Select
            name="Цвет"
            options={[
              { option: "Все цвета", value: "all" },
              { option: "Синий", value: "blue" },
              { option: "Серый", value: "gray" },
              { option: "Зеленный", value: "green" },
              { option: "Каштановый", value: "brown" },
            ]}
          />
        </div>
        <div className="flex items-center gap-2">
          <ButtonSizes />
        </div>
      </div>

      <div className="products-card-container">
        {isLoading && <p>Загрузка...</p>}
        {error && <p>Ошибка загрузки товаров</p>}
        {/* {products?.map(item => {
          // Парсим строку JSON в массив URL
          const imageUrls = JSON.parse(item.image_urls); // Теперь это массив
          return (
            <CatalogCard
              key={item.id}
              img={imageUrls[0]} // Используем первый URL из массива
              href={`/product/${item.id}`}
              name={item.name}
              price={item.price}
            />
          );
        })} */}
      </div>
    </div>
  );
};

export default CatalogProductsPage;
