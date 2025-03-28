import { useSuccessPaymentMutation } from "@/shared/api/OrdersApi/OrdersApi";

const page = async () => {
  const [successPayment] = useSuccessPaymentMutation();
  if (localStorage.getItem("orderId")) {
    await successPayment({
      object: {
        id: localStorage.getItem("orderId"),
        status: "succeeded",
      },
    });
  }
	return window.location.href="/"
};

export default page;
