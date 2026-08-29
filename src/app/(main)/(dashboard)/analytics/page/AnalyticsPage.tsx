"use client";

import React, { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectMonthIndex, selectYear } from "@/redux/features/month/monthSlice";
import { ChartCard, SectionHeader } from "@/components/molecules";
import { TransactionsProvider } from "@/components/organism";
import { Text } from "@/components/atoms";
import {
  CategoryAnalytics,
  TSelectedCategoryFilter,
} from "./components/CategoryAnalytics";
import dayjs from "dayjs";
import { IoCloseCircleOutline } from "react-icons/io5";

export const AnalyticsPage = () => {
  const monthIndex = useSelector(selectMonthIndex);
  const year = useSelector(selectYear);

  const [selectedCategory, setSelectedCategory] =
    useState<TSelectedCategoryFilter | null>(null);

  const categoryTransactionsRef = useRef<HTMLDivElement | null>(null);

  const monthStart = useMemo(() => {
    return dayjs().year(year).month(monthIndex).startOf("month").toISOString();
  }, [year, monthIndex]);

  const monthEnd = useMemo(() => {
    return dayjs().year(year).month(monthIndex).endOf("month").toISOString();
  }, [year, monthIndex]);

  const monthFormatted = useMemo(() => {
    return dayjs().year(year).month(monthIndex).format("MMMM YYYY");
  }, [year, monthIndex]);

  const handleCategorySelect = (category: TSelectedCategoryFilter | null) => {
    setSelectedCategory(category);
    if (category && typeof window !== "undefined") {
      setTimeout(() => {
        categoryTransactionsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const categoryTransactionFilters = useMemo(() => {
    if (!selectedCategory) return [];
    return [
      { name: "status", value: "active" },
      { name: "category", value: selectedCategory.id },
      { name: "type", value: selectedCategory.type },
      { name: "date[gte]", value: monthStart },
      { name: "date[lte]", value: monthEnd },
    ];
  }, [selectedCategory, monthStart, monthEnd]);

  return (
    <div className="pb-24 pt-8 lg:pb-10 font-poppins">
      <SectionHeader
        title="Financial Analytics"
        description="Track where your money comes from and where it goes with category breakdowns, monthly totals, and transaction history."
      />

      <div className="mt-8 grid grid-cols-1 gap-6 2xl:gap-7 xl:grid-cols-2">
        <CategoryAnalytics
          type="income"
          title="Income Categories"
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
        <CategoryAnalytics
          type="expense"
          title="Spending Categories"
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      </div>

      {/* Selected Category Transactions (Opens when clicking any category) */}
      {selectedCategory && (
        <div ref={categoryTransactionsRef} className="mt-8 scroll-mt-6">
          <ChartCard
            title={`${selectedCategory.label} Transactions`}
            extra={
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: selectedCategory.color }}
                  />
                  <span className="truncate max-w-[140px] sm:max-w-[200px]">
                    {selectedCategory.label}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    ({selectedCategory.type})
                  </span>
                </span>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition"
                  title="Close category view"
                >
                  <IoCloseCircleOutline className="w-4 h-4" />
                  <span>Close</span>
                </button>
              </div>
            }
            className="rounded-2xl border border-primaryBase/30 bg-white shadow-sm ring-1 ring-primaryBase/10 transition-all"
          >
            <div className="mb-4 flex items-center justify-between rounded-xl bg-primaryBase/[0.04] border border-primaryBase/20 px-4 py-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: selectedCategory.color }}
                />
                <Text variant="p4" className="truncate text-xs sm:text-sm text-slate-700">
                  Showing transactions for{" "}
                  <span className="font-semibold text-slate-900">
                    {selectedCategory.label}
                  </span>{" "}
                  in <span className="font-medium text-slate-600">{monthFormatted}</span>
                </Text>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs font-semibold text-primaryBase hover:text-primaryDark shrink-0 pl-2 underline"
              >
                Close View
              </button>
            </div>

            <TransactionsProvider
              key={`category-${selectedCategory.id}-${monthStart}`}
              filters={categoryTransactionFilters}
            />
          </ChartCard>
        </div>
      )}

      {/* Main Full Transaction History (Always preserved at the bottom) */}
      <div className="mt-8">
        <ChartCard
          title="Transaction History"
          className="!mb-20 rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <TransactionsProvider filters={[{ name: "status", value: "active" }]} />
        </ChartCard>
      </div>
    </div>
  );
};
