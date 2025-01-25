import { useProductStore } from "@/entities/productStore/store";
import React, { useState } from "react";

const ButtonsProduct = () => {
  const { addProduct } = useProductStore();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAddProduct = () => {
    if (name.trim() && price) {
      addProduct({
        id: Date.now().toString(),
        name,
        price: parseFloat(price),
      });
      setName("");
      setPrice("");
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
