"use client";

import React, { useState } from "react";
import { Button, Text } from "@/components/atoms";
import { ProgressBar } from "@/components/molecules";
import { colors } from "@/theme";
import { Col, Row } from "antd";
import { FaPlus } from "react-icons/fa";
import { Pie, Bar } from "react-chartjs-2";
import { IconRenderer } from "./components";
import { filteredBudgetData } from "./data";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export const BudgetTrackerPage = () => {
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  const handleBudgetClick = (name: string) => {
    setSelectedBudget(name);
  };

  const selectedBudgetDetails = filteredBudgetData.find(
    (budget) => budget.name === selectedBudget
  );

  // Pie chart data for the selected budget category
  const pieChartData = selectedBudgetDetails
    ? {
        labels: [selectedBudgetDetails.category],
        datasets: [
          {
            data: [selectedBudgetDetails.spend],
            backgroundColor: ["#FF6384"],
          },
        ],
      }
    : { labels: [], datasets: [] };

  // Bar chart data for the selected budget's "Limit vs. Spend"
  const barChartData = selectedBudgetDetails
    ? {
        labels: [selectedBudgetDetails.name],
        datasets: [
          {
            label: "Budget Limit",
            data: [selectedBudgetDetails.limit],
            backgroundColor: "#36A2EB",
          },
          {
            label: "Amount Spent",
            data: [selectedBudgetDetails.spend],
            backgroundColor: "#FF6384",
          },
        ],
      }
    : { labels: [], datasets: [] };

  return (
    <div className="py-10">
      <Row gutter={[16, 16]}>
        {/* Left Panel */}
        <Col span={8}>
          <div className="border mb-5 p-3 rounded-lg">
            {filteredBudgetData.map((budget) => {
              const percentageSpent = (budget.spend / budget.limit) * 100;
              const isSelected = selectedBudget === budget.name;

              return (
                <div
                  key={budget.name}
                  className={`mb-5 border p-3 rounded-md cursor-pointer transition-all duration-300 ${
                    isSelected ? "bg-[#ecf4e9]" : ""
                  }`}
                  onClick={() => handleBudgetClick(budget.name)}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div
                      className={`w-[36px] h-[36px] border flex items-center justify-center rounded-full transition-all duration-300 ${
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-[#ecf4e9] text-black"
                      }`}
                    >
                      <IconRenderer category={budget.category} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <Text variant="p3" className="!font-medium">
                          {budget.name}
                        </Text>
                        <Text variant="p3" className="!font-medium">
                          ৳{budget.limit}
                        </Text>
                      </div>
                      <Text variant="p5" className="font-semibold text-primary">
                        {budget.category}
                      </Text>
                    </div>
                  </div>
                  <ProgressBar
                    percentage={percentageSpent}
                    strokeColor={
                      percentageSpent > 100 ? "#f5222d" : colors.primary
                    }
                    height="20px"
                    showLabel={false}
                  />
                  <div className="flex justify-between mt-2">
                    <Text variant="p4" className="text-red">
                      Spent: ৳{budget.spend}
                    </Text>
                    <Text
                      variant="p4"
                      className={`font-bold ${
                        percentageSpent > 100
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {percentageSpent > 100
                        ? "Over Budget"
                        : `${percentageSpent.toFixed(1)}%`}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bottom-10 w-[80%] sticky z-10 mx-auto">
            <Button
              customColor="primary"
              className="w-full !h-[48px]"
              icon={<FaPlus color="white" />}
            >
              <Text variant="p3" className="font-semibold text-white">
                Add Budget
              </Text>
            </Button>
          </div>
        </Col>

        {/* Right Panel */}
        <Col span={16}>
          {selectedBudgetDetails ? (
            <>
              {/* Top Section: Graphs */}
              <div className="border-b mb-5 pb-5">
                <h2 className="text-lg font-bold mb-3">Spending Overview</h2>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Pie data={pieChartData} />
                  </Col>
                  <Col span={12}>
                    <Bar data={barChartData} />
                  </Col>
                </Row>
              </div>

              {/* Middle Section: Budget Details */}
              <div>
                <h2 className="text-lg font-bold mb-3">Budget Details</h2>
                <div className="p-4 bg-gray-100 rounded-lg mb-5">
                  <h3 className="text-md font-semibold">
                    {selectedBudgetDetails.name}
                  </h3>
                  <p>Limit: ৳{selectedBudgetDetails.limit}</p>
                  <p>Spent: ৳{selectedBudgetDetails.spend}</p>
                  <p>
                    Remaining: ৳
                    {selectedBudgetDetails.limit - selectedBudgetDetails.spend}
                  </p>
                  <p
                    className={`font-bold ${
                      selectedBudgetDetails.spend /
                        selectedBudgetDetails.limit >
                      1
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {selectedBudgetDetails.spend / selectedBudgetDetails.limit >
                    1
                      ? "Over Budget"
                      : `${(
                          (selectedBudgetDetails.spend /
                            selectedBudgetDetails.limit) *
                          100
                        ).toFixed(1)}% Spent`}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-lg text-gray-500">
              Select a budget to see details.
            </p>
          )}
        </Col>
      </Row>
    </div>
  );
};
