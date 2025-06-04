/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useEffect, useState } from "react";
import { ICart } from "../types/types";
import { useProductStore } from "@/entities/productStore/store";
import { MdDeleteOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { PayCard } from "@/widgets/PayCard";
import Link from "next/link";
import { useGetColorsByProductQuery } from "@/shared/api/ColorsApi/ui/ColorsApi";
import ButtonColor from "@/shared/ui/ButtonColor";
import ButtonSize from "@/shared/ui/ButtonSize";
import Image from "next/image";

const Cart = ({ click, setClick }: ICart) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [payCard, setPayCard] = useState(false);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setAnimate(false);
      setTimeout(() => setClick(false), 300); // Задержка для завершения анимации
    }
  };

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => setClick(false), 300);
  };

  useEffect(() => {
    if (click) {
      setAnimate(true); // Запуск анимации при открытии
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [click]);
  const { data: colors } = useGetColorsByProductQuery();
  const { products, removeProduct, totalCost } = useProductStore();
  const findColor = (id: number | undefined) => {
    return colors?.find(color => color.id == id)?.code;
  };
  const openPayCard = () => {
    handleClose();
    setPayCard(prev => !prev);
    ym(100833094, "reachGoal", "begin_checkout");
  };

  useEffect(() => {
    useProductStore.getState().loadProducts();
  }, []);

  return (
    <>
      {click && (
        <div
          className="fixed w-screen h-screen bg-black bg-opacity-80 top-0 left-0 z-50 flex justify-end overflow-y-hidden max-h-screen"
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className={`bg-white  p-4 max-sm:p-2.5 relative rounded-l-lg max-sm:rounded-none shadow-lg transform max-w-[800px] max-sm:max-w-full  overflow-y-auto  w-full flex flex-col gap-5 max-sm:gap-3 ${
              animate ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300`}
            onClick={e => e.stopPropagation()} // Предотвращает всплытие события клика
          >
            <div className="flex justify-between items-center mb-5 max-sm:mb-0">
              <h2 className="text-black text-[30px]">Корзина</h2>
              <RxCross2 className="cursor-pointer" size={30} onClick={() => handleClose()} />
            </div>
            <p className="uppercase">
              {products.length} Товаров на {totalCost()} руб.
            </p>
            <div className="h-full flex flex-col max-h-[calc(100vh-200px)] max-sm:max-h-[calc(100vh-180px)] overflow-y-auto ">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <li key={index} className="flex gap-5 p-2 justify-between  relative max-sm:gap-3 max-sm:px-0 ">
                    <Link href={`/product/${product.id}`} onClick={handleClose}>
                      <div className="flex gap-5 items-center cursor-pointer max-sm:gap-3">
                        <div className="relative">
                          {product.img && (
                            <Image
                              src={product.img}
                              alt={product?.name}
                              width={200}
                              height={300}
                              className="h-[300px] max-sm:h-[180px] w-[200px] max-sm:w-[160px] max-sm:min-w-[160px] object-cover rounded"
                              priority
                            />
                          )}
                          {product?.stickers?.[0]?.name && (
                            <span className="absolute top-0 py-1  px-2 rounded-br-lg flex items-center justify-center text-white font-medium rounded-tl text-xs left-0 bg-primary/80 ">
                              {product?.stickers?.[0]?.name}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col justify-start">
                          <span className="text-black">{product.name}</span>
                          <span className="text-[30px] text-black max-sm:text-xl max-sm:font-semibold">
                            {product.price} руб
                          </span>
                          <div className="flex items-center gap-2">{product?.selectedSize}</div>
                        </div>
                      </div>
                    </Link>
                    <div className="max-sm:absolute top-0 right-0">
                      <MdDeleteOutline
                        onClick={() => removeProduct(product.id)}
                        size={30}
                        className="m-2 cursor-pointer hover:text-red-500 max-sm:hidden"
                      />
                      <MdDeleteOutline
                        onClick={() => removeProduct(product.id)}
                        size={24}
                        className="m-2 cursor-pointer hover:text-red-500 sm:hidden "
                      />
                    </div>
                  </li>
                ))
              ) : (
                <div className="flex justify-center items-center m-auto text-center">Корзина пуста</div>
              )}
            </div>
            <button
              className="bg-gray-100 text-[#423C3D] px-4 py-4 hover:bg-gray-300 w-full"
              onClick={openPayCard}
              disabled={products.length === 0}
            >
              Оформить заказ
            </button>
          </div>
        </div>
      )}
      <PayCard open={payCard} onOpen={() => setPayCard(prev => !prev)} />
    </>
  );
};

export default Cart;
