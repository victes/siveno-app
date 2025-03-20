"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import CatalogCard from "@/entities/CatalogCard";
import ButtonSizes from "@/entities/ButtonSizes";
import Select from "@/shared/ui/Select";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";

import { useGetProductsQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";
import { useGetColorsByProductQuery } from "@/shared/api/ColorsApi/ui/ColorsApi";

import "../../CatalogProductsPage/styles/catalog-products-page.scss";

const AllProductsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Фильтры из URL (если уже были установлены)
  const initialSort = searchParams.get("sort") || "newest";
  const initialColor = searchParams.get("color") || "all";
  const initialSize = searchParams.get("size") || "all";

  // Состояния фильтров
  const [sort, setSort] = useState(initialSort);
  const [color, setColor] = useState(initialColor);
  const [size, setSize] = useState(initialSize);

  // Загружаем цвета
  const { data: colors } = useGetColorsByProductQuery();
  const colorOptions = colors
    ? colors.map(color => ({
        option: color.name,
        value: color.name.toLowerCase(),
      }))
    : [];
  const optionsColor = [{ option: "Все цвета", value: "all" }, ...colorOptions];

  // Формируем query params
  const queryParams = new URLSearchParams();
  if (color !== "all") queryParams.set("color", color);
  if (size !== "all") queryParams.set("size", size);
  if (sort) queryParams.set("sort", sort);

  const queryString = queryParams.toString();
  const { data: products, isLoading, error } = useGetProductsQuery(queryString);

  // Тип для ключей фильтра
  type FilterKey = "color" | "size" | "sort";

  // Функция обновления фильтров
  const updateFilters = (key: FilterKey, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 mt-[10px] justify-center mb-[70px]">
      <div className="breadcrumbs text-sm mx-auto mb-[70px]">
        <Breadcrumbs />
      </div>

      <div className="mb-[40px]">
        <h1 className="title-h1">Все товары</h1>
      </div>

      {/* Фильтры */}
      <div className="flex flex-col gap-8 mindesk:gap-0 mindesk:flex-row mindesk:justify-between items-center mb-[30px]">
        <div className="flex flex-col tablet:flex-row gap-[20px]">
          <Select
            options={[
              { option: "Сначала новые", value: "newest" },
              { option: "Сначала старые", value: "oldest" },
              { option: "Цена по возрастанию", value: "price_asc" },
              { option: "Цена по убыванию", value: "price_desc" },
            ]}
            value={sort}
            onChange={value => {
              setSort(value);
              updateFilters("sort", value);
            }}
          />
          <Select
            options={optionsColor}
            value={color}
            onChange={value => {
              setColor(value);
              updateFilters("color", value);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <ButtonSizes
            selectedSize={size}
            onSizeSelect={value => {
              setSize(value);
              updateFilters("size", value);
            }}
          />
        </div>
      </div>

      {/* Карточки товаров */}
      <div className="products-card-container">
        {isLoading && <p>Загрузка...</p>}
        {error && <p>Ошибка загрузки товаров</p>}
        {!products?.data?.length && !isLoading && (
          <p className="text-center w-full text-lg">Товары не найдены</p>
        )}
        {products?.data?.map(item => (
          <CatalogCard
            id={item.id}
            key={item.id}
            img={item.images[0]?.image_path || '/images/placeholder.jpg'}
            href={`/product/${item.id}`}
            name={item.name}
            price={Number(item.price).toFixed()}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
