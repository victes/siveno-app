import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import array from "../img/array.png";
import Image from "next/image";
import { FilterKey, IOnChange } from "@/widgets/AllProductsPage/ui/AllProductsPage";

interface SelectOption {
  option: string;
  value: string;
}

interface SelectProps {
  title: string;
  options?: SelectOption[];
  onChange1: (value: string) => void;
  onChange2: (value: IOnChange) => void;
  name_first?: string;
  name_second?: string;
  options1?: SelectOption[];
  options2?: SelectOption[];
}

const Select: React.FC<SelectProps> = ({
  title,
  options,
  onChange1,
  onChange2,
  name_first,
  name_second,
  options1,
  options2,
}: SelectProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [activeFilterColor, setActiveFilterColor] = useState<string>("");
  const [activeFilterSize, setActiveFilterSize] = useState<string>("");
  const [activeSorted, setActiveSorted] = useState<string>("");

  const updateSort = (value: string) => {
    setActiveSorted(value);
    onChange1(value);
  };

  const updateFilterSize = (size: string) => {
    setActiveFilterSize(size)
    const filter: FilterKey = 'size'
    const fetch = {filter, value: size}
    onChange2(fetch)
  }

  const updateFilterColor = (color: string) => {
    setActiveFilterColor(color)
    const filter: FilterKey = 'color'
    const fetch = {filter, value: color}
    onChange2(fetch)
  }

  return (
    <div className="pl-2">
      <h3
        onClick={() => setActive(!active)}
        className=" mb-5 flex items-center gap-[5px] text-black text-[20px] cursor-pointer"
      >
        {title}<Image className={!active ? "rotate-180" : ""} width={20} height={24} src={array} alt="..." />
      </h3>
      <div className="flex flex-col gap-1" style={!active ? { display: "none" } : {}}>
        {options ? (
          options.map((option, index) => (
            <div
              key={index}
              onClick={() => updateSort(option.value)}
              className="cursor-pointer flex flex-row gap-3 items-center"
            >
              <div className="size-[20px] flex justify-center items-center border-zinc-500 border-2 rounded-full">
                {activeSorted === option.value && <div className="size-[12px] bg-zinc-500 rounded-full" />}
              </div>
              <h3>{option.option}</h3>
            </div>
          ))
        ) : (
          <div className="flex flex-row gap-10">
            <div>
              <p className="text-[18px] font-bold mb-2 text-black">{name_first}</p>
              {options1?.map((option, index) => (
                <div
                  key={index}
                  onClick={() => updateFilterColor(option.value)}
                  className="cursor-pointer flex flex-row gap-3 items-center"
                  style={index === 0 ? { display: "none" } : {}}
                >
                  <div className="size-[20px] flex justify-center items-center border-zinc-500 border-2 rounded-full">
                    {activeFilterColor === option.value && <div className="size-[12px] bg-zinc-500 rounded-full" />}
                  </div>
                  <h3>{option.option}</h3>
                </div>
              ))}
            </div>
            <div>
            <h3 className="text-[18px] font-bold mb-2 text-black">{name_second}</h3>
              {options2?.map((option, index) => (
                <div
                  key={index}
                  onClick={() => updateFilterSize(option.value)}
                  className="cursor-pointer flex flex-row gap-3 items-center"
                >
                  <div className="size-[20px] flex justify-center items-center border-zinc-500 border-2 rounded-full">
                    {activeFilterSize === option.value && <div className="size-[12px] bg-zinc-500 rounded-full" />}
                  </div>
                  <h3>{option.option}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
