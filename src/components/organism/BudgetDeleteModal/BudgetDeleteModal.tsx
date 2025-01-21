import { Text } from "@/components/atoms";
import { DeleteModal } from "@/components/molecules/modals";
import { TBudget, useDeleteBudgetMutation } from "@/redux/features/budget";
import {
  TTransaction,
  useDeleteTransactionMutation,
} from "@/redux/features/transaction";
import React from "react";
import { toast } from "sonner";

type BudgetDeleteModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  budget: TBudget;
};

export const BudgetDeleteModal: React.FC<BudgetDeleteModalProps> = ({
  isModalOpen,
  closeModal,
  budget,
}) => {
  const [deleteBudget, { isLoading }] = useDeleteBudgetMutation();
  const confirmDelete = async () => {
    try {
      const res = await deleteBudget(budget?._id).unwrap();
      closeModal();
      toast.success("Budget deleted successfully! 🎉 ");
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
      title="Delete Budget?"
      content={
        <Text variant="p3" className="mt-2 text-gray-600">
          Are you sure you want to delete this budget{" "}
          <span className="font-semibold">"{budget?.name}"</span>? This action
          cannot be undone.
        </Text>
      }
      onConfirm={confirmDelete}
    />
  );
};
