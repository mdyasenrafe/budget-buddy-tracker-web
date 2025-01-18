import React from "react";
import { Table } from "antd";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import dayjs from "dayjs";
import { Text } from "@/components/atoms";
import { TTransaction } from "@/redux/features/transaction";
import { TCard } from "@/redux/features/cardOverview";
import { TResponse } from "@/redux/features/types";
import { TransactionItem } from "..";

type TransactionsTableProps = {
  data: TResponse<TTransaction[]>;
  isLoading: boolean;
};

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  data,
  isLoading,
}) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string) => (
        <Text variant="p4">{dayjs(text).format("DD MMM, YYYY")}</Text>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <Text variant="p4">{text}</Text>,
    },
    {
      title: "Method",
      dataIndex: "card",
      key: "card",
      render: (card: TCard) => (
        <div>
          <Text variant="p4">•••• {card?.last4Digits}</Text>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number, item: TTransaction) => (
        <Text
          variant="p4"
          className={`${
            item?.type === "expense" ? "text-red-500" : "text-green-500"
          }`}
        >
          {item?.type === "expense" ? "-" : "+"}${amount.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: TTransaction) => (
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <div className="action-icon">
            <AiOutlineEye
              style={{
                fontSize: "20px",
                cursor: "pointer",
                color: "#1890ff",
              }}
              title="View"
              onClick={() => console.log("View action for:", record)}
            />
          </div>
          <div className="action-icon">
            <AiOutlineDelete
              style={{
                fontSize: "20px",
                cursor: "pointer",
                color: "red",
              }}
              title="Delete"
              onClick={() => console.log("Delete action for:", record)}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="hidden lg:block">
        <Table
          dataSource={data?.data.map((txn) => ({ ...txn, key: txn._id }))}
          columns={columns}
          pagination={{ pageSize: 5 }}
          loading={isLoading}
          scroll={{ x: "100%" }}
        />
      </div>
      <div className="block lg:hidden">
        {data?.data.map((txn) => (
          <div key={txn._id}>
            <TransactionItem transaction={txn} showEdit={true} />
          </div>
        ))}
      </div>
    </div>
  );
};
