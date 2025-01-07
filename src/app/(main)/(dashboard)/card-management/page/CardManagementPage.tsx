"use client";

import { BarChart, LineChart, SectionHeader } from "@/components/molecules";
import React, { useCallback, useState } from "react";
import { MyCard } from "./components";
import { TCard } from "@/redux/features/cardOverview";
import { Text, Button } from "@/components/atoms";
import { FaPlus } from "react-icons/fa6";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { colors } from "@/theme";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const CardManagementPage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<TCard | null>(null);

  const handleSelectedCard = useCallback((id: TCard) => {
    setSelectedCard(id);
  }, []);

  const barChartData = {
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
        backgroundColor: "#bcf49d",
      },
    ],
  };

  return (
    <div>
      <SectionHeader
        title="Manage Your Bank Cards"
        description="Easily track and manage all your cards in one place. Check your balance, spending, and savings without any hassle."
      />

      <div className="py-20 md:py-10">
        <MyCard
          selectedCardId={selectedCard?._id as string}
          onSelectedCard={handleSelectedCard}
        />

        {!selectedCard ? (
          <div className="mt-10 flex flex-col items-center border py-5 rounded-lg">
            <div className="text-center">
              <Text variant="h3" className="text-gray-600">
                No Card Selected
              </Text>
              <Text variant="p3" className="text-gray-500 mt-2">
                Select a card to view detailed insights about your spending,
                income, and trends.
              </Text>
            </div>
            <Button
              customColor="primary"
              className=" !h-[48px]"
              icon={<FaPlus color="white" />}
            >
              <Text variant="p4" className="font-semibold text-white">
                Add New Card
              </Text>
            </Button>
          </div>
        ) : (
          <div className="mt-10">
            <div className="border py-3 rounded-md flex items-center justify-center my-6 px-3 lg:px-0">
              <Text variant="h3">{selectedCard?.bankName}</Text>
            </div>
            <div className="lg:flex justify-between w-full">
              <div className="border shadow-md w-full lg:w-[48%] rounded-lg">
                <div className="mb-6 border-b p-4">
                  <Text variant="h4">Spending vs. Income</Text>
                </div>
                <div className="p-4">
                  <BarChart {...barChartData} />
                </div>
              </div>

              <div className="border shadow-md w-full lg:w-[48%] rounded-lg mt-6 lg:mt-0">
                <div className="mb-6 border-b p-4">
                  <Text variant="h4">Spending Categories</Text>
                </div>
              </div>
            </div>
            <div className="border shadow-md w-full lg:w-[48%] rounded-lg mt-6">
              <div className="mb-6 border-b p-4 ">
                <Text variant="h4">Balance Trend</Text>
              </div>
              <div className="px-4">
                <LineChart
                  labels={["Week 1", "Week 2", "Week 3", "Week 4"]}
                  datasets={[
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
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
