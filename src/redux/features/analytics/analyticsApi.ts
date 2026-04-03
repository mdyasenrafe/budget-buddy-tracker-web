import { baseApi } from "@/api/baseApi";
import { TResponse } from "../types";
import { TAnalyticsQuery, TAnalyticsResponse } from "./analyticsType";

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpendingAnalytics: builder.query<TResponse<TAnalyticsResponse>, TAnalyticsQuery>({
      query: (params) => ({
        url: "/analytics/spending",
        params,
      }),
      providesTags: ["Transaction"],
    }),
    getIncomeAnalytics: builder.query<TResponse<TAnalyticsResponse>, TAnalyticsQuery>({
      query: (params) => ({
        url: "/analytics/income",
        params,
      }),
      providesTags: ["Transaction"],
    }),
  }),
});

export const { useGetSpendingAnalyticsQuery, useGetIncomeAnalyticsQuery } = analyticsApi;
