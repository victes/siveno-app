import { create } from "zustand";
import { toast } from "react-toastify";

interface Product {
  id: string;
  name: string;
  price: number;
  img?: string;
  selectedSize?: string;
  quantity?: number;
  selectedSizeId?: number;
  color_id?: number;
  images?: {image_path: string}[];
}

interface ProductStore {
  products: Product[];
  selectedColorId: number | null;
  addProduct: (product: Omit<Product, 'selectedColorId'>) => void;
  removeProduct: (index: number) => void;
  clearProducts: () => void;
  totalCost: () => number;
  totalQuantity: () => number;
  setSelectedColorId: (colorId: number | null) => void;
  updateProductColor: (productId: string, colorId: number) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  selectedColorId: null,

  addProduct: (product: Omit<Product, 'selectedColorId'>) => {
    const currentColorId = get().selectedColorId;
    set({
      products: [...get().products, {
        ...product,
        color_id: currentColorId !== null ? currentColorId : undefined
      }]
    });
    toast.success(`Добавлено в корзину: ${product.name}`, {
      position: "top-left",
    });
  },

  removeProduct: (index: number) => {
    const productItem = get().products[index];
    set({
      products: get().products.filter((p, i) => i !== index),
    });
    if (productItem) {
      toast.error(`Удалено из корзины: ${productItem.name}`, {
        position: "top-left",
      });
    }
  },

  clearProducts: () => {
    set({
      products: [],
      selectedColorId: null
    });
    toast.info("Товары очищены.", {
      position: "top-left",
    });
  },

  totalCost: (): number => {
    return get().products.reduce((total: number, p: Product) => total + p.price, 0);
  },

  totalQuantity: (): number => {
    return get().products.reduce((total: number, p: Product) => total + (p.quantity || 1), 0);
  },

  setSelectedColorId: (colorId: number | null) => {
    set({ selectedColorId: colorId });
  },

  updateProductColor: (productId: string, colorId: number) => {
    set({
      products: get().products.map((p: Product) =>
          p.id === productId ? { ...p, selectedColorId: colorId } : p
      )
    });
  }
}));