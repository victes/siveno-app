import { ISubstribeResponce, IUserData } from "@/shared/api/SubscribeApi/types/index.interface";
import { useSendSubscribeMutation } from "@/shared/api/SubscribeApi/ui/SubscribeApi";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import close from "../../../../public/images/MainPage/close.png";
import "../style/popup.scss";
import { useGetPromoQuery } from '@/shared/api/ProductsApi/ui/ProductsApi'

const PopUp = ({ setActive, active }: any) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [sendSubscribe] = useSendSubscribeMutation();

  const getPromo = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!name) {
      return toast.error(`Заполните ваше имя!`, { position: "top-right" });
    }
    if (!email) {
      return toast.error(`Заполните ваш email!`, { position: "top-right" });
    }
    if (name && email) {
      const data: IUserData = {
        email,
        name
      };
      try {
        await sendSubscribe(data).unwrap();
        toast.success(`Вы успешно подписались на рассылку!`, {
          position: "top-right",
        });
        setTimeout(() => {
          setActive(false);
        }, 2000);
      } catch {
        toast.error(`Ошибка при отправке письма.`, {
          position: "top-right",
        });
      }
    }
  };
  return (
    <>
      <div className={active ? "pop-up pop-up__active" : "pop-up"}>
        <div className="pop-up__close" onClick={() => setActive(false)}>
          <Image src={close} alt="..." width={25} height={25} />
        </div>
        <div className="pop-up__img"></div>
        <div className="pop-up__text">
          <h2 className="pop-up__title">Подписка Siveno</h2>
          <p className="pop-up__description">
            Скидка 10% на первый заказ, новости бренда, ранний доступ к коллекциям и эксклюзивные акции для подписчиков
            рассылки
          </p>
          <div>
            <input
              type="text"
              placeholder="Имя"
              name="name"
              className="pop-up__input"
              onChange={e => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Почта"
              name="email"
              className="pop-up__input"
              onChange={e => setEmail(e.target.value)}
            />
            <button className="pop-up__btn text-white" onClick={getPromo}>
              Подписаться
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUp;
