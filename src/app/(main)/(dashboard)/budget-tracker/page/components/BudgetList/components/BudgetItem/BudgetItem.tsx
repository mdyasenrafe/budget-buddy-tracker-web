import React, { memo, useMemo } from "react";
import { ProgressBar } from "@/components/molecules";
import { Text } from "@/components/atoms";
import { colors } from "@/theme";
import { TBudget } from "../../../../data";
import { IconRenderer } from "../IconRenderer";
import { truncateText } from "@/utils";

type BudgetItemProps = {
  budget: TBudget;
  isSelected: boolean;
  onClick: () => void;
};

export const BudgetItem = memo(
  ({ budget, isSelected, onClick }: BudgetItemProps) => {
    const percentageSpent = useMemo(
      () => (budget.spend / budget.limit) * 100,
      [budget]
    );

    return (
      <div
        className={`mb-5 border p-3 rounded-md cursor-pointer transition-all duration-300 h-full ${
          isSelected ? "bg-[#ecf4e9]" : ""
        }`}
        onClick={onClick}
      >
        <div className="flex items-center space-x-3 mb-2">
          <div
            className={`w-[36px] h-[36px] border flex items-center justify-center rounded-full transition-all duration-300 ${
              isSelected ? "bg-primary text-white" : "bg-[#ecf4e9] text-black"
            }`}
          >
            <IconRenderer category={budget.category} />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-center">
              <Text variant="p3" className="!font-medium">
                {truncateText(budget.name, 23)}
              </Text>
              <Text variant="p3" className="!font-medium hidden md:block">
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
    );
  }
);
