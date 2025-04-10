import {IProductImage} from "@/shared/api/ProductsApi/types";

export interface ICCard {
  id: number;
  images?: {image_path: string;}[];
  img?: string;
  name: string;
  href: string;
  price?: string;
  del?: boolean;
}
