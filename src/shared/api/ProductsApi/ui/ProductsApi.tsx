import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://kudzer5h.beget.tech/api/" }), // Убедитесь, что это полный URL
  endpoints: builder => ({
    getProductsByCategory: builder.query<Product[], number>({
      query: categoryId => `products?category_id=${categoryId}`, // Правильно сформированный путь
    }),
  }),
});

export const { useGetProductsByCategoryQuery } = productsApi;
