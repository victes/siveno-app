/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { IFav } from "../types/type";
import { RxCross2 } from "react-icons/rx";
import { useDeleteWishlistMutation, useGetWishListQuery } from "@/shared/api/ProfileApi/ProfileApi";
import { toast } from "react-toastify";
import { useProductStore } from "@/entities/productStore/store";

interface ProductImage {
  image_path: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  images: ProductImage[];
}

const Favourite = ({ click, setClick }: IFav) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [deleteWishlist] = useDeleteWishlistMutation();
  const { data, isSuccess } = useGetWishListQuery({});
  const { addProduct } = useProductStore();

  const handleDeleteWishlist = (id: number) => {
    deleteWishlist({ id: id });
    toast.error(`Удалено из Избранного`, {
      position: "top-right",
    });
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setAnimate(false);
      setTimeout(() => setClick(false), 300); // Задержка для завершения анимации
    }
  };

  // console.log(data);

  const handleAddProduct = (product: Product) => {
    if (isSuccess) {
      addProduct({
        id: product.id.toString() || "",
        name: product.name || "",
        price: product.price || 0,
        img: product.images[0].image_path,
        selectedSize: "",
        quantity: 1,
      });
    }
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
  // const { favourite, removeFav } = useFavStore();
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
            <RxCross2 className="absolute top-0 left-0 m-5 cursor-pointer" size={30} onClick={() => handleClose()} />
            <h2 className="text-black text-[30px]">Избранное</h2>
            {isSuccess
              ? data.data.map((product: Product) => (
                  <li key={product.id} className="flex gap-5 p-2 justify-between ">
                    <div className="flex gap-5 items-center">
                      <div>
                        <img
                          src={product.images[0].image_path}
                          alt={product.name}
                          className="h-[300px] w-[200px] object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-start">
                        <span className="text-black">{product.name}</span>
                        <span className="text-[30px] text-black">{product.price} руб</span>
                      </div>
                    </div>
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
              : "Товаров нет"}
          </div>
        </div>
      )}
    </>
  );
};

export default Favourite;
