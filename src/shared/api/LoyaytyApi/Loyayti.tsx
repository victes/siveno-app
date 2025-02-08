import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const LoyaytiApi = createApi({
  reducerPath: "loyayti",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://kudzer5h.beget.tech/api/",
    prepareHeaders: headers => {
      // Добавляем токен в заголовки
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        // Или, если нужно использовать X-CSRF-TOKEN:
        headers.set("X-CSRF-TOKEN", token);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getLoyalty: builder.query<[], void>({
      query: () => "loyalty/level", // эндпоинт для получения списка категорий
    }),
  }),
});

export const { useGetLoyaltyQuery } = LoyaytiApi; // экспорт хука
