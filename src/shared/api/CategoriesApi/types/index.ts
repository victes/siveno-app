// types.ts
export interface Category {
  id: number;
  slug: string;
  title: string;
  image: string;
  category_id: number | null;
  created_at: string;
  updated_at: string;
}
