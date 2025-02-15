/* eslint-disable @next/next/no-img-element */
import { useProductStore } from "@/entities/productStore/store";
// import { useGetOrdersQuery } from "@/shared/api/OrdersApi/OrdersApi";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";

const Orders = () => {
  const { products, removeProduct } = useProductStore();
  // const {data,isSuccess} = useGetOrdersQuery()
  return (
    <div className="max-w-[700px] w-full mt-[100px] grid grid-cols-2 gap-[30px] h-[350px]">
      {products.length > 0
        ? products.map(product => (
            <li key={product.id} className="flex gap-5 p-2 justify-between">
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
                  onClick={() => removeProduct(product.id)}
                  size={30}
                  className="m-2 cursor-pointer hover:text-red-500"
                />
              </div>
            </li>
          ))
        : "Заказов нет"}
    </div>
  );
};

export default Orders;
