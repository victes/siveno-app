"use client";

import React, { useState } from "react";
import ButtonColor from "@/shared/ui/ButtonColor";

import "../styles/btn-colors.scss";

const buttonColorsList = ["primary", "secondary", "danger", "warning", "success", "info"] as const; // Используем as const, чтобы типизировать массив как конкретные строки

type ButtonColorKey = (typeof buttonColorsList)[number]; // Тип для элемента массива

const ButtonColors = () => {
  const [activeColor, setActiveColor] = useState<ButtonColorKey | null>(null); // Типизируем активный цвет

  // Обработчик клика по кнопке
  const handleClick = (color: ButtonColorKey) => {
    setActiveColor(color); // Устанавливаем активный цвет
  };

  return (
    <div className="flex items-center space-x-2">
      {buttonColorsList.map(color => (
        <ButtonColor
          key={color}
          color={color}
          onClick={() => handleClick(color)}
          className={activeColor === color ? "active-btn-colors" : ""}
        />
      ))}
    </div>
  );
};

export default ButtonColors;
