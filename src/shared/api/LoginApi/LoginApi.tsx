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

export const LoginApi = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API,
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
