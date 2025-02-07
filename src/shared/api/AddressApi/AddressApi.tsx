import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AddressesApi = createApi({
  reducerPath: "addresses",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://kudzer5h.beget.tech/api/",
  }),
  endpoints: builder => ({
    getAddresses: builder.query<[], void>({
      query: () => "addresses",
    }),
  }),
});

export const { useGetAddressesQuery } = AddressesApi; // экспорт хука
