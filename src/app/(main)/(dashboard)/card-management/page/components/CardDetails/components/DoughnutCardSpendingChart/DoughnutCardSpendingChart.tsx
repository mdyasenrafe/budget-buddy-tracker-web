import { ChartCard } from "@/components/molecules";
import { DoughnutChart } from "@/components/molecules/chart";
import { colors } from "@/theme";
import React, { useMemo } from "react";

type Props = {
  cardId: string;
};

export const DoughnutCardSpendingChart: React.FC<Props> = ({ cardId }) => {
  const doughnutChartData = useMemo(
    () => ({
      labels: ["Food", "Travel", "Shopping", "Bills", "Others"],
      datasets: [
        {
          data: [300, 150, 70, 80, 50],
          backgroundColor: [
            colors.secondary,
            colors.primaryBase,
            colors.primaryLight1,
            colors.primaryLight2,
            colors.primaryLight3,
          ],
          hoverBackgroundColor: [
            colors.primaryBase,
            colors.primaryDark,
            colors.primaryLight3,
            colors.primaryLight2,
            colors.primaryLight1,
          ],
        },
      ],
    }),
    []
  );

  return (
    <ChartCard title="Spending Categories" className="row-span-2 mt-6 lg:mt-0">
      <div className="w-full h-[350px]">
        <DoughnutChart {...doughnutChartData} />
      </div>
      <div></div>
    </ChartCard>
  );
};
