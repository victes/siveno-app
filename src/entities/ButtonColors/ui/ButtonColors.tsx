"use client";

import React from "react";
import ButtonColor from "@/shared/ui/ButtonColor";
import { useProductStore } from "@/entities/productStore/store";
import { IColor } from '@/shared/api/ProductsApi/types'

interface ButtonColorsProps {
  colorCode?: IColor[];
  productId?: string; // Добавляем опциональный ID продукта
}

const ButtonColors = ({ colorCode, productId }: ButtonColorsProps) => {
  const selectedColorId = useProductStore(state => state.selectedColorId);
  const setSelectedColorId = useProductStore(state => state.setSelectedColorId);
  const updateProductColor = useProductStore(state => state.updateProductColor);
  console.log('select color', selectedColorId)
  const handleClick = (colorId: number) => {
    setSelectedColorId(colorId);
    if (productId) {
      updateProductColor(productId, colorId); // Обновляем цвет конкретного продукта
    }
  };

  return (
      <div className="flex items-center space-x-2">
        {colorCode?.map(color =>
            <ButtonColor
                key={color.id}
                color={color.code}
                onClick={() => handleClick(color.id)} // Теперь передаем ID цвета
                className={selectedColorId === color.id ? "active-btn-colors" : ""}
            />
        )}
      </div>
  );
};

export default ButtonColors;