import React, { useMemo } from "react";
import { ChartCard } from "@/components/molecules";
import { LineChart } from "@/components/molecules/chart";
import { colors } from "@/theme";

export const DashboardBalanceTrendChart: React.FC = () => {
  const lineChartData = useMemo(
    () => ({
      labels: ["Week 1", "Week 2", "Week 3"],
      datasets: [
        {
          label: "Total Balance",
          data: [12, 23, 23],
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: colors.grey,
          pointBorderColor: colors.grey,
          pointHoverBackgroundColor: colors.grey,
          pointHoverBorderColor: colors.grey,
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
