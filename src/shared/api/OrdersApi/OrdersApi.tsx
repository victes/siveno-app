import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrdersApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://kudzer5h.beget.tech/api/",
  }),
  endpoints: builder => ({
    getOrders: builder.query<[], void>({
      query: () => "orders",
    }),
    createOrder: builder.mutation({
      query: orderData => ({
        url: "orders",
        method: "POST",
        body: orderData,
      }),
    }),
    getOrderById: builder.query({
      query: id => `orders/${id}`,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, paymentData }) => ({
        url: `orders/${orderId}/pay`,
        method: "POST",
        body: paymentData,
      }),
    }),
    confirmPayment: builder.mutation({
      query: orderId => ({
        url: `orders/${orderId}/confirm-payment`,
        method: "POST",
      }),
    }),
    cancelOrder: builder.mutation({
      query: orderId => ({
        url: `orders/${orderId}/cancel`,
        method: "POST",
      }),
    }),
    handlePaymentWebhook: builder.mutation({
      query: webhookData => ({
        url: "orders/webhook",
        method: "POST",
        body: webhookData,
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  usePayOrderMutation,
  useConfirmPaymentMutation,
  useCancelOrderMutation,
  useHandlePaymentWebhookMutation,
} = OrdersApi;
