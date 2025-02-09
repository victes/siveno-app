"use client";
import { useLogoutMutation } from "@/shared/api/LogoutApi/LogoutApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PersonalAcc } from "@/entities/PersonalAcc";
import { Orders } from "@/entities/Orders";
import { Favourites } from "@/entities/Favourites";
import { Address } from "@/entities/Address";
import { PartnerProgramm } from "@/entities/PartnerProgramm";
import { Logout } from "@/entities/Logout";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("Личные данные");
  const [logout] = useLogoutMutation();
  const { push } = useRouter();

  // const {getWishList} = useGetWishListQuery({})

  const handleLogout = async () => {
    try {
      await logout({ access_token: localStorage.getItem("access_token") }).unwrap(); // Выполняем запрос на выход
      localStorage.removeItem("access_token");
      console.log("Успешный выход из системы");
      push("/");
    } catch (error) {
      console.error("Ошибка при выходе из системы:", error);
    }
  };
  // console.log(isSuccess ? data.id : "");

  const renderContent = () => {
    switch (activeTab) {
      case "Личные данные":
        return <PersonalAcc />;
      case "Заказы":
        return <Orders />;
      case "Избранное":
        return <Favourites />;
      case "Адреса":
        return <Address />;
      case "Карта лояльности":
        return <PartnerProgramm />;
        // case "Уровень и скидки":
        return <div className="max-w-[600px] w-full mt-[100px]">Ваши доступные промокоды будут находится здесь.</div>;
      case "Выйти":
        return <Logout />;
      default:
        return null;
    }
  };

  return (
    <div className="flex mt-[90px] mb-[50px] gap-[100px] justify-center max-laptop:flex-col max-laptop:gap-[40px]">
      <div>
        <ul className="flex gap-4 cursor-pointer flex-col max-laptop:flex-row overflow-x-auto">
          {["Личные данные", "Заказы", "Избранное", "Адреса", "Карта лояльности", "Уровень и скидки", "Выйти"].map(
            tab => (
              <li
                key={tab}
                className={`p-2 ${activeTab === tab ? "font-bold underline" : ""}`}
                onClick={tab === "Выйти" ? () => handleLogout() : () => setActiveTab(tab)}
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
