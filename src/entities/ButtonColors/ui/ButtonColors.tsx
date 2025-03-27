"use client";

import React, { useEffect, useState } from "react";
import ButtonColor from "@/shared/ui/ButtonColor";

import "../styles/btn-colors.scss";
import { useGetColorsByProductQuery } from "@/shared/api/ColorsApi/ui/ColorsApi";
import { IColors } from "@/shared/api/ColorsApi/types";
import { IColor } from '@/shared/api/ProductsApi/types'

// const buttonColorsList = ["primary", "secondary", "danger", "warning", "success", "info"] as const; // Используем as const, чтобы типизировать массив как конкретные строки
// type ButtonColorKey = (typeof buttonColorsList)[number];

// Тип для элемента массива

const ButtonColors = ({colorCode}: {colorCode?: IColor[]}) => {
  console.log(colorCode)

  const [activeColor, setActiveColor] = useState<string | null>(null); // Типизируем активный цвет

  // Обработчик клика по кнопке
  const handleClick = (color: string) => {
    // setActiveColor(color); // Устанавливаем активный цвет
  };

  return (
    <div className="flex items-center space-x-2">
      {colorCode?.map(color =>
        <ButtonColor
          key={color.id}
          color={color.code}
          onClick={() => handleClick(color.code)}
          className={activeColor === color.code ? "active-btn-colors" : ""}
        />
      )}
    </div>
  );
};

export default ButtonColors;
