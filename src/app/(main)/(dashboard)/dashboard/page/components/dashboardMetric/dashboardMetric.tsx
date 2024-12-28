import React from "react";
import { Text } from "@/components/atoms";

type DashboardMetricProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
};

export const DashboardMetric: React.FC<DashboardMetricProps> = ({
  title,
  value,
  icon,
  bgColor,
  iconColor,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 p-4 rounded-lg shadow-sm transition hover:shadow-lg ${bgColor}`}
    >
      <div
        className={`flex items-center justify-center rounded-full ${iconColor} bg-white p-4`}
      >
        {icon}
      </div>
      <div className="text-center">
        <Text variant="h5" className="font-medium text-gray-700">
          {title}
        </Text>
        <Text variant="h3" className="font-bold text-gray-900 mt-1">
          {value}
        </Text>
      </div>
    </div>
  );
};
