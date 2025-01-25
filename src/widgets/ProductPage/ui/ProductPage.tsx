import ButtonColors from "@/entities/ButtonColors";
import ButtonSizes from "@/entities/ButtonSizes";
import ProductSlider from "@/entities/ProductSlider/ui/ProductSlider";

import React from "react";

import "../styles/product-page.scss";
import ButtonsProduct from "@/features/ButtonsProduct";
import Accordion from "@/shared/ui/Accordion";

const carousel = [
  {
    src: "https://lesyanebo.com/upload/resize_cache/iblock/83e/1380_2760_1/40npmby0a9hw3gcqlj479mpnma91q8xq.jpg",
  },
  {
    src: "https://lesyanebo.com/upload/resize_cache/iblock/668/1380_2760_1/wn61ulv6puak2wbjh1aesfvwhh2njjfn.jpg",
  },
  {
    src: "https://lesyanebo.com/upload/resize_cache/iblock/83e/1380_2760_1/40npmby0a9hw3gcqlj479mpnma91q8xq.jpg",
  },
  {
    src: "https://lesyanebo.com/upload/resize_cache/iblock/83e/1380_2760_1/40npmby0a9hw3gcqlj479mpnma91q8xq.jpg",
  },
];

const accordion = [
  { name: "Состав и Уход", value: "" },
  { name: "Обмеры", value: "" },
  { name: "Параметры Модели", value: "" },
];

const ProductPage = () => {
  return (
    <section className="mb-[60px] border-b-[1px] pb-[20px] border-solid border-[#423c3d]">
      <div className="breadcrumbs text-sm mx-auto mb-[30px]">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Documents</a>
          </li>
          <li>Add Document</li>
        </ul>
      </div>
      <div className="flex flex-col items-center largeDesk:flex-row justify-between">
        <div className="mb-[40px] largeDesk:mb-0">
          <ProductSlider carousel={carousel} />
        </div>
        <div className="flex flex-col gap-[20px] items-center tablet:mx-auto tablet:max-w-[500px]">
          {/* ================================================== */}
          <div className="flex flex-col items-center justify-center gap-[20px]">
            <h1 className="title-h1">Двубортный тренч ICONIC</h1>
            <p className="text-center max-w-[200px] tablet:max-w-full text-[10px] tablet:text-[14px]">
              Базовая модель тренча из плотного хлопкового материала надёжно защищает от ветра и лёгких осадков.
              Объёмный крой, спущенная линия плеч, объёмный воротник, декоративные ремешки. Рекомендуем выбирать тренч
              на 1-2 размера меньше, чем вы носите обычно.
            </p>
          </div>
          {/* ================================================== */}
          <div className="flex flex-col items-center justify-center">
            <div className="">
              <ButtonSizes />
            </div>
            <div className="py-2">
              <ButtonColors />
            </div>
          </div>
          {/* ================================================== */}

          <div className="producti-page-price mx-auto mb-[10px]">
            <span>68 000 руб.</span>
          </div>

          {/* ================================================== */}
          <div className="">
            <ButtonsProduct
              price={"68000"}
              name="Двубортный тренч ICONIC"
              img={
                "https://lesyanebo.com/upload/resize_cache/iblock/83e/1380_2760_1/40npmby0a9hw3gcqlj479mpnma91q8xq.jpg"
              }
            />
          </div>

          <div className="w-full">
            {accordion.map((item, idx) => {
              return <Accordion key={idx} name={item.name} context={item.value} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
