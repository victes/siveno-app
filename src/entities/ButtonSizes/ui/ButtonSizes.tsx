"use client";

import ButtonSize from "@/shared/ui/ButtonSize";
import React, { useState } from "react";

const sizes = [
  { name: "all", className: "", onClick: () => {} },
  { name: "os", className: "", onClick: () => {} },
  { name: "xs", className: "", onClick: () => {} },
  { name: "s", className: "", onClick: () => {} },
  { name: "m", className: "", onClick: () => {} },
  { name: "l", className: "", onClick: () => {} },
];

const ButtonSizes = () => {
  const [activeSize, setActiveSize] = useState<string | null>(sizes[0].name);

  const handleClick = (size: string) => {
    setActiveSize(size); // Устанавливаем активный размер
  };

  return (
    <div className="flex flex-wrap tablet:flex-nowrap gap-3">
      {sizes.map((item, idx) => {
        const isActive = activeSize === item.name; // Проверяем, активен ли размер
        return (
          <ButtonSize
            key={idx}
            name={item.name}
            className={`${item.className} ${isActive ? "border-2 border-[#423c3d]" : ""}`}
            onClick={() => {
              handleClick(item.name);
              item.onClick(); // Вызываем оригинальную функцию onClick, если она есть
            }}
          />
        );
      })}
    </div>
  );
};

export default ButtonSizes;
