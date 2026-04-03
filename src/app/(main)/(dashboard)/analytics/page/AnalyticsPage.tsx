"use client";

import { ChartCard, SectionHeader } from "@/components/molecules";
import { TransactionsProvider } from "@/components/organism";
import React from "react";
import { CategoryAnalytics } from "./components/CategoryAnalytics";

export const AnalyticsPage = () => {
  return (
    <div className="pb-24 pt-8 lg:pb-10">
      <SectionHeader
        title="Financial Analytics"
        description="Track where your money comes from and where it goes with category breakdowns, monthly totals, and transaction history."
      />

      <div className="mt-8 grid grid-cols-1 gap-6 2xl:gap-7 xl:grid-cols-2">
        <CategoryAnalytics type="income" title="Income Categories" />
        <CategoryAnalytics type="expense" title="Spending Categories" />
      </div>

      <ChartCard
        title="Transaction History"
        className="mt-8 !mb-20 rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <TransactionsProvider filters={[{ name: "status", value: "active" }]} />
      </ChartCard>
    </div>
  );
};
