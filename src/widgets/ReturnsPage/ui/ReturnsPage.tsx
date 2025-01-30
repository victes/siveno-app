import React from "react";

import Accordion from "@/shared/ui/Accordion";

const returns = [
  { name: "Состав и Уход", value: "" },
  { name: "Обмеры", value: "" },
  { name: "Параметры Модели", value: "" },
];

const ReturnsPage = () => {
  return (
    <div className="text-text bona">
      <h1 className="title-h1">Возврат</h1>
      <div className="">
        {returns.map((item, idx) => {
          return <Accordion key={idx} name={item.name} context={item.value} />;
        })}
      </div>
    </div>
  );
};

export default ReturnsPage;
