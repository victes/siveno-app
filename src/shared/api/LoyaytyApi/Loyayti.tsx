import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const LoyaytiApi = createApi({
  reducerPath: "loyayti",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://kudzer5h.beget.tech/api/",
  }),
  endpoints: builder => ({
    getOrders: builder.query<[], void>({
      query: () => "loyalty/level", // эндпоинт для получения списка категорий
    }),
  }),
});

export const { useGetOrdersQuery } = LoyaytiApi; // экспорт хука
