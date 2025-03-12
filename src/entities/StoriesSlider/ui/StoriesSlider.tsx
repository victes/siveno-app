import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import StoriesCard from "@/entities/StoriesCard";

import "../styles/stories-slider.scss";

export interface IStoriesCard {
  id?: number;
  image: string;
  title: string;
  cart?: boolean;
}

interface IStoriesSlider {
  categories: IStoriesCard[];
}

const StoriesSlider = ({ categories }: IStoriesSlider) => {
  return (
    <div className="stories-container absolute px-2">
      <div className="progress-bar-container">
        {categories.map((_, index) => (
          <div key={index} className={`progress-bar progress-bar-${index}`} />
        ))}
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true, el: ".progress-bar-container", type: "bullets" }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="stories-swiper"
      >
        {categories.map(item => (
          <SwiperSlide key={item.id}>
            <StoriesCard id={item.id} img={item.image} name={item.title} cart={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StoriesSlider;
