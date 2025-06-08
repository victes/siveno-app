import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ResendRequest {
  email: string;
}

interface ResendResponse {
  message: string; 
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const ForgotPassApi = createApi({
  reducerPath: "resetPassword",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    resendResetPassword: builder.mutation<ResendResponse, ResendRequest>({
      query: data => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useResendResetPasswordMutation } = ForgotPassApi;
