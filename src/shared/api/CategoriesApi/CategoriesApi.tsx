import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Category } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const CategoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getCategories: builder.query<Category[], void>({
      query: () => "categories", // эндпоинт для получения списка категорий
    }),
    getCategoriesMenu: builder.query<Category[], void>({
      query: () => "categories/menu",
    }),
  }),
});

export const { useGetCategoriesQuery ,useGetCategoriesMenuQuery} = CategoriesApi; // экспорт хука
