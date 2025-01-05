import React, { memo, useMemo } from "react";
import { ProgressBar } from "@/components/molecules";
import { Card } from "antd";
import { Button, Text } from "@/components/atoms";
import { TBudget } from "../../data";
import { IconRenderer } from "./components";
import { colors } from "@/theme";
import { FaPlus } from "react-icons/fa";

type BudgetListProps = {
  budgets: TBudget[];
  selectedBudget: string | null;
  onBudgetClick: (name: string) => void;
};

export const BudgetList = memo(
  ({ budgets, selectedBudget, onBudgetClick }: BudgetListProps) => {
    return (
      <div>
        <div className="border mb-5 rounded-lg">
          <div className="my-3 border-b p-3">
            <Text variant="h3">Budgets</Text>
          </div>
          <div className="p-3">
            {budgets.map((budget) => {
              const percentageSpent = (budget.spend / budget.limit) * 100;
              const isSelected = selectedBudget === budget.name;

              return (
                <div
                  key={budget.name}
                  className={`mb-5 border p-3 rounded-md cursor-pointer transition-all duration-300 ${
                    isSelected ? "bg-[#ecf4e9]" : ""
                  }`}
                  onClick={() => onBudgetClick(budget.name)}
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
      </div>
    );
  }
);
