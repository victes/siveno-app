import { create } from "zustand";

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
  addFav: fav =>
    set(state => ({
      favourite: [...state.favourite, fav],
    })),
  removeFav: id =>
    set(state => ({
      favourite: state.favourite.filter(fav => fav.id !== id),
    })),
  clearFav: () =>
    set(() => ({
      favourite: [],
    })),
  totalCost: () => {
    const products = get().favourite;
    return products.reduce((total, fav) => total + fav.price, 0);
  },
}));
