import React from "react";
import { TTransaction } from "../../../redux/features/transaction";
import dayjs from "dayjs";
import { Text } from "@/components/atoms";
import { TransactionItemDropdown } from "./components/TransactionItemDropdown";

type TransactionItemProps = {
  transaction: TTransaction;
  showEdit?: boolean;
};

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  showEdit = true,
}) => {
  const formattedDate = dayjs(transaction.date).format("DD MMM, YYYY");

  return (
    <div className="mb-8">
      <div className="bg-[#F8F8F8] rounded-xl shadow-sm p-4 transition transform hover:scale-[1.02] hover:shadow-lg mb-4 cursor-pointer">
        {showEdit && (
          <div className="flex justify-end">
            <TransactionItemDropdown
              transactionId={transaction?._id as string}
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="w-[60%]">
            <Text variant="h5" className=" text-gray-900 font-semibold">
              {transaction.title}
            </Text>
            <Text variant="p4" className="text-gray-500">
              {transaction?.category?.label}
            </Text>
          </div>
          <div className="text-end">
            <Text
              variant="h5"
              className={`${
                transaction.type === "expense"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {transaction.type === "expense" ? "-" : "+"}৳{transaction.amount}
            </Text>
            <Text variant="p4" className="text-gray-400 text-sm">
              {formattedDate}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
