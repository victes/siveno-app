"use client";

import React from "react";
import ButtonColor from "@/shared/ui/ButtonColor";
import { IColorOptions } from "@/shared/api/ProductsApi/types";
import { useRouter } from "next/navigation";

interface ButtonColorsProps {
  colorOptions: IColorOptions[];
  productId: number;
}

const ButtonColors = ({ colorOptions, productId }: ButtonColorsProps) => {
  const router = useRouter();

  const handleClick = (newProductId: number) => {
    if (!router) return;
    router.push(`/product/${newProductId}`);
  };

  return (
      <div className="flex items-center space-x-2">
        {colorOptions.map(option =>
            <ButtonColor
                key={option.id}
                color={option.colors[0].code}
                onClick={() => handleClick(option.id)}
                active={productId === option.id}
            />
        )}
      </div>
  );
};

export default ButtonColors;