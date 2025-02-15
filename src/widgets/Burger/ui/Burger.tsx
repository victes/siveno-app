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
                  "О компании",
                  "О нас",
                  "Магазины (где купить)",
                  "Контакты",
                  "Работа у нас",
                  "Оптовым партнерам",
                  "Каталог",
                ].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:underline">
                      {item}
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
                  "Личный кабинет",
                  "Часто задаваемые вопросы",
                  "Как сделать заказ",
                  "Оплата и доставка",
                  "Возврат",
                  "Политика конфиденциальности",
                  "Оферта",
                  "Уход за материалами",
                ].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:underline">
                      {item}
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
