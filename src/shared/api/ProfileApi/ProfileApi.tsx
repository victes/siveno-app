import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProfileApi = createApi({
  reducerPath: "profileApi",
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
    getProfile: builder.query({
      query: () => "profile",
    }),
  }),
});

export const { useGetProfileQuery } = ProfileApi;
