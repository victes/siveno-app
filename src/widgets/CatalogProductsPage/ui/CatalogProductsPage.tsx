"use client";

import React from "react";

import CatalogCard from "@/entities/CatalogCard";
import ButtonSizes from "@/entities/ButtonSizes";

import "../styles/catalog-products-page.scss";

import Select from "@/shared/ui/Select";

import { useGetProductsByCategoryQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";
import { useGetCategoriesQuery } from "@/shared/api/CategoriesApi/CategoriesApi";
import { useParams } from "next/navigation";
import { useGetColorsByProductQuery } from "@/shared/api/ColorsApi/ui/ColorsApi";

const CatalogProductsPage = () => {
  const { products_slug } = useParams();

  const { data: categories } = useGetCategoriesQuery();
  const category = categories?.find(item => item.slug === products_slug);

  const { data: products, isLoading, error } = useGetProductsByCategoryQuery(category?.id || 0);

  const { data: colors } = useGetColorsByProductQuery();

  const colorOptions = colors
    ? colors.map(color => ({
        option: color.name, // Название цвета
        value: color.name.toLowerCase(), // Значение (можно color.id, если нужно)
      }))
    : [];

  const optionsColor = [{ option: "Все цвета", value: "all" }, ...colorOptions];

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
        <h1 className="title-h1">{category?.title || "Категория не найдена"}</h1>
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
          <Select name="Цвет" options={optionsColor} />
        </div>
        <div className="flex items-center gap-2">
          <ButtonSizes />
        </div>
      </div>

      <div className="products-card-container">
        {isLoading && <p>Загрузка...</p>}
        {error && <p>Ошибка загрузки товаров</p>}
        {products?.data.map(item => {
          // Парсим строку JSON в массив URL
          // const imageUrls = JSON.parse(item.image_urls); // Теперь это массив
          return (
            <CatalogCard
              key={item.id}
              img={item.images[0].image_path} // Используем первый URL из массива
              href={`/product/${item.id}`}
              name={item.name}
              price={Number(item.price).toFixed()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CatalogProductsPage;
