import React from "react";
import { Text } from "@/components/atoms";

type LegendProps = {
  labels: string[];
  values: number[];
  bgColors: string[];
};

export const Legend: React.FC<LegendProps> = ({ labels, values, bgColors }) => (
  <div className="mt-4">
    {labels.map((label, index) => (
      <div
        key={index}
        className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: bgColors[index] }}
          ></div>
          <Text className="text-sm font-medium text-gray-700">{label}</Text>
        </div>
        <Text className="text-sm font-medium text-gray-900">
          ৳{values[index]?.toFixed(2)}
        </Text>
      </div>
    ))}
  </div>
);
