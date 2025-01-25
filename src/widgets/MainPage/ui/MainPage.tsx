"use client";
import { Category } from "@/widgets/Category";
import { Hero } from "@/widgets/Hero";
import { Sales } from "@/widgets/Sales";
import React from "react";

const MainPage = () => {
  return (
    <div>
      <Hero />
      <Category />
      <Sales />
    </div>
  );
};

export default MainPage;
