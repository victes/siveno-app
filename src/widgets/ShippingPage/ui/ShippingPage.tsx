import React from "react";

const ShippingPage = () => {
  return (
    <div className="flex justify-center flex-col text-text text-xs font-semibold mt-[50px]">
      <h1 className="title-h1 font-semibold">Доставка</h1>
      <div className="mt-[40px]">
        <div className="flex flex-col gap-[20px] mb-[30px]">
          <h2 className="font-bold text-[16px]">ДОСТАВКА РОССИИ</h2>
          <ul className="">
            <li>- осуществляется почтой России и СДЭКом. cтоимость от 690 руб.</li>
            <li>- бесплатно при заказе от 15 000 руб.</li>
            <li>- срок доставки до 7 дней.</li>
          </ul>
        </div>
        <div className="flex flex-col gap-[20px] mb-[30px]">
          {/* <p className="mt-[10px]">
            Ознакомиться с тарифам на доставку можно по ссылке, а также на этапе ввода адреса при оформлении заказа.
          </p> */}
        </div>
        <div className="mt-[40px] ml-[50px]">
          <ul className="list-disc">
            <li>Сроки доставки указаны без учета дня оформления заказа.</li>
            <li>Для заказов, оформленных после 13:00 МСК, срок доставки будет увеличен на 1 день. </li>
            <li>Все заказы, оформленные в выходные, будут обработаны и отправлены в первый рабочий день.</li>
            <li>Доступен самовывоз в г. Новосибирск, ул. Крылова 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
