"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { IPayCard } from "../types/type";
import { RxCross2 } from "react-icons/rx";
import { useProductStore } from "@/entities/productStore/store";
import { useAddAddressesMutation, useGetAddressesQuery } from "@/shared/api/AddressApi/AddressApi";
import {
  useCancelOrderMutation,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  usePayOrderMutation,
} from "@/shared/api/OrdersApi/OrdersApi";
import { useAuth } from "@/shared/hook/AuthContext/ui/AuthContext";
import { useRouter } from "next/navigation";
import { useCalculateRussianPostMutation, useCalculateCdekMutation } from "@/shared/api/CalculateApi/CalculateApi";
import { useGetPromoQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";
import 'react-dadata/dist/react-dadata.css';
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from "react-dadata";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IModal {
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const addressSchema = z.object({
  state: z.string().min(1, "Область обязательна"),
  city: z.string().min(1, "Город обязателен"),
  street: z.string().min(1, "Улица обязательна"),
  house: z.string().min(1, "Дом обязателен"),
  postal_code: z.string().min(1, "Индекс обязателен"),
  apartment: z.string().min(1, "Квартира обязательна"),
});

type AddressFormData = z.infer<typeof addressSchema>;

const Modal = ({ click, setClick }: IModal) => {
  const [addAddresses, {isLoading: addAddressLoading} ] = useAddAddressesMutation();
  const {handleSubmit, formState: { errors }, setError, clearErrors, setValue} = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = async () => {
    if (!addressData?.data) {
      setError("state", {
        type: "manual",
        message: "Выберите адрес из подсказки",
      });
      return;
    }

    const data = addressData.data;

    const mapped: AddressFormData = {
      state: data.region ?? "",
      city: data.city ?? "",
      street: data.street ?? "",
      house: data.house ?? "",
      postal_code: data.postal_code ?? "",
      apartment: data.flat ?? "",
    };

    try {
      await addAddresses({ ...mapped, is_primary: false }).unwrap();
      handleClose();
    } catch (err: any) {
      if (err?.errors) {
        err.errors.forEach((error: any) => {
          setError(error.path[0], {
            type: "manual",
            message: error.message,
          });
        });
      } else {
        console.error("Ошибка добавления адреса:", err);
      }
    }
  };

  const [addressData, setAddressData] = useState<DaDataSuggestion<DaDataAddress> | undefined>();

  useEffect(() => {
    if (!addressData?.data) {
      setValue("state", "");
      setValue("city", "");
      setValue("street", "");
      setValue("house", "");
      setValue("postal_code", "");
      setValue("apartment", "");
      return;
    }

    const data = addressData.data;

    setValue("state", data.region_with_type ?? "");
    setValue("city", data.city_with_type ?? "");
    setValue("street", data.street_with_type ?? "");
    setValue("house", data.house ?? "");
    setValue("postal_code", data.postal_code ?? "");
    setValue("apartment", data.flat ?? "");
  }, [addressData, setValue]);

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

        <div className="flex flex-col gap-6">
          <div className="space-y-6">
            <AddressSuggestions
              token="3aa9b0c3d53a9f40a2955b76f7048baadc22c47a"
              value={addressData}
              onChange={value => {
                setAddressData(value);
                clearErrors();
              }}
              renderOption={(suggestion, query) => {
                if (!query) return suggestion.value; // если нет запроса, показываем обычное значение

                const highlightMatch = (text: string) => {
                  const regex = new RegExp(`(${query})`, 'gi');
                  return text.split(regex).map((part, index) =>
                    regex.test(part) ? (
                      <span key={index} className="bg-yellow-200">{part}</span>
                    ) : part
                  );
                };

                return (
                  <div>
                    {suggestion.data.postal_code && (
                      <span className="text-sm text-gray-500">({suggestion.data.postal_code}) </span>
                    )}
                    {highlightMatch(suggestion.value)}

                  </div>
                );
              }}
              inputProps={{placeholder: "Начните вводить адрес..", }}
            />
          </div>

          <div className="text-red-500 text-sm space-y-1">
            {Object.entries(errors).map(([field, error]) => (
              <p key={field}>{error?.message}</p>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={addAddressLoading}
            className="mt-4 bg-gray-100 text-[#423C3D] px-6 py-3 hover:bg-gray-200 transition-colors w-full"
          >
            Сохранить адрес
          </button>
        </div>
      </div>
    </div>
  );
};

const PayCard = ({ onOpen, open }: IPayCard) => {
  const [delivery, setDelivery] = useState<string>("");
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [typePayment, setTypePayment] = useState<string>("bank_card");
  const { data: promos } = useGetPromoQuery();
  const [discount, setDiscount] = useState<number>(0);
  const [discountName, setDiscountName] = useState<string>("");
  const [promo, setPromo] = useState<string>("");
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const { products, totalCost, clearProducts, totalQuantity } = useProductStore();
  const { data: addresses, isSuccess } = useGetAddressesQuery();
  const [click, setClick] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(addresses?.length ? addresses[0]?.id : null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const { token } = useAuth();
  const router = useRouter();
  const [createOrder, {isLoading: isCreating}] = useCreateOrderMutation();
  const [payOrder, {isLoading: isPaying}] = usePayOrderMutation();
  const [postCalc] = useCalculateRussianPostMutation();
  const [cdekCalc] = useCalculateCdekMutation();
  const [cancelOrder] = useCancelOrderMutation();
  const { data: orderData } = useGetOrderByIdQuery(orderId!, {
    skip: !orderId,
  });
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setAnimate(false);
      setTimeout(() => onOpen(false), 300);
      setDisableBtn(false)
    }
  };

  const handleDiscount = (value: string) => {
    if (promos) {

      setDiscountName("");
      setDiscount(0);
      setDisableBtn(true);

      const foundPromo = promos.find(promo => promo.code === value);

      if (foundPromo) {
        setDiscount(foundPromo.discount);
        setDiscountName(foundPromo.code);
        setDisableBtn(false);
      }
    }
  };

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

    if (!delivery) {
      alert("Выберите способ доставки");
      return;
    }

    if (delivery !== 'pickup' && !selectedAddress) {
      alert("Выберите адрес доставки");
      return;
    }

    await createOrder({
      address_id: selectedAddress,
      items: products.map(p => ({
        product_id: Number(p?.id),
        size_id: p?.selectedSizeId,
        quantity: 1,
      })),
      delivery: "express",
      delivery_type: delivery,
      use_loyalty_points: false,
      payment_method: "yookassa",
      promo_code: discountName,
    })
      .unwrap()
      .then(async data => {
        const paymentResponse = await payOrder({
          amount: data.order.total_price,
          order_id: data.order?.id,
          payment_method: typePayment,
          use_loyalty_points: false,
        }).unwrap();
        localStorage.setItem("orderId", paymentResponse.payment_url.slice(58));
        window.location.href = paymentResponse.payment_url;
      })
      .catch(e => {
        if (e.data.message === "Промокод уже использован максимальное количество раз") alert(e.data.message);
        else console.log(e);
      });
  };

  const fullPrice = () => {
    let fullprice: number = totalCost();
    if (discount) {
      fullprice = Math.round((fullprice * (100 - discount)) / 100);
    }
    if (deliveryPrice) {
      fullprice += deliveryPrice;
    }
    return fullprice;
  };

  const delivery_price = async (delivery_type: string) => {
    if (delivery_type === "pickup") {
      setDeliveryPrice(0);
      setDelivery("pickup");
      setSelectedAddress(null);
      setDeliveryDate("");
      return;
    }

    if (!selectedAddress) {
      alert("Выберите адрес доставки");
      return;
    }

    if (addresses) {
      for (const address of addresses) {
        if (address?.id === selectedAddress) {
          try {
            if (delivery_type === "russianpost") {
              const postCalcData = await postCalc({
                to_postcode: address.postal_code,
                weight: 0.4 * totalQuantity(),
                length: 0.4 * totalQuantity(),
                width: 0.3 * totalQuantity(),
                height: 0.05 * totalQuantity(),
              }).unwrap();

              const property = "total-rate";
              console.log(postCalcData);
              setDeliveryPrice(postCalcData[property] / 100);
              setDeliveryDate(postCalcData['delivery-time']['min-days'] + '-' + postCalcData['delivery-time']['max-days'] + ' дня')
              setDelivery("russianpost");
            } else if (delivery_type == "cdek" || delivery_type == "cdek_pickup") {
              const { data } = await cdekCalc({
                weight: 0.4 * totalQuantity(),
                length: 40 * totalQuantity(),
                width: 30 * totalQuantity(),
                height: 5 * totalQuantity(),
                receiverPostalCode: address.postal_code,
                receiverCountryCode: "RU",
                receiverCity: address.city,
                receiverAddress: address.street,
                receiverContragentType: "recipient",
                deliveryType: delivery_type,
              });
              console.log(data);
              setDeliveryPrice(data?.tariff_codes?.[0]?.delivery_sum ?? 0);
              setDeliveryDate(data?.tariff_codes?.[0].period_min + '-' + data?.tariff_codes?.[0].period_max + ' дня')
              setDelivery(delivery_type);
            }
          } catch (error) {
            console.error("Ошибка при расчёте стоимости доставки:", error);
          }

          break; // адрес найден — прерываем цикл
        }
      }
    }
  };

  const handleChange = (e: string) => {
    setPromo(e)
    setDisableBtn(false)
  }

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
                      <label key={address?.id} className="flex justify-center gap-[20px] w-full">
                        <input
                          type="radio"
                          name="address"
                          value={address?.id}
                          checked={selectedAddress === address?.id}
                          onChange={() => setSelectedAddress(address?.id)}
                          className="w-[20px] h-[20px]"
                        />
                        <div className="w-full flex flex-col">
                          <p>{`Город: ${address.city}`}</p>
                          <p>{`Улица: ${address.street || "Не указано"}`}</p>
                          <p>{`Дом: ${address.house || "Не указано"}`}</p>
                          <p>{`Квартира: ${address.apartment || "Не указано"}`}</p>
                          <p>{`Почтовый индекс: ${address.postal_code}`}</p>
                          <p>{`Область: ${address.state}`}</p>
                          {/*<p>{`Основной адрес: ${address.is_primary ? "Да" : "Нет"}`}</p>*/}
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
                  <label className="flex flex-row items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      value={"cdek"}
                      checked={"cdek" === delivery}
                      onChange={() => (delivery !== "cdek" ? delivery_price("cdek") : "")}
                      className="w-[15px] h-[15px]"
                    />
                    <p>Доставка по CDEK - До двери</p>
                  </label>
                  <label className="flex flex-row items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      value={"cdek_pickup"}
                      checked={"cdek_pickup" === delivery}
                      onChange={() => (delivery !== "cdek_pickup" ? delivery_price("cdek_pickup") : "")}
                      className="w-[15px] h-[15px]"
                    />
                    <p>Доставка по CDEK - ПВЗ</p>
                  </label>
                  <label className="flex flex-row items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      value={"russianpost"}
                      checked={"russianpost" === delivery}
                      onChange={() => (delivery !== "russianpost" ? delivery_price("russianpost") : "")}
                      className="w-[15px] h-[15px]"
                    />
                    <p>Доставка по Почта России</p>
                  </label>
                  <label className="flex flex-row items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      value={"pickup"}
                      checked={"pickup" === delivery}
                      onChange={() => (delivery !== "pickup" ? delivery_price("pickup") : "")}
                      className="w-[15px] h-[15px]"
                    />
                    <p>Самовывоз (г. Новосибирск, ул Крылова, 3)</p>
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
                </div>
                <div>
                  <h2 className="uppercase text-[24px] text-black mb-[15px]">Промокод</h2>
                  {disableBtn && <span className="text-red-500 text-sm">Промокод не найден</span>}
                  <div className='relative'>
                  <input
                    type="text"
                    placeholder="Введите промокод"
                    className="bg-white border-2 w-full h-[50px] px-3 text-[18px] outline-none"
                    name="promo"
                    onChange={e => handleChange(e.target.value)}
                  />
                    <button
                        disabled={disableBtn}
                        className={`bg-gray-100 ${disableBtn ? "text-[#999]" :'text-[#423C3D]'}  ${!disableBtn && 'hover:bg-gray-300'} py-2.5 px-2 rounded-[8px] absolute top-[50%] translate-y-[-50%] right-[3px]`}
                        onClick={() => handleDiscount(promo)}
                    >
                     Применить
                    </button>
                  </div>
                </div>
                <div>
                  <h2 className="uppercase text-[24px] text-black mb-[15px]">Ваш заказ</h2>
                  <p>Товаров на - {totalCost()} ₽</p>
                  <p>Скидка - {discount} %</p>
                  <p>Доставка {deliveryDate && ('(' + deliveryDate + ')')}- {deliveryPrice} ₽</p>
                  <p>Итого - {fullPrice()} ₽</p>
                </div>
                <button
                  className="bg-gray-100 text-[#423C3D] px-6 py-2 hover:bg-gray-300 w-full mt-[40px]"
                  onClick={handlePayment}
                  disabled={isCreating || isPaying}
                >
                  {isCreating || isPaying ? "Ожидание..." : "Оплатить заказ"}
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
