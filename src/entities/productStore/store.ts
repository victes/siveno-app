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
  images?: { image_path: string }[];
  stickers:any;
}

interface ProductStore {
  selectedColorId: number | null;
  products: Product[];

  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  clearProducts: () => void;
  totalCost: () => number;
  totalQuantity: () => number;

  setSelectedColorId: (colorId: number | null) => void;
  updateProductColor: (productId: string, colorId: number) => void;

  loadProducts: () => void;
}

const getLocalProducts = (): Product[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

const saveLocalProducts = (products: Product[]) => {
  localStorage.setItem("cart", JSON.stringify(products));
};

export const useProductStore = create<ProductStore>((set, get) => ({
  selectedColorId: null,
  products: [],

  addProduct: (product: Product) => {
    const current = getLocalProducts();
    const existingIndex = current.findIndex(p => p.id === product.id && p.selectedSize === product.selectedSize);

    if (existingIndex !== -1) {
      current[existingIndex].quantity = (current[existingIndex].quantity || 1) + 1;
    } else {
      current.push({ ...product, quantity: 1, color_id: get().selectedColorId || undefined });
    }

    saveLocalProducts(current);
    set({ products: current });

    toast.success(`Добавлено в корзину: ${product.name}`, { position: "top-left" });
    ym(100833094, "reachGoal", "add_to_cart", { productId: product.id });
  },

  removeProduct: (productId: string) => {
    const current = getLocalProducts();
    const updated = current.filter(p => p.id !== productId);

    saveLocalProducts(updated);
    set({ products: updated });

    toast.error("Удалено из корзины", { position: "top-left" });
    ym(100833094, "reachGoal", "remove_from_cart", { productId });
  },

  clearProducts: () => {
    saveLocalProducts([]);
    set({ products: [], selectedColorId: null });

    toast.info("Товары очищены.", { position: "top-left" });
  },

  totalCost: () => {
    return get().products.reduce((total, p) => total + p.price * (p.quantity || 1), 0);
  },

  totalQuantity: () => {
    return get().products.reduce((total, p) => total + (p.quantity || 1), 0);
  },

  setSelectedColorId: (colorId: number | null) => {
    set({ selectedColorId: colorId });
  },

  updateProductColor: (productId: string, colorId: number) => {
    const current = getLocalProducts();
    const updated = current.map(p => (p.id === productId ? { ...p, color_id: colorId } : p));

    saveLocalProducts(updated);
    set({ products: updated });
  },

  loadProducts: () => {
    set({ products: getLocalProducts() });
  },
}));
