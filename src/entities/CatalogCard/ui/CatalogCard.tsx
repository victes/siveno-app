/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

import { ICCard } from "../types";

import "../styles/catalog-card.scss";

import { useFavStore } from "@/entities/favouriteStore/store";
import Link from "next/link";
import Image from "next/image";

const CatalogCard = ({ img, name, href, price }: ICCard) => {
  const { addFav } = useFavStore();
  const handleAddFavourite = () => {
    if (name.trim() && price) {
      addFav({
        id: Date.now().toString(),
        name,
        price: parseFloat(price),
        img,
      });
    }
  };
  return (
    <div
      className={`catalog-card flex flex-col items-center relative transition-all duration-300 pb-2 hover:shadow-lg`}
    >
      <div className="relative group">
        <Link href={href} className="block">
          <Image width={400} height={400} priority={true} src={img} alt={name} className={`w-full `} />
        </Link>
        {price && (
          <button
            className="absolute bottom-2 right-2 hover:bg-white  p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Добавить в избранное"
            onClick={handleAddFavourite}
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
