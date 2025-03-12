import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// URL бэкенда
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Product {
  id: number;
  name: string;
  category_id: number;
  video_url: string;
  price: number;
  description: string;
  composition_care: string;
  preference: Record<string, string[]>; // Например: { "S": ["длина 60, обхват груди 90"] }
  measurements: Record<string, string[]>; // Например: { "S": ["длина 60, обхват груди 90"] }
  created_at: string;
  updated_at: string;
  is_discount: boolean;
  discount_percentage: string;
  pivot: {
    stories_id: number;
    product_id: number;
  };
}

interface Story {
  id: number;
  title: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  products: Product[];
}

// Определяем API
export const storiesApi = createApi({
  reducerPath: "storiesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getStories: builder.query<Story[], void>({
      query: () => `stories`, // Запрос без пагинации
      transformResponse: (response: { data: Story[] }) => response.data, // Извлекаем только массив историй
    }),
  }),
});

// Экспортируем хук для запроса данных
export const { useGetStoriesQuery } = storiesApi;
