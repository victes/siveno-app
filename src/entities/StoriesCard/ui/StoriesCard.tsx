import { useProductStore } from "@/entities/productStore/store";
import { useAddToWishlistMutation } from "@/shared/api/ProfileApi/ProfileApi";
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

const products = [
  {
    id: 1,
    image: "https://lesyanebo.com/upload/iblock/801/jvogw8zq6qkcs2uy44mb305msozkobff.jpg",
    title: "Брюки из фактурной пряжи",
    price: "19 000 ₽",
    available: false,
  },
  {
    id: 2,
    image: "https://lesyanebo.com/upload/iblock/801/jvogw8zq6qkcs2uy44mb305msozkobff.jpg",
    title: "Кардиган из фактурной пряжи",
    price: "19 000 ₽",
    available: false,
  },
  {
    id: 3,
    image: "https://lesyanebo.com/upload/iblock/801/jvogw8zq6qkcs2uy44mb305msozkobff.jpg",
    title: "Платье из тонкого льна",
    price: "21 000 ₽",
    available: false,
  },
];

interface IClother {
  id: number;
  image: string;
  title: string;
  price: string;
  soon?: boolean;
}

interface ModalProps {
  clothers: IClother[];
}

const Modal = ({ clothers }: ModalProps) => {
  const [addToWishlist] = useAddToWishlistMutation();
  const { addProduct } = useProductStore();
  return (
    <div className="absolute top-20 left-5 bg-white p-3 rounded-lg shadow-md max-w-[400px] w-full">
      {clothers.map(item => (
        <div key={item.id} className="flex items-start mb-4 last:mb-0">
          <div className="relative w-[60px] h-[80px] mr-3">
            <Image src={item.image} alt={item.title} fill className="object-cover rounded" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
            <div className="flex items-center text-sm text-gray-700 mb-1">
              <span>{item.price}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 mx-2" />
              {item.soon && <span className="text-orange-500">СКОРО</span>}
            </div>
            <button onClick={() => addToWishlist({ product_id: item.id })}>
              <div className="text-sm text-gray-800">В вишлист</div>
            </button>
          </div>
          <button
            className="border border-gray-300 p-2 rounded-full hover:bg-gray-100"
            aria-label="Добавить в корзину"
            onClick={() =>
              addProduct({
                id: item.id.toString(),
                name: item.title,
                price: parseFloat(item.price),
                img: item.image,
                selectedSize: "",
                quantity: 0,
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
            className="absolute top-5 left-5 hover:bg-white p-2 rounded-full shadow-md "
            aria-label="Добавить в избранное"
            onClick={() => setClick(prev => !prev)}
          >
            <IoCartOutline
              size={20}
              className="hover:text-black transition-colors duration-200 ease-out cursor-pointer"
            />
          </button>
        ) : null}
        {click ? <Modal clothers={products} /> : null}
      </div>
    </div>
  );
};

export default StoriesCard;
