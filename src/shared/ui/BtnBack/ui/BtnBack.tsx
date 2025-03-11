"use client";

import { IoIosArrowRoundBack } from "react-icons/io";

import { useRouter } from "next/navigation";

export default function BtnBack({ label = "", className = "", ...props }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`${className} font-serif font-thin hover:bg-transparent hover:ml-2 transition-all  btn btn-ghost`}
      {...props}
    >
      <span>
        <IoIosArrowRoundBack size={30} />
      </span>
      <span> Вернуться назад </span> <p>{label}</p>
    </button>
  );
}
