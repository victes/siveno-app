"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRegisterUserMutation } from "@/shared/api/RegApi/RegApi";
import { useRouter } from "next/navigation";

let emailError = "";
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
    agreeToPolicy: z.boolean().refine(value => value === true, {
      message: "Вы должны подтвердить согласие с политикой конфиденциальности",
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const [registerUser] = useRegisterUserMutation();
  const { push } = useRouter();
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      agreeToPolicy: false,
    },
  });

  async function onSubmit(values: FormFields) {
    try {
      const requestBody = {
        name: values.firstName,
        surname: values.lastName,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword,
      };

      const result = await registerUser(requestBody).unwrap();
      console.log("Registration successful:", result);

      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", result.access_token);
      }

      push("/");
    } catch (err) {
      const errorData = err as { data?: { errors?: { email?: string[] } } };
      emailError = errorData?.data?.errors?.email?.[0] || "Регистрация не удалась";
      console.error("Registration failed:", err);
    }
  }

  return (
    <div className="space-y-4 min-w-[220px] lg:min-w-[450px] mt-4 my-10">
      <div className="w-full text-center">
        <h1 className="text-[20px] tablet:text-[30px]">Регистрация</h1>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col mx-auto items-center gap-4 max-w-[600px]">
        {/* Email Field */}
        <div className="flex flex-col space-y-2 w-full">
          <label className="input bg-transparent border-b border-[#423C3D]  border-x-0 border-t-0 rounded-none flex items-center gap-2">
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

        {/* First Name Field */}
        <div className="flex flex-col space-y-2 w-full">
          <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>

            <input type="text" className="grow" placeholder="Имя" {...form.register("firstName")} />
          </label>
          {form.formState.errors.firstName && (
            <span className="text-red-500 text-sm">{form.formState.errors.firstName.message}</span>
          )}
        </div>

        {/* Last Name Field */}
        <div className="flex flex-col space-y-2 w-full">
          <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder="Фамилия" {...form.register("lastName")} />
          </label>
          {form.formState.errors.lastName && (
            <span className="text-red-500 text-sm">{form.formState.errors.lastName.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col space-y-2 w-full">
          <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow bg-transparent focus:outline-none"
              placeholder="Пароль"
              {...form.register("password")}
            />
          </label>
          {form.formState.errors.password && (
            <span className="text-red-500 text-sm">{form.formState.errors.password.message}</span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col space-y-2 w-full">
          <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Подтверждение пароля"
              {...form.register("confirmPassword")}
            />
          </label>
          {form.formState.errors.confirmPassword && (
            <span className="text-red-500 text-sm">{form.formState.errors.confirmPassword.message}</span>
          )}
        </div>

        {/* Agree to Policy Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="agreeToPolicy"
            defaultChecked
            className="checkbox checkbox-sm rounded-none"
            {...form.register("agreeToPolicy")}
          />
          <label htmlFor="agreeToPolicy" className="text-xs">
            Подтверждаю согласие с <Link href="/policy">Политикой конфиденциальности</Link>
          </label>
        </div>
        {form.formState.errors.agreeToPolicy && (
          <span className="text-red-500 text-sm">{form.formState.errors.agreeToPolicy.message}</span>
        )}
        <span className="text-red-500 text-sm">{emailError}</span>
        {/* Submit Button */}
        <div className="flex flex-col gap-5 mt-4 w-full">
          <button type="submit" className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300">
            Зарегистрироваться
          </button>
          <div className="flex justify-center">
            <button className="text-center flex gap-2">
              <span className="text-[14px]">Уже есть аккаунт?</span>
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

export default RegisterPage;
