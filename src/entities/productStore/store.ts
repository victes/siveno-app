import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  price: number;
  img: string; // Новое поле для строки изображения
}

interface ProductStore {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  clearProducts: () => void;
  totalCost: () => number;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  addProduct: product =>
    set(state => ({
      products: [...state.products, product],
    })),
  removeProduct: id =>
    set(state => ({
      products: state.products.filter(product => product.id !== id),
    })),
  clearProducts: () =>
    set(() => ({
      products: [],
    })),
  totalCost: () => {
    const products = get().products;
    return products.reduce((total, product) => total + product.price, 0);
  },
}));
