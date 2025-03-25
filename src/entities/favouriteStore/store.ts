import { create } from "zustand";
import { toast } from "react-toastify";

export interface favourite {
  id: string;
  name: string;
  price: number;
  img: string; // Новое поле для строки изображения
}

interface FavouriteStore {
  favourites: favourite[];
  addFav: (favourite: favourite) => void;
  removeFav: (id: string) => void;
  clearFavs: () => void;
  totalCost: () => number;
}

export const useFavStore = create<FavouriteStore>((set, get) => ({
  favourites: [],
  addFav: favourites => {
    const isAlreadyAdded = get().favourites.some(item => item.id === favourites.id);

    if (!isAlreadyAdded) {
      set(state => ({
        favourites: [...state.favourites, favourites],
      }));
      toast.success(`Добавлено в избранное: ${favourites.name}`, {
        position: "top-right",
      });
    } else {
      toast.warning(`Объект уже в избранном: ${favourites.name}`, {
        position: "top-right",
      });
    }
  },
  removeFav: id => {
    const productItem = get().favourites.find(favourite => favourite.id === id);
    set(state => ({
      favourites: state.favourites.filter(favourite => favourite.id !== id),
    }));
    if (productItem) {
      toast.error(`Удалено из корзины: ${productItem.name}`, {
        position: "top-right",
      });
    }
  },
  clearFavs: () => {
    set(() => ({
      favourites: [],
    }));
    toast.info("Товары очищены.", {
      position: "top-right",
    });
  },
  totalCost: () => {
    const favourites = get().favourites;
    return favourites.reduce((total, favourite) => total + favourite.price, 0);
  },
}));
