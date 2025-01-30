import React from "react";

const ContactsPage = () => {
  return (
    <div className="flex items-center justify-center gap-[50px] py-[100px] max-laptop:flex-col-reverse">
      <div>
        <img src="/images/Contacts/map.jpg" alt="Map" className="max-w-[500px] w-full" />
      </div>
      <div className="flex flex-col gap-[30px]">
        <h3 className="text-[50px] text-black">Контакты</h3>
        <div>
          <p>Россия, г. Москва, улица Пушкина, 1/19</p>
          <p>Телефон интернет-магазина: +7 975 346 24 14</p>
          <p> Телефон магазина : +7 975 346 24 14</p>
        </div>
        <div>
          <p>info@siveno.com</p>
          <p>PR: pr@siveno.com</p>
          <p>Оптовые продажи: sivenoh@siveno.com</p>
          <p>Клиентский сервис: shop@siveno.com</p>
        </div>
        <p>instagram.com/siveno</p>
        <p></p>
      </div>
    </div>
  );
};

export default ContactsPage;
