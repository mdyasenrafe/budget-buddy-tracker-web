import { Text } from "@/components/atoms";
import { DeleteModal } from "@/components/molecules/modals";
import { useDeleteCardMutation } from "@/redux/features/card";
import { TCard } from "@/redux/features/cardOverview";
import React from "react";
import { toast } from "sonner";

type CardDeleteModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  activeCard: TCard;
};

export const CardDeleteModal: React.FC<CardDeleteModalProps> = ({
  isModalOpen,
  closeModal,
  activeCard,
}) => {
  const [deleteCard, { isLoading }] = useDeleteCardMutation();
  const handleDelete = async () => {
    try {
      const result = await deleteCard(activeCard?._id as string).unwrap();
      closeModal();
      toast.success(
        `Successfully deleted the card: ${activeCard?.bankName} 🎉.`
      );
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(`Failed to add card: ${errorMessage}`);
    }
  };
  return (
    <DeleteModal
      title={"Delete Card?"}
      content={
        <Text variant="p3" className="mt-2 text-gray-600">
          Are you sure you want to delete the card{" "}
          <span className="font-semibold">{activeCard?.bankName}</span>? Once
          deleted, you won't be able to monitor or track this card anymore.
        </Text>
      }
      onConfirm={handleDelete}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      isLoading={isLoading}
    />
  );
};
