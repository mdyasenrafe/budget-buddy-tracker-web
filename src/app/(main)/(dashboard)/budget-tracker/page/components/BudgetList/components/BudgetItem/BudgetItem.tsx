import React, { memo, useMemo } from "react";
import { ProgressBar } from "@/components/molecules";
import { Text } from "@/components/atoms";
import { colors } from "@/theme";
import { IconRenderer } from "../IconRenderer";
import { truncateText } from "@/utils";
import { TBudget } from "@/redux/features/budget";
import { BudgetListDropdown } from "./components";

type BudgetItemProps = {
  budget: TBudget;
  isSelected: boolean;
  onClick: () => void;
};

export const BudgetItem = memo(
  ({ budget, isSelected, onClick }: BudgetItemProps) => {
    const percentageSpent = useMemo(
      () => (budget.spent / budget.limit) * 100,
      [budget]
    );

    return (
      <div
        className={`mb-5 border py-3 rounded-md cursor-pointer transition-all duration-300 h-full relative ${
          isSelected ? "bg-[#ecf4e9]" : ""
        }`}
        onClick={onClick}
      >
        <div className="flex items-center space-x-3 mb-2 pl-3">
          <div
            className={`w-[36px] h-[36px] border flex items-center justify-center rounded-full transition-all duration-300 ${
              isSelected ? "bg-primary text-white" : "bg-[#ecf4e9] text-black"
            }`}
          >
            <IconRenderer category={budget?.category?.label} />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-center">
              <Text variant="p3" className="!font-medium">
                {truncateText(budget.name, 23)}
              </Text>
              <div className="flex items-center">
                <Text variant="p3" className="!font-medium hidden md:block">
                  ৳{budget.limit}
                </Text>
                <BudgetListDropdown activeBudget={budget} />
              </div>
            </div>
            <Text variant="p5" className="font-semibold text-primary">
              {budget?.category?.label}
            </Text>
          </div>
        </div>
        <div className="px-3">
          <ProgressBar
            percentage={percentageSpent}
            strokeColor={percentageSpent > 100 ? "#f5222d" : colors.primary}
            height="20px"
            showLabel={false}
          />
          <div className="flex justify-end mt-2">
            <Text
              variant="p4"
              className={`font-bold ${
                percentageSpent > 100 ? "text-red-500" : "text-green-500"
              }`}
            >
              {percentageSpent > 100
                ? "Over Budget"
                : `${percentageSpent.toFixed(1)}%`}
            </Text>
          </div>
        </div>
      </div>
    );
  }
);
