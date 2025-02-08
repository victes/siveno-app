import { useFavStore } from "@/entities/favouriteStore/store";
import { useGetWishListQuery } from "@/shared/api/ProfileApi/ProfileApi";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";

const Favourites = () => {
  const { favourite, removeFav } = useFavStore();
  const { data } = useGetWishListQuery({});
  console.log(data);
  return (
    <div className="max-w-[600px] w-full mt-[100px] grid grid-cols-2 gap-[30px]">
      {favourite.length > 0
        ? favourite.map(product => (
            <li key={product.id} className="flex gap-5 p-2 justify-between ">
              <div className="flex gap-5 items-center">
                <div>
                  <img src={product.img} alt={product.name} className="h-[300px] w-[200px] object-cover" />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="text-black">{product.name}</span>
                  <span className="text-[30px] text-black">{product.price} руб</span>
                </div>
              </div>
              <div>
                <MdDeleteOutline
                  onClick={() => removeFav(product.id)}
                  size={30}
                  className="m-2 cursor-pointer hover:text-red-500"
                />
              </div>
            </li>
          ))
        : "Товаров нет"}
    </div>
  );
};

export default Favourites;
