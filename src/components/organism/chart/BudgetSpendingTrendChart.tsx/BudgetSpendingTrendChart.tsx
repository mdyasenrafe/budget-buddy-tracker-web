import { ChartCard } from "@/components/molecules";
import { LineChart } from "@/components/molecules/chart";
import { colors } from "@/theme";
import React from "react";

type TBudgetSpendingTrendChartProps = {
  budgetId: string;
};

export const BudgetSpendingTrendChart: React.FC<
  TBudgetSpendingTrendChartProps
> = ({ budgetId }) => {
  return (
    <ChartCard title="Spending Trend">
      <LineChart
        labels={["Week 1", "Week 2", "Week 3", "Week 4"]}
        datasets={[
          {
            label: "Spending",
            data: [0, 0, 2000, 0, 20],
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: colors.grey,
            pointBorderColor: colors.grey,
            pointHoverBackgroundColor: colors.grey,
            pointHoverBorderColor: colors.grey,
          },
        ]}
      />
    </ChartCard>
  );
};
