import Image from "next/image";
import Link from "next/link";

import { IoCartOutline } from "react-icons/io5";

export interface IStoriesCard {
  id?: number;
  img: string;
  name: string;
  href: string;
  cart: boolean;
}

const StoriesCard = ({ id, href, img, name, cart }: IStoriesCard) => {
  return (
    <div key={id} className="stories-card relative transition-all duration-300 ">
      <div className="relative group">
        <Link href={href} className="block hover:shadow-[0_4px_10px_rgba(0,0,0,0.2)] z-10">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            loading="lazy"
            src={img}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-[20px] right-3 text-center">
            <span className={"text-[20px] tablet:text-[25px] laptop:text-[30px] mb-[50px] text-white bona"}>
              {name}
            </span>
          </div>
        </Link>

        {cart ? (
          <button
            className="absolute bottom-2 right-2 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Добавить в избранное"
          >
            <IoCartOutline
              size={30}
              className="hover:text-black transition-colors duration-200 ease-out cursor-pointer"
            />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default StoriesCard;
