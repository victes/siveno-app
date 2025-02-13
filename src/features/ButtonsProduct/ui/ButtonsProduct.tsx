"use client";
import { useFavStore } from "@/entities/favouriteStore/store";
import { useProductStore } from "@/entities/productStore/store";
import { useAddToWishlistMutation } from "@/shared/api/ProfileApi/ProfileApi";
import { useAuth } from "@/shared/hook/AuthContext/ui/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";

interface IProduct {
  id: number;
  name: string | undefined;
  price: string;
  img: string;
}

const ButtonsProduct = ({ id, name, price, img }: IProduct) => {
  const { addProduct } = useProductStore();
  const { addFav } = useFavStore();
  // const [token, setToken] = useState("");
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

  const handleAddProduct = () => {
    if (localToken) {
      if (name?.trim() && price) {
        addProduct({
          id: id.toString(),
          name,
          price: parseFloat(price),
          img,
          selectedSize: "",
          quantity: 0,
        });
      }
    } else {
      push("/login");
    }
  };

  const handleAddFavourite = () => {
    if (localToken) {
      addToWishlist({ product_id: id });
      if (!localToken) {
        if (name?.trim() && price) {
          addFav({
            id: id.toString(),
            name,
            price: parseFloat(price),
            img,
          });
        }
      } else {
        if (name?.trim() && price) {
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
            <IoMdHeartEmpty
              size={30}
              className="hover:text-black transition-colors duration-200 ease-out cursor-pointer"
            />
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
