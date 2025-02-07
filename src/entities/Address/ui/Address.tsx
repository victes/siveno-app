// import { useGetAddressesQuery } from "@/shared/api/AddressApi/AddressApi";
import React from "react";

const Address = () => {
  // const { data } = useGetAddressesQuery();
  return (
    <div className="mt-[100px] max-w-[600px] w-full flex flex-col gap-[50px]">
      <p>Сохранненых адресов нет</p>
      <button className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300 w-full"> Сохранить адресс </button>
    </div>
  );
};

export default Address;
