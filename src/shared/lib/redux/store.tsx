// store/store.ts
import { CategoriesApi } from "@/shared/api/CategoriesApi/CategoriesApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [CategoriesApi.reducerPath]: CategoriesApi.reducer, // Добавляем редюсер API
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(CategoriesApi.middleware), // Подключаем middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
