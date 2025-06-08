import { configureStore } from "@reduxjs/toolkit";

import { AddressesApi } from "@/shared/api/AddressApi/AddressApi";
import { CategoriesApi } from "@/shared/api/CategoriesApi/CategoriesApi";
import { colorsApi } from "@/shared/api/ColorsApi/ui/ColorsApi";
import { LoginApi } from "@/shared/api/LoginApi/LoginApi";
import { ForgotPassApi } from "@/shared/api/ForgotPassApi/ForgotPassApi";
import { LogoutApi } from "@/shared/api/LogoutApi/LogoutApi";
import { LoyaytiApi } from "@/shared/api/LoyaytyApi/Loyayti";
import { OrdersApi } from "@/shared/api/OrdersApi/OrdersApi";
import { productsApi } from "@/shared/api/ProductsApi/ui/ProductsApi";
import { ProfileApi } from "@/shared/api/ProfileApi/ProfileApi";
import { RegApi } from "@/shared/api/RegApi/RegApi";
import { sizesApi } from "@/shared/api/SizesApi/ui/SizesApi";
import { storiesApi } from "@/shared/api/StoriesApi/ui/StoriesApi";
import { subscribeApi } from "@/shared/api/SubscribeApi/ui/SubscribeApi";
import { CalculateApi } from '@/shared/api/CalculateApi/CalculateApi'
import { pageTextApi } from "@/shared/api/PageTextApi/ui/PageTextApi";
import { faqApi} from "@/shared/api/FaqApi/ui/FaqApi";
import { deliveryApi } from "@/shared/api/DeliveryApi/DeliveryApi";
import { inspirationsApi } from "@/shared/api/InspirationsApi/InspirationsApi";

export const store = configureStore({
  reducer: {
    [CategoriesApi.reducerPath]: CategoriesApi.reducer, // Добавляем редюсер API
    [productsApi.reducerPath]: productsApi.reducer,
    [sizesApi.reducerPath]: sizesApi.reducer,
    [colorsApi.reducerPath]: colorsApi.reducer,
    [LoginApi.reducerPath]: LoginApi.reducer,
    [ForgotPassApi.reducerPath]: ForgotPassApi.reducer,
    [RegApi.reducerPath]: RegApi.reducer,
    [ProfileApi.reducerPath]: ProfileApi.reducer,
    [LogoutApi.reducerPath]: LogoutApi.reducer,
    [OrdersApi.reducerPath]: OrdersApi.reducer,
    [AddressesApi.reducerPath]: AddressesApi.reducer,
    [LoyaytiApi.reducerPath]: LoyaytiApi.reducer,
    [storiesApi.reducerPath]: storiesApi.reducer,
    [subscribeApi.reducerPath]: subscribeApi.reducer,
    [CalculateApi.reducerPath]: CalculateApi.reducer,
    [pageTextApi.reducerPath]: pageTextApi.reducer,
    [faqApi.reducerPath]: faqApi.reducer,
    [deliveryApi.reducerPath]: deliveryApi.reducer,
    [inspirationsApi.reducerPath]: inspirationsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      CategoriesApi.middleware,
      productsApi.middleware,
      sizesApi.middleware,
      colorsApi.middleware,
      LoginApi.middleware,
      ForgotPassApi.middleware,
      RegApi.middleware,
      ProfileApi.middleware,
      LogoutApi.middleware,
      OrdersApi.middleware,
      AddressesApi.middleware,
      LoyaytiApi.middleware,
      storiesApi.middleware,
      subscribeApi.middleware,
      CalculateApi.middleware,
      pageTextApi.middleware,
      faqApi.middleware,
      deliveryApi.middleware,
      inspirationsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
