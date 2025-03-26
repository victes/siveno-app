"use client";
import Catalog from '@/widgets/Catalog'
import { Category } from "@/widgets/Category";
import { Hero } from "@/widgets/Hero";
import React from "react";

const MainPage = () => {
  return (
    <div>
      <Hero />
      <Category />
      <Catalog />
    </div>
  );
};

export default MainPage;
