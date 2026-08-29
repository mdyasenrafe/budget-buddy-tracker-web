"use client";

import React, { useState, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { Dropdown, MenuProps, Pagination } from "antd";
import { Text } from "@/components/atoms";
import { TTransaction } from "@/redux/features/transaction";
import { TResponse } from "@/redux/features/types";
import { useModal } from "@/hooks";
import { TransactionViewModal, TransactionEditModal } from "../modals";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { Category3DBadge } from "@/utils/categoryIcons";
import { TransactionDeleteModalWrapper } from "./components";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";

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

  const {
    openModal: openEditModal,
    isModalOpen: isEditModalOpen,
    closeModal: closeEditModal,
  } = useModal();

  const openDeleteModal = useCallback((transaction: TTransaction) => {
    setSelectedTransaction(transaction);
    setDeleteModalVisible(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setSelectedTransaction(null);
    setDeleteModalVisible(false);
  }, []);

  // Group transactions by Date Header (e.g., 27 Aug, 24 Aug, etc.)
  const groupedTransactions = useMemo(() => {
    if (!data?.data || data.data.length === 0) return [];

    const groups: {
      [dateKey: string]: {
        label: string;
        date: string;
        items: TTransaction[];
      };
    } = {};

    data.data.forEach((txn) => {
      const parsed = dayjs(txn.date);
      const dateKey = parsed.format("YYYY-MM-DD");
      const label = parsed.format("D MMM"); // e.g. "27 Aug", "24 Aug", "19 Aug"

      if (!groups[dateKey]) {
        groups[dateKey] = {
          label,
          date: txn.date,
          items: [],
        };
      }
      groups[dateKey].items.push(txn);
    });

    return Object.keys(groups)
      .sort((a, b) => dayjs(b).valueOf() - dayjs(a).valueOf())
      .map((key) => groups[key]);
  }, [data]);

  const noTransactions = !isLoading && (!data?.data || data?.data.length === 0);

  return (
    <div className="w-full font-poppins">
      {isLoading ? (
        <div className="py-12 flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : noTransactions ? (
        <div className="text-center py-12 px-6">
          <Text variant="h4" className="font-semibold text-slate-700">
            No Transactions Found
          </Text>
          <Text variant="p5" className="text-slate-400 mt-1 max-w-md mx-auto">
            There are no recorded transactions matching your criteria.
          </Text>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedTransactions.map((group) => (
            <div key={group.date} className="space-y-2.5">
              {/* Date Group Header */}
              <div className="flex items-center gap-3 pt-2 pb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {group.label}
                </span>
                <span className="h-[1px] flex-1 bg-slate-100" />
              </div>

              {/* Transactions List Under Date */}
              <div className="flex flex-col gap-2">
                {group.items.map((record) => {
                  const isIncome = record.type === "income";
                  const categoryName =
                    record.category?.label ||
                    (record.category as any)?.name ||
                    "General";
                  const cardLast4 = record.card?.last4Digits
                    ? `•••• ${record.card.last4Digits}`
                    : record.card?.bankName || "Cash / Direct";

                  const menuItems: MenuProps["items"] = [
                    {
                      key: "view",
                      label: (
                        <span className="flex items-center gap-2 py-1 px-1 text-xs font-medium text-slate-700">
                          <AiOutlineEye className="text-slate-400 text-sm" />
                          View Details
                        </span>
                      ),
                      onClick: (e) => {
                        e.domEvent.stopPropagation();
                        setSelectedTransaction(record);
                        openViewModal();
                      },
                    },
                    {
                      key: "edit",
                      label: (
                        <span className="flex items-center gap-2 py-1 px-1 text-xs font-medium text-slate-700">
                          <AiOutlineEdit className="text-emerald-600 text-sm" />
                          Edit Transaction
                        </span>
                      ),
                      onClick: (e) => {
                        e.domEvent.stopPropagation();
                        setSelectedTransaction(record);
                        openEditModal();
                      },
                    },
                    {
                      type: "divider",
                    },
                    {
                      key: "delete",
                      danger: true,
                      label: (
                        <span className="flex items-center gap-2 py-1 px-1 text-xs font-medium text-rose-600">
                          <AiOutlineDelete className="text-sm" />
                          Delete
                        </span>
                      ),
                      onClick: (e) => {
                        e.domEvent.stopPropagation();
                        openDeleteModal(record);
                      },
                    },
                  ];

                  return (
                    <div
                      key={record._id}
                      onClick={() => {
                        setSelectedTransaction(record);
                        openViewModal();
                      }}
                      className="group relative flex items-center justify-between min-h-[64px] px-4 py-3 bg-[#FAFAFA] hover:bg-white rounded-xl border border-slate-200/60 hover:border-slate-300 hover:shadow-sm hover:-translate-y-[1px] transition-all duration-200 cursor-pointer select-none"
                    >
                      {/* Left: 3D Category Icon & Title/Card info */}
                      <div className="flex items-center gap-3.5 min-w-0 pr-3">
                        <Category3DBadge
                          categoryName={categoryName}
                          type={record.type}
                          size="md"
                        />

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-primaryBase transition-colors">
                            {record.title}
                          </p>
                          <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                            {cardLast4}
                          </p>
                        </div>
                      </div>

                      {/* Right: Amount & Three-dot menu */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`text-sm sm:text-base font-semibold tracking-tight ${
                            isIncome
                              ? "text-emerald-600"
                              : "text-slate-900"
                          }`}
                        >
                          {isIncome ? "+" : "−"}৳
                          {record.amount?.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>

                        <div onClick={(e) => e.stopPropagation()}>
                          <Dropdown
                            menu={{ items: menuItems }}
                            trigger={["click"]}
                            placement="bottomRight"
                          >
                            <button
                              type="button"
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                              title="More actions"
                            >
                              <FiMoreHorizontal className="w-4 h-4" />
                            </button>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Clean Modern Pagination (if multi-page) */}
          {data?.meta && data.meta.total > data.meta.limit && (
            <div className="pt-4 flex justify-center items-center">
              <Pagination
                current={data?.meta?.page || 1}
                pageSize={data?.meta?.limit || 20}
                total={data?.meta?.total || 0}
                onChange={(page, pageSize) =>
                  onTableChange({ current: page, pageSize })
                }
                showSizeChanger={false}
                size="small"
              />
            </div>
          )}
        </div>
      )}

      {selectedTransaction && isViewModalOpen && (
        <TransactionViewModal
          transaction={selectedTransaction}
          isModalOpen={isViewModalOpen}
          closeModal={closeViewModal}
        />
      )}

      {selectedTransaction && isEditModalOpen && (
        <TransactionEditModal
          key={selectedTransaction._id}
          transaction={selectedTransaction}
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
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
