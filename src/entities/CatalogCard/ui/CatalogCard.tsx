/* eslint-disable @next/next/no-img-element */
import React from "react";

import { ICCard } from "../types";

import "../styles/catalog-card.scss";

const CatalogCard = ({ img, name, href, price }: ICCard) => {
  return (
    <div className={`catalog-card flex flex-col items-center`}>
      <div className="">
        <a href={href} className="block">
          <img src={img} alt={name} className={`w-full`} />
        </a>
      </div>
      <span className={`${price ? "productions__item-name" : "categories__item-name"}`}>{name}</span>
      <span className="productions__item-price">{price ? `${price} руб.` : ""}</span>
    </div>
  );
};

export default CatalogCard;
