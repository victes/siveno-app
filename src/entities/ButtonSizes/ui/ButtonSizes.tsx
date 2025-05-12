"use client";

import React from "react";
import ButtonSize from "@/shared/ui/ButtonSize";
import { useGetSizesByProductQuery } from "@/shared/api/SizesApi/ui/SizesApi";
import { useGetProductsByIdQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";

interface ButtonSizesProps {
  selectedSize?: string;
  onSizeSelect?: (size: string) => void;
  sizes: Size[];
}

type Size = {
  id: number;
  name: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
  pivot?: {
    product_id: number;
    size_id: number;
  };
  className?: string;
  available: number;
};

// Обновленная функция для обработки обоих типов sizes
function extractSizeNames(sizesArray: Size[] | string[] | undefined): string[] {
  if (!sizesArray) return [];

  // Если это массив строк, просто возвращаем его
  if (typeof sizesArray[0] === 'string') {
    return sizesArray as string[];
  }

  // Если это массив объектов, извлекаем имена
  return (sizesArray as Size[]).map(size => size.name);
}

const ButtonSizes: React.FC<ButtonSizesProps> = ({ selectedSize = "", onSizeSelect, sizes }) => {

  // Функция для обработки выбора размера
  const handleSizeSelect = (size: string) => {
    if (onSizeSelect) {
      onSizeSelect(size);
    }

    const event = new CustomEvent('sizeSelected', {
      detail: { size }
    });
    window.dispatchEvent(event);
  };


  return (
      <div className="flex flex-wrap tablet:flex-nowrap gap-3">
        {sizes.map((item, idx) => {
          return (
              <ButtonSize
                  key={item.id}
                  name={item.name}
                  disabled={item.available <= 0}
                  className={item.className}
                  onClick={() => handleSizeSelect(item.name)}
                  isActive={selectedSize === item.name}
              />
          );
        })}
      </div>
  );
};

export default ButtonSizes;