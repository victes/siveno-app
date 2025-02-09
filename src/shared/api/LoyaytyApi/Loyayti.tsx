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
    getLoyalty: builder.query<[], void>({
      query: () => "loyalty/level",
    }),
  }),
});

export const { useGetLoyaltyQuery } = LoyaytiApi; // экспорт хука
