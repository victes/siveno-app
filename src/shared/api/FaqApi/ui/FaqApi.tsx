import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFaq } from "@/shared/api/FaqApi/type";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const faqApi = createApi({
  reducerPath: "faqApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getFaqs: builder.query<IFaq[], void>({
      query: () => 'faqs'
    })
  })
})

export const { useGetFaqsQuery } = faqApi;