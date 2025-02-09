"use client";

import React from "react";
import ButtonSize from "@/shared/ui/ButtonSize";
import { useGetSizesByProductQuery } from "@/shared/api/SizesApi/ui/SizesApi";

interface ButtonSizesProps {
  selectedSize?: string;
  onSizeSelect?: (size: string) => void;
}

const ButtonSizes: React.FC<ButtonSizesProps> = ({ selectedSize, onSizeSelect }) => {
  const { data: sizes } = useGetSizesByProductQuery();

  return (
    <div className="flex flex-wrap tablet:flex-nowrap gap-3">
      {sizes?.map((item, idx) => {
        const isActive = selectedSize === item.name;
        return (
          <ButtonSize
            key={idx}
            name={item.name}
            className={`${item.className} ${isActive ? "border-2 border-[#423c3d]" : ""}`}
            onClick={() => onSizeSelect && onSizeSelect(item.name)}
          />
        );
      })}
    </div>
  );
};

export default ButtonSizes;
