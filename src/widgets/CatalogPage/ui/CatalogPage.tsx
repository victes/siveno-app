"use client";

import CatalogCard from "@/entities/CatalogCard";
import React from "react";
import "../styles/catalog-categories.scss";
import { useGetCategoriesQuery } from "@/shared/api/CategoriesApi/CategoriesApi";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import Link from "next/link";

const CatalogPage = () => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();

  return (
    <div className="flex flex-col gap-4 mt-[10px] justify-center max-sm:gap-2">
      <div className="breadcrumbs text-sm mx-auto mb-5 max-sm:mb-0">
        <Breadcrumbs />
      </div>
      <div className="mb-5 max-sm:mb-0">
        <h1 className="title-h1">Категории</h1>
        <div className="mt-4 mb-5 max-sm:mb-0">
          <Link
            href="/catalog-products"
            className="inline-block py-3 px-6 bg-black text-white hover:bg-gray-800 transition-colors duration-200 ease-out"
          >
            Смотреть все товары
          </Link>
        </div>
        <ul>{/* {categories?.children.map(item => (} */}</ul>
      </div>
      <div className="categories-card-container">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error fetching categories</div>}

        {categories?.map(item => (
          <CatalogCard
            key={item.id}
            id={item.id}
            img={item.image} // Здесь можно добавить дефолтное изображение
            href={`/catalog-products/${item.slug}`} // Формируем ссылку на категорию
            name={item.title} // Передаем название категории
            del={true}
            stickers={item.stickers?.[0]?.name}
          />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
