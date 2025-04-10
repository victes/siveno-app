/* eslint-disable @next/next/no-img-element */
"use client";
import { useFavStore } from "@/entities/favouriteStore/store";
import { useProductStore } from "@/entities/productStore/store";
import React, { useEffect, useRef, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { IFav } from "../types/type";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  img?: string | undefined; // Новое поле для строки изображения
  selectedSize?: string; //
  quantity?: number; // Новое поле для количества
}

const Favourite = ({ click, setClick }: IFav) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const { addProduct } = useProductStore();
  const { favourites, removeFav } = useFavStore();
  console.log(favourites);

  const handleDeleteWishlist = (id: string) => {
    removeFav(id);
    toast.error(`Удалено из Избранного`, {
      position: "top-left",
    });
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setAnimate(false);
      setTimeout(() => setClick(false), 300); // Задержка для завершения анимации
    }
  };

  const handleAddProduct = (product: Product ) => {
    addProduct({
      id: product.id.toString() || "",
      name: product.name || "",
      price: product.price || 0,
      img: product.img || '',
      selectedSize: "",
      quantity: 1,
    });
  };

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => setClick(false), 300);
  };

  useEffect(() => {
    if (click) {
      setAnimate(true); // Запуск анимации при открытии
    }
  }, [click]);

  return (
    <>
      {click && (
        <div
          className="fixed w-screen h-screen bg-black bg-opacity-80 top-0 left-0 z-50 flex justify-end"
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className={`bg-white p-4 relative overflow-y-auto rounded-lg shadow-lg transform max-w-[800px] w-full flex flex-col gap-5 ${
              animate ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300`}
            onClick={e => e.stopPropagation()} // Предотвращает всплытие события клика
          >
            <RxCross2 className="absolute top-0 right-0 m-5 cursor-pointer" size={30} onClick={() => handleClose()} />
            <h2 className="text-black text-[30px]">Избранное</h2>
            {favourites.length > 0 ? (
              favourites.map(product => (
                <li key={product.id} className="flex gap-5 p-2 justify-between ">
                  <Link href={`/product/${product.id}`} onClick={handleClose}>
                    <div className="flex gap-5 items-center cursor-pointer">
                      <div>
                        <img src={product.img} alt={product.name} className="h-[300px] w-[200px] object-cover" />
                      </div>
                      <div className="flex flex-col justify-start">
                        <span className="text-black">{product.name}</span>
                        <span className="text-[30px] text-black">{product.price} руб</span>
                      </div>
                    </div>
                  </Link>
                  <div className="flex">
                    <MdDeleteOutline
                      onClick={() => handleDeleteWishlist(product.id)}
                      size={30}
                      className="m-2 cursor-pointer hover:text-red-500"
                    />
                    <button
                      className="btn bg-transparent rounded-none btn-active uppercase"
                      onClick={() => handleAddProduct(product)}
                    >
                      Добавить в корзину
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <h2>Товаров не найдено.</h2>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Favourite;
