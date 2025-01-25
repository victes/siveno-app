import { create } from "zustand";
import { toast } from "react-toastify";

interface Favourite {
  id: string;
  name: string;
  price: number;
  img: string;
}

interface FavouriteStore {
  favourite: Favourite[];
  addFav: (fav: Favourite) => void;
  removeFav: (id: string) => void;
  clearFav: () => void;
  totalCost: () => number;
}

export const useFavStore = create<FavouriteStore>((set, get) => ({
  favourite: [],
  addFav: fav => {
    set(state => ({
      favourite: [...state.favourite, fav],
    }));
    toast.success(`Добавлено в избранное: ${fav.name}`, {
      position: "top-right",
    });
  },
  removeFav: id => {
    const favItem = get().favourite.find(fav => fav.id === id);
    set(state => ({
      favourite: state.favourite.filter(fav => fav.id !== id),
    }));
    if (favItem) {
      toast.error(`Удалено из избранного: ${favItem.name}`, {
        position: "top-right",
      });
    }
  },
  clearFav: () => {
    set(() => ({
      favourite: [],
    }));
    toast.info("Избранное очищено.", {
      position: "top-right",
    });
  },
  totalCost: () => {
    const products = get().favourite;
    return products.reduce((total, fav) => total + fav.price, 0);
  },
}));
