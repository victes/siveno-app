"use client";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";

// Интерфейс для пропсов
export interface IBurger {
  onOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Burger = ({ onOpen, setOpen }: IBurger) => {
  return (
    <>
      {onOpen ? (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-80 z-50 p-[20px] md:p-[40px] overflow-y-auto">
          <div className="flex text-center items-center gap-6 mb-6">
            <RxCross1 onClick={() => setOpen(prev => !prev)} size={30} color="White" className="cursor-pointer md:text-[50px]" />
            <h2 className="text-bold text-[30px] md:text-[50px] text-white">SIVENO</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white p-4 md:p-8">
            {/* КОМПАНИЯ */}
            <div className="w-full">
              <h3 className="text-xl font-semibold mb-4 text-white">
                КОМПАНИЯ
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "О компании", link: "/about" },
                  { label: "О нас", link: "/about-us" },
                  { label: "Магазины (где купить)", link: "/stores" },
                  { label: "Контакты", link: "/contacts" },
                  { label: "Работа у нас", link: "/careers" },
                  { label: "Оптовым партнерам", link: "/partners" },
                  { label: "Каталог", link: "/catalog-categories" },
                  { label: "Истории", link: "/stories-categories" },
                ].map(({ label, link }) => (
                  <li key={label}>
                    <Link href={link} className="text-white hover:text-gray-300 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ПОКУПАТЕЛЯМ */}
            <div className="w-full">
              <h3 className="text-xl font-semibold mb-4 text-white">
                ПОКУПАТЕЛЯМ
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Личный кабинет", link: "/account" },
                  { label: "Часто задаваемые вопросы", link: "/faq" },
                  { label: "Как сделать заказ", link: "/how-to-order" },
                  { label: "Оплата и доставка", link: "/payment-delivery" },
                  { label: "Возврат", link: "/returns" },
                  { label: "Политика конфиденциальности", link: "/privacy-policy" },
                  { label: "Оферта", link: "/offer" },
                  { label: "Уход за материалами", link: "/material-care" },
                ].map(({ label, link }) => (
                  <li key={label}>
                    <Link href={link} className="text-white hover:text-gray-300 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* КАТЕГОРИИ */}
            <div className="w-full">
              <h3 className="text-xl font-semibold mb-4 text-white">
                КАТЕГОРИИ
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Верхняя одежда", link: "/catalog/outerwear" },
                  { label: "Свитеры и кардиганы", link: "/catalog/sweaters" },
                  { label: "Пиджаки и жакеты", link: "/catalog/jackets" },
                  { label: "Брюки", link: "/catalog/pants" },
                  { label: "Рубашки и блузы", link: "/catalog/shirts" },
                  { label: "Платья", link: "/catalog/dresses" },
                  { label: "Футболки и топы", link: "/catalog/t-shirts" },
                  { label: "Аксессуары", link: "/catalog/accessories" },
                  { label: "Смотреть все", link: "/catalog" },
                ].map(({ label, link }) => (
                  <li key={label}>
                    <Link href={link} className="text-white hover:text-gray-300 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
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
