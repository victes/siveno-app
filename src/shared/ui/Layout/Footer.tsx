"use client";
import React from "react";
import { Container } from "../Container";
import { Input } from "../Input";

const Footer = () => {
  return (
    <footer className="flex flex-col bg-white mt-auto h-[200px] gap-[40px]">
      <Container className="flex flex-col gap-[40px]">
        <div className="flex justify-between">
          <ul className="flex gap-[10px]">
            <li>Доставка</li>
            <li>Оплата</li>
            <li>Возврат и Обмен</li>
            <li>Таблица Размеров</li>
            <li>Точки Продаж</li>
            <li>Карьера</li>
            <li>Программа Лояльности</li>
          </ul>
          <Input placeholder="E-mail" />
        </div>
        <div className="flex justify-between">
          <ul className="flex gap-[10px]">
            <li>Политика</li>
            <li> Обработка персональных данных</li>
            <li> Публичная Оферта</li>
          </ul>
          <p>@ Somebody company 2025 | Все права защищены</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
