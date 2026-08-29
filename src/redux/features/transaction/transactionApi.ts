import { baseApi } from "@/api/baseApi";
import { TQueryParams, TResponse } from "../types";
import {
  TTransaction,
  TTransactionCreatePayload,
  TTransactionUpdatePayload,
  TWeeklyTransactionsParams,
} from ".";

export const transactionService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<TResponse<TTransaction[]>, TQueryParams[]>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return { url: "/transaction", params: params };
      },
      providesTags: ["Transaction"],
    }),
    createTransaction: builder.mutation<
      TResponse<TTransaction>,
      TTransactionCreatePayload
    >({
      query: (payload: TTransactionCreatePayload) => ({
        url: "/transaction",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Transaction", "Budget", "Card", "CardOverview"],
    }),
    updateTransaction: builder.mutation<
      TResponse<TTransaction>,
      { id: string; payload: TTransactionUpdatePayload }
    >({
      query: ({ id, payload }) => ({
        url: `/transaction/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Transaction", "Budget", "Card", "CardOverview"],
    }),
    deleteTransaction: builder.mutation<TResponse<TTransaction>, string>({
      query: (transactionId) => ({
        url: `/transaction/${transactionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction", "Budget", "Card", "CardOverview"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionService;
