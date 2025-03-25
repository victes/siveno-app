import "../style/popup.scss";
import Image from "next/image";
import close from "../../../../public/images/MainPage/close.png";
import { toast } from "react-toastify";

const PopUp = ({ setActive, active }: any) => {
  const getPromo = () => {
    toast.success(`Письмо успешно отправлено!`, {
      position: "top-right",
    });
    setTimeout(() => {
      setActive(false);
    }, 2000);
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
          <form action="mailto:geno74@bk.ru" method='post' encType='text/plain'>
            <input type="text" placeholder="Имя" name="name" className="pop-up__input" />
            <input type="text" placeholder="Почта" name="email" className="pop-up__input" />
            <button className="pop-up__btn" onClick={getPromo}>
              Подписаться
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PopUp;
