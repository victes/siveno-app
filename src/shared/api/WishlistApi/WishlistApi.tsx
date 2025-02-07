import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const WishlistApi = createApi({
  reducerPath: "wishlist",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://kudzer5h.beget.tech/api/",
  }),
  endpoints: builder => ({
    getOrders: builder.query<[], void>({
      query: () => "wishlist", // эндпоинт для получения списка категорий
    }),
  }),
});

export const { useGetOrdersQuery } = WishlistApi; // экспорт хука
