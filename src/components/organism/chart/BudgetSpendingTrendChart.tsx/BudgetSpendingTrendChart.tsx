import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { ChartCard } from "@/components/molecules";
import { LineChart } from "@/components/molecules/chart";
import { useGetWeeklyBudgetTransactionsQuery } from "@/redux/features/transaction";
import { colors } from "@/theme";
import { CURRENTMONTHINDEX, CURRENTYEAR, TIMEZONE } from "@/utils";
import React from "react";

type TBudgetSpendingTrendChartProps = {
  budgetId: string;
};

export const BudgetSpendingTrendChart: React.FC<
  TBudgetSpendingTrendChartProps
> = ({ budgetId }) => {
  const { data, isLoading, error } = useGetWeeklyBudgetTransactionsQuery({
    budgetId,
    year: CURRENTYEAR,
    monthIndex: CURRENTMONTHINDEX,
    timezone: TIMEZONE,
  });

  const weeklySpending = data?.data || [];
  const labels = weeklySpending.map((_, index) => `Week ${index + 1}`);

  return (
    <ChartCard title="Spending Trend">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <LineChart
          labels={labels}
          datasets={[
            {
              label: "Spending",
              data: weeklySpending as number[],
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: colors.grey,
              pointBorderColor: colors.grey,
              pointHoverBackgroundColor: colors.grey,
              pointHoverBorderColor: colors.grey,
            },
          ]}
        />
      )}
    </ChartCard>
  );
};
