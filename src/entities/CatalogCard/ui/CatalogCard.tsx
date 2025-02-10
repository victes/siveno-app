"use client";
import React, { useEffect, useState } from "react";
import { ICCard } from "../types";

import "../styles/catalog-card.scss";

import { useFavStore } from "@/entities/favouriteStore/store";
import Link from "next/link";
import Image from "next/image";
import { useAddToWishlistMutation } from "@/shared/api/ProfileApi/ProfileApi";
import { useAuth } from "@/shared/hook/AuthContext/ui/AuthContext";
import { useRouter } from "next/navigation";

const CatalogCard = ({ id, img, name, href, price }: ICCard) => {
  const { addFav } = useFavStore();
  const { push } = useRouter();
  const [addToWishlist] = useAddToWishlistMutation();
  const { token } = useAuth(); // Теперь токен приходит из контекста
  const [localToken, setLocalToken] = useState<string | null>(token);

  useEffect(() => {
    setLocalToken(token); // Синхронизируем состояние с контекстомW
  }, [token]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setToken(localStorage.getItem("access_token") || "");
  //   }
  // }, []);

  const handleAddFavourite = () => {
    if (localToken) {
      addToWishlist({ product_id: id });
      if (!localToken) {
        if (name.trim() && price) {
          addFav({
            id: id.toString(),
            name,
            price: parseFloat(price),
            img,
          });
        }
      } else {
        if (name.trim() && price) {
          addFav({
            id: id.toString(),
            name,
            price: parseFloat(price),
            img,
          });
        }
      }
    } else {
      push("/login");
    }
  };

  return (
    <div className="catalog-card flex flex-col items-center relative transition-all duration-300 pb-2 hover:shadow-lg">
      <div className="relative group">
        <Link href={href} className="block w-full">
          {/* Используем Image компонент для загрузки изображения */}
          <Image
            width={400}
            height={400}
            priority={true}
            src={img}
            alt={name}
            className={`w-auto h-[600px] object-cover`}
          />
        </Link>

        {price && (
          <button
            className="absolute bottom-2 right-2 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Добавить в избранное"
            onClick={handleAddFavourite}
          >
            ❤
          </button>
        )}
      </div>
      <span className={price ? "productions__item-name" : "categories__item-name"}>{name}</span>
      {/* Убедитесь, что price всегда строка или пустая строка */}
      <span className="productions__item-price">{price ? `${price} руб.` : ""}</span>
    </div>
  );
};

export default CatalogCard;
