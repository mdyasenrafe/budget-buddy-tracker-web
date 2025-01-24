import { Text } from "@/components/atoms";
import { ChartCard } from "@/components/molecules";
import { BarChart } from "@/components/molecules/chart";
import {
  TWeeklyCardSummaryRes,
  useGetWeeklyCardSummaryQuery,
} from "@/redux/features/card";
import { colors } from "@/theme";
import { CURRENTMONTHINDEX, CURRENTYEAR, TIMEZONE } from "@/utils";
import React, { useMemo } from "react";

type TProps = {
  cardId: string;
};

export const CardSpendingIncomeChart: React.FC<TProps> = ({ cardId }) => {
  const { data, isLoading, isFetching } = useGetWeeklyCardSummaryQuery({
    id: cardId,
    year: CURRENTYEAR,
    monthIndex: CURRENTMONTHINDEX,
    timezone: TIMEZONE,
  });

  const weeklyData: TWeeklyCardSummaryRes = data?.data || {
    income: [],
    expense: [],
  };
  const labels = weeklyData?.income.map((_, index) => `Week ${index + 1}`);

  // bar chart data
  const barChartData = useMemo(
    () => ({
      labels: labels,
      datasets: [
        {
          label: "Spending",
          data: weeklyData?.expense as [],
          backgroundColor: colors.primary,
        },
        {
          label: "Income",
          data: weeklyData?.income as [],
          backgroundColor: colors.primaryLight3,
        },
      ],
    }),
    [weeklyData]
  );
  const legends = [
    {
      label: "Spending",
      bg: colors.primary,
    },
    {
      label: "Income",
      bg: colors.primaryLight3,
    },
  ];
  return (
    <ChartCard title="Spending vs. Income" loading={isLoading || isFetching}>
      <div className="flex justify-center gap-x-2 mb-6">
        {legends.map((legend) => (
          <div className="flex gap-x-2">
            <div
              className="w-5 h-5 rounded"
              style={{ backgroundColor: legend.bg }}
            ></div>
            <Text variant="p5">{legend.label}</Text>
          </div>
        ))}
      </div>
      <BarChart {...barChartData} />
    </ChartCard>
  );
};
