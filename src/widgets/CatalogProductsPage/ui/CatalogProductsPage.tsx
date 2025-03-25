"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";

import CatalogCard from "@/entities/CatalogCard";
import ButtonSizes from "@/entities/ButtonSizes";
import Select from "@/shared/ui/Select";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";

import { useGetProductsQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";
import { useGetCategoriesQuery } from "@/shared/api/CategoriesApi/CategoriesApi";
import { useGetColorsByProductQuery } from "@/shared/api/ColorsApi/ui/ColorsApi";
import { Product } from "@/shared/api/ProductsApi/types";

import "../styles/catalog-products-page.scss";
import { IOnChange } from '@/widgets/AllProductsPage/ui/AllProductsPage'

const CatalogProductsPage = () => {
  let { products_slug } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Получаем категории и текущую категорию
  const { data: categories } = useGetCategoriesQuery();
  const category = categories?.find(item => item.slug === products_slug);

  // Фильтры из URL (если уже были установлены)
  const initialSort = searchParams.get("sort") || "newest";
  const initialColor = searchParams.get("color") || "all";
  const initialSize = searchParams.get("size") || "all";
  const initialPage = Number(searchParams.get("page") || "1");

  // Состояния фильтров и пагинации
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

  // Формируем query params
  const queryParams = new URLSearchParams();
  if (products_slug) queryParams.set("category_slug", products_slug as string);
  if (color !== "all") queryParams.set("color", color);
  if (size !== "all") queryParams.set("size", size);
  if (sort) queryParams.set("sort", sort);
  queryParams.set("page", currentPage.toString());

    const onChangeFunc= ({value, filter}: IOnChange) => {
      setColor(value)
      updateFilters(filter, value)
    }

  const queryString = queryParams.toString();
  const { data: products, isLoading, error } = useGetProductsQuery(queryString);

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

    // При изменении фильтров сбрасываем страницу и накопленные товары
    newParams.delete("page");
    setCurrentPage(1);
    setAllProducts([]);
    setHasMore(true);

    router.push(`?${newParams.toString()}`);
  };

  // Обработчик загрузки следующей страницы
  const loadNextPage = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    setCurrentPage(prev => prev + 1);
  }, [isLoadingMore, hasMore]);

  // Обновляем список товаров при получении новых данных
  useEffect(() => {
    console.log(products)
    if (products) {
      const products1: any = products
      setAllProducts(products1);
      
      setHasMore(products.current_page < products.last_page);
      setIsLoadingMore(false);
    }
  }, [products, currentPage]);

  // Настраиваем Intersection Observer для бесконечного скролла
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !isLoadingMore) {
          loadNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, isLoadingMore, loadNextPage]);

  return (
    <div className="flex flex-col gap-4 mt-[10px] justify-center mb-[70px]">
      <div className="breadcrumbs text-sm mx-auto mb-[70px]">
        <Breadcrumbs />
      </div>

      <div className="mb-[40px]">
        <h1 className="title-h1">{category?.title || "Категория не найдена"}</h1>
      </div>

      {/* Фильтры */}
      <div className="flex flex-col gap-8 mindesk:gap-0 mindesk:flex-row mindesk:justify-between filters">
        <div className="flex flex-col filters tablet:flex-row gap-[20px]">
          <div>
            <Select
              title={"Сортировка"}
              options={[
                {option: "Сначала новые", value: "newest"},
                {option: "Сначала старые", value: "oldest"},
                {option: "Цена по возрастанию", value: "price_asc"},
                {option: "Цена по убыванию", value: "price_desc"},
              ]}
              onChange1={value => {
                setSort(value);
                updateFilters("sort", value);
              }}
              onChange2 = {(value: IOnChange) => value}
            />
          </div>
          <div>
          <Select
              title={"Фильтр"}
              name_first={'Цвет'}
              name_second={'Размер'}
              options1={optionsColor}
              options2={[
                {option: 'S', value: 'S'},
                {option: 'M', value: 'M'},
                {option: 'L', value: 'L'},
                {option: 'XL', value: 'XL'},
              ]}
              onChange2 = {(value: IOnChange) => onChangeFunc(value)}
              onChange1={() => {}}
            />
          </div>
        </div>
      </div>

      {/* Карточки товаров */}
      <div className="products-card-container">
        {isLoading && currentPage === 1 && <p>Загрузка...</p>}
        {error && <p>Ошибка загрузки товаров</p>}
        {allProducts.length > 0 ? (
          allProducts.map((item, index) => (
            <CatalogCard
              id={item.id}
              key={`${item.id}-${currentPage}-${index}`}
              img={item.images[0]?.image_path || "/images/placeholder.jpg"}
              href={`/product/${item.id}`}
              name={item.name}
              price={Number(item.price).toFixed()}
            />
          ))
        ) : (
          !isLoading && <p className="col-span-full text-center py-8">Товары не найдены</p>
        )}
      </div>

      {/* Индикатор загрузки и элемент для Intersection Observer */}
      <div ref={loadMoreRef} className="w-full py-8 text-center">
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

export default CatalogProductsPage;
