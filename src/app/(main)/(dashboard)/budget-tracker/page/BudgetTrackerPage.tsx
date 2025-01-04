"use client";

import React, { useState } from "react";
import { Button, Text } from "@/components/atoms";
import { LineChart, ProgressBar } from "@/components/molecules";
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

  const budgetDetails = [
    {
      label: "Budget Limit",
      value: selectedBudgetDetails?.limit,
      className: "",
    },
    {
      label: "Amount Spent",
      value: selectedBudgetDetails?.spend,
      className: "text-red-500",
    },
    {
      label: "Remaining",
      value: 50,
      className: "text-green-500",
    },
  ];

  return (
    <div className="py-10">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
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
                  <div className="flex justify-end mt-2">
                    {/* <Text variant="p4" className="text-red">
                      Spent: ৳{budget.spend}
                    </Text> */}
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

        <Col xs={24} md={16}>
          {selectedBudgetDetails ? (
            <div className="p-5 bg-white rounded-xl shadow-md">
              <div className="mb-6">
                <Text variant="h3">{selectedBudgetDetails.name}</Text>
                <Text variant="p5" className="text-primary !font-semibold">
                  {selectedBudgetDetails.category}
                </Text>
              </div>
              <div className="flex justify-between items-center mb-10">
                {budgetDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="border w-[30%] p-3 rounded-lg shadow-md"
                  >
                    <Text
                      className="!text-gray-400 text-xs md:text-sm"
                      variant="p5"
                    >
                      {detail.label}
                    </Text>
                    <Text variant="h3" className={detail.className}>
                      ৳{detail?.value}
                    </Text>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Spending Trend</h3>
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
          ) : (
            <div className="text-center p-10">
              <p className="text-lg text-gray-600">
                Select a budget to view details
              </p>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};
