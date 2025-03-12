"use client";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

// Интерфейс для пропсов
export interface IBurger {
  onOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Burger = ({ onOpen, setOpen }: IBurger) => {
  // Типизация состояния openSection, оно может быть строкой или null
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Типизация параметра section как строки
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      {onOpen ? (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-80 z-50 p-[40px]">
          <div className="flex text-center items-center gap-6">
            <RxCross1 onClick={() => setOpen(prev => !prev)} size={50} color="White" className="cursor-pointer" />
            <h2 className="text-bold text-[50px] text-white">SIVENO</h2>
          </div>
          <div className="flex justify-start gap-8 text-white p-8 max-laptop:flex-col">
            {/** SAMPLE SALE */}
            {/* <div className="max-laptop:w-full">
              <h3
                className="text-xl font-semibold mb-4 cursor-pointer max-laptop:mb-0"
                onClick={() => toggleSection("sample")}
              >
                SAMPLE SALE
              </h3>
              <ul
                className={`space-y-2 ${
                  openSection === "sample" || window.innerWidth > 1024 ? "block" : "hidden"
                } max-laptop:mt-2`}
              >
                {[
                  "Каталог",
                  "Верхняя одежда",
                  "Свитеры и кардиганы",
                  "Пиджаки и жакеты",
                  "Брюки",
                  "Рубашки и блузы",
                  "Лонгсливы и боди",
                  "Деним",
                  "Юбки",
                  "Трикотаж",
                  "Платья",
                  "Футболки и топы",
                  "Аксессуары",
                  "Сумки",
                  "Носки",
                  "Сертификаты",
                  "Смотреть все",
                  "Last Chance",
                ].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div> */}

            {/** CAMPAIGN */}
            <div className="w-full sm:w-1/3 max-laptop:w-full">
              <h3
                className="text-xl font-semibold mb-4 cursor-pointer max-laptop:mb-0"
                onClick={() => toggleSection("campaign")}
              >
                КОМПАНИЯ
              </h3>
              <ul
                className={`space-y-2 ${
                  openSection === "campaign" || window.innerWidth > 1024 ? "block" : "hidden"
                } max-laptop:mt-2`}
              >
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
                    <a href={link} className="hover:underline">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/** ПОКУПАТЕЛЯМ */}
            <div className="w-full sm:w-1/3 max-laptop:w-full">
              <h3
                className="text-xl font-semibold mb-4 cursor-pointer max-laptop:mb-0"
                onClick={() => toggleSection("customers")}
              >
                ПОКУПАТЕЛЯМ
              </h3>
              <ul
                className={`space-y-2 ${
                  openSection === "customers" || window.innerWidth > 1024 ? "block" : "hidden"
                } max-laptop:mt-2`}
              >
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
                    <a href={link} className="hover:underline">
                      {label}
                    </a>
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
