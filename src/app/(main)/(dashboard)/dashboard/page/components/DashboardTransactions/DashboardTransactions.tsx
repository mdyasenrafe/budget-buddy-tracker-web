import { ChartCard } from "@/components/molecules";
import { TransactionsProvider } from "@/components/organism";
import { TIMEZONE, getMonthEnd, getMonthStart } from "@/utils";
import React from "react";

export const DashboardTransactions = () => {
  const monthStart = getMonthStart(TIMEZONE);
  const monthEnd = getMonthEnd(TIMEZONE);
  return (
    <ChartCard title="Transaction History">
      <TransactionsProvider
        filters={[
          { name: "status", value: "active" },
          {
            name: "date[gte]",
            value: monthStart,
          },
          {
            name: "date[lte]",
            value: monthEnd,
          },
        ]}
      />
    </ChartCard>
  );
};
