'use client'

import { useSuccessPaymentMutation } from "@/shared/api/OrdersApi/OrdersApi";

const page = () => {
  const [successPayment] = useSuccessPaymentMutation();
  const status = async () => {
    if (localStorage?.getItem("orderId")) {
      await successPayment({
        object: {
          id: localStorage.getItem("orderId"),
          status: "succeeded",
        },
      });
      window.location.href = "/";
    }
  };
	status()

  return (
    <>
      <h2>Redirect in Main Page</h2>
    </>
  );
};

export default page;
