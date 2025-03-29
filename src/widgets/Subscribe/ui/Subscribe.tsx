import { IUserData } from "@/shared/api/SubscribeApi/types/index.interface";
import { useSendSubscribeMutation } from "@/shared/api/SubscribeApi/ui/SubscribeApi";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import "../styles/subscribe.scss";

const Subscribe = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [sendSubscribe] = useSendSubscribeMutation();
  const [success, setSuccess] = useState<boolean>(false);

  const getPromo = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!name) {
      return toast.error(`Заполните ваше имя!`, { position: "top-right" });
    }
    if (!email) {
      return toast.error(`Заполните ваш email!`, { position: "top-right" });
    }
    if (!success) {
      return toast.error(`Необходимо согласится с условиями!`, { position: "top-right" });
    }
    if (name && email) {
      const data: IUserData = {
        email,
        name,
      };
      try {
        await sendSubscribe(data).unwrap();
        toast.success(`Вы успешно подписались на рассылку!`, {
          position: "top-left",
        });
      } catch {
        toast.error(`Ошибка при отправке письма.`, {
          position: "top-left",
        });
      }
    }
  };

  return (
    <div className="mt-10 containers px-[40px]">
      <div className="w-full flex mt-[100px] justify-center mb-[40px] title ">
        <h2 className="text-3xl title-h1 text-center uppercase tracking-wide lineyka">Подписка Siveno</h2>
      </div>
      <div className="max-w-[700px] mx-auto h-auto">
        <h2 className="text-xl text-black text-center subtitle">
          Скидка 10% на первый заказ, новости бренда, ранний доступ к коллекциям и эксклюзивные акции для подписчиков
          рассылки
        </h2>
        <form className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Имя"
            onChange={e => setName(e.target.value)}
            className="mt-10 bg-white h-12 rounded px-5 outline-none input-up border-black border-2"
          />
          <input
            type="email"
            name="email"
            className="bg-white h-12 rounded px-5 outline-none border-black border-2"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />
          <div className="flex flex-row gap-3 items-center" onClick={() => setSuccess(!success)}>
            <h3 className="size-[15px] border-black border-2 flex justify-center items-center">
              <span
                className="size-[7px] bg-black transition-all duration-300"
                style={success ? { opacity: 1 } : { opacity: 0 }}
              ></span>
            </h3>
            <p className="text-[14px] leading-[18px] text-black">
              Я приминаю{" "}
              <Link href="/politika" className="underline">
                Политику кондифенциальности
              </Link>{" "}
              и соглашаюсь с условиями{" "}
              <Link href="/oferta" className="underline">
                Публичной оферты
              </Link>
            </p>
          </div>
          <button onClick={getPromo} className="w-full bg-black text-white h-12 rounded">
            Подписаться
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
