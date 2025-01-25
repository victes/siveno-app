"use client";
import React from "react";
import { IContainer } from "../types/types";

const Container = ({ children, className }: IContainer) => {
  return <div className={` w-full m-auto px-[40px] ${className}`}>{children}</div>;
};

export default Container;
