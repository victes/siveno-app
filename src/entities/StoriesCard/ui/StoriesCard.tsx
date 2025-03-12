"use client";
import { useProductStore } from "@/entities/productStore/store";
import { useAddToWishlistMutation } from "@/shared/api/ProfileApi/ProfileApi";
import { useGetStoriesQuery } from "@/shared/api/StoriesApi/ui/StoriesApi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { IoBagOutline, IoCartOutline } from "react-icons/io5";

export interface IStoriesCard {
  id?: number;
  img: string;
  name: string;
  href?: string;
  cart: boolean;
}

// const products = [
//   {
//     id: 1,
//     name: 'Плащ "Burberry Kensington"',
//     category_id: 17,
//     video_url: "https://www.youtube.com/watch?v=LHCob76kigA",
//     price: 33866,
//     description: "Rerum nisi ratione et ut voluptas voluptas nisi cupiditate sed id aut quas labore nisi.",
//     composition_care: "100% хлопок, машинная стирка при 30°",
//     preference: {
//       S: ["длина 60, обхват груди 90"],
//       M: ["длина 62, обхват груди 94"],
//       L: ["длина 64, обхват груди 98"],
//     },
//     measurements: {
//       S: ["длина 60, обхват груди 90"],
//     },
//     created_at: "2025-02-14T05:19:36.000000Z",
//     updated_at: "2025-02-14T05:19:36.000000Z",
//     is_discount: false,
//     discount_percentage: "0.00",
//     pivot: {
//       stories_id: 2,
//       product_id: 1,
//     },
//   },
//   {
//     id: 2,
//     name: 'Перчатки "The North Face Etip"',
//     category_id: 16,
//     video_url: "https://www.youtube.com/watch?v=YQHsXMglC9A",
//     price: 16210,
//     description: "Est nulla beatae rerum labore rerum dolorum qui at natus distinctio qui quia doloribus est nobis.",
//     composition_care: "100% хлопок, машинная стирка при 30°",
//     preference: {
//       S: ["длина 60, обхват груди 90"],
//       M: ["длина 62, обхват груди 94"],
//       L: ["длина 64, обхват груди 98"],
//     },
//     measurements: {
//       S: ["длина 60, обхват груди 90"],
//     },
//     created_at: "2025-02-14T05:19:36.000000Z",
//     updated_at: "2025-02-14T05:19:36.000000Z",
//     is_discount: false,
//     discount_percentage: "0.00",
//     pivot: {
//       stories_id: 2,
//       product_id: 2,
//     },
//   },
//   {
//     id: 3,
//     name: 'Джинсы "Levi\'s 501"',
//     category_id: 7,
//     video_url: "https://www.youtube.com/watch?v=YQHsXMglC9A",
//     price: 7088,
//     description:
//       "Soluta omnis qui corporis est magnam et doloremque eos id architecto exercitationem dolor ducimus nulla nostrum error in qui dolorem quia.",
//     composition_care: "100% хлопок, машинная стирка при 30°",
//     preference: {
//       S: ["длина 60, обхват груди 90"],
//       M: ["длина 62, обхват груди 94"],
//       L: ["длина 64, обхват груди 98"],
//     },
//     measurements: {
//       S: ["длина 60, обхват груди 90"],
//     },
//     created_at: "2025-02-14T05:19:36.000000Z",
//     updated_at: "2025-02-14T05:19:36.000000Z",
//     is_discount: false,
//     discount_percentage: "0.00",
//     pivot: {
//       stories_id: 2,
//       product_id: 3,
//     },
//   },
// ];

interface Preference {
  [size: string]: string[];
}

interface Measurements {
  [size: string]: string[];
}

interface Pivot {
  stories_id: number;
  product_id: number;
}

interface Product {
  id: number;
  name: string;
  category_id: number;
  video_url: string;
  price: number;
  description: string;
  composition_care: string;
  preference: Preference;
  measurements: Measurements;
  created_at: string;
  updated_at: string;
  is_discount: boolean;
  discount_percentage: string;
  pivot: Pivot;
}

interface ModalProps {
  products: Product[];
}

const Modal = ({ products }: ModalProps) => {
  const [addToWishlist] = useAddToWishlistMutation();
  const { addProduct } = useProductStore();

  return (
    <div className="absolute top-20 left-5 bg-white p-3 rounded-lg shadow-md max-w-[400px] w-full">
      {products.map(product => (
        <div key={product.id} className="flex items-start mb-4 last:mb-0">
          <div className="relative w-[60px] h-[80px] mr-3">
            <Image
              width={0}
              height={0}
              loading="lazy"
              src={product.video_url}
              alt={product.name}
              className="object-cover rounded w-full h-full"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold mb-1">{product.name}</h3>
            <div className="flex items-center text-sm text-gray-700 mb-1">
              <span>{product.price.toLocaleString()} ₽</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 mx-2" />
              {!product.is_discount && <span className="text-orange-500">СКОРО</span>}
            </div>
            <button onClick={() => addToWishlist({ product_id: product.id })}>
              <div className="text-sm text-gray-800">В вишлист</div>
            </button>
          </div>
          <button
            className="border border-gray-300 p-2 rounded-full hover:bg-gray-100"
            aria-label="Добавить в корзину"
            onClick={() =>
              addProduct({
                id: product.id.toString(),
                name: product.name,
                price: product.price,
                img: product.video_url,
                selectedSize: "",
                quantity: 1,
              })
            }
          >
            <IoBagOutline size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

const StoriesCard = ({ id, href, img, name, cart }: IStoriesCard) => {
  const { data: stories } = useGetStoriesQuery();
  const products = stories?.flatMap(story => story.products) || [];
  console.log(products);
  const [click, setClick] = useState(false);
  return (
    <div key={id} className="stories-card relative transition-all duration-300 ">
      <div className="relative group">
        <Link href={href ? href : ""} className="block hover:shadow-[0_4px_10px_rgba(0,0,0,0.2)] z-10">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            loading="lazy"
            src={img}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-[20px] right-5 text-center">
            <span className={"text-[20px] tablet:text-[25px] laptop:text-[30px] mb-[50px] text-white bona"}>
              {name}
            </span>
          </div>
        </Link>

        {cart ? (
          <button
            className="absolute top-5 left-5 bg-white p-2 rounded-full shadow-md "
            aria-label="Добавить в избранное"
            onClick={() => setClick(prev => !prev)}
          >
            <IoCartOutline
              size={20}
              className="hover:text-black transition-colors duration-200 ease-out cursor-pointer"
            />
          </button>
        ) : null}
        {click ? <Modal products={products} /> : null}
      </div>
    </div>
  );
};

export default StoriesCard;
