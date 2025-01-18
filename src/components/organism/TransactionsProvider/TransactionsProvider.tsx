import React, { useCallback, useState } from "react";
import {
  TTransaction,
  useGetTransactionsQuery,
} from "@/redux/features/transaction";
import { TransactionsTable } from "@/components/molecules";
import { TResponse } from "@/redux/features/types";
import { TPagination } from "@/types";

type TransactionsProviderProps = {
  filters: { name: string; value: string }[];
};

export const TransactionsProvider: React.FC<TransactionsProviderProps> = ({
  filters,
}) => {
  const [pagination, setPagination] = useState<TPagination>({
    page: 1,
    pageSize: 20,
  });

  const { data, isLoading, isFetching } = useGetTransactionsQuery([
    { name: "status", value: "active" },
    {
      value: pagination.page,
      name: "page",
    },
    {
      value: pagination.pageSize,
      name: "limit",
    },
    ...filters,
  ]);

  const handleTableChange = useCallback((paginationData: any) => {
    setPagination({
      page: paginationData.current,
      pageSize: paginationData.pageSize,
    });
  }, []);

  return (
    <TransactionsTable
      data={data as TResponse<TTransaction[]>}
      isLoading={isLoading || isFetching}
      onTableChange={handleTableChange}
    />
  );
};
