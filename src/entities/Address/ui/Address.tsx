import { useAddAddressesMutation } from "@/shared/api/AddressApi/AddressApi";
import React, { useState } from "react";

interface IModal {
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<IModal> = ({ click, setClick }) => {
  return (
    <>
      {click ? (
        <div className="z-50 bg-black opacity-40 w-screen h-screen fixed">
          <div onClick={() => setClick(false)}>X</div>
        </div>
      ) : null}
    </>
  );
};

const Address: React.FC = () => {
  // const { data } = useGetAddressesQuery();
  const [addAddresses] = useAddAddressesMutation();
  const [click, setClick] = useState<boolean>(false);

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

  // console.log(data);

  return (
    <div className="mt-[100px] max-w-[600px] w-full flex flex-col gap-[50px]">
      <p>Сохраненных адресов нет</p>
      <button className="bg-gray-100 text-[#423C3D] px-4 py-2 hover:bg-gray-300 w-full" onClick={handleAddAddress}>
        Сохранить адрес
      </button>
      <Modal click={click} setClick={setClick} />
    </div>
  );
};

export default Address;
