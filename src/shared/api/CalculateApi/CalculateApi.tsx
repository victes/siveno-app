import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const CalculateApi = createApi({
  reducerPath: "calculate",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: headers => {
      // Добавляем токен в заголовки
      headers.set("accept", 'application/json');
      headers.set("Content-Type", 'application/json');
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
    calculateRussianPost: builder.mutation({
      
      query: postData => ({
        url: "russian-post/calculate-delivery",
        method: "POST",
        body: postData,
      }),
    }),
  }),
});

export const {useCalculateRussianPostMutation} = CalculateApi;
