export interface Product {
  id: number;
  name: string;
  price: string;
  category_id: number; // исправил на number
  image_urls: string[]; // изменил на массив строк
  video_url: string | null;
  description: string;
  composition_care: string;
  preference: string;
  measurements: string;
  created_at: string;
  updated_at: string;
}
