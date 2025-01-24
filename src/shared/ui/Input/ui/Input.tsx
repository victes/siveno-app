"use client";
import React from "react";
import { IInput } from "../types/type";

const Input = ({ placeholder }: IInput) => {
  return (
    <>
      <input
        className="bg-white border-[1px] border-black border-solid h-[40px] max-w-[300px] w-full px-[20px]"
        placeholder={placeholder}
      ></input>
    </>
  );
};

export default Input;
