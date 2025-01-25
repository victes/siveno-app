import React from "react";

import { IBtnSize } from "../types";

const ButtonSize = ({ name, className, onClick }: IBtnSize) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${className} btn bg-transparent btn-ghost shadow-none border-none uppercase text-[12px]`}
      >
        {name}
      </button>
    </>
  );
};

export default ButtonSize;
