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
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useProductStore } from "@/entities/productStore/store";

const CatalogCard = ({ id, img, name, href, price }: ICCard) => {
  const { addFav } = useFavStore();
  const { addProduct } = useProductStore();
  const { push } = useRouter();
  const [addToWishlist] = useAddToWishlistMutation();
  const { token } = useAuth();
  const [localToken, setLocalToken] = useState<string | null>(token);

  useEffect(() => {
    setLocalToken(token);
  }, [token]);

  const handleAddFavourite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (localToken) {
      addToWishlist({ product_id: id });
      if (name.trim() && price) {
        addFav({
          id: id.toString(),
          name,
          price: parseFloat(price),
          img,
        });
      }
    } else {
      push("/login");
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (name.trim() && price) {
      addProduct({
        id: id.toString(),
        name,
        price: parseFloat(price),
        img,
        quantity: 1,
        selectedSize: "",
      });
    }
  };

  return (
    <Link href={href} className="block product-card-wrapper">
      <div className="product-card">
      <div className="product-card__image">
        <Image src={img} alt='...' width={600} height={400}  />

        <div className="product-card__actions">
          <button aria-label="Добавить в избранное" onClick={handleAddFavourite}>
            <IoMdHeartEmpty size={18} />
          </button>
          <button aria-label="Добавить в корзину" onClick={handleAddToCart}>
            <IoCartOutline size={18} />
          </button>
        </div>
      </div>

      <div className="product-card__info">
        <h3 className="product-card__title">{name}</h3>
        <p className="product-card__price">{price ? `${price} ₽` : ""}</p>
      </div>
    </div>
    </Link>
  );
};

export default CatalogCard;
