import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductResponse, IProduct, IPopular } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), // Убедитесь, что это полный URL
  endpoints: builder => ({
    getProductsByCategory: builder.query<ProductResponse, number>({
      query: categoryId => `products?category_id=${categoryId}`, // Правильно сформированный путь
    }),
    getProductsById: builder.query<IProduct, number>({
      query: productId => `products/${productId}`,
    }),
    getProductsPopular: builder.query<IPopular, number>({
      query: limit => `products/popular?limit=${limit}`,
    }),
  }),
});

export const { useGetProductsByCategoryQuery, useGetProductsByIdQuery, useGetProductsPopularQuery } = productsApi;
