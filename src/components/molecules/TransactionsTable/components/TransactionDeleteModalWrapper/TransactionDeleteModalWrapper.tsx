import { Text } from "@/components/atoms";
import { DeleteModal } from "@/components/molecules/modals";
import { TTransaction } from "@/redux/features/transaction";
import React from "react";

type TransactionDeleteModalWrapperProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  selectedTransaction: TTransaction;
};

export const TransactionDeleteModalWrapper: React.FC<
  TransactionDeleteModalWrapperProps
> = ({ isModalOpen, closeModal, selectedTransaction }) => {
  const confirmDelete = () => {};
  return (
    <DeleteModal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      title="Delete Transaction?"
      content={
        <Text variant="p3" className="mt-2 text-gray-600">
          Are you sure you want to delete the transaction{" "}
          <span className="font-semibold">"{selectedTransaction.title}"</span>?
          This action cannot be undone.
        </Text>
      }
      onConfirm={confirmDelete}
    />
  );
};
