"use client";

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
import { TransactionViewModal, DeleteModal } from "../modals";

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    openModal: openViewModal,
    isModalOpen: viewModalOpen,
    closeModal: closeViewModal,
  } = useModal();

  const handleOpenDeleteModal = (transaction: TTransaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedTransaction(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      console.log("Deleting transaction:", selectedTransaction);
      // Add your delete API call here
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

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
              onClick={() => handleOpenDeleteModal(record)}
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

      {selectedTransaction && isDeleteModalOpen && (
        <DeleteModal
          isModalOpen={isDeleteModalOpen}
          closeModal={handleCloseDeleteModal}
          title="Delete Transaction?"
          content={
            <Text variant="p3" className="mt-2 text-gray-600">
              Are you sure you want to delete the transaction{" "}
              <span className="font-semibold">
                "{selectedTransaction.title}"
              </span>
              ? This action cannot be undone.
            </Text>
          }
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};
