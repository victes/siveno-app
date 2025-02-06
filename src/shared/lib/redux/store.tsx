// store/store.ts
import { CategoriesApi } from "@/shared/api/CategoriesApi/CategoriesApi";
import { LoginApi } from "@/shared/api/LoginApi/LoginApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [CategoriesApi.reducerPath]: CategoriesApi.reducer,
    [LoginApi.reducerPath]: LoginApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(CategoriesApi.middleware), // Подключаем middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
