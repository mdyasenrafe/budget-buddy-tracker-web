import { Text } from "@/components/atoms";
import { DeleteModal } from "@/components/molecules/modals";
import {
  TTransaction,
  useDeleteTransactionMutation,
} from "@/redux/features/transaction";
import React from "react";
import { toast } from "sonner";

type TransactionDeleteModalWrapperProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  selectedTransaction: TTransaction;
};

export const TransactionDeleteModalWrapper: React.FC<
  TransactionDeleteModalWrapperProps
> = ({ isModalOpen, closeModal, selectedTransaction }) => {
  const [deleteTransaction, { isLoading }] = useDeleteTransactionMutation();

  const confirmDelete = async () => {
    try {
      const res = await deleteTransaction(selectedTransaction?._id).unwrap();
      closeModal();
      toast.success("Transaction deleted successfully! 🎉 ");
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

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
      isLoading={isLoading}
    />
  );
};
