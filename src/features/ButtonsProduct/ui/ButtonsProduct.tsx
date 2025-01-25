"use client";
import { useProductStore } from "@/entities/productStore/store";
import React from "react";

interface IProduct {
  name: string;
  price: string;
  img: string;
}

const ButtonsProduct = ({ name, price }: IProduct) => {
  const { addProduct } = useProductStore();

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
  return (
    <div className="flex flex-col items-center gap-[15px]">
      <div className="flex gap-4">
        <div className="">
          <button className="btn bg-transparent rounded-none btn-active uppercase" onClick={handleAddProduct}>
            Добавить в корзину
          </button>
        </div>
        <div className="">
          <button className="btn bg-transparent border-none shadow-none hover:bg-transparent btn-active uppercase">
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
