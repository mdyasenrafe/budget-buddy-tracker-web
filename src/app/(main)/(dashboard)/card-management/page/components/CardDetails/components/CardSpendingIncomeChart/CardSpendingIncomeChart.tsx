import { ChartCard } from "@/components/molecules";
import { BarChart } from "@/components/molecules/chart";
import { colors } from "@/theme";
import React, { useMemo } from "react";

type TProps = {
  cardId: string;
};

export const CardSpendingIncomeChart: React.FC<TProps> = ({ cardId }) => {
  // bar chart data
  const barChartData = useMemo(
    () => ({
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Spending",
          data: [400, 300, 500, 600],
          backgroundColor: colors.primary,
        },
        {
          label: "Income",
          data: [600, 700, 800, 900],
          backgroundColor: colors.primaryLight3,
        },
      ],
    }),
    []
  );

  return (
    <ChartCard title="Spending vs. Income">
      <BarChart {...barChartData} />
    </ChartCard>
  );
};
