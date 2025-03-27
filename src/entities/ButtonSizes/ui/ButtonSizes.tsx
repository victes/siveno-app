"use client";

import React from "react";
import ButtonSize from "@/shared/ui/ButtonSize";
import { useGetSizesByProductQuery } from "@/shared/api/SizesApi/ui/SizesApi";

interface ButtonSizesProps {
  selectedSize?: string;
  onSizeSelect?: (size: string) => void;
}

const ButtonSizes: React.FC<ButtonSizesProps> = ({ selectedSize = "", onSizeSelect }) => {
  const { data: sizes } = useGetSizesByProductQuery();

  // Стандартные размеры, которые мы хотим отображать
  const standardSizes = ["XS", "S", "M", "L"];

  // Фильтруем размеры, оставляя только стандартные
  const filteredSizes = sizes?.filter(item => 
    standardSizes.includes(item.name.toUpperCase())
  ) || [];

  // Если API не вернуло стандартные размеры, создаем их сами
  const displaySizes = filteredSizes.length > 0 ? filteredSizes : 
    standardSizes.map(size => ({
      id: size.toLowerCase(),
      name: size,
      className: ""
    }));

  // Функция для обработки выбора размера
  const handleSizeSelect = (size: string) => {
    // Вызываем переданный обработчик, если он есть
    if (onSizeSelect) {
      onSizeSelect(size);
    }
    
    // Отправляем событие о выбранном размере для других компонентов
    const event = new CustomEvent('sizeSelected', { 
      detail: { size } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="flex flex-wrap tablet:flex-nowrap gap-3">
      {displaySizes.map((item, idx) => {
        const isActive = selectedSize === item.name;
        return (
          <ButtonSize
            key={idx}
            name={item.name}
            className={`${item.className} ${isActive ? "border-2 border-[#423c3d]" : ""}`}
            onClick={() => handleSizeSelect(item.name)}
          />
        );
      })}
    </div>
  );
};

export default ButtonSizes;
