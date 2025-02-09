import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IColors } from "../types";

export const colorsApi = createApi({
  reducerPath: "colorsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://kudzer5h.beget.tech/api/" }), // Убедитесь, что это полный URL
  endpoints: builder => ({
    getColorsByProduct: builder.query<IColors[], void>({
      query: () => `colors`,
    }),
  }),
});

export const { useGetColorsByProductQuery } = colorsApi;
