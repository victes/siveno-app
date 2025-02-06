import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const RegApi = createApi({
  reducerPath: "profile",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API,
  }),
  endpoints: builder => ({
    getProfile: builder.query({
      query: () => "profile",
    }),
  }),
});

export const { useRegisterUserMutation } = RegApi;
