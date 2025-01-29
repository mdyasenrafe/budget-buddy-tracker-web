"use client";

import React from "react";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { useDashboardData } from "@/hooks";
import { CardOverview } from "@/components/organism";
import { DashboardMetrics } from "./components";
import { DashboardBudgetSection } from "./components/DashboardBudgetSection";
import { DashboardBalanceTrendChart } from "./components/DashboardBalanceTrendChart";

export const DashboardPage = () => {
  const { isLoading, metricData, activeCard, budgetData, balanceTrendData } =
    useDashboardData();

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
        <DashboardBudgetSection budgetData={budgetData} />
        <DashboardBalanceTrendChart balanceTrendData={balanceTrendData} />
      </div>
    </div>
  );
};
