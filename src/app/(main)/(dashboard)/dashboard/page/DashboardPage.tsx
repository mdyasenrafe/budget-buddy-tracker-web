"use client";

import React, { useCallback, useMemo } from "react";
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
import { EmptyBudgetState } from "../../budget-tracker/page/components/EmptyBudgetState";
import { LineChart } from "@/components/molecules/chart";
import { colors } from "@/theme";

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
  const lineChartData = useMemo(
    () => ({
      labels: ["week 1", "week 2", "week 3"],
      datasets: [
        {
          label: "Total Balance",
          data: [12, 23, 23],
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: colors.grey,
          pointBorderColor: colors.grey,
          pointHoverBackgroundColor: colors.grey,
          pointHoverBorderColor: colors.grey,
        },
      ],
    }),
    []
  );

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
      <div className="lg:grid grid-cols-2 w-full gap-6 !mb-10">
        <ChartCard
          className=""
          title="Top Budgets"
          clickableTextProps={{
            text: "View All",
            onClick: () => handleBudgetClick("View All Budgets clicked"),
          }}
        >
          {budgetData?.data.length === 0 ? (
            <EmptyBudgetState />
          ) : (
            budgetData?.data
              ?.slice(0, 3)
              .map((budget) => (
                <BudgetItem
                  budget={budget}
                  isSelected={false}
                  onClick={() => handleBudgetClick(budget.name)}
                />
              ))
          )}
        </ChartCard>
        <ChartCard title="Balance Trend" className="mt-6 lg:mt-0">
          <LineChart {...lineChartData} />
        </ChartCard>
      </div>
    </div>
  );
};
