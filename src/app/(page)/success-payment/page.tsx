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
	window.location.href="/"

	return (
		<>
		 	<h2>Redirect in Main Page</h2>
		</>
	)
};

export default page;
