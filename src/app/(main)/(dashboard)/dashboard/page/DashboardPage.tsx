"use client";

import React from "react";
import { BiWalletAlt } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbChartBar } from "react-icons/tb";
import { FiCreditCard } from "react-icons/fi";
import { useAppSelector } from "@/redux";
import { TCard, selectCard } from "@/redux/features/cardOverview";
import { CardOverview } from "@/components/molecules";
import { Text } from "@/components/atoms";

export const DashboardPage = () => {
  const activeCard = useAppSelector(selectCard);

  const dashboardMetrics = [
    {
      title: "Total Balance",
      value: "$12,345",
      icon: <BiWalletAlt size={24} />,
      bgColor: "bg-[#D6E4FF]",
      iconColor: "text-[#2F54EB]",
    },
    {
      title: "Monthly Expenses",
      value: "$3,210",
      icon: <RiMoneyDollarCircleLine size={24} />,
      bgColor: "bg-[#FFE7BA]",
      iconColor: "text-[#FA8C16]",
    },
    {
      title: "Remaining Budget",
      value: "$1,245",
      icon: <TbChartBar size={24} />,
      bgColor: "bg-[#E6FFFB]",
      iconColor: "text-[#13C2C2]",
    },
    {
      title: "Total Cards",
      value: "3 Cards",
      icon: <FiCreditCard size={24} />,
      bgColor: "bg-[#F3E5F5]",
      iconColor: "text-[#9C27B0]",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Active Card Section */}
      {activeCard && (
        <div className="card-overview-container">
          <CardOverview activeCard={activeCard as TCard} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center gap-4 p-4 rounded-lg shadow-sm transition  hover:shadow-lg ${metric.bgColor} `}
          >
            <div
              className={`flex items-center justify-centerrounded-full ${metric.iconColor} bg-white rounded-full p-4`}
            >
              {metric.icon}
            </div>
            <div className="text-center">
              <Text variant="h5" className="font-medium text-gray-700">
                {metric.title}
              </Text>
              <Text variant="h3" className="font-bold text-gray-900 mt-1">
                {metric.value}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
