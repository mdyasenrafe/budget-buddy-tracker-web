"use client";

import React from "react";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { useDashboardData } from "@/hooks";
import { CardOverview } from "@/components/organism";
import {
  DashboardBalanceTrendChart,
  DashboardBudgetSection,
  DashboardMetrics,
  DashboardSpendingIncomeChart,
  DashboardTransactions,
} from "./components";

export const DashboardPage = () => {
  const {
    isLoading,
    metricData,
    activeCard,
    budgetData,
    balanceTrendData,
    weeklySpendIncomeData,
  } = useDashboardData();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 space-y-6">
      {activeCard && (
        <CardOverview
          activeCard={activeCard}
          selected={true}
          showEdit={false}
        />
      )}

      <DashboardMetrics
        totalBalance={metricData?.totalBalance || 0}
        monthlySpending={metricData?.monthlySpending || 0}
        monthlyIncome={metricData?.monthlyIncome || 0}
        totalCard={metricData?.totalCard || 0}
      />

      <div className="lg:grid grid-cols-2 w-full gap-6 !mb-10">
        <DashboardSpendingIncomeChart
          weeklySpendIncomeData={weeklySpendIncomeData}
        />
        <DashboardBalanceTrendChart balanceTrendData={balanceTrendData} />
      </div>
      <div className="lg:grid grid-cols-3 w-full gap-6 !mb-20">
        <div className="col-span-1">
          <DashboardBudgetSection budgetData={budgetData} />
        </div>
        <div className="col-span-2">
          <DashboardTransactions />
        </div>
      </div>
    </div>
  );
};
