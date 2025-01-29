import { useAppSelector } from "@/redux";
import { selectCard } from "@/redux/features/cardOverview";
import { getCateogryLoadingState } from "@/redux/features/category";
import { useGetDashboardMetricQuery } from "@/redux/features/dashboard";
import { useGetBudgetQuery } from "@/redux/features/budget";
import { CURRENTMONTHINDEX, CURRENTYEAR, TIMEZONE } from "@/utils";
import dayjs from "dayjs";

export const useDashboardData = () => {
  const { isLoading: budgetLoading, data: budgetData } = useGetBudgetQuery(
    dayjs().month()
  );
  const { data, isLoading: metricLoading } = useGetDashboardMetricQuery({
    year: CURRENTYEAR,
    monthIndex: CURRENTMONTHINDEX,
    timezone: TIMEZONE,
  });

  const activeCard = useAppSelector(selectCard);
  const isLoading =
    useAppSelector(getCateogryLoadingState) || metricLoading || budgetLoading;

  return {
    isLoading,
    metricData: data?.data,
    activeCard,
    budgetData: budgetData?.data || [],
  };
};
