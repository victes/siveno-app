import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const OrdersApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: headers => {
      // Добавляем токен в заголовки
      const token = localStorage.getItem("access_token");
      headers.set("accept", 'application/json');
      headers.set("Content-Type", 'application/json');
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        // Или, если нужно использовать X-CSRF-TOKEN:
        headers.set("X-CSRF-TOKEN", token);
      }
      return headers;
    },
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
      query: data => ({
        url: `payments`,
        method: "POST",
        body: data
      }),
    }),
    successPayment: builder.mutation({
      query: objectData => ({
        url: `payments/webhook`,
        method: "POST",
        body: objectData
      })
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
  useSuccessPaymentMutation,
} = OrdersApi;
