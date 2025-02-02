import { Text } from "@/components/atoms";
import { ChartCard } from "@/components/molecules";
import { BarChart } from "@/components/molecules/chart";
import { TWeeklyCardSummaryRes } from "@/redux/features/card";
import { colors } from "@/theme";
import React, { useMemo } from "react";

type TProps = {};

export const DashboardSpendingIncomeChart: React.FC<TProps> = ({}) => {
  const weeklyData: TWeeklyCardSummaryRes = {
    income: ["34", "87"],
    expense: ["34", "54"],
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
  const legends = useMemo(
    () => [
      { label: "Spending", bg: colors.primary },
      { label: "Income", bg: colors.primaryLight3 },
    ],
    []
  );

  return (
    <ChartCard title="Spending vs. Income">
      <div className="flex justify-center gap-x-2 mb-6">
        {legends.map((legend, index) => (
          <div
            className="flex gap-x-2"
            key={index}
            aria-label={`Legend color for ${legend.label}`}
          >
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
