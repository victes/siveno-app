/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useFavStore } from "@/entities/favouriteStore/store";
import { useProductStore } from "@/entities/productStore/store";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("Личные данные");
  const { products, removeProduct } = useProductStore();
  const { favourite, removeFav } = useFavStore();

  const renderContent = () => {
    switch (activeTab) {
      case "Личные данные":
        return (
          <div className="flex flex-row-reverse gap-[50px] max-mindesk:flex-col">
            <div className="flex flex-col gap-[20px] mr-auto max-w-[200px] w-full object-cover rounded-md max-mindesk:m-auto">
              <img
                src="/images/Account/icon.png"
                className="object-cover max-w-[200px] w-full border-solid border-[1px] border-gray-400"
              />
              <button className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300 w-full">Изменить фото</button>
            </div>
            <div className="mt-[0px] flex flex-col gap-[50px] max-w-[600px] w-full max-laptop:mt-[10px]">
              <div className="flex gap-[40px] max-minilaptop:flex-col">
                <div className="flex flex-col space-y-2 w-full">
                  <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Имя" />
                  </label>
                </div>
                <div className="flex flex-col space-y-2 w-full">
                  <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Фамилия" />
                  </label>
                </div>
              </div>
              <div className="flex gap-[40px] max-minilaptop:flex-col">
                <div className="flex flex-col space-y-2 w-full">
                  <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Дата рождения" />
                  </label>
                </div>
                <div className="flex flex-col space-y-2 w-full">
                  <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Номер телефона" />
                  </label>
                </div>
              </div>
              <div className="flex flex-col space-y-2 w-full">
                <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                  <input type="text" className="grow" placeholder="Почта" />
                </label>
              </div>
              <div className="flex gap-[40px] max-minilaptop:flex-col">
                <div className="flex flex-col space-y-2 w-full">
                  <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                    <input type="password" className="grow" placeholder="Пароль" />
                  </label>
                </div>
                <div className="flex flex-col space-y-2 w-full">
                  <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                    <input type="password" className="grow" placeholder="Подтверждение пароля" />
                  </label>
                </div>
              </div>
              <button className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300 w-full">
                Сохранить изменения
              </button>
            </div>
          </div>
        );
      case "Заказы":
        return (
          <div className="max-w-[600px] w-full mt-[100px] grid grid-cols-2 gap-[30px]">
            {products.length > 0
              ? products.map(product => (
                  <li key={product.id} className="flex gap-5 p-2 justify-between">
                    <div className="flex gap-5 items-center">
                      <div>
                        <img src={product.img} alt={product.name} className="h-[300px] w-[200px] object-cover" />
                      </div>
                      <div className="flex flex-col justify-start">
                        <span className="text-black">{product.name}</span>
                        <span className="text-[30px] text-black">{product.price} руб</span>
                      </div>
                    </div>
                    <div>
                      <MdDeleteOutline
                        onClick={() => removeProduct(product.id)}
                        size={30}
                        className="m-2 cursor-pointer hover:text-red-500"
                      />
                    </div>
                  </li>
                ))
              : "Заказов нет"}
          </div>
        );
      case "Избранное":
        return (
          <div className="max-w-[600px] w-full mt-[100px] grid grid-cols-2 gap-[30px]">
            {favourite.length > 0
              ? favourite.map(product => (
                  <li key={product.id} className="flex gap-5 p-2 justify-between ">
                    <div className="flex gap-5 items-center">
                      <div>
                        <img src={product.img} alt={product.name} className="h-[300px] w-[200px] object-cover" />
                      </div>
                      <div className="flex flex-col justify-start">
                        <span className="text-black">{product.name}</span>
                        <span className="text-[30px] text-black">{product.price} руб</span>
                      </div>
                    </div>
                    <div>
                      <MdDeleteOutline
                        onClick={() => removeFav(product.id)}
                        size={30}
                        className="m-2 cursor-pointer hover:text-red-500"
                      />
                    </div>
                  </li>
                ))
              : "Товаров нет"}
          </div>
        );
      case "Адреса":
        return (
          <div className="mt-[100px] max-w-[600px] w-full flex flex-col gap-[50px]">
            <p>Сохранненых адресов нет</p>
            <button className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300 w-full">
              {" "}
              Сохранить адресс{" "}
            </button>
          </div>
        );
      case "Партнерская программа":
        return (
          <div className="mt-[100px] max-w-[600px] w-full flex flex-col gap-[50px]">
            <p>Партнерских программ нет</p>
            <button className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300 w-full">
              {" "}
              Добавить партнерскую программу{" "}
            </button>
          </div>
        );
      case "Уровень и скидки":
        return <div className="max-w-[600px] w-full mt-[100px]">Ваши доступные промокоды будут находится здесь.</div>;
      case "Выйти":
        return <div className="max-w-[600px] w-full mt-[100px]">Вы вышли из аккаунта.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex mt-[90px] mb-[50px] gap-[100px] justify-center max-laptop:flex-col max-laptop:gap-[40px]">
      <div>
        <ul className="flex gap-4 cursor-pointer flex-col max-laptop:flex-row overflow-x-auto">
          {["Личные данные", "Заказы", "Избранное", "Адреса", "Партнерская программа", "Уровень и скидки", "Выйти"].map(
            tab => (
              <li
                key={tab}
                className={`p-2 ${activeTab === tab ? "font-bold underline" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ),
          )}
        </ul>
      </div>
      {renderContent()}
    </div>
  );
};

export default AccountPage;
