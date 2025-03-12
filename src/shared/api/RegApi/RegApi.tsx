import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface RegisterResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
  };
  message: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const RegApi = createApi({
  reducerPath: "register",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: user => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = RegApi;
