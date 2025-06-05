// import { useGetAddressesQuery } from "@/shared/api/AddressApi/AddressApi";
import {
  useAddAddressesMutation,
  useDeleteAddressesMutation,
  useGetAddressesQuery,
  useUpdateAddressesMutation,
} from "@/shared/api/AddressApi/AddressApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { z } from "zod";
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from "react-dadata";

interface IModal {
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IUpdModal {
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  item: {
    id: number;
    apartment: string | null; // Accepts null
    city: string;
    created_at?: string; // Optional
    house: string | null; // Accepts null
    is_primary: boolean; // Changed to boolean
    postal_code: string;
    state: string;
    street: string | null; // Accepts null
    updated_at?: string; // Optional
  };
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
  const [addAddresses, { isLoading: addAddressLoading }] = useAddAddressesMutation();
  const {
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useForm<AddressFormData>({
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
      setClick(false);
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

  return (
    <>
      {click ? (
        <div className="z-50 bg-black/50 w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
          <div className="w-[500px] transform bg-white p-6 py-8 rounded-[5px]">
            <button onClick={() => setClick(false)}>
              <RxCross2 className="absolute top-0 right-0 cursor-pointer m-3" size={30} />
            </button>
            <div className="space-y-6">
              <AddressSuggestions
                token="3aa9b0c3d53a9f40a2955b76f7048baadc22c47a"
                value={addressData}
                onChange={value => {
                  setAddressData(value);
                  clearErrors();
                }}
                inputProps={{ placeholder: "Начните вводить адрес.." }}
                renderOption={(suggestion, query) => {
                  if (!query) return suggestion.value; // если нет запроса, показываем обычное значение

                  const highlightMatch = (text: string) => {
                    const regex = new RegExp(`(${query})`, "gi");
                    return text.split(regex).map((part, index) =>
                      regex.test(part) ? (
                        <span key={index} className="bg-yellow-200">
                          {part}
                        </span>
                      ) : (
                        part
                      ),
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
      ) : (
        ""
      )}
    </>
  );
};

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

const UpdateModal = ({ click, setClick, item }: IUpdModal) => {
  const [updateAddresses] = useUpdateAddressesMutation();

  const getDefaultValues = (item: AddressItem) => ({
    id: item.id,
    state: item.state || "",
    city: item.city || "",
    street: item.street || "", // Handles null/undefined
    house: item.house || "", // Handles null/undefined
    postal_code: item.postal_code || "",
    apartment: item.apartment || "", // Handles null/undefined
    created_at: item.created_at || "", // Provides default
    is_primary: item.is_primary || false, // Uses boolean
    updated_at: item.updated_at || "", // Provides default
  });

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(item),
  });

  useEffect(() => {
    if (item) {
      form.reset(getDefaultValues(item));
    }
  }, [item, form]);

  const handleChange = async (values: FormFields) => {
    try {
      const requestBody = {
        id: item.id,
        is_primary: false,
        state: values.state,
        city: values.city,
        street: values.street,
        house: values.house,
        postal_code: values.postal_code,
        apartment: values.apartment,
      };
      const result = await updateAddresses(requestBody).unwrap();
      console.log("result: " + result);
      setClick(false);
      toast.info(`Адрес изменен`, {
        position: "top-left",
      });
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
      ) : null}
    </>
  );
};

// interface Pivot {
//   user_id: number;
//   address_id: number;
//   created_at: string;
//   updated_at: string;
// }

interface AddressItem {
  id: number;
  apartment: string | null; // Accepts null
  city: string;
  created_at?: string; // Optional
  house: string | null; // Accepts null
  is_primary: boolean; // Changed to boolean
  postal_code: string;
  state: string;
  street: string | null; // Accepts null
  updated_at?: string;
}

const Address = () => {
  const { data, isSuccess } = useGetAddressesQuery();

  const [click, setClick] = useState(false);
  // const [click2, setClick2] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteAddresses] = useDeleteAddressesMutation();

  const handleDelete = (id: number) => {
    deleteAddresses({ id: id });
    toast.error(`Адрес удален `, {
      position: "top-left",
    });
  };

  return (
    <div className="mt-[100px] max-w-[700px] h-[350px] w-full flex flex-col gap-[50px] overflow-x-auto">
      {isSuccess ? (
        data.map(item => (
          <div key={item.id} className="flex max-w-[800px] w-full">
            {/* <h3>Адрес #{item.id}</h3> */}
            <div className="address-details max-w-[500px] w-full">
              {item.state && <p>Штат: {item.state}</p>}
              {item.city && <p>Город: {item.city}</p>}
              {(item.street || item.house) && (
                <p>
                  Улица: {item.street} {item.house}
                  {item.apartment && `, кв. ${item.apartment}`}
                </p>
              )}
              {item.postal_code && <p>Почтовый индекс: {item.postal_code}</p>}
              <div className="meta-info">
                {/* <small>Создан: {new Date(item.created_at).toLocaleDateString()}</small>
                <small>Обновлён: {new Date(item.updated_at).toLocaleDateString()}</small> */}
              </div>
            </div>
            <div className="flex gap-[20px]">
              <button onClick={() => setEditingId(item.id)}>
                <GoPencil size={20} className="cursor-pointer" />
              </button>

              {editingId === item.id ? (
                <UpdateModal click={true} setClick={() => setEditingId(null)} item={item} />
              ) : (
                ""
              )}
              <button onClick={() => handleDelete(item.id)}>
                <FaRegTrashCan size={20} className="cursor-pointer" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Сохранненых адресов нет</p>
      )}
      <button className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300 w-full" onClick={() => setClick(true)}>
        Добавить новый адрес
      </button>

      {click ? <Modal click={click} setClick={() => setClick(prev => !prev)} /> : ""}
    </div>
  );
};

export default Address;
