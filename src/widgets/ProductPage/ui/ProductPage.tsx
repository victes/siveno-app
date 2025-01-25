import ButtonColors from "@/entities/ButtonColors";
import ButtonSizes from "@/entities/ButtonSizes";
import ProductSlider from "@/entities/ProductSlider/ui/ProductSlider";

import React from "react";

import "../styles/product-page.scss";

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

const ProductPage = () => {
  return (
    <section>
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
      <div className="flex justify-between">
        <div className="">
          <ProductSlider carousel={carousel} />
        </div>
        <div className="flex flex-col gap-[20px] items-center mx-auto max-w-[500px]">
          {/* ================================================== */}
          <div className="flex flex-col gap-[20px]">
            <h1 className="title-h1">Двубортный тренч ICONIC</h1>
            <p className="text-center text-[10px] tablet:text-[14px]">
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

          <div className="producti-page-price mx-auto">
            <span>68 000 руб.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
