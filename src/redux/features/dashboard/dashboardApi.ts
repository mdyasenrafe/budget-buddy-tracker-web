import { baseApi } from "@/api/baseApi";
import { TResponse } from "../types";
import { TDashbaordMetricParams, TDashboardMetricRes } from ".";

const budgetApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboardMetric: build.query<
      TResponse<TDashboardMetricRes>,
      TDashbaordMetricParams
    >({
      query: ({ year, monthIndex, timezone }) => ({
        url: `/dashboard/metric`,
        params: { year, monthIndex, timezone },
      }),
      providesTags: ["Transaction", "Card"],
    }),
  }),
  overrideExisting: false,
});

export const {} = budgetApi;
