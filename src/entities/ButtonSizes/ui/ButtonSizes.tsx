"use client";

import React from "react";
import ButtonSize from "@/shared/ui/ButtonSize";
import { useGetSizesByProductQuery } from "@/shared/api/SizesApi/ui/SizesApi";
import { useGetProductsByIdQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";

interface ButtonSizesProps {
  selectedSize?: string;
  onSizeSelect?: (size: string) => void;
  id?: number;
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

const ButtonSizes: React.FC<ButtonSizesProps> = ({ selectedSize = "", onSizeSelect, id }) => {
  const { data, isLoading, error } = useGetProductsByIdQuery(Number(id));
  const { data: sizes } = useGetSizesByProductQuery();

  // Стандартные размеры
  const standardSizes = extractSizeNames(data?.sizes);

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
    if (onSizeSelect) {
      onSizeSelect(size);
    }

    const event = new CustomEvent('sizeSelected', {
      detail: { size }
    });
    window.dispatchEvent(event);
  };

  // Если данные загружаются или произошла ошибка
  if (isLoading) return <div>Loading sizes...</div>;
  if (error) return <div>Error loading sizes</div>;

  // Проверяем, есть ли что отображать
  if (!displaySizes || displaySizes.length === 0) {
    return <div>No sizes available</div>;
  }

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