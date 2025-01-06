import React, { memo, useMemo } from "react";
import { ProgressBar } from "@/components/molecules";
import { Card } from "antd";
import { Button, Text } from "@/components/atoms";
import { TBudget } from "../../data";
import { BudgetItem, IconRenderer } from "./components";
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
            {budgets.map((budget) => (
              <BudgetItem
                key={budget.name}
                budget={budget}
                isSelected={selectedBudget === budget.name}
                onClick={() => onBudgetClick(budget.name)}
              />
            ))}
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
