"use client";

import React from "react";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";

import "../styles/stories-categories.scss";
import StoriesCard from "@/entities/StoriesCard";
import { useGetStoriesQuery } from "@/shared/api/StoriesApi/ui/StoriesApi";

const StoriesCatalogPage: React.FC = () => {
  const { data: stories, isLoading, error } = useGetStoriesQuery();

  return (
    <div className="flex flex-col gap-4 mt-2 justify-center max-sm:gap-2">
      <div className="breadcrumbs text-sm mx-auto mb-5 max-sm:mb-0">
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
