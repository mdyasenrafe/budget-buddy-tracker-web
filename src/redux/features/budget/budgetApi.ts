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
    }),
    getBudget: build.query<TResponse<TBudget>, number>({
      query: (monthIndex) => `/budget/${monthIndex}`,
    }),
  }),
});

export const { useCreateBudgetMutation, useGetBudgetQuery } = budgetApi;
