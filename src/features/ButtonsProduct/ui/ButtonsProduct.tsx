"use client";
import { useFavStore } from "@/entities/favouriteStore/store";
import { useProductStore } from "@/entities/productStore/store";
import { useAddToWishlistMutation } from "@/shared/api/ProfileApi/ProfileApi";
import { useGetSizesByProductQuery } from "@/shared/api/SizesApi/ui/SizesApi";
import { useAuth } from "@/shared/hook/AuthContext/ui/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";

interface IProduct {
  id: number;
  name: string | undefined;
  price: string;
  img: string;
  selectedSize?: string;
  selectedSizeId?: number;
  selectedColorId: number | null;
}

const ButtonsProduct = ({ id, name, price, img, selectedSize: propSelectedSize,selectedSizeId, selectedColorId  }: IProduct) => {
  const { addProduct } = useProductStore();
  const { addFav } = useFavStore();
  const [addToWishlist] = useAddToWishlistMutation();
  const { data: sizes } = useGetSizesByProductQuery();
  const [selectedSize, setSelectedSize] = useState<string>(propSelectedSize || "");

  useEffect(() => {
    if (propSelectedSize) {
      setSelectedSize(propSelectedSize);
    }
  }, [propSelectedSize]);

  useEffect(() => {
    if (selectedSize && sizes) {
      // Убираем неиспользуемую переменную
      // const sizeObj = sizes.find(s => s.name === selectedSize);
    }
  }, [selectedSize, sizes]);

  useEffect(() => {
    const handleSizeSelected = (event: CustomEvent) => {
      if (event.detail && event.detail.size) {
        setSelectedSize(event.detail.size);

        // Убираем неиспользуемую переменную
        // if (sizes) {
        //   const sizeObj = sizes.find(s => s.name === event.detail.size);
        // }
      }
    };

    window.addEventListener("sizeSelected", handleSizeSelected as EventListener);

    return () => {
      window.removeEventListener("sizeSelected", handleSizeSelected as EventListener);
    };
  }, [sizes]);

  const handleAddProduct = () => {
    if (!selectedSize) {
      alert("Пожалуйста, выберите размер");
      return;
    }
    if (!selectedColorId) {
      alert("Пожалуйста, выберите цвет")
      return;
    }

    if (name?.trim() && price) {
      addProduct({
        id: id.toString(),
        name,
        price: parseFloat(price),
        img,
        selectedSize,
        quantity: 1,
        selectedSizeId,
      });
    }
  };

  const handleAddFavourite = () => {
    if (name?.trim() && price) {
      addFav({
        id: id.toString(),
        name,
        price: parseFloat(price),
        img,
      });
    }
  };

  return (
    <div className="product-buttons w-full">
      <div className="product-buttons__main flex w-full mb-5">
        <button
          className="product-buttons__cart flex-1 h-12 border-0 bg-black text-white uppercase text-xs tracking-widest font-medium hover:bg-gray-900 transition-all duration-300"
          onClick={handleAddProduct}
        >
          Добавить в корзину
        </button>
        <button
          className="product-buttons__favorite w-12 h-12 flex items-center justify-center border border-gray-300 hover:bg-gray-50 transition-all duration-300"
          onClick={handleAddFavourite}
        >
          <IoMdHeartEmpty size={22} />
        </button>
      </div>
      <button className="product-buttons__installment w-full h-12 border border-gray-300 text-gray-700 uppercase text-xs tracking-widest font-medium hover:border-black transition-all duration-300">
        Купить долями
      </button>
    </div>
  );
};

export default ButtonsProduct;
