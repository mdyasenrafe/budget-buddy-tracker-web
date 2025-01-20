import React, { memo } from "react";
import { Text } from "@/components/atoms";
import { TBudget } from "@/redux/features/budget";
import { BudgetDetailSwiper, BudgetTransaction } from "./components";
import { BudgetSpendingTrendChart } from "@/components/organism/chart";
import { DashboardMetric } from "@/app/(main)/(dashboard)/dashboard/page/components";
import { colors } from "@/theme";
import { FaPiggyBank } from "react-icons/fa";
import { BiMoney, BiWallet } from "react-icons/bi";
import { ChartCard } from "@/components/molecules";

type BudgetDetailsProps = {
  budgetDetails: TBudget | null;
};

export type TBudgetDeailsCard = {
  label: string;
  value: string;
  bgColor: string;
  iconColor: string;
  icon: React.ReactNode;
};

export const BudgetDetails = memo(({ budgetDetails }: BudgetDetailsProps) => {
  if (!budgetDetails) {
    return (
      <div className="text-center p-10 border rounded-lg !mb-20">
        <Text variant="p3">Select a budget to view details</Text>
      </div>
    );
  }

  const details: TBudgetDeailsCard[] = [
    {
      label: "Budget Limit",
      value: `৳${budgetDetails.limit}`,
      bgColor: colors.blue100,
      iconColor: colors.blue500,
      icon: <BiWallet size={24} />,
    },
    {
      label: "Amount Spent",
      value: `৳${budgetDetails.spent}`,
      bgColor: colors.yellow100,
      iconColor: colors.yellow500,
      icon: <BiMoney size={24} />,
    },
    {
      label: "Remaining",
      value: `৳${budgetDetails.limit - budgetDetails.spent}`,
      bgColor: colors.green100,
      iconColor: colors.green500,
      icon: <FaPiggyBank size={24} />,
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
          {details.map((metric, index) => (
            <DashboardMetric
              key={index}
              title={metric.label}
              value={metric.value}
              icon={metric.icon}
              bgColor={metric.bgColor}
              iconColor={metric.iconColor}
            />
          ))}
        </div>
      </div>

      <BudgetSpendingTrendChart
        budgetId={budgetDetails?._id}
        key={budgetDetails?._id}
      />
      <ChartCard title="Transaction History" className=" mt-6 !mb-20">
        <BudgetTransaction
          budgetId={budgetDetails?._id}
          key={budgetDetails?._id}
        />
      </ChartCard>
    </div>
  );
});
