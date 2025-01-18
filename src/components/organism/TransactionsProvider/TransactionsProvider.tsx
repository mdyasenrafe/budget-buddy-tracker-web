import React from "react";
import {
  TTransaction,
  useGetTransactionsQuery,
} from "@/redux/features/transaction";
import { TransactionsTable } from "@/components/molecules";
import { TResponse } from "@/redux/features/types";

type TransactionsProviderProps = {
  filters: { name: string; value: string }[];
};

export const TransactionsProvider: React.FC<TransactionsProviderProps> = ({
  filters,
}) => {
  const { data, isLoading } = useGetTransactionsQuery([
    { name: "status", value: "active" },
    ...filters,
  ]);

  return (
    <TransactionsTable
      data={data as TResponse<TTransaction[]>}
      isLoading={isLoading}
    />
  );
};
