"use client";

import React from "react";
import { useAppSelector } from "@/redux";
import { TCard, selectCard } from "@/redux/features/cardOverview";
import { CardOverview } from "@/components/organism";
import { getCateogryLoadingState } from "@/redux/features/category";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { DashboardMetrics } from "./components";
import { useGetDashboardMetricQuery } from "@/redux/features/dashboard";
import { CURRENTMONTHINDEX, CURRENTYEAR, TIMEZONE } from "@/utils";

export const DashboardPage = () => {
  const { data, isLoading: metricLoading } = useGetDashboardMetricQuery({
    year: CURRENTYEAR,
    monthIndex: CURRENTMONTHINDEX,
    timezone: TIMEZONE,
  });

  const activeCard = useAppSelector(selectCard);
  const isLoading = useAppSelector(getCateogryLoadingState);

  if (isLoading || metricLoading) {
    return <LoadingSpinner />;
  }

  const metricData = data?.data;
  console.log(metricData);
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
    </div>
  );
};
