export interface Promo {
  id: number;
  code: string;
  discount: number;
}

export interface Product {
  id: number;
  name: string;
  discount_percent: number;
  original_price: number;
  price: string;
  category_id: number;
  video_url: string | null;
  description: string;
  composition_care: string;
  preference: Record<string, string[]>;
  measurements: Record<string, string[]>;
  created_at: string;
  updated_at: string;
  stickers:any;
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

  size_stocks: {
    id: number;
    size_id: number;
    product_id: number;
    stock: number;
    available: number;
    created_at: string;
    updated_at: string;
    size: {
      id: number;
      name: string;
      slug: string;
    };
  }[];
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
  discount_percent: number;
  original_price: number;
  price: string;
  description: string;
  composition_care: string;
  created_at: string;
  updated_at: string;
  images: IProductImage[];
  colors: IColor[];
  color_options: IColorOptions[];
  sizes:  Size[];

  preference: {
    size_label: string;
    chest: string;
    waist: string;
    hips: string;
  }[]; // Массив объектов с размерами

  size_characteristics: {
    size_label: string | null;
    length_back: string | null;
    chest: string | null;
    bottom_girth: string | null;
    sleeve_length_from_neck: string | null;
    sleeve_girth_under_armhole: string | null;
    side_seam_length: string | null;
    waist: string | null;
    hips: string | null;
    inseam_length: string | null;
  }[]; // Массив объектов с обмерами

  measurements: Record<string, string[]>; // Массив ключ значения параметра модели

  size_stocks: {
    id: number;
    size_id: number;
    product_id: number;
    stock: number;
    available: number;
    created_at: string;
    updated_at: string;
    size: {
      id: number;
      name: string;
      slug: string;
    };
  }[];
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
  available: number;
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
  stickers:any;
};

export type IPopular = {
  id: number;
  name: string;
  category_id: number;
  video_url: string;
  discount_percent: number;
  original_price: number;
  price: number;
  description: string;
  composition_care: string;
  preference: Record<string, string[]>;
  measurements: Record<string, string[]>;
  created_at: string;
  updated_at: string;
  wishlisted_by_count: number;
  discounted_price: number;
  images: Image[];
  sizes: Size[];
  colors: Color[];
  category: Category;
};
