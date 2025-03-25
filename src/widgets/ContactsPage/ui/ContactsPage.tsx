import React from "react";
import "../style/contact.scss";
import Link from "next/link";
import { FaTelegram } from "react-icons/fa6";

const ContactsPage = () => {
  return (
    <div className="flex items-start justify-center gap-[50px] py-[100px] max-laptop:flex-col-reverse contact mt-[100px]">
      <div className=" map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d571.5412414468861!2d82.91515712631748!3d55.04032537578384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42dfe5c9be789947%3A0xcb8dabe432e23cc7!2z0YPQuy4g0JrRgNGL0LvQvtCy0LAsIDMsINCd0L7QstC-0YHQuNCx0LjRgNGB0LosINCd0L7QstC-0YHQuNCx0LjRgNGB0LrQsNGPINC-0LHQuy4sIDYzMDA5MQ!5e0!3m2!1sru!2sru!4v1742795445988!5m2!1sru!2sru"
          width="500"
          height="400"
          loading="lazy"
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="flex flex-col gap-[20px]">
        <h3 className="text-[36px] text-black">Контакты</h3>
        <div>
          <p>Телефон: +7 (913) 470-23-11</p>
          <p>Email: info@siveno.store</p>
          <br />
          <p>Офис: Новосибирск, ул. Крылова, 3</p>
          <p>Режим работы с 9:00 до 21:00</p>
          <br />
          {/* <p><Link href={'https://t.me/+pnsEBODRdPJiNmNi'}>Telegram</Link></p>
          <p><Link href="https://vk.com/siveno.store">ВКонтакте</Link></p> */}
          <div className="flex gap-2">
            <a href="https://t.me/+pnsEBODRdPJiNmNi" className="text-gray-500 hover:text-black transition-colors">
              <FaTelegram size={18} />
            </a>
            <a href="https://vk.com/siveno.store" className="text-gray-500 hover:text-black transition-colors">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M31.4907 63.4907C0 94.9813 0 145.671 0 247.04V264.96C0 366.329 0 417.019 31.4907 448.509C62.9813 480 113.671 480 215.04 480H232.96C334.329 480 385.019 480 416.509 448.509C448 417.019 448 366.329 448 264.96V247.04C448 145.671 448 94.9813 416.509 63.4907C385.019 32 334.329 32 232.96 32H215.04C113.671 32 62.9813 32 31.4907 63.4907ZM75.6 168.267H126.747C128.427 253.76 166.133 289.973 196 297.44V168.267H244.16V242C273.653 238.827 304.64 205.227 315.093 168.267H363.253C359.313 187.435 351.46 205.583 340.186 221.579C328.913 237.574 314.461 251.071 297.733 261.227C316.41 270.499 332.907 283.63 346.132 299.751C359.357 315.873 369.01 334.618 374.453 354.747H321.44C316.555 337.262 306.614 321.61 292.865 309.754C279.117 297.899 262.173 290.368 244.16 288.107V354.747H238.373C136.267 354.747 78.0267 284.747 75.6 168.267Z" />
              </svg>
            </a>
          </div>
        </div>
        <h3 className="text-[36px] text-black">Магазины</h3>
        <div>
          <p>Г. Новосибирск, ул Крылова, 3</p>
          <p>Режим работы (уточняйте у мессенджеров)</p>
          <p>Телефон +7 (913) 470-23-11</p>
          <br />
          <div className="flex gap-2">
            <a href="https://t.me/+pnsEBODRdPJiNmNi" className="text-gray-500 hover:text-black transition-colors">
              <FaTelegram size={18} />
            </a>
            <a href="https://vk.com/siveno.store" className="text-gray-500 hover:text-black transition-colors">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M31.4907 63.4907C0 94.9813 0 145.671 0 247.04V264.96C0 366.329 0 417.019 31.4907 448.509C62.9813 480 113.671 480 215.04 480H232.96C334.329 480 385.019 480 416.509 448.509C448 417.019 448 366.329 448 264.96V247.04C448 145.671 448 94.9813 416.509 63.4907C385.019 32 334.329 32 232.96 32H215.04C113.671 32 62.9813 32 31.4907 63.4907ZM75.6 168.267H126.747C128.427 253.76 166.133 289.973 196 297.44V168.267H244.16V242C273.653 238.827 304.64 205.227 315.093 168.267H363.253C359.313 187.435 351.46 205.583 340.186 221.579C328.913 237.574 314.461 251.071 297.733 261.227C316.41 270.499 332.907 283.63 346.132 299.751C359.357 315.873 369.01 334.618 374.453 354.747H321.44C316.555 337.262 306.614 321.61 292.865 309.754C279.117 297.899 262.173 290.368 244.16 288.107V354.747H238.373C136.267 354.747 78.0267 284.747 75.6 168.267Z" />
              </svg>
            </a>
          </div>
        </div>
        <h3 className="text-[36px] text-black">Клиентская поддержка</h3>
        <div>
          <p>Ответим на любые вопросы, связанные с доставкой и товаром</p>
          <p>Ежедневно с 9:00 до 21:00</p>
          <br />
          <p>Телефон: +7 (913) 470-23-11</p>
          <p>Email: info@siveno.store</p>
          <br />
          <div className="flex gap-2">
            <a href="https://t.me/+pnsEBODRdPJiNmNi" className="text-gray-500 hover:text-black transition-colors">
              <FaTelegram size={18} />
            </a>
            <a href="https://vk.com/siveno.store" className="text-gray-500 hover:text-black transition-colors">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M31.4907 63.4907C0 94.9813 0 145.671 0 247.04V264.96C0 366.329 0 417.019 31.4907 448.509C62.9813 480 113.671 480 215.04 480H232.96C334.329 480 385.019 480 416.509 448.509C448 417.019 448 366.329 448 264.96V247.04C448 145.671 448 94.9813 416.509 63.4907C385.019 32 334.329 32 232.96 32H215.04C113.671 32 62.9813 32 31.4907 63.4907ZM75.6 168.267H126.747C128.427 253.76 166.133 289.973 196 297.44V168.267H244.16V242C273.653 238.827 304.64 205.227 315.093 168.267H363.253C359.313 187.435 351.46 205.583 340.186 221.579C328.913 237.574 314.461 251.071 297.733 261.227C316.41 270.499 332.907 283.63 346.132 299.751C359.357 315.873 369.01 334.618 374.453 354.747H321.44C316.555 337.262 306.614 321.61 292.865 309.754C279.117 297.899 262.173 290.368 244.16 288.107V354.747H238.373C136.267 354.747 78.0267 284.747 75.6 168.267Z" />
              </svg>
            </a>
          </div>
        </div>
        <h3 className="text-[36px] text-black">Сотрудничество:</h3>
        <div>
          <p>По вопросам сотрудничества, пожалуйста, пишите на почту</p>
          <p>Email: info@siveno.store</p>
        </div>
        <h3 className="text-[36px] text-black">Наши реквизиты</h3>
        <div>
          <p>ООО «Просто Логистика»</p>
          <p>Юридический адрес: 630052, г.Новосибирск, ул. Толмачевская, д.1/1, офис 211</p>
          <p>Телефон: +79137655595</p>
          <p>Почтовый адрес: 630029, г. Новосибирск, а/я 14</p>
          <p>ИНН: 5402015479</p>
          <p>КПП: 540401001</p>
          <p>ОКПО: 42190185</p>
          <p>ОГРН: 1165476065094</p>
          <p>Р/С: 40702810723230001046</p>
          <p>Филиал «Новосибирский» АО «АЛЬФА-БАНК»</p>
          <p>К/С: 30101 810 6000 0000 0774</p>
          <p>БИК: 045004774 </p>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
