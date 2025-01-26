"use client";

import React, { useCallback } from "react";
import { useAppSelector } from "@/redux";
import { TCard, selectCard } from "@/redux/features/cardOverview";
import { CardOverview } from "@/components/organism";
import { getCateogryLoadingState } from "@/redux/features/category";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { DashboardMetrics } from "./components";
import { useGetDashboardMetricQuery } from "@/redux/features/dashboard";
import { CURRENTMONTHINDEX, CURRENTYEAR, TIMEZONE } from "@/utils";
import { ChartCard } from "@/components/molecules";
import { TBudget, useGetBudgetQuery } from "@/redux/features/budget";
import dayjs from "dayjs";
import { BudgetList } from "../../budget-tracker/page/components";
import { useRouter } from "next/navigation";
import { BudgetItem } from "../../budget-tracker/page/components/BudgetList/components";

export const DashboardPage = () => {
  // hooks
  const router = useRouter();
  const { isLoading: budgetLoading, data: budgetData } = useGetBudgetQuery(
    dayjs().month()
  );
  const { data, isLoading: metricLoading } = useGetDashboardMetricQuery({
    year: CURRENTYEAR,
    monthIndex: CURRENTMONTHINDEX,
    timezone: TIMEZONE,
  });

  const activeCard = useAppSelector(selectCard);
  const isLoading = useAppSelector(getCateogryLoadingState);

  const metricData = data?.data;

  const handleBudgetClick = useCallback(
    (name: string) => {
      router.push("budget-tracker");
    },
    [router]
  );

  // Move the conditional return after hooks are declared
  if (isLoading || metricLoading || budgetLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 space-y-6">
      {activeCard && (
        <div>
          <CardOverview
            activeCard={activeCard as TCard}
            selected={true}
            showEdit={false}
          />
        </div>
      )}
      <DashboardMetrics
        totalBalance={metricData?.totalBalance || 0}
        monthlySpending={metricData?.monthlySpending || 0}
        monthlyIncome={metricData?.monthlyIncome || 0}
        totalCard={metricData?.totalCard || 0}
      />
      <div className="lg:grid grid-cols-2 w-full gap-6">
        <ChartCard className="" title="Top Budgets">
          {budgetData?.data?.map((budget) => (
            <BudgetItem
              budget={budget}
              isSelected={false}
              onClick={() => handleBudgetClick(budget.name)}
            />
          ))}
        </ChartCard>
      </div>
    </div>
  );
};
