"use client";
import { useLogoutMutation } from "@/shared/api/LogoutApi/LogoutApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PersonalAcc } from "@/entities/PersonalAcc";
import { Orders } from "@/entities/Orders";
import { Address } from "@/entities/Address";
import { PartnerProgramm } from "@/entities/PartnerProgramm";
import { Logout } from "@/entities/Logout";
import { useAuth } from "@/shared/hook/AuthContext/ui/AuthContext";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("Личные данные");
  const [logout] = useLogoutMutation();
  const { push } = useRouter();
  const { setToken } = useAuth();

  const handleLogout = async () => {
    try {
      await logout({ access_token: localStorage.getItem("access_token") }).unwrap();
      setToken(null); // Удалит токен из состояния и localStorage
      push("/");
    } catch (error) {
      console.error("Ошибка при выходе из системы:", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Личные данные":
        return <PersonalAcc />;
      case "Заказы":
        return <Orders />;
      case "Адреса":
        return <Address />;
      case "Карта лояльности":
        return <PartnerProgramm />;
      case "Выйти":
        return <Logout />;
      default:
        return null;
    }
  };

  return (
    <div className="flex mt-[90px] mb-[50px] gap-[100px] justify-center max-laptop:flex-col max-laptop:gap-[40px]">
      <div>
        <ul className=" flex gap-4 cursor-pointer flex-col max-laptop:flex-row overflow-x-auto max-laptop:justify-center max-laptop:text-base max-[340px]:test-xs">
          {["Личные данные", "Заказы", "Адреса"].map(tab => (
            <li
              key={tab}
              className={`p-2 ${activeTab === tab ? "font-bold underline" : ""}`}
              onClick={tab === "Выйти" ? () => handleLogout() : () => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
        <ul className=" flex gap-4 cursor-pointer flex-col max-laptop:flex-row overflow-x-auto max-laptop:text-base max-laptop:justify-center max-[340px]:test-xs ">
          {["Карта лояльности", "Выйти"].map(tab => (
            <li
              key={tab}
              className={`p-2 ${activeTab === tab ? "font-bold underline" : ""}`}
              onClick={tab === "Выйти" ? () => handleLogout() : () => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
      {renderContent()}
    </div>
  );
};

export default AccountPage;
