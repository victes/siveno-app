import { configureStore } from "@reduxjs/toolkit";

import { CategoriesApi } from "@/shared/api/CategoriesApi/CategoriesApi";
import { LoginApi } from "@/shared/api/LoginApi/LoginApi";
import { RegApi } from "@/shared/api/RegApi/RegApi";
import { ProfileApi } from "@/shared/api/ProfileApi/ProfileApi";
import { LogoutApi } from "@/shared/api/LogoutApi/LogoutApi";
import { colorsApi } from "@/shared/api/ColorsApi/ui/ColorsApi";
import { productsApi } from "@/shared/api/ProductsApi/ui/ProductsApi";
import { sizesApi } from "@/shared/api/SizesApi/ui/SizesApi";
import { AddressesApi } from "@/shared/api/AddressApi/AddressApi";
import { OrdersApi } from "@/shared/api/OrdersApi/OrdersApi";
import { WishlistApi } from "@/shared/api/WishlistApi/WishlistApi";
import { LoyaytiApi } from "@/shared/api/LoyaytyApi/Loyayti";

export const store = configureStore({
  reducer: {
    [CategoriesApi.reducerPath]: CategoriesApi.reducer, // Добавляем редюсер API
    [productsApi.reducerPath]: productsApi.reducer,
    [sizesApi.reducerPath]: sizesApi.reducer,
    [colorsApi.reducerPath]: colorsApi.reducer,
    [LoginApi.reducerPath]: LoginApi.reducer,
    [RegApi.reducerPath]: RegApi.reducer,
    [ProfileApi.reducerPath]: ProfileApi.reducer,
    [LogoutApi.reducerPath]: LogoutApi.reducer,
    [OrdersApi.reducerPath]: OrdersApi.reducer,
    [AddressesApi.reducerPath]: AddressesApi.reducer,
    [WishlistApi.reducerPath]: WishlistApi.reducer,
    [LoyaytiApi.reducerPath]: LoyaytiApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      CategoriesApi.middleware,
      productsApi.middleware,
      sizesApi.middleware,
      colorsApi.middleware,
      LoginApi.middleware,
      RegApi.middleware,
      ProfileApi.middleware,
      LogoutApi.middleware,
      OrdersApi.middleware,
      AddressesApi.middleware,
      WishlistApi.middleware,
      LoyaytiApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
