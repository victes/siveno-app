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
}

const ButtonsProduct = ({ id, name, price, img, selectedSize: propSelectedSize }: IProduct) => {
  const { addProduct } = useProductStore();
  const { addFav } = useFavStore();
  const { push } = useRouter();
  const [addToWishlist] = useAddToWishlistMutation();
  const { data: sizes } = useGetSizesByProductQuery();

  const { token } = useAuth();
  const [localToken, setLocalToken] = useState<string | null>(token);
  const [selectedSize, setSelectedSize] = useState<string>(propSelectedSize || "");

  useEffect(() => {
    setLocalToken(token);
  }, [token]);

  useEffect(() => {
    if (propSelectedSize) {
      setSelectedSize(propSelectedSize);
    }
  }, [propSelectedSize]);

  useEffect(() => {
    if (selectedSize && sizes) {
      const sizeObj = sizes.find(s => s.name === selectedSize);
    }
  }, [selectedSize, sizes]);

  useEffect(() => {
    const handleSizeSelected = (event: CustomEvent) => {
      if (event.detail && event.detail.size) {
        setSelectedSize(event.detail.size);
        
        if (sizes) {
          const sizeObj = sizes.find(s => s.name === event.detail.size);
        }
      }
    };

    window.addEventListener('sizeSelected', handleSizeSelected as EventListener);
    
    return () => {
      window.removeEventListener('sizeSelected', handleSizeSelected as EventListener);
    };
  }, [sizes]);

  const handleAddProduct = () => {
    if (!selectedSize) {
      alert("Пожалуйста, выберите размер");
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
      });
    }
  };

  const handleAddFavourite = () => {
    if (localToken) {
      addToWishlist({ product_id: id });
      if (name?.trim() && price) {
        addFav({
          id: id.toString(),
          name,
          price: parseFloat(price),
          img,
        });
      }
    } else {
      push("/login");
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
        Оформить рассрочку
      </button>
    </div>
  );
};

export default ButtonsProduct;
