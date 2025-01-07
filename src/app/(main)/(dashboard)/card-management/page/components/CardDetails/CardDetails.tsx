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

interface CardDetailsProps {
  selectedCard: TCard;
}

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
          backgroundColor: "#5FC8C3",
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
          data: [300, 150, 200, 100, 50],
          backgroundColor: [
            "#2F7E79",
            "#3E9C96",
            "#4BB2AE",
            "#5FC8C3",
            "#79DAD4",
          ],
          hoverBackgroundColor: [
            "#256864",
            "#2F7E79",
            "#3E9C96",
            "#4BB2AE",
            "#5FC8C3",
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
      <div className="lg:flex justify-between w-full">
        <ChartCard title="Spending vs. Income">
          <BarChart {...barChartData} />
        </ChartCard>
        <ChartCard title="Spending Categories">
          <div className="w-full h-[350px]">
            <DoughnutChart {...doughnutChartData} />
          </div>
        </ChartCard>
      </div>
      <ChartCard title="Balance Trend" className="mt-6">
        <LineChart {...lineChartData} />
      </ChartCard>
    </div>
  );
};
