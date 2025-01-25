"use client";

import React from "react";
import { useAppSelector } from "@/redux";
import { TCard, selectCard } from "@/redux/features/cardOverview";
import { CardOverview } from "@/components/organism";
import { getCateogryLoadingState } from "@/redux/features/category";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { DashboardMetrics } from "./components";

export const DashboardPage = () => {
  const activeCard = useAppSelector(selectCard);
  const isLoading = useAppSelector(getCateogryLoadingState);

  if (isLoading) {
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
      <DashboardMetrics />
    </div>
  );
};
