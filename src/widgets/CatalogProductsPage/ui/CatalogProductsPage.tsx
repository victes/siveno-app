"use client";

import React from "react";

import { useParams } from "next/navigation";

import CatalogCard from "@/entities/CatalogCard";
import ButtonSizes from "@/entities/ButtonSizes";

import "../styles/catalog-products-page.scss";

import Select from "@/shared/ui/Select";
import { useGetCategoriesQuery } from "@/shared/api/CategoriesApi/CategoriesApi";

const data = [
  {
    img: "https://lesyanebo.com/upload/iblock/3d5/xxionigeyz5yvy5s9p196sa4n5z7cw2z.jpg",
    href: "/product",
    name: "Шорты",
    price: "800",
  },
  {
    img: "https://lesyanebo.com/upload/resize_cache/iblock/e9a/1380_2760_1/idhpbzr0zy0rhpegyzz5ll8va6tiip5e.jpg",
    href: "/product",
    name: "Юбка макси",
    price: "800",
  },
  {
    img: "https://lesyanebo.com/upload/iblock/b42/d6sf79qahurentncbeczj4jadlmdasv8.jpg",
    href: "/product",
    name: "Костюм",
    price: "800",
  },
  {
    img: "https://lesyanebo.com/upload/iblock/199/mbmh82y96ebi8jovb8wsjwq7912bnle3.jpg",
    href: "/product",
    name: "Блуза сверкающая",
    price: "800",
  },
  {
    img: "https://lesyanebo.com/upload/resize_cache/iblock/54e/1380_2760_1/1ljxc9w0ixguqf0lck7tyykrwen5y7md.jpg",
    href: "/product",
    name: "Рубашка",
    price: "800",
  },
  {
    img: "https://lesyanebo.com/upload/iblock/5a6/mgoxqvczlab4egf837nghbejhmw0izn2.jpg",
    href: "/product",
    name: "Пиджаки и Жакеты",
    price: "800",
  },
  {
    img: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    href: "/product",
    name: "Пальто",
    price: "800",
  },
  {
    img: "https://lesyanebo.com/upload/resize_cache/iblock/f8a/1380_2760_1/y8ihliiv7ikktfath9d8ykgz16jskly0.jpg",
    href: "/product",
    name: "Платья",
    price: "800",
  },
  {
    img: "https://lesyanebo.com/upload/iblock/8ab/duig7ge6sbumy15x74ffu8q38gi2n1d0.jpg",
    href: "/product",
    name: "Holiday",
    price: "800",
  },
  {
    img: "https://lesyanebo.com/upload/resize_cache/iblock/a53/1380_2760_1/5daugwpvspt0amih4hxejfa6vboynyv3.jpg",
    href: "/product",
    name: "Кардиган",
    price: "800",
  },
  {
    img: "https://lesyanebo.com/upload/iblock/d44/ljwcb9i0rvgpnj0s0lbeb4ndxsastdzm.jpeg",
    href: "/product",
    name: "Свитер",
    price: "800",
  },
  {
    img: "https://lesyanebo.com/upload/iblock/af2/qzy0hg32ddp8u74f11lvaqlqvw1dltw2.jpg",
    href: "/product",
    name: "Джемпер",
    price: "800",
  },
];

const CatalogProductsPage = () => {
  const { slug } = useParams();
  const { data: categories } = useGetCategoriesQuery();

  const category = categories?.find(item => item.slug === slug);

  return (
    <div className="flex flex-col gap-4 mt-[10px] justify-center mb-[70px]">
      <div className="breadcrumbs text-sm mx-auto mb-[70px]">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Documents</a>
          </li>
          <li>{category?.title || slug}</li>
        </ul>
      </div>
      {/* ====================================================== */}
      <div className="mb-[40px]">
        <h1 className="title-h1">{category?.title || "Категория не найдена"}</h1>
      </div>
      {/* ========================================================== */}
      <div className="flex flex-col gap-8 mindesk:gap-0 mindesk:flex-row  mindesk:justify-between items-center mb-[30px]">
        <div className="flex flex-col tablet:flex-row gap-[20px]">
          <Select
            name="По Популярности"
            options={[
              { option: "Сначала старые", value: "Сначала старые" },
              { option: "Сначала новые", value: "Сначала новые" },
              { option: "Цена по возрастанию", value: "Цена по возрастанию" },
              { option: "Цена по убыванию", value: "Цена по убыванию" },
            ]}
          />
          <Select
            name="Цвет"
            options={[
              { option: "Все цвета", value: "Все цвета" },
              { option: "Синий", value: "Синий" },
              { option: "Серый", value: "Серый" },
              { option: "Зеленный", value: "Зеленный" },
              { option: "Каштановый", value: "Каштановый" },
            ]}
          />
        </div>
        <div className="flex items-center gap-2">
          <ButtonSizes />
        </div>
      </div>
      {/* ============================================================= */}
      <div className={`products-card-container`}>
        {data.map((item, idx) => (
          <CatalogCard key={idx} img={item.img} href={item.href} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default CatalogProductsPage;
