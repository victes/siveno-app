import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PageTextResponse } from "@/shared/api/PageTextApi/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const pageTextApi = createApi({
  reducerPath: "pageTextApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getPageText: builder.query<PageTextResponse, string>({
      query: (pageSlug) => `page/${pageSlug}`
    })
  })
});

export const { useGetPageTextQuery } = pageTextApi;