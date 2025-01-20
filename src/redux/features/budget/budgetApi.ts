import { baseApi } from "@/api/baseApi";
import { TResponse } from "../types";
import {
  TBudget,
  TBudgetCreateRequest,
  TBudgetUpdateRequest,
} from "./budgetType";

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
  }),
  overrideExisting: false,
});

export const {
  useCreateBudgetMutation,
  useGetBudgetQuery,
  useGetBudgetByIdQuery,
  useEditBudgetMutation,
} = budgetApi;
