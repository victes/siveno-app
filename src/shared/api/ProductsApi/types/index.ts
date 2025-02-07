export interface Product {
  id: number;
  name: string;
  price: string;
  category_id: number;
  video_url: string | null;
  description: string;
  composition_care: string;
  preference: Record<string, string[]>;
  measurements: Record<string, string[]>;
  created_at: string;
  updated_at: string;
  category: {
    id: number;
    slug: string;
    title: string;
    category_id: number;
    created_at: string;
  };
  colors: {
    id: number;
    name: string;
    code: string;
    created_at: string;
    updated_at: string;
    pivot: { product_id: number; color_id: number };
  }[];
  images: { id: number; product_id: number; image_path: string; created_at: string; updated_at: string }[];
  sizes: {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    pivot: { product_id: number; size_id: number };
  }[];
  wishlisted_by: [];
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface ProductResponse {
  current_page: number;
  data: Product[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}
