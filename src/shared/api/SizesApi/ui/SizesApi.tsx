import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISizes } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const sizesApi = createApi({
  reducerPath: "sizesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), // Убедитесь, что это полный URL
  endpoints: builder => ({
    getSizesByProduct: builder.query<ISizes[], void>({
      query: () => `sizes`,
    }),
  }),
});

export const { useGetSizesByProductQuery } = sizesApi;
