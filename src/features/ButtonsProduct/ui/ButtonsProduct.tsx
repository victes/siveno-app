"use client";
import { useFavStore } from "@/entities/favouriteStore/store";
import { useProductStore } from "@/entities/productStore/store";
import { useAddToWishlistMutation } from "@/shared/api/ProfileApi/ProfileApi";
import React, { useEffect, useState } from "react";

interface IProduct {
  id: number;
  name: string;
  price: string;
  img: string;
}

const ButtonsProduct = ({ id, name, price, img }: IProduct) => {
  const { addProduct } = useProductStore();
  const { addFav } = useFavStore();
  const [token, setToken] = useState("");
  const [addToWishlist] = useAddToWishlistMutation();

  useEffect(() => {
    setToken(localStorage.getItem("access_token") || "");
  }, []);

  const handleAddProduct = () => {
    if (name.trim() && price) {
      addProduct({
        id: Date.now().toString(),
        name,
        price: parseFloat(price),
        img,
      });
    }
  };

  const handleAddFavourite = () => {
    addToWishlist({ product_id: id });
    if (!token) {
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
  };
  return (
    <div className="flex flex-col items-center gap-[15px]">
      <div className="flex gap-4">
        <div className="">
          <button className="btn bg-transparent rounded-none btn-active uppercase" onClick={handleAddProduct}>
            Добавить в корзину
          </button>
        </div>
        <div className="">
          <button
            className="btn bg-transparent border-none shadow-none hover:bg-transparent btn-active uppercase"
            onClick={handleAddFavourite}
          >
            ❤
          </button>
        </div>
      </div>
      <div className="">
        <button className="btn btn-outline btn-warning rounded-none uppercase">Оформить рассрочку</button>
      </div>
    </div>
  );
};

export default ButtonsProduct;
