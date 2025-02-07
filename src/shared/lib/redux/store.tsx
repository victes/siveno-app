import { CategoriesApi } from "@/shared/api/CategoriesApi/CategoriesApi";
import { colorsApi } from "@/shared/api/ColorsApi/ui/ColorsApi";
import { productsApi } from "@/shared/api/ProductsApi/ui/ProductsApi";
import { sizesApi } from "@/shared/api/SizesApi/ui/SizesApi";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [CategoriesApi.reducerPath]: CategoriesApi.reducer, // Добавляем редюсер API
    [productsApi.reducerPath]: productsApi.reducer,
    [sizesApi.reducerPath]: sizesApi.reducer,
    [colorsApi.reducerPath]: colorsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      CategoriesApi.middleware,
      productsApi.middleware, // Подключаем middleware для обоих APIs
      sizesApi.middleware,
      colorsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
