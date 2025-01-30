import React, { useEffect, useRef, useState } from "react";
import { IPayCard } from "../types/type";
import { RxCross2 } from "react-icons/rx";
import { useProductStore } from "@/entities/productStore/store";

const PayCard = ({ onOpen, open }: IPayCard) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const { products, totalCost } = useProductStore();
  const [selected, setSelected] = useState<string>("");

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setAnimate(false);
      setTimeout(() => onOpen(false), 300); // Задержка для завершения анимации
    }
  };

  useEffect(() => {
    if (open) {
      setAnimate(true); // Запуск анимации при открытии
    }
  }, [open]);

  return (
    <>
      {open ? (
        <div
          className="fixed w-screen h-screen bg-black bg-opacity-20 top-0 left-0 flex justify-end z-[60]"
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className={`bg-white p-4 relative rounded-lg shadow-lg transform max-w-[800px] overflow-y-auto w-full flex flex-col gap-5 ${
              animate ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300`}
            onClick={e => e.stopPropagation()}
          >
            <RxCross2
              className="absolute top-0 left-0 m-5 cursor-pointer"
              size={30}
              onClick={() => onOpen(prev => !prev)}
            />
            <h2 className="text-black text-[30px]">Оформление заказа</h2>
            <p className="uppercase">
              {products.length} Товаров на {totalCost()} руб.
            </p>
            <div className="flex justify-center gap-[50px] max-mindesk:flex-col">
              <div className="mt-[0px] flex flex-col gap-[50px] max-w-[600px] w-full max-laptop:mt-[10px]">
                <div className="flex gap-[40px] max-minilaptop:flex-col">
                  <div className="flex flex-col space-y-2 w-full">
                    <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                      <input type="text" className="grow" placeholder="Имя" />
                    </label>
                  </div>
                  <div className="flex flex-col space-y-2 w-full">
                    <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                      <input type="text" className="grow" placeholder="Номер телефона" />
                    </label>
                  </div>
                </div>
                <div className="flex gap-[40px] max-minilaptop:flex-col">
                  <div className="flex flex-col space-y-2 w-full">
                    <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                      <input type="text" className="grow" placeholder="Фамилия" />
                    </label>
                  </div>
                  <div className="flex flex-col space-y-2 w-full">
                    <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                      <input type="text" className="grow" placeholder="Промокод" />
                    </label>
                  </div>
                </div>
                <div className="flex gap-[40px] max-minilaptop:flex-col">
                  <div className="flex flex-col space-y-2 w-full">
                    <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                      <input type="text" className="grow" placeholder="Почта" />
                    </label>
                  </div>
                  <div className="flex flex-col space-y-2 w-full">
                    <button className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300 w-full">
                      Подписаться на рассылку
                    </button>
                  </div>
                </div>
                <div className="flex gap-[40px] max-minilaptop:flex-col">
                  <div className="flex flex-col space-y-2 w-full">
                    <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                      <input className="grow" placeholder="Страна" />
                    </label>
                  </div>
                  <div className="flex flex-col space-y-2 w-full">
                    <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                      <input className="grow" placeholder="Почтовой индекс" />
                    </label>
                  </div>
                </div>
                <div className="flex gap-[40px] max-minilaptop:flex-col">
                  <div className="flex flex-col space-y-2 w-full">
                    <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                      <input className="grow" placeholder="Город" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start text-left px-[100px] py-[60px]">
              <p className="text-black uppercase">Оплата</p>
              <div className="flex flex-col gap-[30px] mt-[30px]">
                <label className="flex gap-[20px]">
                  <input
                    type="radio"
                    name="option"
                    value="1"
                    checked={selected === "1"}
                    onChange={e => setSelected(e.target.value)}
                    className="w-[20px] h-[20px]"
                  />
                  Сбербанк
                </label>
                <label className="flex gap-[20px]">
                  <input
                    type="radio"
                    name="option"
                    value="2"
                    checked={selected === "2"}
                    onChange={e => setSelected(e.target.value)}
                    className="w-[20px] h-[20px]"
                  />
                  Т-Банк
                </label>
                <label className="flex gap-[20px]">
                  <input
                    type="radio"
                    name="option"
                    value="3"
                    checked={selected === "3"}
                    onChange={e => setSelected(e.target.value)}
                    className="w-[20px] h-[20px]"
                  />
                  Онлайн оплата
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-start text-left px-[100px] gap-[20px]">
              <p className=" text-black uppercase">Итого</p>
              <p className="text-[20px] text-black uppercase">{totalCost()} руб.</p>
            </div>
            <button className="bg-gray-100 text-[#423C3D] px-6 py-2 hover:bg-gray-300 w-full mt-[40px]">
              Оплатить заказ
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PayCard;
