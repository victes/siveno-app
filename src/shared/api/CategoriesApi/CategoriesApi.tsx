import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Category } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const CategoriesApi = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getCategories: builder.query<Category[], void>({
      query: () => "categories", // эндпоинт для получения списка категорий
    }),
  }),
});

export const { useGetCategoriesQuery } = CategoriesApi; // экспорт хука
