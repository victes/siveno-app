import { CategoriesApi } from "@/shared/api/CategoriesApi/CategoriesApi";
import { productsApi } from "@/shared/api/ProductsApi/ui/ProductsApi";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [CategoriesApi.reducerPath]: CategoriesApi.reducer, // Добавляем редюсер API
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      CategoriesApi.middleware,
      productsApi.middleware, // Подключаем middleware для обоих APIs
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
