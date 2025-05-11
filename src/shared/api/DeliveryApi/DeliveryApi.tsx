import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const deliveryApi = createApi({
  reducerPath: "deliveryApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getDeliveryServices: builder.query<IDeliveryService[], void>({
      query: () => 'delivery-services',
    }),
    getPickUpPoints: builder.query<IPickUpPoints[], void>({
      query: () => 'pickup-points',
    }),
  }),
});

export const { useGetDeliveryServicesQuery, useGetPickUpPointsQuery } = deliveryApi;