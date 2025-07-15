import Image from "next/image";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/shared/api/CategoriesApi/CategoriesApi";
import "../style/catalog.scss";

function Catalog() {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <div className="mt-10 containers px-[40px]">Загрузка...</div>;
  if (error) return <div className="mt-10 containers px-[40px]">Ошибка загрузки категорий</div>;
  if (!categories || categories.length === 0)
    return <div className="mt-10 containers px-[40px]">Категории не найдены</div>;

  return (
    <div className="mt-10 containers px-[40px]">
      <div className="w-full flex mt-[40px] mb-[40px] justify-center">
        <h2 className="text-3xl title-h1 text-start uppercase tracking-wide lineyka">Каталог</h2>
      </div>
      <div className="catalog__container">
        {categories.map(category => (
          <Link key={category.id} href={`/catalog-products/${category.slug}`}>
            <div>
              <h2 className="mb-5 text-[20px]">{category.title}</h2>
              <Image src={category.image} alt={category.title} className="img" width={400} height={400} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
