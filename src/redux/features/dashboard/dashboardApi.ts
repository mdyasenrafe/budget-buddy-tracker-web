import { baseApi } from "@/api/baseApi";
import { TResponse } from "../types";
import { TDashbaordParams, TDashboardMetricRes } from ".";

const budgetApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboardMetric: build.query<
      TResponse<TDashboardMetricRes>,
      TDashbaordParams
    >({
      query: ({ year, monthIndex, timezone }) => ({
        url: `/dashboard/metric`,
        params: { year, monthIndex, timezone },
      }),
      providesTags: ["Transaction", "Card"],
    }),
    getDashboardBalanceTrend: build.query<
      TResponse<number[]>,
      TDashbaordParams
    >({
      query: ({ year, monthIndex, timezone }) => ({
        url: `/dashboard/balance-trend`,
        params: { year, monthIndex, timezone },
      }),
      providesTags: ["Transaction"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetDashboardMetricQuery, useGetDashboardBalanceTrendQuery } =
  budgetApi;
