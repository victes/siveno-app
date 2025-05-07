"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRegisterUserMutation } from "@/shared/api/RegApi/RegApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useLoginUserMutation } from "@/shared/api/LoginApi/LoginApi";
import { useAuth } from "@/shared/hook/AuthContext/ui/AuthContext";

const formSchema = z
  .object({
    email: z.string().email({
      message: "Почта введена неправильно",
    }),
    phone: z.string().min(10, {
      message: "Телефон обязателен для заполнения",
    }).refine((val) => {
      const digitsOnly = val.replace(/\D/g, '');
      return digitsOnly.length === 11 && digitsOnly.startsWith('7');
    }, {
      message: "Введите корректный номер телефона",
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

const formSchemaLogin = z.object({
  email: z.string().email({
    message: "Почта введена не правильно",
  }),
  password: z.string().min(8, {
    message: "Пароль должен содержать не менее 8 символов",
  }),
});

type FormFields = z.infer<typeof formSchema>;
type FormFieldsLogin = z.infer<typeof formSchemaLogin>;
interface ApiError {
  data?: {
    message?: string;
    errors?: Record<string, string[]>;
  };
  status?: number;
}
const extractApiErrors = (error: ApiError) => {
  const errors: Record<string, string> = {};

  if (error.data?.errors) {
    Object.entries(error.data.errors).forEach(([field, messages]) => {
      if (messages && messages.length > 0) {
        errors[field] = messages[0];
      }
    });
  }

  return {
    fieldErrors: errors,
    generalError: error.data?.message || "Произошла ошибка при регистрации",
  };
};
const RegisterPage = ({isCart = false, loginButtonClicked = ()=> {}}) => {
  const [registerUser] = useRegisterUserMutation();
  const { push } = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const { setToken } = useAuth();
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      agreeToPolicy: false,
    },
  });

  // Форматирование телефонного номера при вводе
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Оставляем только цифры

    // Обработка ввода первой цифры
    if (value.length > 0) {
      // Если первая цифра не 7, преобразуем её
      if (value[0] !== '7') {
        if (value[0] === '8') {
          // Заменяем 8 на 7 (российская традиция)
          value = '7' + value.substring(1);
        } else if (value[0] === '9' || value[0] === '3' || value[0] === '4' || value[0] === '5' || value[0] === '6') {
          // Если начинается с 9, 3, 4, 5, 6 (мобильные коды), добавляем 7 в начало
          value = '7' + value;
        }
      }
    }

    // Ограничиваем длину до 11 цифр (стандарт для России)
    value = value.substring(0, 11);

    // Форматируем номер в стиле +7 (999) 999-99-99
    let formattedValue = '';
    if (value.length > 0) {
      formattedValue = '+' + value[0]; // Код страны

      if (value.length > 1) {
        // Код оператора/региона (3 цифры)
        formattedValue += ' (' + value.substring(1, Math.min(4, value.length));
        if (value.length < 4) {
          formattedValue += '_'.repeat(4 - value.length);
        }
        formattedValue += ')';
      } else {
        formattedValue += ' (___)'
      }

      if (value.length > 4) {
        // Первая часть номера (3 цифры)
        formattedValue += ' ' + value.substring(4, Math.min(7, value.length));
        if (value.length < 7) {
          formattedValue += '_'.repeat(7 - value.length);
        }
      } else {
        formattedValue += ' ___';
      }

      if (value.length > 7) {
        // Вторая часть номера (2 цифры)
        formattedValue += '-' + value.substring(7, Math.min(9, value.length));
        if (value.length < 9) {
          formattedValue += '_'.repeat(9 - value.length);
        }
      } else {
        formattedValue += '-__';
      }

      if (value.length > 9) {
        // Третья часть номера (2 цифры)
        formattedValue += '-' + value.substring(9, 11);
        if (value.length < 11) {
          formattedValue += '_'.repeat(11 - value.length);
        }
      } else {
        formattedValue += '-__';
      }
    } else {
      // Пустой шаблон для пустого поля
      formattedValue = '+7 (___) ___-__-__';
    }

    // Устанавливаем отформатированное значение в форму
    form.setValue('phone', formattedValue);
  };

  const extractApiErrors = (error: ApiError) => {
    const errors: Record<string, string> = {};

    if (error.data?.errors) {
      Object.entries(error.data.errors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          errors[field] = messages[0]; // Берем первую ошибку для каждого поля
        }
      });
    }

    return {
      fieldErrors: errors,
      generalError: error.data?.message || "Произошла ошибка при регистрации",
    };
  };
  async function login(values: FormFieldsLogin) {
    try {
      const result = await loginUser(values).unwrap();
      console.log("Login successful:", result);
      setToken(result.access_token);
    } catch (err) {
      console.error("Login failed:", err);
      console.log(err);
    }
  }

  async function onSubmit(values: FormFields) {
    setIsSubmitting(true);
    setApiError(null);
    form.clearErrors(); // Очищаем предыдущие ошибки

    try {
      const requestBody = {
        name: values.firstName,
        surname: values.lastName,
        email: values.email,
        phone: values.phone,
        password: values.password,
        password_confirmation: values.confirmPassword,
      };

      const result = await registerUser(requestBody).unwrap();
      console.log(result);
      const formLogin = {
        email: requestBody.email,
        password: requestBody.password,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", result.access_token);
      }
      login(formLogin);
      if (!isCart)
        push("/");
    } catch (err) {
      const error = err as ApiError;
      console.error("Registration failed:", error);

      const { fieldErrors, generalError } = extractApiErrors(error);

      Object.entries(fieldErrors).forEach(([field, message]) => {
        const formField =
          field === "first_name"
            ? "firstName"
            : field === "last_name"
              ? "lastName"
              : field === "password_confirmation"
                ? "confirmPassword"
                : field;

        if (formField in form.control._fields) {
          form.setError(formField as keyof FormFields, {
            type: "server",
            message,
          });
        } else {
          // Если ошибка для поля, которого нет в форме, показываем как общую
          setApiError(prev => (prev ? `${prev}\n${message}` : message));
        }
      });

      // Устанавливаем общее сообщение об ошибке
      if (!apiError) {
        setApiError(generalError);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-4 min-w-[220px] lg:min-w-[450px] mt-4 my-10">
      <div className="w-full text-center">
        <h1 className="text-[20px] tablet:text-[30px] mt-20">Регистрация</h1>
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

        {/* Phone Number Field */}
        <div className="flex flex-col space-y-2 w-full">
          <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M3.654 1.328a.678.678 0 0 1 .738-.093l2.522 1.18a.678.678 0 0 1 .291.902l-1.015 2.031a.678.678 0 0 1-.756.336l-.927-.232a11.72 11.72 0 0 0 5.292 5.292l-.232-.927a.678.678 0 0 1 .336-.756l2.031-1.015a.678.678 0 0 1 .902.291l1.18 2.522a.678.678 0 0 1-.093.738l-1.2 1.6a.678.678 0 0 1-.746.253c-1.803-.547-5.926-2.79-8.593-5.457C1.493 6.104-.75 1.98.798.178a.678.678 0 0 1 .253-.746l1.6-1.2Z" />
            </svg>
            <input
              type="tel"
              className="grow"
              value={form.watch("phone") || "+7 (___) ___-__-__"}
              onChange={(e) => {
                handlePhoneChange(e);
              }}
            />
          </label>
          {form.formState.errors.phone && (
            <span className="text-red-500 text-sm">{form.formState.errors.phone.message}</span>
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
            Подтверждаю согласие с <Link href="/politika">Политикой конфиденциальности</Link>
          </label>
        </div>
        {form.formState.errors.agreeToPolicy && (
          <span className="text-red-500 text-sm">{form.formState.errors.agreeToPolicy.message}</span>
        )}
        {apiError && <span className="text-red-500 text-sm">{apiError}</span>}
        {/* Submit Button */}
        <div className="flex flex-col gap-5 mt-4 w-full">
          <button type="submit" className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300">
            Зарегистрироваться
          </button>
          <div className="text-center flex gap-2">
            <span className="text-[14px]">Уже есть аккаунт?</span>
            {!isCart ? (
              <Link href="/login" className="text-blue-300 text-[14px]">
                Войти
              </Link>
            ) : (
              <button type="button" className="text-blue-300 text-[14px]" onClick={loginButtonClicked}>
                Войти
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
