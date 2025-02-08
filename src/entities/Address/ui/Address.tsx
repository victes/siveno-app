// import { useGetAddressesQuery } from "@/shared/api/AddressApi/AddressApi";
import { useAddAddressesMutation, useGetAddressesQuery } from "@/shared/api/AddressApi/AddressApi";
import React from "react";

const Address = () => {
  const { data } = useGetAddressesQuery();
  const [addAddresses] = useAddAddressesMutation();

  const handleAddAddress = () => {
    addAddresses({
      is_primary: false,
      state: "State",
      city: "State",
      street: "State",
      house: "State",
      postal_code: "State",
      apartment: "State",
    });
  };
  console.log(data);
  return (
    <div className="mt-[100px] max-w-[600px] w-full flex flex-col gap-[50px]">
      <p>Сохранненых адресов нет</p>
      <button
        className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300 w-full"
        onClick={() => handleAddAddress()}
      >
        {" "}
        Сохранить адрес{" "}
      </button>
    </div>
  );
};

export default Address;
