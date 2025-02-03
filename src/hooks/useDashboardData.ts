import { useAppSelector } from "@/redux";
import { selectCard } from "@/redux/features/cardOverview";
import { getCateogryLoadingState } from "@/redux/features/category";
import {
  useGetDashboardBalanceTrendQuery,
  useGetDashboardMetricQuery,
  useGetWeeklySpendIncomeComparisonQuery,
} from "@/redux/features/dashboard";
import { useGetBudgetQuery } from "@/redux/features/budget";
import { CURRENTMONTHINDEX, CURRENTYEAR, TIMEZONE } from "@/utils";
import dayjs from "dayjs";
import { TResponse } from "@/redux/features/types";
import { TWeeklyCardSummaryRes } from "@/redux/features/card";

export const useDashboardData = () => {
  const { isLoading: budgetLoading, data: budgetData } = useGetBudgetQuery(
    dayjs().month()
  );
  const { data, isLoading: metricLoading } = useGetDashboardMetricQuery({
    year: CURRENTYEAR,
    monthIndex: CURRENTMONTHINDEX,
    timezone: TIMEZONE,
  });
  const {
    data: BalanceTrendData,
    isLoading: BalanceTrendLoading,
    isFetching,
  } = useGetDashboardBalanceTrendQuery({
    year: CURRENTYEAR,
    monthIndex: CURRENTMONTHINDEX,
    timezone: TIMEZONE,
  });

  const {
    data: weeklySpendIncomeData,
    isLoading: weeklySpendIncomeLoading,
    isFetching: weeklySpendIncomeFetching,
  } = useGetWeeklySpendIncomeComparisonQuery({
    year: CURRENTYEAR,
    monthIndex: CURRENTMONTHINDEX,
    timezone: TIMEZONE,
  });

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
