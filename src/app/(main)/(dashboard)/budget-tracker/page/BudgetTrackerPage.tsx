"use client";

import React, { useState } from "react";
import { Button, Text } from "@/components/atoms";
import { LineChart, ProgressBar, SectionHeader } from "@/components/molecules";
import { colors } from "@/theme";
import { Col, Row, Dropdown, Menu } from "antd";
import { FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Chart, registerables } from "chart.js";
import dayjs from "dayjs";
import { filteredBudgetData } from "./data";
import { IconRenderer } from "./components";

Chart.register(...registerables);

export const BudgetTrackerPage = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    dayjs().format("MMMM YYYY")
  );
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  const months = Array.from({ length: 12 }, (_, i) =>
    dayjs().subtract(i, "month").format("MMMM YYYY")
  );

  const handleMonthChange = (direction: "prev" | "next") => {
    const currentIndex = months.indexOf(selectedMonth);
    const newIndex = direction === "prev" ? currentIndex + 1 : currentIndex - 1;
    if (months[newIndex]) {
      setSelectedMonth(months[newIndex]);
    }
  };

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
      value: selectedBudgetDetails?.limit - (selectedBudgetDetails?.spend || 0),
      className: "text-green-500",
    },
  ];

  return (
    <div>
      <SectionHeader
        title="Budget Tracker"
        description="Easily track your expenses, set monthly budgets, and stay on top of your finances with simple charts and progress updates. Keep your spending organized and make better financial decisions effortlessly."
      />

      <div className="flex justify-between items-center py-5">
        <Button
          customColor="secondary"
          onClick={() => handleMonthChange("prev")}
        >
          <FaChevronLeft />
        </Button>
        <div>
          <Text variant="h4">{selectedMonth}</Text>
        </div>
        <Button
          customColor="secondary"
          onClick={() => handleMonthChange("next")}
          disabled={selectedMonth === dayjs().format("MMMM YYYY")}
        >
          <FaChevronRight />
        </Button>
      </div>

      <div className="py-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <div className="border mb-5 p-3 rounded-lg">
              <div className="my-3">
                <Text variant="h3">Budgets</Text>
              </div>
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
                        <Text
                          variant="p5"
                          className="font-semibold text-primary"
                        >
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
              <div className="p-5 bg-white border rounded-lg">
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
                        className="!text-gray-400 text-[8px] md:text-sm"
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
                  <Text variant="h4" className="mb-4">
                    Spending Trend
                  </Text>
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
              <div className="text-center p-10 border rounded">
                <Text variant="p3">Select a budget to view details</Text>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};
