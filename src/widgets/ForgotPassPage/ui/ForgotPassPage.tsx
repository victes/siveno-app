"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "Почта введена неправильно",
  }),
});

type FormFields = z.infer<typeof formSchema>;

const ForgotPassPage = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: FormFields) {
    console.log("Восстановление пароля для:", values.email);
    // Здесь можно добавить вызов API для отправки email на сервер
  }

  return (
    <div className="space-y-4 min-w-[220px] lg:min-w-[450px] mt-4 my-10">
      <div className="w-full text-center">
        <h1 className="text-[20px] tablet:text-[30px]">Восстановление пароля</h1>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col mx-auto items-center gap-4 max-w-[600px]">
        {/* Email Field */}
        <div className="flex flex-col space-y-2 w-full">
          <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow" placeholder="Почта" {...form.register("email")} />
          </label>
          {form.formState.errors.email && (
            <span className="text-red-500 text-sm">{form.formState.errors.email.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col gap-5 mt-4 w-full">
          <button type="submit" className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300">
            Отправить ссылку для восстановления
          </button>
          <div className="flex justify-center">
            <button className="text-center flex gap-2">
              <span className="text-[14px]">Вспомнили пароль?</span>
              <Link href="/login" className="text-blue-300 text-[14px]">
                Войти
              </Link>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassPage;
