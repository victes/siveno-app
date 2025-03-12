import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const LoyaytiApi = createApi({
  reducerPath: "loyayti",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: headers => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
          headers.set("X-CSRF-TOKEN", token);
        }
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getLoyaltyLevel: builder.query<{ level: string }, void>({
      query: () => "loyalty/level",
    }),
    getLoyaltyPoints: builder.query<{ total_points: number }, void>({
      query: () => "loyalty/points",
    }),
    getLoyaltyPointsHistory: builder.query<{ history: [] }, void>({
      query: () => "loyalty/points-history",
    }),
  }),
});

export const { useGetLoyaltyLevelQuery, useGetLoyaltyPointsQuery, useGetLoyaltyPointsHistoryQuery } = LoyaytiApi; // экспорт хука
