"use client";
import React from "react";
import { IBurger } from "../types/types";
import { RxCross1 } from "react-icons/rx";

const Burger = ({ onOpen, setOpen }: IBurger) => {
  return (
    <>
      {onOpen ? (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-80 z-50 p-[40px]">
          <div className="flex text-center items-center gap-6">
            <RxCross1 onClick={() => setOpen(prev => !prev)} size={50} color="White" className="cursor-pointer" />
            <h2 className="text-bold text-[50px] text-white">PremShop</h2>
          </div>
          <div className="flex justify-start gap-8 text-white p-8">
            <div className="">
              <h3 className="text-xl font-semibold mb-4">SAMPLE SALE</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Каталог
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Верхняя одежда
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Свитеры и кардиганы
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Пиджаки и жакеты
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Брюки
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Рубашки и блузы
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Лонгсливы и боди
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Деним
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Юбки
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Трикотаж
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Платья
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Футболки и топы
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Аксессуары
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Сумки
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Носки
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Сертификаты
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Смотреть все
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Last Chance
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/3">
              <h3 className="text-xl font-semibold mb-4">CAMPAIGN</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    О компании
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Магазины (где купить)
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Контакты
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Работа у нас
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Оптовым партнерам
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/3">
              <h3 className="text-xl font-semibold mb-4">ПОКУПАТЕЛЯМ</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Личный кабинет
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Часто задаваемые вопросы
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Как сделать заказ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Оплата и доставка
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Возврат
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Политика конфиденциальности
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Оферта
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Уход за материалами
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Burger;
