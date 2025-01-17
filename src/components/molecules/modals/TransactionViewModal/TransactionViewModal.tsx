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

export const TransactionViewModal: React.FC<TransactionViewModalProps> = ({
  transaction,
  isModalOpen,
  closeModal,
}) => {
  const isExpense = transaction.type === "expense";

  // Dynamic icon and colors
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
          <div className="flex justify-between items-center mb-3">
            <div>
              <Text variant="p5" className="text-gray-600">
                Amount
              </Text>
              <Text
                className={`${
                  isExpense ? "text-red-500" : "text-green-500"
                } font-semibold`}
              >
                {isExpense ? "-" : "+"}৳{transaction.amount}
              </Text>
            </div>
            <div>
              <Text variant="p5" className="text-gray-600">
                Category
              </Text>
              <Text className="!font-semibold">
                {transaction.category?.label}
              </Text>
            </div>
          </div>
          <div className="mb-3">
            <Text variant="p4" className="text-gray-600">
              Date
            </Text>
            <Text className="text-gray-900">
              {new Date(transaction.date).toLocaleDateString()}
            </Text>
          </div>
          <div className="flex justify-between mb-3 ">
            {transaction?.budget && (
              <div className={`${!transaction?.budget ? "w-full" : "w-[45%]"}`}>
                <Text variant="p5" className="text-gray-600">
                  Budget
                </Text>
                <Text className="!font-semibold">
                  {transaction?.budget?.name}
                </Text>
              </div>
            )}
            {transaction?.card && (
              <div className={`${!transaction?.budget ? "w-full" : "w-[45%]"}`}>
                <Text variant="p5" className="text-gray-600">
                  Card
                </Text>
                <Text className="!font-semibold">
                  {transaction?.card?.bankName}
                </Text>
              </div>
            )}
          </div>
        </div>
        <Button
          customColor="primary"
          className=" !h-[40px] !rounded-full w-full"
        >
          <Text color="white">Close</Text>
        </Button>
      </div>
    </Modal>
  );
};
