import { create } from "zustand";
import { toast } from "react-toastify";

interface Product {
  id: string;
  name: string;
  price: number;
  img: string; // Новое поле для строки изображения
  selectedSize: string; //
  quantity: number; // Новое поле для количества
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
  addProduct: product => {
    set(state => ({
      products: [...state.products, product],
    }));
    toast.success(`Добавлено в корзину: ${product.name}`, {
      position: "top-right",
    });
  },
  removeProduct: id => {
    const productItem = get().products.find(product => product.id === id);
    set(state => ({
      products: state.products.filter(product => product.id !== id),
    }));
    if (productItem) {
      toast.error(`Удалено из корзины: ${productItem.name}`, {
        position: "top-right",
      });
    }
  },
  clearProducts: () => {
    set(() => ({
      products: [],
    }));
    toast.info("Товары очищены.", {
      position: "top-right",
    });
  },
  totalCost: () => {
    const products = get().products;
    return products.reduce((total, product) => total + product.price, 0);
  },
}));
