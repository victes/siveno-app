import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductStore {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  clearProducts: () => void;
}

export const useProductStore = create<ProductStore>(set => ({
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
}));
