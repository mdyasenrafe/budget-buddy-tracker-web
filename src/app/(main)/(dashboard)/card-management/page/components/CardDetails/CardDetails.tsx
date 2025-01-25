import React, { useMemo } from "react";
import { TCard } from "@/redux/features/cardOverview";
import { DoughnutChart } from "@/components/molecules/chart";
import { Text } from "@/components/atoms";
import { ChartCard } from "@/components/molecules";
import {
  CardMetrics,
  CardSpendingIncomeChart,
  CardTransactions,
  CardTrendChart,
  DoughnutCardSpendingChart,
} from "./components";

type CardDetailsProps = {
  selectedCard: TCard;
};

export const CardDetails: React.FC<CardDetailsProps> = ({ selectedCard }) => {
  return (
    <div className="mt-10">
      <div className="border py-3 rounded-md flex items-center justify-center my-6 px-3 lg:px-0">
        <Text variant="h3">{selectedCard?.bankName}</Text>
      </div>
      <CardMetrics cardId={selectedCard?._id as string} />
      <div className="lg:grid grid-cols-2 grid-rows-2 grid-flow-col justify-between w-full gap-6">
        <CardSpendingIncomeChart cardId={selectedCard?._id} />
        <CardTrendChart cardId={selectedCard?._id} />
        <DoughnutCardSpendingChart cardId={selectedCard?._id} />
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
