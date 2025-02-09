import React, { useEffect, useRef, useState } from "react";
import { IPayCard } from "../types/type";
import { RxCross2 } from "react-icons/rx";
import { useProductStore } from "@/entities/productStore/store";
import { useAddAddressesMutation, useGetAddressesQuery } from "@/shared/api/AddressApi/AddressApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
      {" "}
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

// interface Pivot {
//   user_id: number;
//   address_id: number;
//   created_at: string;
//   updated_at: string;
// }

// interface AddressItem {
//   id: number;
//   apartment: string | null;
//   city: string;
//   created_at: string;
//   house: string | null;
//   is_primary: 0 | 1;
//   pivot: Pivot;
//   postal_code: string;
//   state: string;
//   street: string | null;
//   updated_at: string;
// }

const PayCard = ({ onOpen, open }: IPayCard) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const { products, totalCost } = useProductStore();
  const { data, isSuccess } = useGetAddressesQuery();
  const { click, setClick } = useState(false);
  // const [selected, setSelected] = useState<string>("");

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setAnimate(false);
      setTimeout(() => onOpen(false), 300); // Задержка для завершения анимации
    }
  };

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => onOpen(false), 300);
  };

  useEffect(() => {
    if (open) {
      setAnimate(true); // Запуск анимации при открытии
    }
  }, [open]);

  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  const handleAddressChange = (id: number) => {
    setSelectedAddress(id);
  };

  return (
    <>
      {open ? (
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
            {/* <div className="flex justify-center gap-[50px] max-mindesk:flex-col">
              <div className="mt-[0px] flex flex-col gap-[50px] max-w-[600px] w-full max-laptop:mt-[10px]">
                <div className="flex gap-[40px] max-minilaptop:flex-col">
                  <div className="flex flex-col space-y-2 w-full">
                    <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                      <input type="text" className="grow" placeholder="Имя" />
                    </label>
                  </div>
                  <div className="flex flex-col space-y-2 w-full">
                    <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                      <input type="text" className="grow" placeholder="Номер телефона" />
                    </label>
                  </div>
                </div>
                <div className="flex gap-[40px] max-minilaptop:flex-col">
                  <div className="flex flex-col space-y-2 w-full">
                    <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                      <input type="text" className="grow" placeholder="Фамилия" />
                    </label>
                  </div>
                  <div className="flex flex-col space-y-2 w-full">
                    <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                      <input type="text" className="grow" placeholder="Промокод" />
                    </label>
                  </div>
                </div>
                <div className="flex gap-[40px] max-minilaptop:flex-col">
                  <div className="flex flex-col space-y-2 w-full">
                    <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                      <input type="text" className="grow" placeholder="Почта" />
                    </label>
                  </div>
                  <div className="flex flex-col space-y-2 w-full">
                    <button className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300 w-full">
                      Подписаться на рассылку
                    </button>
                  </div>
                </div>
                <div className="flex gap-[40px] max-minilaptop:flex-col">
                  <div className="flex flex-col space-y-2 w-full">
                    <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                      <input className="grow" placeholder="Страна" />
                    </label>
                  </div>
                  <div className="flex flex-col space-y-2 w-full">
                    <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                      <input className="grow" placeholder="Почтовой индекс" />
                    </label>
                  </div>
                </div>
                <div className="flex gap-[40px] max-minilaptop:flex-col">
                  <div className="flex flex-col space-y-2 w-full">
                    <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
                      <input className="grow" placeholder="Город" />
                    </label>
                  </div>
                </div>
              </div>
            </div> */}
            <p className="text-black uppercase">Адреса</p>
            {isSuccess ? (
              <div className="flex flex-col justify-center items-center gap-[30px] mt-[30px] w-full">
                {data.map(address => (
                  <label key={address.id} className="flex justify-center gap-[20px] w-full">
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={() => handleAddressChange(address.id)}
                      className="w-[20px] h-[20px]"
                    />
                    <div className="w-full flex">
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
                  {" "}
                  Добавить новый адрес{" "}
                </button>
              </div>
            )}
            <div className="flex flex-col justify-start text-left px-[100px] gap-[20px]">
              <p className=" text-black uppercase">Итого</p>
              <p className="text-[20px] text-black uppercase">{totalCost()} руб.</p>
            </div>
            <button className="bg-gray-100 text-[#423C3D] px-6 py-2 hover:bg-gray-300 w-full mt-[40px]">
              Оплатить заказ
            </button>
          </div>
          {click ? <Modal click={click} setClick={() => setClick(prev => !prev)} /> : ""}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PayCard;
