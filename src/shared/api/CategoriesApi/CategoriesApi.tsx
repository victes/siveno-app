import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Category } from "./types";

export const CategoriesApi = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://kudzer5h.beget.tech/api/",
  }),
  endpoints: builder => ({
    getCategories: builder.query<Category[], void>({
      query: () => "categories", // эндпоинт для получения списка категорий
    }),
  }),
});

export const { useGetCategoriesQuery } = CategoriesApi; // экспорт хука
