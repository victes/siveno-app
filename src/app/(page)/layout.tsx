"use client";

import React, { ReactNode } from "react";
import { useGetCategoriesMenuQuery } from "@/shared/api/CategoriesApi/CategoriesApi";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data, error, isLoading } = useGetCategoriesMenuQuery();

  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default Layout;
