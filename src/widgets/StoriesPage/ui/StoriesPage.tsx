"use client";

import React from "react";

import "../styles/stories-categories.scss";
import BtnBack from "@/shared/ui/BtnBack";
import StoriesSlider from "@/entities/StoriesSlider";
import StoriesCard from "@/entities/StoriesCard";
import { useGetStoriesQuery } from "@/shared/api/StoriesApi/ui/StoriesApi";

// const categories = [
//   {
//     id: 1,
//     image: "https://avatars.mds.yandex.net/i?id=933bf714ef19f744c23f9e03932a90bb_l-7731990-images-thumbs&n=13", // Дефолтное изображение
//     slug: "electronics",
//     title: "Электроника",
//   },
//   {
//     id: 2,
//     image: "https://lesyanebo.com/upload/iblock/801/jvogw8zq6qkcs2uy44mb305msozkobff.jpg",
//     slug: "clothing",
//     title: "Одежда",
//   },
//   {
//     id: 3,
//     image: "https://lesyanebo.com/upload/iblock/801/jvogw8zq6qkcs2uy44mb305msozkobff.jpg",
//     slug: "books",
//     title: "Книги",
//   },
//   {
//     id: 4,
//     image: "https://lesyanebo.com/upload/iblock/801/jvogw8zq6qkcs2uy44mb305msozkobff.jpg",
//     slug: "furniture",
//     title: "Мебель",
//   },
//   {
//     id: 5,
//     image: "https://lesyanebo.com/upload/iblock/801/jvogw8zq6qkcs2uy44mb305msozkobff.jpg",
//     slug: "furniture",
//     title: "Мебель",
//   },
//   {
//     id: 6,
//     image: "https://lesyanebo.com/upload/iblock/801/jvogw8zq6qkcs2uy44mb305msozkobff.jpg",
//     slug: "furniture",
//     title: "Мебель",
//   },
// ];

const StoriesPage = () => {
  const { data: stories, isLoading, error } = useGetStoriesQuery();
  return (
    <div>
      <div className="stories fixed  inset-0 bg-white z-[100] flex flex-col laptop:!hidden">
        <div className="breadcrumbs z-50 text-sm my-[15px]">
          <BtnBack className="px-0" />
        </div>
        <StoriesSlider
          categories={
            stories?.map(story => ({
              id: story.id,
              image: story.image_url || "/default-image.jpg",
              title: story.title,
              cart: true,
            })) || []
          }
        />
      </div>
      <div className="hidden flex-col gap-4 mt-2 max-sm:gap-2 laptop:flex justify-center ">
        <div className="breadcrumbs text-sm mb-5">
          <BtnBack />
        </div>
        <div className="mb-5 max-sm:mb-0">
          <h1 className="title-h1">{stories && stories[0].title}</h1>
        </div>
        <div className="stories-card-container">
          {isLoading && <div>Loading...</div>}
          {error && <div>Error fetching categories</div>}

          {stories?.map(item => (
            <StoriesCard
              key={item.id}
              id={item.id}
              img={item.image_url} // Здесь можно добавить дефолтное изображение
              name={item.title} // Передаем название категории
              cart={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
