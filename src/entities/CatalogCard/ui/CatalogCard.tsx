/* eslint-disable @next/next/no-img-element */
import React from "react";

import { ICCard } from "../types";

import "../styles/catalog-card.scss";

const CatalogCard = ({ img, name, href, price }: ICCard) => {
  return (
    <div
      className={`catalog-card flex flex-col items-center relative transition-all duration-300 pb-2 ${
        price ? "hover:shadow-lg" : "hover:bg-gray-500"
      }`}
    >
      <div className="relative group">
        <a href={href} className="block">
          <img src={img} alt={name} className={`w-full `} />
        </a>
        {price && (
          <button
            className="absolute bottom-2 right-2 hover:bg-white  p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Добавить в избранное"
          >
            ❤
          </button>
        )}
      </div>
      <span className={`${price ? "productions__item-name" : "categories__item-name"}`}>{name}</span>
      <span className="productions__item-price">{price ? `${price} руб.` : ""}</span>
    </div>
  );
};

export default CatalogCard;
