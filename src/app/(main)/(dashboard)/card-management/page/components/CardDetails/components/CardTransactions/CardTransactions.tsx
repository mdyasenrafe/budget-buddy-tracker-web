import React from "react";
import { TransactionsProvider } from "@/components/organism";

type CardTransactionsProps = {
  selectedCardId: string;
};

export const CardTransactions: React.FC<CardTransactionsProps> = ({
  selectedCardId,
}) => {
  return (
    <TransactionsProvider
      filters={[
        { name: "status", value: "active" },
        { name: "card", value: selectedCardId },
      ]}
    />
  );
};
