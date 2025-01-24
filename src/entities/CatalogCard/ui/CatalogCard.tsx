/* eslint-disable @next/next/no-img-element */
import React from "react";

import { ICCard } from "../types";

const CatalogCard = ({ img, name, href }: ICCard) => {
  return (
    <div className="flex flex-col items-center">
      <a href={href} className="block">
        <img
          src={img}
          alt={name}
          className="w-full max-w-[400px] max-h-[600px] min-w-[270px] min-h-[400px] object-cover"
        />
      </a>
      <span className="mt-2 text-center text-[#423c3d] text-lg font-medium">{name}</span>
    </div>
  );
};

export default CatalogCard;
