import { Container } from "@/shared/ui/Container";
import { Slider } from "@/shared/ui/Slider";
import React from "react";

const Category = () => {
  const Slides = [
    {
      img: [{ src: "/images/MainPage/img.jpeg", alt: "Img" }],
      title: "Кардиган из пряжи с Мериносом",
      description: "Description",
      price: 10000,
    },
    {
      img: [{ src: "/images/MainPage/img.jpeg", alt: "Img" }],
      title: "Рубашка Декоррованная цветами",
      description: "Description",
      price: 7895,
    },
    {
      img: [{ src: "/images/MainPage/img.jpeg", alt: "Img" }],
      title: "Жакет-балон из атласа",
      description: "Description",
      price: 87954,
    },
    {
      img: [{ src: "/images/MainPage/img.jpeg", alt: "Img" }],
      title: "Рубашка в пижамном стиле с буфами",
      description: "Description",
      price: 1204,
    },
    {
      img: [{ src: "/images/MainPage/img.jpeg", alt: "Img" }],
      title: "Кардиган из пряжи с Мериносом",
      description: "Description",
      price: 20415,
    },
    {
      img: [{ src: "/images/MainPage/img.jpeg", alt: "Img" }],
      title: "Жакет-балон из атласа",
      description: "Description",
      price: 45689,
    },
    {
      img: [{ src: "/images/MainPage/img.jpeg", alt: "Img" }],
      title: "Кардиган из пряжи с Мериносом",
      description: "Description",
      price: 48986,
    },
    {
      img: [{ src: "/images/MainPage/img.jpeg", alt: "Img" }],
      title: "Рубашка в пижамном стиле с буфами",
      description: "Description",
      price: 17894,
    },
  ];
  return (
    <div>
      <Container>
        <h2 className="text-[40px] mt-[60px] uppercase text-black">Новые модели</h2>
        <Slider slides={Slides} className="mt-[40px]" />
      </Container>
    </div>
  );
};

export default Category;
