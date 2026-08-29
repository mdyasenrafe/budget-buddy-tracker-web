"use client";

import React from "react";
import {
  ChartCard,
  CategoryItem,
  CategoryFilter,
} from "@/components/molecules";
import { DoughnutChart } from "@/components/molecules/chart/Doughnut/Doughnut";
import { Text } from "@/components/atoms";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner/LoadingSpinner";
import { useCategoryAnalytics } from "./useCategoryAnalytics";

export type TSelectedCategoryFilter = {
  id: string;
  label: string;
  type: "income" | "expense";
  color: string;
};

type CategoryAnalyticsProps = {
  type: "income" | "expense";
  title: string;
  selectedCategory?: TSelectedCategoryFilter | null;
  onSelectCategory?: (category: TSelectedCategoryFilter | null) => void;
};

export const CategoryAnalytics: React.FC<CategoryAnalyticsProps> = ({
  type,
  title,
  selectedCategory,
  onSelectCategory,
}) => {
  const {
    mockData,
    selectedLabels,
    filteredData,
    totalAmount,
    toggleCategory,
    resetFilters,
    formatCurrency,
    isLoading,
  } = useCategoryAnalytics(type);

  const headerExtra = (
    <CategoryFilter
      labels={mockData.labels}
      colors={mockData.colors}
      selectedLabels={selectedLabels}
      onToggle={toggleCategory}
      onReset={resetFilters}
    />
  );

  return (
    <ChartCard
      title={title}
      extra={headerExtra}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : filteredData.labels.length > 0 ? (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 items-center gap-5 2xl:grid-cols-[1.08fr_0.92fr]">
            <div className="relative flex items-center justify-center rounded-2xl border border-slate-100 bg-[#F8FAFC] py-[24px]">
              <div className="w-full max-w-[320px] h-[220px]">
                <DoughnutChart
                  labels={filteredData.labels}
                  datasets={filteredData.datasets}
                />
              </div>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <Text
                    variant="p5"
                    className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400"
                  >
                    Total
                  </Text>
                  <Text
                    variant="h4"
                    className="mt-1 text-center font-bold text-secondary"
                  >
                    {formatCurrency(totalAmount)}
                  </Text>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <Text variant="p5" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Categories ({filteredData.categories.length})
                </Text>
                <span className="text-[11px] text-primaryBase font-medium tracking-wide">
                  Tap to inspect
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
                {filteredData.categories.map((cat) => {
                  const percent = totalAmount
                    ? ((cat.value / totalAmount) * 100).toFixed(1)
                    : "0.0";

                  const isSelected =
                    selectedCategory?.id === cat.id &&
                    selectedCategory?.type === type;

                  return (
                    <CategoryItem
                      key={cat.id || cat.label}
                      label={cat.label}
                      value={cat.value}
                      percent={percent}
                      color={cat.color}
                      formatCurrency={formatCurrency}
                      isSelected={isSelected}
                      onClick={() => {
                        if (isSelected) {
                          onSelectCategory?.(null);
                        } else {
                          onSelectCategory?.({
                            id: cat.id,
                            label: cat.label,
                            type,
                            color: cat.color,
                          });
                        }
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-center">
          <Text variant="h4" className="font-semibold text-slate-700">
            No categories selected
          </Text>
          <Text className="mt-2 max-w-[320px] text-slate-500">
            Select one or more categories from the filter menu to see the chart
            and category breakdown.
          </Text>
          <button
            onClick={resetFilters}
            className="mt-4 rounded-full bg-primaryBase px-4 py-2 text-sm font-medium text-white transition hover:bg-primaryDark"
          >
            Reset Filters
          </button>
        </div>
      )}
    </ChartCard>
  );
};
