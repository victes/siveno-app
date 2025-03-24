"use client";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { FaTelegram } from "react-icons/fa";

// Интерфейс для пропсов
export interface IBurger {
  onOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Burger = ({ onOpen, setOpen }: IBurger) => {
  return (
    <>
      {onOpen ? (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black/70 backdrop-blur-md z-50 p-[20px] md:p-[40px] overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            {/* Кнопка закрытия */}
            <button
              onClick={() => setOpen(prev => !prev)}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Закрыть меню"
            >
              <RxCross1 size={30} className="cursor-pointer md:text-[40px]" />
            </button>

            {/* Социальные сети в правом верхнем углу */}
            <div className="flex items-center space-x-6">
              <a
                href="https://t.me/+pnsEBODRdPJiNmNi"
                className="text-white hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram size={24} />
              </a>
              <a
                href="https://vk.com/siveno.store"
                className="text-white hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M31.4907 63.4907C0 94.9813 0 145.671 0 247.04V264.96C0 366.329 0 417.019 31.4907 448.509C62.9813 480 113.671 480 215.04 480H232.96C334.329 480 385.019 480 416.509 448.509C448 417.019 448 366.329 448 264.96V247.04C448 145.671 448 94.9813 416.509 63.4907C385.019 32 334.329 32 232.96 32H215.04C113.671 32 62.9813 32 31.4907 63.4907ZM75.6 168.267H126.747C128.427 253.76 166.133 289.973 196 297.44V168.267H244.16V242C273.653 238.827 304.64 205.227 315.093 168.267H363.253C359.313 187.435 351.46 205.583 340.186 221.579C328.913 237.574 314.461 251.071 297.733 261.227C316.41 270.499 332.907 283.63 346.132 299.751C359.357 315.873 369.01 334.618 374.453 354.747H321.44C316.555 337.262 306.614 321.61 292.865 309.754C279.117 297.899 262.173 290.368 244.16 288.107V354.747H238.373C136.267 354.747 78.0267 284.747 75.6 168.267Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white p-4 md:p-8">
            {/* КАТЕГОРИИ */}
            <div className="w-full">
              <h3 className="text-xl font-semibold mb-4 text-white">КАТЕГОРИИ</h3>
              <ul className="space-y-3">
                {[
                  { label: "Все изделия", link: "/catalog-products" },
                  { label: "Верхняя одежда", link: "/catalog-products/Outerwear" },
                  { label: "Свитеры и кардиганы", link: "/catalog-products/SweatersAndCardigans" },
                  { label: "Пиджаки и жакеты", link: "/catalog-products/Jackets" },
                  { label: "Брюки", link: "/catalog-products/TrousersAndShorts" },
                  { label: "Рубашки и блузы", link: "/catalog-products/ShirtsAndBlouses" },
                  { label: "Платья", link: "/catalog-products/Dresses" },
                  { label: "Футболки и топы", link: "/catalog-products/TshirtsAndLongsleeves" },
                  { label: "Аксессуары", link: "/catalog-products/Accessories" },
                ].map(({ label, link }) => (
                  <li key={label} onClick={() => setOpen(prev => !prev)}>
                    <Link href={link} className="text-white hover:text-gray-300 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ПОКУПАТЕЛЯМ */}
            <div className="w-full">
              <h3 className="text-xl font-semibold mb-4 text-white">ПОКУПАТЕЛЯМ</h3>
              <ul className="space-y-3">
                {[
                  { label: "Личный кабинет", link: "/account" },
                  { label: "Часто задаваемые вопросы", link: "/faq" },
                  { label: "Оплата и доставка", link: "/shipping" },
                  { label: "Возврат", link: "/returns" },
                  { label: "Политика конфиденциальности", link: "/politika" },
                  { label: "Оферта", link: "/oferta" },
                  { label: "Уход за материалами", link: "/product-care" },
                ].map(({ label, link }) => (
                  <li key={label} onClick={() => setOpen(prev => !prev)}>
                    <Link href={link} className="text-white hover:text-gray-300 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* КОМПАНИЯ */}
            <div className="w-full">
              <h3 className="text-xl font-semibold mb-4 text-white">КОМПАНИЯ</h3>
              <ul className="space-y-3">
                {[
                  { label: "О компании", link: "/about" },
                  { label: "Контакты", link: "/contacts" },
                  { label: "Каталог", link: "/catalog-categories" },
                ].map(({ label, link }) => (
                  <li key={label} onClick={() => setOpen(prev => !prev)}>
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
