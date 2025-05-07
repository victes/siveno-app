"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

import { useLoginUserMutation } from "@/shared/api/LoginApi/LoginApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/hook/AuthContext/ui/AuthContext";
let loginError = "";
const formSchema = z.object({
  email: z.string().email({
    message: "Почта введена не правильно",
  }),
  password: z.string().min(8, {
    message: "Пароль должен содержать не менее 8 символов",
  }),
});

type FormFields = z.infer<typeof formSchema>;

const LoginPage = ({isCart= false, registerButtonClicked = () => {}}) => {
  const [loginUser] = useLoginUserMutation();
  const { push } = useRouter();
  const { setToken } = useAuth();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormFields) {
    try {
      const result = await loginUser(values).unwrap();
      console.log("Login successful:", result);
      setToken(result.access_token); // Обновит токен глобально
      push("/account");
    } catch (err) {
      console.error("Login failed:", err);
      const errorData = err as { data?: { error?: string } };
      loginError = errorData?.data?.error || "Login не удалась";
      console.log(errorData);
    }
  }

  return (
    <div className="space-y-4 min-w-[220px] lg:min-w-[450px] mt-4 my-10">
      <div className="w-full text-center">
        <h1 className="text-[20px] tablet:text-[30px] mt-20">Вход/Регистрация</h1>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col mx-auto items-center !mt-12 gap-4 max-w-[600px]"
      >
        {/* Email Field */}
        <div className="flex flex-col space-y-2 w-full">
          <label className="input bg-transparent border-b border-[#423C3D] border-x-0 border-t-0 rounded-none flex items-center gap-2">
            <input type="text" className="grow" placeholder="Почта" {...form.register("email")} />
          </label>
          {form.formState.errors.email && (
            <span className="text-red-500 text-sm">{form.formState.errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col space-y-2 w-full">
          <label className="input border-b border-[#423C3D] border-x-0 border-t-0 rounded-none bg-transparent flex items-center gap-2">
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
        <span className="text-red-500 text-sm">{loginError}</span>
        {/* Submit Button */}
        <div className="flex flex-col gap-5 mt-4 w-full">
          <button type="submit" className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300">
            Вход
          </button>
          <div className="flex flex-col items-center gap-2 justify-center">
            <div className="text-center flex gap-2">
              <span className="text-[14px]">У вас нет аккаунта?</span>
              {!isCart ? (
                <Link href="/register" className="text-blue-300 text-[14px]">
                  Регистрация
                </Link>
              ) : (
                <button type="button" className="text-blue-300 text-[14px]" onClick={registerButtonClicked}>
                  Регистрация
                </button>
              )}
            </div>

            <div className="text-center flex gap-2">
              <span className="text-[14px]">Забыли свой</span>
              <Link href="/forgot-password" className="text-blue-300 text-[14px]">
                Пароль?
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
