import React from "react";
import { useGetOrdersQuery } from "@/shared/api/OrdersApi/OrdersApi";
import Link from "next/link";


type TProduct = {
  id: number;
  items: {
    price: number;
    quantity: number;
    product: {
      name: string;
      discount_percentage: string;
      images: {image_path: string}[];
      id: number;
    }
  }[];
  total_price: string;
  promo_discount: number;
  status: string;
  delivery_price?: number;
}

const Orders = () => {
  const { data, isLoading, error } = useGetOrdersQuery();
  console.log('data',data);
  console.log('error',error);
  console.log('isLoading',isLoading);

  if (isLoading) return <div className="max-w-[1000px] w-full mt-[100px]">Загрузка...</div>;
  if (error) return <div className="max-w-[1000px] w-full mt-[100px]">Ошибка загрузки заказов</div>;
  if (!data || data.length === 0) return <div className="max-w-[1000px] w-full mt-[100px]">Заказов нет</div>;
  const statusFormating = (status: string) => {
    switch (status) {
      case 'new':
        return 'ожидает оплаты'
      case 'shipped':
        return 'доставляется'
      case 'delivered':
        return 'delivered'
      case 'cancelled':
        return 'отменен'
      case 'processing':
        return 'оплачен, обрабатывается'
    }
  }
  return (
      <div className="max-w-[1000px] w-full flex justify-center flex-wrap gap-[30px] ">
        {data.map((product:TProduct) => (
          <div className='flex flex-col justify-between items-center gap-[20px] border border-1 border-[#a6adbb] p-[20px]'>
            <p className='text-xl text-[#333] '>№ {product?.id}</p>
            <div className="max-w-[500px] flex justify-start gap-[20px] overflow-x-auto ">
              {
                product?.items?.map(item => (
                 <Link href={`product/${item?.product.id}`} key={item?.product.id}>
                    <div className="flex flex-col gap-5 items-start w-[250px]">
                     <div>
                        <img
                          src={item.product.images[0].image_path}
                          alt='img'
                          className="h-[400px] w-[300px] object-cover rounded-[8px]"
                         />
                     </div>
                     <div className="flex flex-col justify-start items-start">
                       <span className="text-black text-[23px]">{item?.product.name}</span>
                       <span className="text-[20px] text-black">{item?.price} руб</span>
                     </div>
                   </div>
                 </Link>
                ))
              }
            </div>
            <div className='flex gap-[50px] items-center'>
              <p className='text-xl'>Доставка: {product?.delivery_price || 0} руб. Итого {product?.total_price} руб.</p>
              <p className='text-xl'>{statusFormating(product?.status)}</p>
              <button className='btn bg-transparent'>Оплатить</button>
            </div>
          </div>
        ))}
      </div>
  );
};

export default Orders;