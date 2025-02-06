import { configureStore } from "@reduxjs/toolkit";
import { CategoriesApi } from "@/shared/api/CategoriesApi/CategoriesApi";
import { LoginApi } from "@/shared/api/LoginApi/LoginApi";
import { RegApi } from "@/shared/api/RegApi/RegApi";
import { ProfileApi } from "@/shared/api/ProfileApi/ProfileApi";
import { LogoutApi } from "@/shared/api/LogoutApi/LogoutApi";

export const store = configureStore({
  reducer: {
    [CategoriesApi.reducerPath]: CategoriesApi.reducer,
    [LoginApi.reducerPath]: LoginApi.reducer,
    [RegApi.reducerPath]: RegApi.reducer,
    [ProfileApi.reducerPath]: ProfileApi.reducer,
    [LogoutApi.reducerPath]: LogoutApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(CategoriesApi.middleware)
      .concat(LoginApi.middleware)
      .concat(RegApi.middleware)
      .concat(ProfileApi.middleware)
      .concat(LogoutApi.middleware), // Подключаем middleware для всех API
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
