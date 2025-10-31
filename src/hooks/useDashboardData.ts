import { useAppSelector } from "@/redux";
import { selectCard } from "@/redux/features/cardOverview";
import { getCateogryLoadingState } from "@/redux/features/category";
import {
  useGetDashboardBalanceTrendQuery,
  useGetDashboardMetricQuery,
  useGetWeeklySpendIncomeComparisonQuery,
} from "@/redux/features/dashboard";
import { useGetBudgetQuery } from "@/redux/features/budget";
import { TIMEZONE } from "@/utils";
import { TResponse } from "@/redux/features/types";
import { TWeeklyCardSummaryRes } from "@/redux/features/card";
import { selectMonthIndex, selectYear } from "@/redux/features/month";
import { useMemo } from "react";

export const useDashboardData = () => {
  const year = useAppSelector(selectYear);
  const monthIndex = useAppSelector(selectMonthIndex);

  const metricParams = useMemo(
    () => ({ year, monthIndex, timezone: TIMEZONE }),
    [year, monthIndex]
  );

  const trendParams = metricParams;
  const weeklyParams = metricParams;

  const { isLoading: budgetLoading, data: budgetData } =
    useGetBudgetQuery(monthIndex);

  const { data, isLoading: metricLoading } =
    useGetDashboardMetricQuery(metricParams);

  const {
    data: BalanceTrendData,
    isLoading: BalanceTrendLoading,
    isFetching,
  } = useGetDashboardBalanceTrendQuery(trendParams);

  const {
    data: weeklySpendIncomeData,
    isLoading: weeklySpendIncomeLoading,
    isFetching: weeklySpendIncomeFetching,
  } = useGetWeeklySpendIncomeComparisonQuery(weeklyParams);

  // Other UI state
  const activeCard = useAppSelector(selectCard);

  const isLoading =
    useAppSelector(getCateogryLoadingState) ||
    metricLoading ||
    budgetLoading ||
    BalanceTrendLoading ||
    weeklySpendIncomeLoading ||
    isFetching ||
    weeklySpendIncomeFetching;

  return {
    isLoading,
    metricData: data?.data,
    activeCard,
    budgetData: budgetData?.data || [],
    balanceTrendData: BalanceTrendData as TResponse<number[]>,
    weeklySpendIncomeData: weeklySpendIncomeData?.data as TWeeklyCardSummaryRes,
  };
};
