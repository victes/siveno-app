import CatalogCard from "@/entities/CatalogCard";
// import { Container } from "@/shared/ui/Container";
import React from "react";

import "../styles/catalog-categories.scss";

const data = [
  {
    img: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    href: "/catalog-products",
    name: "Новинки",
    // price: "800",
  },
  {
    img: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    href: "/catalog-products",
    name: "Новинки",
    // price: "800",
  },
  {
    img: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    href: "/catalog-products",
    name: "Верхняя одежда",
  },
  {
    img: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    href: "/catalog-products",
    name: "Пиджаки и Жакеты",
  },
];

const CatalogPage = () => {
  return (
    // <Container>
    <div className="flex flex-col gap-4 mt-[10px] justify-center mb-[70px]">
      <div className="breadcrumbs text-sm mx-auto mb-[70px]">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Documents</a>
          </li>
          <li>Add Document</li>
        </ul>
      </div>
      <div className="mb-[20px]">
        <h1 className="title-h1">Каталог</h1>
      </div>
      <div className="categories-card-container">
        {data.map((item, idx) => (
          <CatalogCard key={idx} img={item.img} href={item.href} name={item.name} />
        ))}
      </div>
    </div>
    // </Container>
  );
};

export default CatalogPage;
