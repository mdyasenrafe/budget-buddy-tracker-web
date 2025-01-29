import React, { useMemo } from "react";
import { ChartCard } from "@/components/molecules";
import { LineChart } from "@/components/molecules/chart";
import { colors } from "@/theme";
import { TResponse } from "@/redux/features/types";

type Props = {
  balanceTrendData: TResponse<number[]>;
};

export const DashboardBalanceTrendChart: React.FC<Props> = ({
  balanceTrendData,
}) => {
  const weeklyTrend = balanceTrendData?.data || [];
  const labels = weeklyTrend.map((_, index) => `Week ${index + 1}`);

  const lineChartData = useMemo(
    () => ({
      labels: labels,
      datasets: [
        {
          label: "Total Balance",
          data: weeklyTrend,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: colors.grey,
          pointBorderColor: colors.grey,
          pointHoverBackgroundColor: colors.grey,
          pointHoverBorderColor: colors.grey,
          tension: 0,
        },
      ],
    }),
    []
  );

  return (
    <ChartCard title="Balance Trend">
      <LineChart {...lineChartData} />
    </ChartCard>
  );
};
