"use client";

import { ChartCard, SectionHeader } from "@/components/molecules";
import { TransactionsProvider } from "@/components/organism";
import React from "react";

export const AnalyticsPage = () => {
  return (
    <div className="pt-10 pb-32 lg:pb-10">
      <SectionHeader
        title="Analyze Your Finances with Ease"
        description="Gain insights into your spending habits and income trends through interactive charts and detailed reports. Filter data by date, track savings progress, and discover where your money goes."
      />
      <ChartCard title="Transaction History" className=" mt-6 !mb-20">
        <TransactionsProvider filters={[{ name: "status", value: "active" }]} />
      </ChartCard>
    </div>
  );
};
