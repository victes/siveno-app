import CatalogCard from "@/entities/CatalogCard";
import React from "react";

import "../styles/catalog-products-page.scss";

const data = [
  {
    img: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    href: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    name: "Новинки",
    price: "800",
  },
  {
    img: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    href: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    name: "Новинки",
    price: "800",
  },
  {
    img: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    href: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    name: "Верхняя одежда",
    price: "800",
  },
  {
    img: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    href: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    name: "Пиджаки и Жакеты",
    price: "800",
  },
  {
    img: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    href: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    name: "Пиджаки и Жакеты",
    price: "800",
  },
  {
    img: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    href: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    name: "Пиджаки и Жакеты",
    price: "800",
  },
  {
    img: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    href: "https://avatars.mds.yandex.net/i?id=a8e182180827be387759392cf99da10f_l-5244544-images-thumbs&n=13",
    name: "Пиджаки и Жакеты",
    price: "800",
  },
];

const CatalogProductsPage = () => {
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
          <li>Add Document</li>
        </ul>
      </div>
      {/* ====================================================== */}
      <div className="mb-[40px]">
        <h1 className="title-h1">Новинки</h1>
      </div>
      {/* ========================================================== */}
      <div className="mb-[30px]">
        <div className="">
          <select className="select bg-transparent w-full max-w-xs">
            <option disabled selected>
              Pick your favorite Simpson
            </option>
            <option>Homer</option>
            <option>Marge</option>
            <option>Bart</option>
            <option>Lisa</option>
            <option>Maggie</option>
          </select>
          <select className="select bg-transparent w-full max-w-xs">
            <option disabled selected>
              Pick your favorite Simpson
            </option>
            <option>Homer</option>
            <option>Marge</option>
            <option>Bart</option>
            <option>Lisa</option>
            <option>Maggie</option>
          </select>
        </div>
        <div className=""></div>
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
