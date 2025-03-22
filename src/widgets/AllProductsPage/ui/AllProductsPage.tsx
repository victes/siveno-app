"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import CatalogCard from "@/entities/CatalogCard";
import ButtonSizes from "@/entities/ButtonSizes";
import Select from "@/shared/ui/Select";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";

import { useGetProductsQuery } from "@/shared/api/ProductsApi/ui/ProductsApi";
import { useGetColorsByProductQuery } from "@/shared/api/ColorsApi/ui/ColorsApi";
import { Product } from "@/shared/api/ProductsApi/types";

import "../../CatalogProductsPage/styles/catalog-products-page.scss";

const AllProductsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Фильтры из URL (если уже были установлены)
  const initialSort = searchParams.get("sort") || "newest";
  const initialColor = searchParams.get("color") || "all";
  const initialSize = searchParams.get("size") || "all";

  // Состояния фильтров
  const [sort, setSort] = useState(initialSort);
  const [color, setColor] = useState(initialColor);
  const [size, setSize] = useState(initialSize);

  // Состояния для бесконечной прокрутки
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

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
  console.log("Query String:", queryString);
  console.log("Full API URL:", `${process.env.NEXT_PUBLIC_BASE_URL}products?${queryString}`);
  
  const { data: products, isLoading, error } = useGetProductsQuery(queryString);

  // Обработка результатов запроса
  useEffect(() => {
    if (products) {
      console.log("API Response:", products);
      console.log("Current Page:", currentPage);
      console.log("Has data:", products.data && products.data.length > 0);
      console.log("Response structure:", {
        current_page: products.current_page,
        last_page: products.last_page,
        data_length: products.data ? products.data.length : 0,
        total: products.total
      });
      
      // Проверяем, что products.data существует и является массивом
      if (products.data && Array.isArray(products.data)) {
        if (currentPage === 1) {
          // Если это первая страница, заменяем все продукты
          setAllProducts(products.data);
        } else {
          // Иначе добавляем новые продукты к существующим
          setAllProducts(prev => [...prev, ...products.data]);
        }

        // Проверяем, есть ли еще страницы для загрузки
        setHasMore(products.current_page < products.last_page);
      } else {
        console.error("Invalid products data structure:", products);
      }
      
      setIsLoadingMore(false);
    }
    
    if (error) {
      console.error("API Error:", error);
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
    console.log("Intersection Observer triggered:", {
      isIntersecting: target.isIntersecting,
      hasMore,
      isLoading,
      isLoadingMore
    });
    
    if (target.isIntersecting && hasMore && !isLoading && !isLoadingMore) {
      console.log("Loading more products, incrementing page to:", currentPage + 1);
      setIsLoadingMore(true);
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore, isLoading, isLoadingMore, currentPage]);

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

    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 mt-[10px] justify-center mb-[70px]">
      <div className="breadcrumbs text-sm mx-auto mb-[70px]">
        <Breadcrumbs />
      </div>

      <div className="mb-[40px]">
        <h1 className="title-h1">Все товары</h1>
      </div>

      {/* Фильтры */}
      <div className="flex flex-col gap-8 mindesk:gap-0 mindesk:flex-row mindesk:justify-between items-center mb-[30px]">
        <div className="flex flex-col tablet:flex-row gap-[20px]">
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
          <Select
            options={optionsColor}
            value={color}
            onChange={value => {
              setColor(value);
              updateFilters("color", value);
            }}
          />
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
          <div>
            <p className="text-center w-full text-lg">Товары не найдены</p>
            <p className="text-center text-sm text-gray-500">
              Debug: isLoading={String(isLoading)}, hasError={String(!!error)}, 
              currentPage={currentPage}, hasMore={String(hasMore)}
            </p>
          </div>
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
      <div ref={loaderRef} className="loader-element h-10 w-full flex justify-center items-center">
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
