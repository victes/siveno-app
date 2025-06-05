import React from "react";
import { useGetOrdersQuery } from "@/shared/api/OrdersApi/OrdersApi";
import Link from "next/link";
import { usePayOrderMutation } from "@/shared/api/OrdersApi/OrdersApi";

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
  const [payOrder, { isLoading: isPaying }] = usePayOrderMutation();

  console.log('data',data);
  console.log('error',error);
  console.log('isLoading',isLoading);

  if (isLoading) return <div className="max-w-[800px] w-full mt-[100px]">Загрузка...</div>;
  if (error) return <div className="max-w-[800px] w-full mt-[100px]">Ошибка загрузки заказов</div>;
  if (!data || data.length === 0) return <div className="max-w-[800px] w-full mt-[100px]">Заказов нет</div>;
  const statusFormating = (status: string) => {
    switch (status) {
      case 'new':
        return 'Ожидает оплаты';
      case 'shipped':
        return 'Доставляется';
      case 'delivered':
        return 'Доставлен';
      case 'cancelled':
        return 'Отменён';
      case 'processing':
        return 'Оплачен';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'text-yellow-500';
      case 'processing':
        return 'text-green-400';
      case 'shipped':
        return 'text-orange-500';
      case 'delivered':
        return 'text-green-600';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };


  return (
      <div className="max-w-[800px] w-full flex justify-start flex-wrap gap-[30px] text-black">
        {data.map((product:TProduct) => (
          <div className='flex flex-col justify-between gap-[20px] p-[20px]' key={product?.id}>
            <p className='text-xl text-[#333] text-left'>Заказ № {product?.id}</p>
            <div className="max-w-[500px] flex justify-start gap-[20px] overflow-x-auto ">
              {
                product?.items?.map(item => (
                 <Link href={`product/${item?.product.id}`} key={item?.product.id}>
                    <div className="flex flex-col gap-5 items-start max-w-[100px]">
                     <div>
                        <img
                          src={item.product.images[0].image_path}
                          alt='img'
                          className="h-[200px] w-[100px] object-cover rounded-[8px]"
                         />
                     </div>
                     <div className="flex flex-col justify-start items-start">
                       <span className="text-sm">{item?.product.name}</span>
                       <span className="text-sm">{item?.price} руб</span>
                     </div>
                   </div>
                 </Link>
                ))
              }
            </div>
            <div className='flex gap-[20px] items-center'>
              <p className='text-sm'>Доставка: {(product?.delivery_price ?? 0).toFixed(2)} руб.</p>
              <p className='text-sm'>Итого: {product?.total_price} руб.</p>
              <p className={`text-sm ${getStatusColor(product?.status)}`}>
                {statusFormating(product?.status)}
              </p>
            </div>
            {product.status === 'new' && (
              <button
                className='btn bg-transparent self-start'
                onClick={async () => {
                  try {
                    const response: any = await payOrder(
                      {
                        amount: product.total_price,
                        order_id: product.id,
                        payment_method: 'bank_card',
                        use_loyalty_points: false,
                      }).unwrap();
                    if (response?.payment_url) {
                      window.location.href = response.payment_url;
                    } else {
                      alert("Не удалось получить ссылку для оплаты.");
                    }
                  } catch (err) {
                    console.error("Ошибка при оплате:", err);
                    alert("Произошла ошибка при создании платежа.");
                  }
                }}
                disabled={isPaying}
              >
                {isPaying ? "Обработка..." : "Оплатить"}
              </button>
            )}
          </div>
        ))}
      </div>
  );
};

export default Orders;