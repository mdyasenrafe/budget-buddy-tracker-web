import { baseApi } from "@/api/baseApi";
import { TResponse } from "../types";
import { TBudget, TBudgetCreateRequest } from "./budgetType";

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
} = budgetApi;
