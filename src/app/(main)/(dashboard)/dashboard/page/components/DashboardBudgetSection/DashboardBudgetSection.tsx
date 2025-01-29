import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChartCard } from "@/components/molecules";
import { TBudget } from "@/redux/features/budget";
import { EmptyBudgetState } from "@/app/(main)/(dashboard)/budget-tracker/page/components/EmptyBudgetState";
import { BudgetItem } from "@/app/(main)/(dashboard)/budget-tracker/page/components/BudgetList/components";

type Props = {
  budgetData: TBudget[];
};

export const DashboardBudgetSection: React.FC<Props> = ({ budgetData }) => {
  const router = useRouter();

  const handleBudgetClick = useCallback(() => {
    router.push("budget-tracker");
  }, [router]);

  return (
    <ChartCard
      title="Top Budgets"
      clickableTextProps={{ text: "View All", onClick: handleBudgetClick }}
    >
      {budgetData.length === 0 ? (
        <EmptyBudgetState />
      ) : (
        budgetData
          .slice(0, 3)
          .map((budget) => (
            <BudgetItem
              key={budget._id}
              budget={budget}
              isSelected={false}
              onClick={handleBudgetClick}
            />
          ))
      )}
    </ChartCard>
  );
};
