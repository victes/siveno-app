import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IColors } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const colorsApi = createApi({
  reducerPath: "colorsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), // Убедитесь, что это полный URL
  endpoints: builder => ({
    getColorsByProduct: builder.query<IColors[], void>({
      query: () => `colors`,
    }),
  }),
});

export const { useGetColorsByProductQuery } = colorsApi;
