import { Button, Modal, Text } from "@/components/atoms";
import { useDeleteCardMutation } from "@/redux/features/card";
import { TCard } from "@/redux/features/cardOverview";
import React from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
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
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} title="" centered>
      <div className="flex items-center justify-center flex-col">
        <div className="w-12 h-12 bg-[#f8e6e7] rounded-full flex items-center justify-center">
          <HiOutlineExclamationTriangle color="red" size={24} />
        </div>
        <div className="text-center mt-4">
          <Text variant="h3">Delete Card?</Text>
          <Text variant="p3" className="mt-2 text-gray-600">
            Are you sure you want to delete the card{" "}
            <span className="font-semibold">{activeCard?.bankName}</span>? Once
            deleted, you won't be able to monitor or track this card anymore.
          </Text>
        </div>
        <div className="flex justify-between mt-6 w-full gap-x-8">
          <Button
            className="!bg-white !h-[40px] !rounded-full w-full"
            onClick={closeModal}
          >
            <Text>No, Keep it</Text>
          </Button>
          <Button
            customColor="red"
            className=" !h-[40px] !rounded-full w-full"
            onClick={handleDelete}
            loading={isLoading}
          >
            <Text color="white">Yes, Delete!</Text>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
