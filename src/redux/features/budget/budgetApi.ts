import { baseApi } from "@/api/baseApi";
import { TResponse } from "../types";
import {
  TBudget,
  TBudgetCreateRequest,
  TBudgetUpdateRequest,
} from "./budgetType";
import { TWeeklyTransactionsParams } from "../transaction";

const budgetApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBudget: build.mutation<TResponse<TBudget>, TBudgetCreateRequest>({
      query: (payload) => ({
        url: "/budget",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Budget"],
    }),
    getBudget: build.query<TResponse<TBudget[]>, number>({
      query: (monthIndex) => `/budget/month/${monthIndex}`,
      providesTags: ["Budget", "Transaction"],
    }),
    editBudget: build.mutation<TResponse<TBudget>, TBudgetUpdateRequest>({
      query: (payload) => ({
        url: `/budget/${payload.budgetId}`,
        method: "PUT",
        body: payload.payload,
      }),
      invalidatesTags: ["Budget"],
    }),
    getBudgetById: build.query<TResponse<TBudget>, string>({
      query: (id) => `/budget/${id}`,
    }),
    deleteBudget: build.mutation<TResponse<TBudget>, string>({
      query: (id) => ({
        url: `/budget/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Budget"],
    }),
    getWeeklyBudgetTransactions: build.query<
      TResponse<number[]>,
      TWeeklyTransactionsParams
    >({
      query: ({ id, year, monthIndex, timezone }) => ({
        url: `/budget/weekly-transactions/${id}`,
        params: { year, monthIndex, timezone },
      }),
      providesTags: ["Transaction"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateBudgetMutation,
  useGetBudgetQuery,
  useGetBudgetByIdQuery,
  useEditBudgetMutation,
  useDeleteBudgetMutation,
  useGetWeeklyBudgetTransactionsQuery,
} = budgetApi;
