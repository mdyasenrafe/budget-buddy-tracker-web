import React from "react";
import { Text } from "@/components/atoms";
import { FiCheck } from "react-icons/fi";

type CategoryItemProps = {
  label: string;
  value: number;
  percent: string;
  color: string;
  formatCurrency: (value: number) => string;
  isSelected?: boolean;
  onClick?: () => void;
};

export const CategoryItem: React.FC<CategoryItemProps> = ({
  label,
  value,
  percent,
  color,
  formatCurrency,
  isSelected = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group flex items-center justify-between rounded-2xl border px-3.5 py-2.5 sm:px-4 sm:py-3 transition-all duration-200 ${
        onClick ? "cursor-pointer active:scale-[0.99]" : ""
      } ${
        isSelected
          ? "border-primaryBase bg-primaryBase/[0.04] ring-2 ring-primaryBase/20 shadow-sm"
          : "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50/60 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
      }`}
    >
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
        <div className="relative flex items-center justify-center">
          <div
            className="h-3.5 w-3.5 shrink-0 rounded-full transition-transform group-hover:scale-110"
            style={{
              backgroundColor: color,
            }}
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <Text
              variant="p4"
              className={`truncate text-sm font-medium ${
                isSelected ? "text-primaryBase font-semibold" : "text-slate-700"
              }`}
            >
              {label}
            </Text>
            {isSelected && (
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primaryBase text-white text-[10px]">
                <FiCheck className="stroke-[3]" />
              </span>
            )}
          </div>
          <Text variant="p5" className="text-slate-400 text-xs">
            {percent}% of total
          </Text>
        </div>
      </div>

      <div className="text-right shrink-0 pl-2">
        <Text
          variant="p3"
          className={`text-sm font-semibold ${
            isSelected ? "text-primaryBase font-bold" : "text-secondary"
          }`}
        >
          {formatCurrency(value)}
        </Text>
      </div>
    </div>
  );
};
