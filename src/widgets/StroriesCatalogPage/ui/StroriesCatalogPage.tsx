import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import React from "react";

const StroriesCatalogPage = () => {
  return (
    <div className="flex flex-col gap-4 mt-[10px] justify-center mb-[70px]">
      <div className="breadcrumbs text-sm mx-auto mb-[70px]">
        <Breadcrumbs />
      </div>
      <div className="mb-[20px]">
        <h1 className="title-h1">Истории</h1>
        <ul>{/* {categories?.children.map(item => (} */}</ul>
      </div>
      <div className="categories-card-container">
        {/* {isLoading && <div>Loading...</div>}
    {error && <div>Error fetching categories</div>}

    {categories?.map(item => (
      <CatalogCard
        key={item.id}
        id={item.id}
        img={item.image} // Здесь можно добавить дефолтное изображение
        href={`/catalog-products/${item.slug}`} // Формируем ссылку на категорию
        name={item.title} // Передаем название категории
      />
    ))} */}
      </div>
    </div>
  );
};

export default StroriesCatalogPage;
