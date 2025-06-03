/* eslint-disable @next/next/no-img-element */
import { useDeleteWishlistMutation, useGetWishListQuery } from "@/shared/api/ProfileApi/ProfileApi";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

interface ProductImage {
  image_path: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  images: ProductImage[];
  stickers: any;
}

const Favourites = () => {
  // const { removeFav } = useFavStore();
  const { data, isSuccess } = useGetWishListQuery({});
  const [deleteWishlist] = useDeleteWishlistMutation();

  // console.log(isSuccess && data.data.length);

  const handleDeleteWishlist = (id: number) => {
    deleteWishlist({ id: id });
    toast.error(`Удалено из избранного `, {
      position: "top-left",
    });
  };

  return (
    <div className="max-w-[700px] w-full mt-[100px] grid grid-cols-1 gap-[30px] overflow-y-auto h-[350px]">
      {isSuccess && data.data.length
        ? data.data.map((product: Product) => (
            <li key={product.id} className="flex gap-5 p-2 justify-between ">
              <div className="flex gap-5 items-center">
                <div>
                  <img
                    src={product.images[0].image_path}
                    alt={product.name}
                    className="h-[300px] w-[200px] object-cover"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="text-black">{product.name}</span>
                  <span className="text-[30px] text-black">{product.price} руб</span>
                </div>
              </div>
              <div>
                <MdDeleteOutline
                  onClick={() => handleDeleteWishlist(product.id)}
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
