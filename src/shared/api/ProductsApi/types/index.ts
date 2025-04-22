export interface Promo {
  id: number;
  code: string;
  discount: number;
}

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

/////////////// Product page

export interface IProductImage {
  id: number;
  product_id: number;
  image_path: string;
  created_at: string;
  updated_at: string;
  color_id: number;
}

export interface IProduct {
  id: number;
  name: string;
  category_id: number;
  video_url: string;
  price: string;
  description: string;
  composition_care: string;
  preference: {
    size_label: string;
    chest: string;
    waist: string;
    hips: string;
  }[]; // Массив объектов с размерами и их параметрами
  measurements: Record<string, string[]>; // Массив объектов с размерами и их параметрами
  created_at: string;
  updated_at: string;
  images: IProductImage[];
  colors: IColor[];
  color_options: IColorOptions[];
  sizes?:  {name: string, id: number}[];
}

export interface IColor {
  id: number;
  name: string;
  code: string
}

export interface IColorOptions {
  id: number;
  colors: IColor[];
}

// ====================================================== Popular Products =================================
type Image = {
  id: number;
  product_id: number;
  image_path: string;
  created_at: string;
  updated_at: string;
};

type Size = {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  pivot: {
    product_id: number;
    size_id: number;
  };
};

type Color = {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
  pivot: {
    product_id: number;
    color_id: number;
  };
};

type Category = {
  id: number;
  slug: string;
  title: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  image: string;
  is_sale: number;
};

export type IPopular = {
  id: number;
  name: string;
  category_id: number;
  video_url: string;
  price: number;
  description: string;
  composition_care: string;
  preference: Record<string, string[]>;
  measurements: Record<string, string[]>;
  created_at: string;
  updated_at: string;
  is_discount: boolean;
  discount_percentage: string;
  wishlisted_by_count: number;
  discounted_price: number;
  images: Image[];
  sizes: Size[];
  colors: Color[];
  category: Category;
};
