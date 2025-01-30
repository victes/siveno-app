"use client";
import React from "react";
import { Container } from "../Container";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col border-solid text-sm mt-[70px] border-t border-text bg-white gap-[40px] py-10 text-text">
      <Container className="flex flex-col gap-[40px]">
        <div className="flex justify-between max-mindesk:flex-col max-mindesk:text-center max-mindesk:items-center max-mindesk:gap-[20px]">
          <ul className="flex gap-[10px] max-mindesk:flex-col">
            <li>
              <Link href={"/account"}>Личный кабинет</Link>
            </li>
            <li>
              <Link href={"/shipping"}>Доставка</Link>
            </li>
            <li>
              <Link href={"#"}>Возврат</Link>
            </li>
            <li>
              <Link href={"#"}>FAQ</Link>
            </li>
            <li>
              <Link href={"#"}>Уход за изделиями</Link>
            </li>
          </ul>
          <form action="">
            <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Ваша почта" />
              <button type="submit" className="bg-transparent text-[#423C3D] px-4 py-2">
                Подписаться
              </button>
            </label>
          </form>
        </div>
        <div className="flex justify-between max-mindesk:flex-col max-mindesk:text-center">
          <ul className="flex gap-[10px] max-mindesk:flex-col">
            <li>
              {" "}
              <Link href={"#"}>Политика</Link>
            </li>
            <li>
              {" "}
              <Link href={"#"}>Публичная Оферта</Link>
            </li>
            <li>
              {" "}
              <Link href={"#"}>Контакты</Link>
            </li>
          </ul>
          <p>@ SIVENO 2025 | Все права защищены</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
