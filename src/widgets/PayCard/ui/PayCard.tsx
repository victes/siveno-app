import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { IPayCard } from "../types/type";
import { RxCross2 } from "react-icons/rx";
import { useProductStore } from "@/entities/productStore/store";
import { useAddAddressesMutation, useGetAddressesQuery } from "@/shared/api/AddressApi/AddressApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useCancelOrderMutation,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  usePayOrderMutation,
} from "@/shared/api/OrdersApi/OrdersApi";
import { useAuth } from "@/shared/hook/AuthContext/ui/AuthContext";
import { useRouter } from "next/navigation";
import { useCalculateRussianPostMutation } from "@/shared/api/CalculateApi/CalculateApi";

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
    message: "Дом обязательно для заполнения",
  }),
  postal_code: z.string().nonempty({
    message: "Почтовый индекс обязательна для заполнения",
  }),
  apartment: z.string().nonempty({
    message: "Апартаменты обязательное поле",
  }),
});

type FormFields = z.infer<typeof formSchema>;

interface IModal {
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

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
      apartment: "",
    },
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setAnimate(false);
      setTimeout(() => setClick(false), 300);
    }
  };

  const handleClose = useCallback(() => {
    setAnimate(false);
    setTimeout(() => setClick(false), 300);
  }, [setClick]);

  useEffect(() => {
    if (click) {
      setAnimate(true);
    }
  }, [click]);

  const handleSubmit = async (values: FormFields) => {
    try {
      const requestBody = {
        is_primary: false,
        ...values,
      };
      await addAddresses(requestBody).unwrap();
      form.reset();
      handleClose();
    } catch (err) {
      console.error("Ошибка добавления адреса:", err);
    }
  };

  return (
    <div
      className="fixed w-screen h-screen bg-black bg-opacity-20 top-0 left-0 flex justify-end z-[70]"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className={`bg-white p-6 relative rounded-lg shadow-lg transform max-w-[800px] w-full h-full overflow-y-auto ${
          animate ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Добавить новый адрес</h2>
          <button onClick={handleClose}>
            <RxCross2 className="text-gray-600 hover:text-gray-800" size={24} />
          </button>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
          <div className="space-y-4">
            {Object.entries(form.formState.errors).map(([field, error]) => (
              <p key={field} className="text-red-500 text-sm">
                {error.message}
              </p>
            ))}
          </div>

          <div className="space-y-6">
            <InputField label="Государство" {...form.register("state")} error={form.formState.errors.state} />
            <InputField label="Город" {...form.register("city")} error={form.formState.errors.city} />
            <InputField label="Улица" {...form.register("street")} error={form.formState.errors.street} />
            <InputField label="Дом" {...form.register("house")} error={form.formState.errors.house} />
            <InputField
              label="Почтовый индекс"
              {...form.register("postal_code")}
              error={form.formState.errors.postal_code}
            />
            <InputField label="Квартира" {...form.register("apartment")} error={form.formState.errors.apartment} />
          </div>

          <button
            type="submit"
            className="mt-8 bg-gray-100 text-[#423C3D] px-6 py-3 hover:bg-gray-200 transition-colors w-full"
          >
            Сохранить адрес
          </button>
        </form>
      </div>
    </div>
  );
};

interface IInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}
const InputField: React.FC<IInputFieldProps> = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
      <input {...props} type="text" className="grow" placeholder={label} />
    </label>
    {/* <label className="text-sm text-gray-600">{label}</label>
    <input
      {...props}
      className={`p-2 border-b ${error ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-black`}
    /> */}
    {error && <span className="text-red-500 text-sm">{error.message}</span>}
  </div>
);

const PayCard = ({ onOpen, open }: IPayCard) => {
  const [delivery, setDelivery] = useState<number>(1);
  const [typePayment, setTypePayment] = useState<string>('bank_card');
  const [discount, setDiscount] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const { products, totalCost, clearProducts } = useProductStore();
  const { data: addresses, isSuccess } = useGetAddressesQuery();
  const [click, setClick] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const { token } = useAuth();
  const router = useRouter();
  const [sdek, setSdek] = useState<number>(0);
  const [mail, setMail] = useState<number>(0);
  const [createOrder] = useCreateOrderMutation();
  const [payOrder] = usePayOrderMutation();
  const [postCalc] = useCalculateRussianPostMutation();
  const [cancelOrder] = useCancelOrderMutation();
  const { data: orderData } = useGetOrderByIdQuery(orderId!, {
    skip: !orderId,
  });

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setAnimate(false);
      setTimeout(() => onOpen(false), 300);
    }
  };

  const handleDiscount = (value: string) => {
    if(value === "SIVENO10"){
      setDiscount(true)
    }
  }

  const handleClose = useCallback(() => {
    setAnimate(false);
    setTimeout(() => onOpen(false), 300);
  }, [onOpen]);

  useEffect(() => {
    if (open) {
      setAnimate(true);
    }
  }, [open]);

  const handlePayment = async () => {
    if (!token) {
      // Если пользователь не авторизован, перенаправляем на страницу входа
      alert("Для оформления заказа необходимо войти в аккаунт");
      handleClose();
      router.push("/login");
      return;
    }

    if (!selectedAddress) {
      alert("Выберите адрес доставки");
      return;
    }

    const orderResponse = await createOrder({
      address_id: selectedAddress,
      items: products.map(p => ({
        product_id: Number(p.id),
        size_id: 1,
        quantity: 1,
      })),
      delivery: "express",
      delivery_type: "russianpost",
      use_loyalty_points: false,
      payment_method: "yookassa",
      promo_code: discount ? "SIVENO10" : "",
    }).unwrap().then(async (data) => {
      console.log(data.order.total_price, typePayment)
      await payOrder({
        amount: data.order.total_price,
        payment_method: typePayment,
        use_loyalty_points: false
      }).unwrap();
    });
    

    // const paymentResponse = await payOrder().unwrap();

    // window.location.href = paymentResponse.payment_url;

    // if (data && typeof error.data === "string" && error.data.startsWith("<!DOCTYPE html>")) {
    //   alert("Произошла ошибка на сервере. Попробуйте позже.");
    // } else {
    //   alert("Произошла ошибка при оформлении заказа");
    // }
  };

  const fullPrice = () => {
    let fullprice: number = totalCost()
    if (discount) {
      fullprice = totalCost()*90/100
    }
    return fullprice
  }

  const m = async () => {
    try {
      const n = await postCalc({
        from_postcode: "101000",
        to_postcode: "190000",
        weight: 1.5,
        length: 30,
        width: 20,
        height: 10,
      }).unwrap();
      console.log(n);
    } catch (e) {
      console.log("error", e);
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
      clearProducts();
      alert("Заказ успешно оплачен!");
      handleClose();
    }
  }, [orderData, clearProducts, handleClose]);

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
            <div className="flex justify-between items-center">
              <h2 className="text-black text-[32px]">Оформление заказа</h2>
              <RxCross2 className="cursor-pointer" size={30} onClick={() => handleClose()} />
            </div>

            {!token ? (
              <div className="flex flex-col gap-4 items-center justify-center py-8">
                <p className="text-lg text-center">Для оформления заказа необходимо войти в аккаунт</p>
                <button
                  className="bg-gray-100 text-[#423C3D] px-6 py-3 hover:bg-gray-300 w-full max-w-md"
                  onClick={() => {
                    handleClose();
                    router.push("/login");
                  }}
                >
                  Войти или зарегистрироваться
                </button>
              </div>
            ) : (
              <>
                <p className="uppercase text-[24px] text-black">Адреса</p>
                {isSuccess && addresses.length > 0 ? (
                  <div className="flex flex-col justify-center items-center gap-[30px] mt-[0px] w-full">
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
                <div>
                  <h2 className="uppercase text-[24px] text-black mb-[15px]">Доставка</h2>
                  {/* <label className="flex flex-row items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      value={1}
                      checked={1 === delivery}
                      onChange={() => setDelivery(1)}
                      className="w-[15px] h-[15px]"
                    />
                    <p>Доставка по SDEK</p>
                  </label> */}
                  <label className="flex flex-row items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      value={1}
                      checked={1 === delivery}
                      onChange={() => setDelivery(1)}
                      className="w-[15px] h-[15px]"
                    />
                    <p>Доставка по Почта России</p>
                  </label>
                </div>
                <div>
                  <h2 className="uppercase text-[24px] text-black mb-[15px]">Тип оплаты</h2>
                  <label className="flex flex-row items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value={"bank_card"}
                      checked={"bank_card" === typePayment}
                      onChange={() => setTypePayment("bank_card")}
                      className="w-[15px] h-[15px]"
                    />
                    <p>Банковская карта</p>
                  </label>
                  <label className="flex flex-row items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value={"sbp"}
                      checked={"sbp" === typePayment}
                      onChange={() => setTypePayment("sbp")}
                      className="w-[15px] h-[15px]"
                    />
                    <p>СБП</p>
                  </label>
                  <label className="flex flex-row items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value={"installments"}
                      checked={"installments" === typePayment}
                      onChange={() =>setTypePayment("installments")}
                      className="w-[15px] h-[15px]"
                    />
                    <p>Рассрочка</p>
                  </label>
                </div>
                <div>
                  <h2 className="uppercase text-[24px] text-black mb-[15px]">Промокод</h2>
                  <input type="text" placeholder='Введите промокод' className='bg-white border-2 w-full h-[50px] px-3 text-[18px] outline-none' name='promo' onChange={(e) => handleDiscount(e.target.value)} defaultValue={discount ? "SIVENO10" : ''} />
                </div>
                <div>
                  <h2 className="uppercase text-[24px] text-black mb-[15px]">Ваш заказ</h2>
                  <p>Товаров на - {totalCost()} ₽</p>
                  <p>Скидка - {discount ? "10" : "0"} %</p>
                  <p>Доставка - 0 ₽</p>
                  <p>Итого - {fullPrice()} ₽</p>
                </div>
                <button
                  className="bg-gray-100 text-[#423C3D] px-6 py-2 hover:bg-gray-300 w-full mt-[40px]"
                  onClick={handlePayment}
                >
                  {orderId ? "Ожидание оплаты..." : "Оплатить заказ"}
                </button>
              </>
            )}
          </div>
          {click && <Modal click={click} setClick={() => setClick(prev => !prev)} />}
        </div>
      )}
    </>
  );
};

export default PayCard;
