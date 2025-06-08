"use client";

import { useEffect, useState } from "react";
import PopUp from "@/widgets/PopUp";
import { useGetInspirationQuery } from "@/shared/api/InspirationsApi/InspirationsApi";
import Image from "next/image";

export default function InspirationsPage() {
  const { data, isLoading, isError } = useGetInspirationQuery();
  const [active, setActive] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 15000);
  }, []);
  return (
    <div className="w-full h-auto mt-[100px] max-laptop:mt-10 max-tablet:mt-0">
      {isLoading && <p>Загрузка...</p>}
      {isError && <p>Ошибка загрузки товаров</p>}

      <div className="grid grid-cols-4 gap-6 max-largeDesk:gap-4 max-mindesk:grid-cols-3 max-laptop:grid-cols-2 max-laptop:gap-3">
        {data?.map((item, index) => (
          <div key={index} className="h-[400px] w-full max-tablet:h-[280px]">
            <Image
              src={item.image}
              alt={`Inspiration ${index + 1}`}
              width={300}
              height={400}
              className="w-full h-full object-cover rounded-md"
              priority={index < 4}
            />
          </div>
        ))}
      </div>
      <PopUp setActive={setActive} active={active} />
    </div>
  );
}
