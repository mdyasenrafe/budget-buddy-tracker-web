import { ChartCard } from "@/components/molecules";
import { LineChart } from "@/components/molecules/chart";
import { useGetWeeklyCardTransactionsQuery } from "@/redux/features/transaction";
import { colors } from "@/theme";
import { CURRENTMONTHINDEX, CURRENTYEAR, TIMEZONE } from "@/utils";
import React, { useEffect, useMemo } from "react";

type CardTrendChartProps = {
  cardId: string;
};

export const CardTrendChart: React.FC<CardTrendChartProps> = ({ cardId }) => {
  const { data, isLoading, isFetching } = useGetWeeklyCardTransactionsQuery({
    id: cardId,
    year: CURRENTYEAR,
    monthIndex: CURRENTMONTHINDEX,
    timezone: TIMEZONE,
  });
  const weeklyTrend = data?.data || [];
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
        },
      ],
    }),
    [weeklyTrend]
  );

  return (
    <ChartCard
      title="Balance Trend"
      className="mt-6 lg:mt-0"
      loading={isLoading || isFetching}
    >
      <LineChart {...lineChartData} />
    </ChartCard>
  );
};
