"use client";

import { IoIosArrowRoundBack } from "react-icons/io";

import { useRouter } from "next/navigation";

export default function BtnBack({ label = "", className = "", ...props }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`${className} font-serif max-sm:text-[#808080] max-sm:hover:text-black font-thin hover:bg-transparent hover:ml-2 transition-all  max-sm:px-0 btn btn-ghost max-sm:!ml-0`}
      {...props}
    >
      <span>
        <IoIosArrowRoundBack size={30} className="max-sm:hidden" />
        <IoIosArrowRoundBack size={24} className="sm:hidden"/>
      </span>
      <span className="max-sm:font-bold max-sm:text-sm "> Вернуться назад </span>
      <p className="max-sm:hidden">{label}</p>
    </button>
  );
}
