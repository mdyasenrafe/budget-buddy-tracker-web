import React, { memo } from "react";
import { Text } from "@/components/atoms";
import { TBudget } from "../../data";
import { colors } from "@/theme";
import { LineChart } from "@/components/molecules/chart";

type BudgetDetailsProps = {
  budgetDetails: TBudget | null;
};

export const BudgetDetails = memo(({ budgetDetails }: BudgetDetailsProps) => {
  if (!budgetDetails) {
    return (
      <div className="text-center p-10 border rounded">
        <Text variant="p3">Select a budget to view details</Text>
      </div>
    );
  }

  const details = [
    { label: "Budget Limit", value: budgetDetails.limit, className: "" },
    {
      label: "Amount Spent",
      value: budgetDetails.spend,
      className: "text-red-500",
    },
    {
      label: "Remaining",
      value: budgetDetails.limit - budgetDetails.spend,
      className: "text-green-500",
    },
  ];

  return (
    <div className="p-5 bg-white border rounded-lg mb-20">
      <Text variant="h3">{budgetDetails.name}</Text>
      <Text variant="p5" className="text-primary">
        {budgetDetails.category}
      </Text>
      <div className="grid grid-cols-3 gap-4 my-6">
        {details.map((detail, index) => (
          <div key={index} className="border w-full p-3 rounded-lg shadow-md">
            <Text className="!text-gray-400 text-sm" variant="p5">
              {detail.label}
            </Text>
            <Text variant="h3" className={detail.className}>
              ৳{detail?.value}
            </Text>
          </div>
        ))}
      </div>
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
  );
});
