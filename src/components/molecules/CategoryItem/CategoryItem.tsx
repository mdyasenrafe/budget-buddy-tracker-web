import React from "react";
import { Text } from "@/components/atoms";

type CategoryItemProps = {
  label: string;
  value: number;
  percent: string;
  color: string;
  formatCurrency: (value: number) => string;
};

export const CategoryItem: React.FC<CategoryItemProps> = ({
  label,
  value,
  percent,
  color,
  formatCurrency,
}) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="h-3 w-3 shrink-0 rounded-full"
          style={{
            backgroundColor: color,
          }}
        />
        <div className="min-w-0">
          <Text
            variant="p4"
            className="truncate text-sm font-medium text-slate-700"
          >
            {label}
          </Text>
          <Text variant="p5" className="text-slate-400">
            {percent}% of total
          </Text>
        </div>
      </div>

      <Text
        variant="p3"
        className="shrink-0 text-sm font-semibold text-secondary"
      >
        {formatCurrency(value)}
      </Text>
    </div>
  );
};
