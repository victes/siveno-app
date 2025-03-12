"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const AddressesApi = createApi({
  reducerPath: "addresses",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
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
  tagTypes: ["Addresses"],
  endpoints: builder => ({
    getAddresses: builder.query<
      [
        {
          id: number;
          city: string;
          street: string;
          house: string;
          apartment: string;
          postal_code: string;
          state: string;
          is_primary: boolean;
        },
      ],
      void
    >({
      query: () => "addresses",
      providesTags: ["Addresses"],
    }),
    addAddresses: builder.mutation({
      query: user => ({
        url: "addresses",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Addresses"],
    }),
    updateAddresses: builder.mutation({
      query: user => ({
        url: `addresses/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Addresses"],
    }),
    deleteAddresses: builder.mutation({
      query: user => ({
        url: `addresses/${user.id}`,
        method: "DELETE",
        body: user,
      }),
      invalidatesTags: ["Addresses"],
    }),
  }),
});

export const { useGetAddressesQuery, useAddAddressesMutation, useUpdateAddressesMutation, useDeleteAddressesMutation } =
  AddressesApi;
