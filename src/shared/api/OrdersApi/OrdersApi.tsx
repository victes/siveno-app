import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrdersApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://kudzer5h.beget.tech/api/",
  }),
  endpoints: builder => ({
    getOrders: builder.query<[], void>({
      query: () => "orders", // эндпоинт для получения списка категорий
    }),
  }),
});

export const { useGetOrdersQuery } = OrdersApi; // экспорт хука
