import React, { memo } from "react";
import { Text } from "@/components/atoms";
import { TBudget } from "@/redux/features/budget";
import { BudgetDetailCard, BudgetDetailSwiper } from "./components";
import { BudgetSpendingTrendChart } from "@/components/organism/chart";

type BudgetDetailsProps = {
  budgetDetails: TBudget | null;
};

export type TBudgetDeailsCard = {
  label: string;
  value: number;
  className: string;
};

export const BudgetDetails = memo(({ budgetDetails }: BudgetDetailsProps) => {
  if (!budgetDetails) {
    return (
      <div className="text-center p-10 border rounded">
        <Text variant="p3">Select a budget to view details</Text>
      </div>
    );
  }

  const details: TBudgetDeailsCard[] = [
    { label: "Budget Limit", value: budgetDetails.limit, className: "" },
    {
      label: "Amount Spent",
      value: budgetDetails.spent,
      className: "text-red-500",
    },
    {
      label: "Remaining",
      value: budgetDetails.limit - budgetDetails.spent,
      className: "text-green-500",
    },
  ];

  return (
    <div className="p-5 bg-white border rounded-lg mb-20">
      <Text variant="h3">{budgetDetails.name}</Text>
      <Text variant="p5" className="text-primary">
        {budgetDetails?.category?.label}
      </Text>
      <div className="my-6">
        <BudgetDetailSwiper details={details} />

        <div className="hidden lg:grid grid-cols-3 gap-4">
          {details.map((detail, index) => (
            <BudgetDetailCard
              key={index}
              label={detail.label}
              value={detail.value}
              className={detail.className}
            />
          ))}
        </div>
      </div>

      <BudgetSpendingTrendChart budgetId={budgetDetails?._id} />
    </div>
  );
});
