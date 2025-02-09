import React, { useEffect, useRef, useState } from "react";
import { IPayCard } from "../types/type";
import { RxCross2 } from "react-icons/rx";
import { useProductStore } from "@/entities/productStore/store";
import { useAddAddressesMutation, useGetAddressesQuery } from "@/shared/api/AddressApi/AddressApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetProfileQuery } from "@/shared/api/ProfileApi/ProfileApi";
import {
  useCancelOrderMutation,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  usePayOrderMutation,
} from "@/shared/api/OrdersApi/OrdersApi";

interface IModal {
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
  state: z.string().nonempty({
    message: "Почта введена неправильно",
  }),
  city: z.string().nonempty({
    message: "Пароль должен содержать не менее 8 символов",
  }),
  street: z.string().nonempty({
    message: "Подтверждение пароля должно содержать не менее 8 символов",
  }),
  house: z.string().nonempty({
    message: "Имя обязательно для заполнения",
  }),
  postal_code: z.string().nonempty({
    message: "Почтовый индекс обязательна для заполнения",
  }),
  apartment: z.string().nonempty({
    message: "Апартаменты обязательное поле",
  }),
});

type FormFields = z.infer<typeof formSchema>;

const Modal = ({ click, setClick }: IModal) => {
  const [addAddresses] = useAddAddressesMutation();
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: "",
      city: "",
      street: "",
      house: "",
      postal_code: "",
    },
  });

  const handleChange = async (values: FormFields) => {
    try {
      const requestBody = {
        is_primary: false,
        state: values.state,
        city: values.city,
        street: values.street,
        house: values.house,
        postal_code: values.postal_code,
        apartment: values.apartment,
      };
      setClick(false);
      const result = await addAddresses(requestBody).unwrap();
      console.log("result: " + result);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <>
      {click ? (
        <div className="z-50 bg-black/50 w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
          <div className="w-[500px] transform bg-white p-6 py-8 rounded-[5px]">
            <button onClick={() => setClick(false)}>
              <RxCross2 className="absolute top-0 right-0 cursor-pointer m-3" size={30} />{" "}
            </button>
            <form onSubmit={form.handleSubmit(handleChange)} className="flex flex-col gap-[20px]">
              <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
                <input type="text" placeholder="Государство" {...form.register("state")} />
              </label>
              <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
                <input type="text" placeholder="Город" {...form.register("city")} />
              </label>
              <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
                <input type="text" placeholder="Улица" {...form.register("street")} />
              </label>
              <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
                <input type="text" placeholder="Дом" {...form.register("house")} />
              </label>
              <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
                <input type="text" placeholder="Почтовый индекс" {...form.register("postal_code")} />
              </label>
              <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
                <input type="text" placeholder="Квартира" {...form.register("apartment")} />
              </label>
              <button>Сохранить адрес</button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const PayCard = ({ onOpen, open }: IPayCard) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const { products, totalCost, clearCart } = useProductStore();
  const { data: addresses, isSuccess } = useGetAddressesQuery();
  const [click, setClick] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const { data: userProfile } = useGetProfileQuery({});

  const [createOrder] = useCreateOrderMutation();
  const [payOrder] = usePayOrderMutation();
  const [cancelOrder] = useCancelOrderMutation();
  const { data: orderData, refetch } = useGetOrderByIdQuery(orderId!, {
    skip: !orderId,
  });

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setAnimate(false);
      setTimeout(() => onOpen(false), 300);
    }
  };

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => onOpen(false), 300);
  };

  useEffect(() => {
    if (open) {
      setAnimate(true);
    }
  }, [open]);

  const handlePayment = async () => {
    try {
      if (!selectedAddress) {
        alert("Выберите адрес доставки");
        return;
      }

      const orderResponse = await createOrder({
        address_id: selectedAddress,
        items: products.map(p => ({
          product_id: Number(p.id),
          size_id: p.selectedSize?.id || 1,
          quantity: p.quantity || 1,
        })),
        delivery: "courier",
        use_loyalty_points: true,
      }).unwrap();

      setOrderId(orderResponse.id);

      const paymentResponse = await payOrder({
        orderId: orderResponse.id,
      }).unwrap();

      window.location.href = paymentResponse.payment_url;
    } catch (error) {
      console.error("Ошибка при создании заказа:", error);
      alert("Произошла ошибка при оформлении заказа");
    }
  };

  const handleCancelOrder = async () => {
    if (orderId) {
      await cancelOrder(orderId).unwrap();
      setOrderId(null);
      alert("Заказ успешно отменен");
    }
  };

  useEffect(() => {
    if (orderData?.status === "completed") {
      clearCart();
      alert("Заказ успешно оплачен!");
      handleClose();
    }
  }, [orderData]);

  return (
    <>
      {open && (
        <div
          className="fixed w-screen h-screen bg-black bg-opacity-20 top-0 left-0 flex justify-end z-[60]"
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className={`bg-white p-4 relative rounded-lg shadow-lg transform max-w-[800px] overflow-y-auto w-full flex flex-col gap-5 ${
              animate ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300`}
            onClick={e => e.stopPropagation()}
          >
            <RxCross2 className="absolute top-0 left-0 m-5 cursor-pointer" size={30} onClick={() => handleClose()} />
            <h2 className="text-black text-[30px]">Оформление заказа</h2>
            <p className="uppercase">
              {products.length} Товаров на {totalCost()} руб.
            </p>
            <p className="text-black uppercase">Адреса</p>
            {isSuccess && addresses.length > 0 ? (
              <div className="flex flex-col justify-center items-center gap-[30px] mt-[30px] w-full">
                {addresses.map(address => (
                  <label key={address.id} className="flex justify-center gap-[20px] w-full">
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={() => setSelectedAddress(address.id)}
                      className="w-[20px] h-[20px]"
                    />
                    <div className="w-full flex flex-col">
                      <p>{`Город: ${address.city}`}</p>
                      <p>{`Улица: ${address.street || "Не указано"}`}</p>
                      <p>{`Дом: ${address.house || "Не указано"}`}</p>
                      <p>{`Квартира: ${address.apartment || "Не указано"}`}</p>
                      <p>{`Почтовый индекс: ${address.postal_code}`}</p>
                      <p>{`Область: ${address.state}`}</p>
                      <p>{`Основной адрес: ${address.is_primary ? "Да" : "Нет"}`}</p>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <div>
                <p>Адресов нет</p>
                <button
                  className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300 w-full"
                  onClick={() => setClick(true)}
                >
                  Добавить новый адрес
                </button>
              </div>
            )}
            <div className="flex flex-col justify-start text-left px-[100px] gap-[20px]">
              <p className="text-black uppercase">Итого</p>
              <p className="text-[20px] text-black uppercase">{totalCost()} руб.</p>
            </div>
            <button
              className="bg-gray-100 text-[#423C3D] px-6 py-2 hover:bg-gray-300 w-full mt-[40px]"
              onClick={handlePayment}
              disabled={!selectedAddress}
            >
              {orderId ? "Ожидание оплаты..." : "Оплатить заказ"}
            </button>
            {orderId && (
              <button className="bg-red-100 text-red-600 px-6 py-2 hover:bg-red-200 w-full" onClick={handleCancelOrder}>
                Отменить заказ
              </button>
            )}
          </div>
          {click && <Modal click={click} setClick={() => setClick(prev => !prev)} />}
        </div>
      )}
    </>
  );
};

export default PayCard;
