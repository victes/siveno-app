"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const ProfileApi = createApi({
  reducerPath: "profileApi",
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
  tagTypes: ["Wishlist", "Profile"],
  endpoints: builder => ({
    getProfile: builder.query({
      query: () => "profile",
      providesTags: ["Profile"],
    }),
    changeProfile: builder.mutation({
      query: user => ({
        url: `/users/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Profile"],
    }),
    changeAvatar: builder.mutation({
      query: user => ({
        url: `/user/avatar`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Profile"],
    }),
    getWishList: builder.query({
      query: () => "wishlist",
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation({
      query: user => ({
        url: `wishlist`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    deleteWishlist: builder.mutation({
      query: user => ({
        url: `wishlist/${user.id}`,
        method: "DELETE",
        body: user,
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useChangeProfileMutation,
  useGetWishListQuery,
  useAddToWishlistMutation,
  useDeleteWishlistMutation,
  useChangeAvatarMutation,
} = ProfileApi;
