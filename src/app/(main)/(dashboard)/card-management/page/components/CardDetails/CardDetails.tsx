import React, { useMemo } from "react";
import { TCard } from "@/redux/features/cardOverview";
import {
  BarChart,
  DoughnutChart,
  LineChart,
} from "@/components/molecules/chart";
import { Text } from "@/components/atoms";
import { ChartCard } from "@/components/molecules";
import { colors } from "@/theme";
import { CardMetrics, CardTransactions } from "./components";

type CardDetailsProps = {
  selectedCard: TCard;
};

export const CardDetails: React.FC<CardDetailsProps> = ({ selectedCard }) => {
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

  const lineChartData = useMemo(
    () => ({
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Spending",
          data: [100, 200, 280, 100],
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
    <div className="mt-10">
      <div className="border py-3 rounded-md flex items-center justify-center my-6 px-3 lg:px-0">
        <Text variant="h3">{selectedCard?.bankName}</Text>
      </div>
      <CardMetrics />
      <div className="lg:grid grid-cols-2 grid-rows-2 grid-flow-col justify-between w-full gap-6">
        <ChartCard title="Spending vs. Income">
          <BarChart {...barChartData} />
        </ChartCard>
        <ChartCard title="Balance Trend" className="mt-6 lg:mt-0">
          <LineChart {...lineChartData} />
        </ChartCard>
        <ChartCard
          title="Spending Categories"
          className="row-span-2 mt-6 lg:mt-0"
        >
          <div className="w-full h-[350px]">
            <DoughnutChart {...doughnutChartData} />
          </div>
          <div></div>
        </ChartCard>
      </div>
      <ChartCard title="Transaction History" className=" mt-6 !mb-20">
        <CardTransactions
          selectedCardId={selectedCard?._id}
          key={selectedCard?._id}
        />
      </ChartCard>
    </div>
  );
};
