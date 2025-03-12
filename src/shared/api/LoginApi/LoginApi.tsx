import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
  };
  message: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const LoginApi = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: user => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = LoginApi;
