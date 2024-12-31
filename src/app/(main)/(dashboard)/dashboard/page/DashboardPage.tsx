"use client";

import React from "react";
import { BiWalletAlt } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbChartBar } from "react-icons/tb";
import { FiCreditCard } from "react-icons/fi";
import { useAppSelector } from "@/redux";
import { TCard, selectCard } from "@/redux/features/cardOverview";
import { CardOverview } from "@/components/organism";
import { DashboardMetric } from "./components";
import { dashboardMetrics } from "./constant";

export const DashboardPage = () => {
  const activeCard = useAppSelector(selectCard);

  return (
    <div className="p-6 space-y-6">
      {activeCard && (
        <div>
          <CardOverview activeCard={activeCard as TCard} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric, index) => (
          <DashboardMetric
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            bgColor={metric.bgColor}
            iconColor={metric.iconColor}
          />
        ))}
      </div>
    </div>
  );
};
