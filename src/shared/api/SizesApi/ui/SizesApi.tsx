import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISizes } from "../types";

export const sizesApi = createApi({
  reducerPath: "sizesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://kudzer5h.beget.tech/api/" }), // Убедитесь, что это полный URL
  endpoints: builder => ({
    getSizesByProduct: builder.query<ISizes[], void>({
      query: () => `sizes`,
    }),
  }),
});

export const { useGetSizesByProductQuery } = sizesApi;
