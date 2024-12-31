"use client";

import React, { useState } from "react";
import { Button, Text } from "@/components/atoms";
import { ProgressBar } from "@/components/molecules";
import { colors } from "@/theme";
import { Col, Row } from "antd";
import { FaPlus } from "react-icons/fa";
import { filteredBudgetData } from "./data";
import { IconRenderer } from "./components";

export const BudgetTrackerPage = () => {
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  const handleBudgetClick = (name: string) => {
    setSelectedBudget((prev) => (prev === name ? null : name));
  };

  return (
    <div className="py-10">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <div className="border p-3 rounded-lg mb-5">
            {filteredBudgetData.map((budget) => {
              const percentageSpent = (budget.spend / budget.limit) * 100;
              const isSelected = selectedBudget === budget.name;

              return (
                <div
                  key={budget.name}
                  className={`mb-5 border p-3 rounded-md cursor-pointer ${
                    isSelected ? "bg-[#ecf4e9]" : ""
                  }`}
                  onClick={() => handleBudgetClick(budget.name)}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div
                      className={`w-[36px] h-[36px] border flex items-center justify-center rounded-full ${
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

        <Col span={16}></Col>
      </Row>
    </div>
  );
};
