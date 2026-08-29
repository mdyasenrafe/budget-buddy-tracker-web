import React from "react";
import { Text } from "@/components/atoms";
import { FiCheck, FiChevronRight } from "react-icons/fi";

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
    <button
      type="button"
      onClick={onClick}
      className={`group w-full text-left relative flex items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-200 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-primaryBase/40 ${
        isSelected
          ? "border-primaryBase bg-primaryBase/[0.06] shadow-md ring-2 ring-primaryBase/25 -translate-y-0.5"
          : "border-slate-200/90 bg-white hover:border-primaryBase/60 hover:bg-slate-50/80 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] active:shadow-inner shadow-[0_1px_3px_rgba(15,23,42,0.05)]"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        {/* Category Color Pill */}
        <div className="relative flex items-center justify-center">
          <div
            className={`h-4 w-4 shrink-0 rounded-full transition-transform duration-200 group-hover:scale-110 shadow-sm ${
              isSelected ? "ring-2 ring-white ring-offset-1" : ""
            }`}
            style={{
              backgroundColor: color,
            }}
          />
        </div>

        {/* Category Label & Percentage */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <Text
              variant="p4"
              className={`truncate text-sm font-semibold transition-colors ${
                isSelected
                  ? "text-primaryBase"
                  : "text-slate-800 group-hover:text-primaryBase"
              }`}
            >
              {label}
            </Text>
            {isSelected && (
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primaryBase text-white text-[10px] shadow-sm">
                <FiCheck className="stroke-[3]" />
              </span>
            )}
          </div>
          <Text variant="p5" className="text-slate-400 text-xs font-medium">
            {percent}% of total
          </Text>
        </div>
      </div>

      {/* Amount and Interactive Chevron Indicator */}
      <div className="flex items-center gap-2 shrink-0 pl-2">
        <div className="text-right">
          <Text
            variant="p3"
            className={`text-sm font-bold transition-colors ${
              isSelected
                ? "text-primaryBase"
                : "text-slate-900 group-hover:text-primaryBase"
            }`}
          >
            {formatCurrency(value)}
          </Text>
        </div>

        <div
          className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 ${
            isSelected
              ? "bg-primaryBase text-white"
              : "bg-slate-100 text-slate-400 group-hover:bg-primaryBase/10 group-hover:text-primaryBase group-hover:translate-x-0.5"
          }`}
        >
          {isSelected ? (
            <FiCheck className="w-3.5 h-3.5 stroke-[2.5]" />
          ) : (
            <FiChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </div>
      </div>
    </button>
  );
};
