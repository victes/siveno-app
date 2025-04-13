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
    <div className="flex flex-col gap-4 mt-[10px] justify-center mb-[70px]">
      <div className="breadcrumbs text-sm mx-auto mb-[70px]">
        <Breadcrumbs />
      </div>
      <div className="mb-[20px]">
        <h1 className="title-h1">Каталог</h1>
        <div className="mt-4 mb-8">
          <Link href="/catalog-products" className="inline-block py-3 px-6 bg-black text-white hover:bg-gray-800 transition-colors duration-200 ease-out">
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
          />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
