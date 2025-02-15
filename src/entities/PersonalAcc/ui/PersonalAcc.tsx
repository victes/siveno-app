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
  })
  .refine(data => data.password === data.confirmPassword, {
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
      email: data?.email || "",
      password: "",
      confirmPassword: "",
      firstName: data?.name || "",
      lastName: data?.surname || "",
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      form.reset({
        email: data.email,
        firstName: data.name,
        lastName: data.surname,
      });
    }
  }, [isSuccess, data, form]);

  const handleChange = async (values: FormFields) => {
    try {
      const requestBody = {
        id: isSuccess ? data.id : "",
        name: values.firstName,
        surname: values.lastName,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword,
      };
      const result = await changeProfile(requestBody).unwrap();
      console.log("result: " + result);
    } catch (err) {
      console.error("Registration failed:", err);
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
        <p className="text-[13px]">* Максимум 5мб</p>
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
            <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
              <input type="text" className="grow" placeholder="Имя" {...form.register("firstName")} />
            </label>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
              <input type="text" className="grow" placeholder="Фамилия" {...form.register("lastName")} />
            </label>
          </div>
        </div>
        <div className="flex gap-[40px] max-minilaptop:flex-col">
          <div className="flex flex-col space-y-2 w-full">
            <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
              <input type="text" className="grow" placeholder="Дата рождения" />
            </label>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
              <input type="text" className="grow" placeholder="Номер телефона" />
            </label>
          </div>
        </div>
        <div className="flex flex-col space-y-2 w-full">
          <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
            <input type="text" className="grow" placeholder="Почта" {...form.register("email")} />
          </label>
        </div>
        <div className="flex gap-[40px] max-minilaptop:flex-col">
          <div className="flex flex-col space-y-2 w-full">
            <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
              <input type="password" className="grow" placeholder="Пароль" {...form.register("password")} />
            </label>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
              <input
                type="password"
                className="grow"
                placeholder="Подтверждение пароля"
                {...form.register("confirmPassword")}
              />
            </label>
          </div>
        </div>
        <button className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300 w-full">Сохранить изменения</button>
      </form>
    </div>
  );
};

export default PersonalAcc;
