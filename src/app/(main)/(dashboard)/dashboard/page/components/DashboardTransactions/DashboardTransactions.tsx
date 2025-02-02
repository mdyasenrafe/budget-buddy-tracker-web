import { ChartCard } from "@/components/molecules";
import { TransactionsProvider } from "@/components/organism";
import React from "react";

export const DashboardTransactions = () => {
  return (
    <ChartCard title="Transaction History">
      <TransactionsProvider filters={[{ name: "status", value: "active" }]} />
    </ChartCard>
  );
};
