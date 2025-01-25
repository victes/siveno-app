import CatalogCard from "@/entities/CatalogCard";
// import { Container } from "@/shared/ui/Container";
import React from "react";

import "../styles/catalog-categories.scss";

const data = [
  {
    img: "https://lesyanebo.com/upload/resize_cache/iblock/e1c/1380_2760_1/n7mamtf2sdiffd38gpolvhm70djuwjwt.jpg",
    href: "/catalog-products",
    name: "Новинки",
    // price: "800",
  },
  {
    img: "https://lesyanebo.com/upload/iblock/597/kciurc5mry0v9nfw5mnugtjdqx600izc.jpg",
    href: "/catalog-products",
    name: "Пальто",
    // price: "800",
  },

  {
    img: "https://lesyanebo.com/upload/iblock/387/jxn3hz6rwi0bf2pg28d6b2d7syfpqc1v.jpg",
    href: "/catalog-products",
    name: "Пуховики",
  },
  {
    img: "https://lesyanebo.com/upload/iblock/4a3/32g616n369jd0lijh6eace6rtr295i8v.jpg",
    href: "/catalog-products",
    name: "Брюки",
  },
  {
    img: "https://lesyanebo.com/upload/iblock/16d/ghfq5xz9bfi61cli3wqo4u8voj5id40v.jpeg",
    href: "/catalog-products",
    name: "Топы",
  },
  {
    img: "https://lesyanebo.com/upload/iblock/27e/85w33kwpz2j3t1iypj9bdjb6kmxvop8w.jpg",
    href: "/catalog-products",
    name: "Шорты",
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
