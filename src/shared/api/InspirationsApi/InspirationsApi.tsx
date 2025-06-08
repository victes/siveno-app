import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const inspirationsApi = createApi({
  reducerPath: "inspirationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getInspiration: builder.query<any[], void>({
      query: () => "inspirations",
      transformResponse: (response: { data: any[] }) => response.data,
    }),
  }),
});

export const { useGetInspirationQuery } = inspirationsApi;
