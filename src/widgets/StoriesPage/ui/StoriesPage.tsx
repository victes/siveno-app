import StoriesCard from "@/entities/StoriesCard";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import React from "react";

import "../styles/stories-categories.scss";

const categories = [
  {
    id: 1,
    image: "https://avatars.mds.yandex.net/i?id=933bf714ef19f744c23f9e03932a90bb_l-7731990-images-thumbs&n=13", // Дефолтное изображение
    slug: "electronics",
    title: "Электроника",
  },
  {
    id: 2,
    image: "https://lesyanebo.com/upload/iblock/801/jvogw8zq6qkcs2uy44mb305msozkobff.jpg",
    slug: "clothing",
    title: "Одежда",
  },
  {
    id: 3,
    image: "https://lesyanebo.com/upload/iblock/801/jvogw8zq6qkcs2uy44mb305msozkobff.jpg",
    slug: "books",
    title: "Книги",
  },
  {
    id: 4,
    image: "https://lesyanebo.com/upload/iblock/801/jvogw8zq6qkcs2uy44mb305msozkobff.jpg",
    slug: "furniture",
    title: "Мебель",
  },
  {
    id: 5,
    image: "https://lesyanebo.com/upload/iblock/801/jvogw8zq6qkcs2uy44mb305msozkobff.jpg",
    slug: "furniture",
    title: "Мебель",
  },
  {
    id: 6,
    image: "https://lesyanebo.com/upload/iblock/801/jvogw8zq6qkcs2uy44mb305msozkobff.jpg",
    slug: "furniture",
    title: "Мебель",
  },
];

const StoriesPage = () => {
  return (
    <div className="flex flex-col gap-4 mt-[10px] justify-center mb-[70px]">
      <div className="breadcrumbs text-sm mx-auto mb-[20px]">
        <Breadcrumbs />
      </div>
      {/* <div className="mb-[20px]">
    <h1 className="title-h1">Истории</h1>
  </div> */}
      <div className="stories-card-container">
        {/* {isLoading && <div>Loading...</div>}
    {error && <div>Error fetching categories</div>} */}

        {categories?.map(item => (
          <StoriesCard
            key={item.id}
            id={item.id}
            img={item.image} // Здесь можно добавить дефолтное изображение
            name={item.title} // Передаем название категории
            cart={true}
          />
        ))}
      </div>
    </div>
  );
};

export default StoriesPage;
