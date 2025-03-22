"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CatalogCard from "@/entities/CatalogCard";
import { useGetProductsQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";
import { useGetColorsByProductQuery } from "@/shared/api/ColorsApi/ui/ColorsApi";
import Select from "@/shared/ui/Select";
import ButtonSizes from "@/entities/ButtonSizes";
import { Product } from "@/shared/api/ProductsApi/types";

import "../styles/all-products-page.scss";

const AllProductsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loaderRef = useRef<HTMLDivElement>(null);

  // Получаем параметры из URL
  const initialSort = searchParams.get("sort") || "newest";
  const initialColor = searchParams.get("color") || "all";
  const initialSize = searchParams.get("size") || "all";
  const initialPage = Number(searchParams.get("page")) || 1;

  // Состояние компонента
  const [sort, setSort] = useState(initialSort);
  const [color, setColor] = useState(initialColor);
  const [size, setSize] = useState(initialSize);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Загружаем цвета
  const { data: colors } = useGetColorsByProductQuery();
  const colorOptions = colors
    ? colors.map(color => ({
        option: color.name,
        value: color.name.toLowerCase(),
      }))
    : [];
  const optionsColor = [{ option: "Все цвета", value: "all" }, ...colorOptions];

  // Формирование строки запроса
  const queryParams = new URLSearchParams();
  if (color !== "all") queryParams.set("color", color);
  if (size !== "all") queryParams.set("size", size);
  if (sort) queryParams.set("sort", sort);
  queryParams.set("page", currentPage.toString());

  const queryString = queryParams.toString();
  const { data: products, isLoading, error } = useGetProductsQuery(queryString);

  // Обработка результатов запроса
  useEffect(() => {
    if (products) {
      if (currentPage === 1) {
        // Если это первая страница, заменяем все продукты
        setAllProducts(products.data);
      } else {
        // Иначе добавляем новые продукты к существующим
        setAllProducts(prev => [...prev, ...products.data]);
      }

      // Проверяем, есть ли еще страницы для загрузки
      setHasMore(products.current_page < products.last_page);
      setIsLoadingMore(false);
    }
    
    if (error) {
      setIsLoadingMore(false);
    }
  }, [products, currentPage, error]);

  // Сброс продуктов при изменении фильтров
  useEffect(() => {
    setAllProducts([]);
    setCurrentPage(1);
    setHasMore(true);
  }, [sort, color, size]);

  // Настройка Intersection Observer для бесконечной прокрутки
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !isLoading && !isLoadingMore) {
      setIsLoadingMore(true);
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore, isLoading, isLoadingMore]);

  // Инициализация Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    const currentLoaderRef = loaderRef.current;
    
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [handleObserver]);

  // Тип для ключей фильтра
  type FilterKey = "color" | "size" | "sort";

  // Функция обновления фильтров
  const updateFilters = (key: FilterKey, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    if (value === "all") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    
    newParams.set("page", "1"); // Сбрасываем страницу на первую при изменении фильтров
    router.push(`/all-products?${newParams.toString()}`);

    // Обновляем локальное состояние
    if (key === "color") setColor(value);
    if (key === "size") setSize(value);
    if (key === "sort") setSort(value);
  };

  return (
    <div className="flex flex-col gap-4 mt-[10px] justify-center mb-[70px]">
      {/* Хлебные крошки */}
      <div className="breadcrumbs text-sm mx-auto mb-[70px]">
        <nav aria-label="breadcrumb">
          <ul className="flex space-x-2 text-gray-600">
            <li>
              <Link href="/" className="hover:underline">
                Главная
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-800">Каталог</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Заголовок */}
      <div className="mb-[40px]">
        <h1 className="title-h1">Все товары</h1>
      </div>

      {/* Фильтры */}
      <div className="flex flex-col gap-8 mindesk:gap-0 mindesk:flex-row mindesk:justify-between items-center mb-[30px]">
        <div className="flex flex-col tablet:flex-row gap-[20px]">
          <div className="border-b-[1px] border-x-none border-[#423c3d]">
            <Select
              options={[
                { option: "Сначала новые", value: "newest" },
                { option: "Сначала старые", value: "oldest" },
                { option: "Цена по возрастанию", value: "price_asc" },
                { option: "Цена по убыванию", value: "price_desc" },
              ]}
              value={sort}
              onChange={value => {
                setSort(value);
                updateFilters("sort", value);
              }}
            />
          </div>
          <div className="border-b-[1px] border-x-none border-[#423c3d]">
            <Select
              options={optionsColor}
              value={color}
              onChange={value => {
                setColor(value);
                updateFilters("color", value);
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ButtonSizes
            selectedSize={size}
            onSizeSelect={value => {
              setSize(value);
              updateFilters("size", value);
            }}
          />
        </div>
      </div>

      {/* Карточки товаров */}
      <div className="products-card-container">
        {isLoading && currentPage === 1 && <p>Загрузка...</p>}
        {error && <p>Ошибка загрузки товаров</p>}
        {!allProducts.length && !isLoading && (
          <p className="text-center w-full text-lg">Товары не найдены</p>
        )}
        {allProducts.map((item, index) => (
          <CatalogCard
            id={item.id}
            key={`${item.id}-${currentPage}-${index}`}
            img={item.images[0]?.image_path || '/images/placeholder.jpg'}
            href={`/product/${item.id}`}
            name={item.name}
            price={Number(item.price).toFixed()}
          />
        ))}
      </div>

      {/* Элемент для отслеживания прокрутки */}
      <div ref={loaderRef} className="w-full py-8 text-center">
        {isLoadingMore && (
          <div className="flex justify-center items-center py-4">
            <div className="spinner w-8 h-8 border-2 border-[rgba(0,0,0,0.1)] border-t-[#423c3d] rounded-full animate-spin"></div>
          </div>
        )}
        {!hasMore && allProducts.length > 0 && (
          <p className="text-center text-gray-500 py-4">Все товары загружены</p>
        )}
      </div>
    </div>
  );
};

export default AllProductsPage;
