import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const LoyaytiApi = createApi({
  reducerPath: "loyayti",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://kudzer5h.beget.tech/api/",
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
    getLoyaltyLevel: builder.query<[], void>({
      query: () => "loyalty/level",
    }),
    getLoyaltyPoints: builder.query<[], void>({
      query: () => "loyalty/points",
    }),
    getLoyaltyPointsHistory: builder.query<[], void>({
      query: () => "loyalty/points-history",
    }),
  }),
});

export const { useGetLoyaltyLevelQuery, useGetLoyaltyPointsQuery, useGetLoyaltyPointsHistoryQuery } = LoyaytiApi; // экспорт хука
