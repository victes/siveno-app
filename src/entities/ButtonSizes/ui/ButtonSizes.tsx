"use client";

import ButtonSize from "@/shared/ui/ButtonSize";
import React from "react";

const sizes = [
  { name: "os tall", className: "", onClick: () => {} },
  { name: "os", className: "", onClick: () => {} },
  { name: "xs", className: "", onClick: () => {} },
  { name: "s", className: "", onClick: () => {} },
  { name: "m", className: "", onClick: () => {} },
  { name: "l", className: "", onClick: () => {} },
];

const ButtonSizes = () => {
  return (
    <>
      {sizes.map((item, idx) => {
        return <ButtonSize key={idx} name={item.name} className={item.className} onClick={item.onClick} />;
      })}
    </>
  );
};

export default ButtonSizes;
