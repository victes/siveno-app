import ProductSlider from "@/entities/ProductSlider/ui/ProductSlider";
import React from "react";

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
      <div className="breadcrumbs text-sm mx-auto mb-[70px]">
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
      <div className="">
        <div className="">
          <ProductSlider carousel={carousel} />
        </div>
        <div className=""></div>
      </div>
    </section>
  );
};

export default ProductPage;
