import { TransactionsProvider } from "@/components/organism";
import React from "react";

type BudgetTransactionProps = {
  budgetId: string;
};

export const BudgetTransaction: React.FC<BudgetTransactionProps> = ({
  budgetId,
}) => {
  return (
    <TransactionsProvider
      filters={[
        { name: "status", value: "active" },
        { name: "budget", value: budgetId },
      ]}
    />
  );
};
