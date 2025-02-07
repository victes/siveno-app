import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductResponse } from "../types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://kudzer5h.beget.tech/api/" }), // Убедитесь, что это полный URL
  endpoints: builder => ({
    getProductsByCategory: builder.query<ProductResponse, number>({
      query: categoryId => `products?category_id=${categoryId}`, // Правильно сформированный путь
    }),
  }),
});

export const { useGetProductsByCategoryQuery } = productsApi;
