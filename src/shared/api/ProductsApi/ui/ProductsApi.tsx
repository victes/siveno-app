import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductResponse, IProduct, IPopular } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), // Убедитесь, что это полный URL
  endpoints: builder => ({
    getPromo: builder.query<string[], void>({
      query: () => "promos",
    }),
    getProductsByCategory: builder.query<ProductResponse, string>({
      query: (categorySlug) => `products?category_slug=${categorySlug}`,
    }),
    getProductsById: builder.query<IProduct, number>({
      query: productId => `products/${productId}`,
    }),
    getProductsPopular: builder.query<IPopular, number>({
      query: limit => `products/popular?limit=${limit}`,
    }),
    getProducts: builder.query<ProductResponse, string | void>({
      query: (queryString = '') => queryString ? `products?${queryString}` : 'products',
    }),
  }),
});

export const { 
  useGetProductsByCategoryQuery, 
  useGetProductsByIdQuery, 
  useGetProductsPopularQuery,
  useGetProductsQuery,
  useGetPromoQuery,
} = productsApi;
