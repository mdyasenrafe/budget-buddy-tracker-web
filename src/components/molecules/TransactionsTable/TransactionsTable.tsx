import React, { useState } from "react";
import { Table } from "antd";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import dayjs from "dayjs";
import { Text } from "@/components/atoms";
import { TTransaction } from "@/redux/features/transaction";
import { TCard } from "@/redux/features/cardOverview";
import { TResponse } from "@/redux/features/types";
import { TransactionItem } from "..";
import { useModal } from "@/hooks";
import { TransactionViewModal } from "../modals";

type TransactionsTableProps = {
  data: TResponse<TTransaction[]>;
  isLoading: boolean;
  onTableChange: (pagination: any) => void;
};

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  data,
  isLoading,
  onTableChange,
}) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<TTransaction | null>(null);
  const {
    openModal: openViewModal,
    isModalOpen: viewModalOpen,
    closeModal: closeViewModal,
  } = useModal();

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
              onClick={() => {
                setSelectedTransaction(record); // Set the selected transaction
                openViewModal(); // Open the modal
              }}
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
          loading={isLoading}
          scroll={{ x: "100%" }}
          pagination={{
            current: data?.meta?.page || 1,
            pageSize: data?.meta?.limit || 10,
            total: data?.meta?.total || 0,
          }}
          onChange={onTableChange}
        />
      </div>
      <div className="block lg:hidden">
        {data?.data.map((txn) => (
          <div key={txn._id}>
            <TransactionItem transaction={txn} showEdit={true} />
          </div>
        ))}
      </div>

      {selectedTransaction && viewModalOpen && (
        <TransactionViewModal
          transaction={selectedTransaction}
          isModalOpen={viewModalOpen}
          closeModal={closeViewModal}
        />
      )}
    </div>
  );
};
