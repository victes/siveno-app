import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProfileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API,
  }),
  endpoints: builder => ({
    getProfile: builder.query({
      query: () => "profile",
    }),
  }),
});

export const { useGetProfileQuery } = ProfileApi;
