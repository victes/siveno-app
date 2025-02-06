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

export const RegApi = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://kudzer5h.beget.tech/api/",
  }),
  endpoints: builder => ({
    loginUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: user => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = RegApi;
