/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  useChangeAvatarMutation,
  useChangeProfileMutation,
  useGetProfileQuery,
} from "@/shared/api/ProfileApi/ProfileApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.string().email({
      message: "Почта введена неправильно",
    }),
    password: z.string().min(8, {
      message: "Пароль должен содержать не менее 8 символов",
    }),
    confirmPassword: z.string().min(8, {
      message: "Подтверждение пароля должно содержать не менее 8 символов",
    }),
    firstName: z.string().nonempty({
      message: "Имя обязательно для заполнения",
    }),
    lastName: z.string().nonempty({
      message: "Фамилия обязательна для заполнения",
    }),
    phone: z.string().min(10, {
      message: "Телефон обязателен для заполнения",
    }).refine((val) => {
      // Удаляем все нецифровые символы и проверяем длину
      const digitsOnly = val.replace(/\D/g, '');
      return digitsOnly.length === 11 && digitsOnly.startsWith('7');
    }, {
      message: "Введите корректный номер телефона",
    }),
    birthDate: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof formSchema>;

const PersonalAcc = () => {
  const { data, isLoading, isSuccess } = useGetProfileQuery({});
  const [changeProfile] = useChangeProfileMutation();
  const [changeAvatar] = useChangeAvatarMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      birthDate: "",
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      form.reset({
        email: data.email || "",
        firstName: data.name || "",
        lastName: data.surname || "",
        phone: data.phone || "",
        birthDate: formatDateForInput(data.birth_date),
        password: "",
        confirmPassword: "",
      });
    }
  }, [isSuccess, data, form]);

  // Форматирование телефонного номера при вводе
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Оставляем только цифры
    
    if (value.length > 0 && value[0] !== '7') {
      if (value[0] === '8') {
        value = '7' + value.substring(1);
      } else {
        value = '7' + value;
      }
    }
    
    // Ограничиваем длину до 11 цифр
    value = value.substring(0, 11);
    
    // Форматируем номер
    let formattedValue = '';
    if (value.length > 0) {
      formattedValue = '+' + value[0];
      if (value.length > 1) {
        formattedValue += ' (' + value.substring(1, 4);
      }
      if (value.length > 4) {
        formattedValue += ') ' + value.substring(4, 7);
      }
      if (value.length > 7) {
        formattedValue += '-' + value.substring(7, 9);
      }
      if (value.length > 9) {
        formattedValue += '-' + value.substring(9, 11);
      }
    }
    
    form.setValue('phone', formattedValue);
  };

  const handleChange = async (values: FormFields) => {
    try {
      const requestBody = {
        id: isSuccess ? data.id : "",
        name: values.firstName,
        surname: values.lastName,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword,
        phone: values.phone,
        birth_date: values.birthDate || null,
      };
      const result = await changeProfile(requestBody).unwrap();
      console.log("Profile updated:", result);
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const result = await changeAvatar(formData).unwrap();
        console.log("Avatar changed:", result);
      } catch (err) {
        console.error("Failed to change avatar:", err);
      }
    }
  };

  const handleAvatarButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Форматирование даты из ISO в формат для input type="date"
  const formatDateForInput = (isoDate: string | null | undefined): string => {
    if (!isoDate) return "";
    try {
      const date = new Date(isoDate);
      return date.toISOString().split('T')[0]; // Формат YYYY-MM-DD
    } catch (e) {
      return "";
    }
  };

  return (
    <div className="flex flex-row-reverse gap-[50px] max-mindesk:flex-col">
      <div className="flex flex-col gap-[20px] mr-auto max-w-[200px] w-full object-cover rounded-md max-mindesk:m-auto">
        <img
          src={isLoading ? "/images/Account/icon.png" : data?.avatar_url ? data.avatar_url : "/images/Account/icon.png"}
          className="object-cover max-w-[200px] min-h-[200px] w-full border-solid border-[1px] border-gray-400"
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleAvatarChange}
          accept="image/*"
        />
        <p className="text-[13px] text-black">* Максимум 5мб</p>
        <button
          type="button"
          className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300 w-full"
          onClick={handleAvatarButtonClick}
        >
          Изменить фото
        </button>
      </div>
      <form
        onSubmit={form.handleSubmit(handleChange)}
        className="mt-[0px] flex flex-col gap-[50px] max-w-[600px] w-full max-laptop:mt-[10px]"
      >
        <div className="flex gap-[40px] max-minilaptop:flex-col">
          <div className="flex flex-col space-y-2 w-full">
            <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
              <input type="text" className="grow" placeholder="Имя" {...form.register("firstName")} />
            </label>
            {form.formState.errors.firstName && (
              <p className="text-red-500 text-xs">{form.formState.errors.firstName.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
              <input type="text" className="grow" placeholder="Фамилия" {...form.register("lastName")} />
            </label>
            {form.formState.errors.lastName && (
              <p className="text-red-500 text-xs">{form.formState.errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className="flex gap-[40px] max-minilaptop:flex-col">
          <div className="flex flex-col space-y-2 w-full">
            <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
              <input 
                type="date" 
                className="grow outline-none bg-transparent" 
                placeholder="Дата рождения"
                {...form.register("birthDate")}
              />
            </label>
            {form.formState.errors.birthDate && (
              <p className="text-red-500 text-xs">{form.formState.errors.birthDate.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
              <input
                type="tel"
                className="grow outline-none bg-transparent"
                placeholder="Номер телефона"
                {...form.register("phone")}
                onChange={(e) => {
                  form.register("phone").onChange(e);
                  handlePhoneChange(e);
                }}
              />
            </label>
            {form.formState.errors.phone && (
              <p className="text-red-500 text-xs">{form.formState.errors.phone.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2 w-full">
          <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
            <input type="text" className="grow" placeholder="Почта" {...form.register("email")} />
          </label>
          {form.formState.errors.email && (
            <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div className="flex gap-[40px] max-minilaptop:flex-col">
          <div className="flex flex-col space-y-2 w-full">
            <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
              <input type="password" className="grow" placeholder="Пароль" {...form.register("password")} />
            </label>
            {form.formState.errors.password && (
              <p className="text-red-500 text-xs">{form.formState.errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
              <input
                type="password"
                className="grow"
                placeholder="Подтверждение пароля"
                {...form.register("confirmPassword")}
              />
            </label>
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500 text-xs">{form.formState.errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
        <div>
          <p className="text-[10px] text-black">* Все поля должны быть заполенены</p>
          <button className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300 w-full">Сохранить изменения</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalAcc;
