import React, { useMemo } from "react";
import { TCard } from "@/redux/features/cardOverview";
import { DoughnutChart } from "@/components/molecules/chart";
import { Text } from "@/components/atoms";
import { ChartCard } from "@/components/molecules";
import { colors } from "@/theme";
import {
  CardMetrics,
  CardSpendingIncomeChart,
  CardTransactions,
  CardTrendChart,
} from "./components";

type CardDetailsProps = {
  selectedCard: TCard;
};

export const CardDetails: React.FC<CardDetailsProps> = ({ selectedCard }) => {
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
    <div className="mt-10">
      <div className="border py-3 rounded-md flex items-center justify-center my-6 px-3 lg:px-0">
        <Text variant="h3">{selectedCard?.bankName}</Text>
      </div>
      <CardMetrics cardId={selectedCard?._id as string} />
      <div className="lg:grid grid-cols-2 grid-rows-2 grid-flow-col justify-between w-full gap-6">
        <CardSpendingIncomeChart cardId={selectedCard?._id} />
        <CardTrendChart cardId={selectedCard?._id} />
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
