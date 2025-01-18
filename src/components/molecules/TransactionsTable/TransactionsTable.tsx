"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Table } from "antd";
import dayjs from "dayjs";
import { Text } from "@/components/atoms";
import { TTransaction } from "@/redux/features/transaction";
import { TCard } from "@/redux/features/cardOverview";
import { TResponse } from "@/redux/features/types";
import { TransactionItem } from "..";
import { useModal } from "@/hooks";
import { TransactionViewModal, DeleteModal } from "../modals";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { TransactionDeleteModalWrapper } from "./components";

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
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const {
    openModal: openViewModal,
    isModalOpen: isViewModalOpen,
    closeModal: closeViewModal,
  } = useModal();

  const openDeleteModal = useCallback((transaction: TTransaction) => {
    setSelectedTransaction(transaction);
    setDeleteModalVisible(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setSelectedTransaction(null);
    setDeleteModalVisible(false);
  }, []);

  const columns = useMemo(
    () => [
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
          <Text variant="p4">•••• {card?.last4Digits}</Text>
        ),
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount: number, item: TTransaction) => (
          <Text
            variant="p4"
            className={
              item?.type === "expense" ? "text-red-500" : "text-green-500"
            }
          >
            {item?.type === "expense" ? "-" : "+"}৳{amount.toFixed(2)}
          </Text>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        render: (_: any, record: TTransaction) => (
          <div className="flex gap-3 justify-center">
            <button
              className="action-icon"
              title="View"
              onClick={() => {
                setSelectedTransaction(record);
                openViewModal();
              }}
            >
              <AiOutlineEye fontSize={20} color="#1890ff" />
            </button>
            <button
              className="action-icon"
              title="Delete"
              onClick={() => openDeleteModal(record)}
            >
              <AiOutlineDelete fontSize={20} color="red" />
            </button>
          </div>
        ),
      },
    ],
    [openViewModal, openDeleteModal]
  );

  const tableData = useMemo(
    () => data?.data.map((txn) => ({ ...txn, key: txn._id })),
    [data]
  );

  return (
    <div>
      <div className="hidden lg:block">
        <Table
          dataSource={tableData}
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
          <TransactionItem key={txn._id} transaction={txn} showEdit={true} />
        ))}
      </div>

      {selectedTransaction && isViewModalOpen && (
        <TransactionViewModal
          transaction={selectedTransaction}
          isModalOpen={isViewModalOpen}
          closeModal={closeViewModal}
        />
      )}

      {selectedTransaction && isDeleteModalVisible && (
        <TransactionDeleteModalWrapper
          isModalOpen={isDeleteModalVisible}
          selectedTransaction={selectedTransaction}
          closeModal={closeDeleteModal}
        />
      )}
    </div>
  );
};
