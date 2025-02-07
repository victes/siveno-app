// types.ts
export interface Category {
  id: number;
  slug: string;
  title: string;
  image: string;
  category_id: number | null;
  created_at: string;
  updated_at: string;
  children?: IChildren[];
}

export interface IChildren {
  id: number;
  slug: string;
  title: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  image: string;
}
