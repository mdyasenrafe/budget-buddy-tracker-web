import { baseApi } from "@/api/baseApi";
import { TQueryParams, TResponse } from "../types";
import {
  TTransaction,
  TTransactionCreatePayload,
  TWeeklyBudgetTransactionsParams,
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
    getWeeklyBudgetTransactions: builder.query<
      TResponse<number[]>,
      TWeeklyBudgetTransactionsParams
    >({
      query: ({ budgetId, year, monthIndex, timezone }) => ({
        url: `/transaction/weekly-budget-transactions/${budgetId}`,
        params: { year, monthIndex, timezone },
      }),
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
      invalidatesTags: ["Transaction"],
    }),
    deleteTransaction: builder.mutation<TResponse<TTransaction>, string>({
      query: (transactionId) => ({
        url: `/transaction/${transactionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useGetWeeklyBudgetTransactionsQuery,
  useDeleteTransactionMutation,
} = transactionService;
