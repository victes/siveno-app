'use client'

import AccordionFAQ from "@/shared/ui/AccordionFAQ";
import { useGetFaqsQuery } from "@/shared/api/FaqApi/ui/FaqApi";

function Faq(){
  const {data: faqs, isLoading, error} = useGetFaqsQuery()

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки</p>;

  return (
    <div className="flex flex-col  mx-auto items-center max-w-[1200px] w-full  text-text bona">
      <h1 className="title-h1">FAQ</h1>
      <div className="flex flex-col gap-[20px] mt-[40px] w-full">
        {faqs?.map((item, idx) => {
          return (
            <AccordionFAQ key={idx} question={item.question} answer={item.answer} />
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
