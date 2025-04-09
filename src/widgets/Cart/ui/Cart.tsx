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
    }
  }, [click]);
  const { data: colors } = useGetColorsByProductQuery();
  const { products, removeProduct, totalCost } = useProductStore();
  const findColor = (id: number | undefined ) => {
    return colors?.find(color => color.id == id)?.code

  }
  const openPayCard = () => {
    handleClose();
    setPayCard(prev => !prev);
  };

  return (
    <>
      {click && (
        <div
          className="fixed w-screen h-screen bg-black bg-opacity-80 top-0 left-0 z-50 flex justify-end"
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className={`bg-white p-4 relative rounded-lg shadow-lg transform max-w-[800px] overflow-y-auto w-full flex flex-col gap-5 ${
              animate ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300`}
            onClick={e => e.stopPropagation()} // Предотвращает всплытие события клика
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-black text-[30px]">Корзина</h2>
              <RxCross2 className="cursor-pointer" size={30} onClick={() => handleClose()} />
            </div>
            <p className="uppercase">
              {products.length} Товаров на {totalCost()} руб.
            </p>
            <div className="h-[700px] flex flex-col overflow-y-auto ">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <li key={index} className="flex gap-5 p-2 justify-between">
                    <Link href={`/product/${product.id}`} onClick={handleClose}>
                      <div className="flex gap-5 items-center cursor-pointer">
                        <div>
                          <img src={product.img} alt={product.name} className="h-[300px] w-[200px] object-cover" />
                        </div>
                        <div className="flex flex-col justify-start">
                          <span className="text-black">{product.name}</span>
                          <span className="text-[30px] text-black">{product.price} руб</span>
                          <div className='flex items-center gap-2'>
                            {product?.color_id &&  <ButtonColor  color={findColor(product?.color_id)} className='hover:scale-[1] !w-[20px] !h-[20px]' />}
                            {product?.selectedSize}
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div>
                      <MdDeleteOutline
                        onClick={() => removeProduct(index)}
                        size={30}
                        className="m-2 cursor-pointer hover:text-red-500"
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
