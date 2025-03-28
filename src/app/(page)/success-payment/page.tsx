import { useSuccessPaymentMutation } from "@/shared/api/OrdersApi/OrdersApi";
import { useEffect } from 'react'

const page = () => {
  const [successPayment] = useSuccessPaymentMutation();
  useEffect(() => {
		if (localStorage.getItem("orderId")) {
			successPayment({
			 object: {
				 id: localStorage.getItem("orderId"),
				 status: "succeeded",
			 },
		 });
		 window.location.href="/"
	 }
	},[])

	return (
		<>
		 	<h2>Redirect in Main Page</h2>
		</>
	)
};

export default page;
