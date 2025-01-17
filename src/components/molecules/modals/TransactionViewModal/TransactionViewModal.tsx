import { Button, Modal } from "@/components/atoms";
import { TTransaction } from "@/redux/features/transaction";
import React from "react";
import {
  HiOutlineArrowUpCircle,
  HiOutlineArrowDownCircle,
} from "react-icons/hi2";
import { Text } from "@/components/atoms";

type TransactionViewModalProps = {
  transaction: TTransaction;
  isModalOpen: boolean;
  closeModal: () => void;
};

const DetailRow: React.FC<{
  label: string;
  value: string;
  valueClassName?: string;
}> = ({ label, value, valueClassName = "" }) => (
  <div className="flex justify-between mb-3">
    <Text variant="p5" className="text-gray-600">
      {label}
    </Text>
    <Text className={`font-semibold ${valueClassName}`}>{value}</Text>
  </div>
);

export const TransactionViewModal: React.FC<TransactionViewModalProps> = ({
  transaction,
  isModalOpen,
  closeModal,
}) => {
  const isExpense = transaction.type === "expense";

  const icon = isExpense ? HiOutlineArrowDownCircle : HiOutlineArrowUpCircle;
  const iconColor = isExpense ? "red" : "green";
  const bgColor = isExpense ? "bg-red-100" : "bg-green-100";

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      title="Transaction Details"
      centered
    >
      <div className="flex flex-col items-center space-y-4">
        <div
          className={`w-14 h-14 ${bgColor} rounded-full flex items-center justify-center`}
        >
          {React.createElement(icon, { color: iconColor, size: 32 })}
        </div>

        <div className="text-center">
          <Text variant="h4" className="font-semibold text-gray-900">
            {transaction.title}
          </Text>
          <Text variant="p4" className="text-gray-500">
            {transaction.description || "No description available"}
          </Text>
        </div>

        <div className="w-full bg-gray-50 border rounded-lg p-4 shadow">
          <DetailRow
            label="Amount"
            value={`${isExpense ? "-" : "+"}৳${transaction.amount}`}
            valueClassName={isExpense ? "text-red-500" : "text-green-500"}
          />
          <DetailRow
            label="Category"
            value={transaction.category?.label || "N/A"}
          />
          <DetailRow
            label="Date"
            value={new Date(transaction.date).toLocaleDateString()}
          />

          {/* Budget and Card Info */}
          {transaction.budget && (
            <DetailRow label="Budget" value={transaction.budget.name} />
          )}
          {transaction.card && (
            <DetailRow label="Card" value={transaction.card.bankName} />
          )}
        </div>

        <Button
          customColor="primary"
          className="!h-[40px] !rounded-full w-full"
          onClick={closeModal}
        >
          <Text color="white">Close</Text>
        </Button>
      </div>
    </Modal>
  );
};
