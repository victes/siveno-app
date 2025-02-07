"use client";

import React, { useState } from "react";

import ButtonSize from "@/shared/ui/ButtonSize";
import { useGetSizesByProductQuery } from "@/shared/api/SizesApi/ui/SizesApi";

const ButtonSizes = () => {
  const { data: sizes } = useGetSizesByProductQuery();

  const [activeSize, setActiveSize] = useState<string | null>(sizes?.[0]?.name ?? null);

  const handleClick = (size: string) => {
    setActiveSize(size);
  };

  return (
    <div className="flex flex-wrap tablet:flex-nowrap gap-3">
      {sizes?.map((item, idx) => {
        const isActive = activeSize === item.name;
        return (
          <ButtonSize
            key={idx}
            name={item.name}
            className={`${item.className} ${isActive ? "border-2 border-[#423c3d]" : ""}`}
            onClick={() => {
              handleClick(item.name);
            }}
          />
        );
      })}
    </div>
  );
};

export default ButtonSizes;
