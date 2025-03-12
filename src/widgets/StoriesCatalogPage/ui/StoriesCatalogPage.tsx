"use client";

import React from "react";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";

import "../styles/stories-categories.scss";
import StoriesCard from "@/entities/StoriesCard";
import { useGetStoriesQuery } from "@/shared/api/StoriesApi/ui/StoriesApi";

// Определяем типы
// interface Product {
//   id: number;
//   name: string;
//   category_id: number;
//   video_url: string;
//   price: number;
//   description: string;
//   composition_care: string;
//   preference: Record<string, string[]>;
//   measurements: Record<string, string[]>;
//   created_at: string;
//   updated_at: string;
//   is_discount: boolean;
//   discount_percentage: string;
//   pivot: {
//     stories_id: number;
//     product_id: number;
//   };
// }

// interface Story {
//   id: number;
//   title: string;
//   image_url: string;
//   created_at: string;
//   updated_at: string;
//   products: Product[];
// }

const StoriesCatalogPage: React.FC = () => {
  const { data: stories, isLoading, error } = useGetStoriesQuery();

  return (
    <div className="flex flex-col gap-4 mt-[10px] justify-center mb-[70px]">
      <div className="breadcrumbs text-sm mx-auto mb-[20px]">
        <Breadcrumbs />
      </div>

      <div className="stories-card-container">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error fetching stories</div>}

        {stories?.map(story => (
          <StoriesCard
            key={story.id}
            id={story.id}
            img={story.image_url}
            href={`/stories-page/${story.id}`}
            name={story.title}
            cart={false}
          />
        ))}
      </div>
    </div>
  );
};

export default StoriesCatalogPage;
