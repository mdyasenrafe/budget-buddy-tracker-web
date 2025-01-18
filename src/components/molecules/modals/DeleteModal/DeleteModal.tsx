import { Button, Modal, Text } from "@/components/atoms";
import { ColorKey } from "@/theme";
import React from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

type DeleteModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  title: string;
  content: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  confirmButtonColor?: ColorKey;
};

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isModalOpen,
  closeModal,
  title,
  content,
  onConfirm,
  confirmText = "Yes, Delete!",
  cancelText = "No, Keep it",
  isLoading = false,
  confirmButtonColor = "red",
}) => {
  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} title="" centered>
      <div className="flex items-center justify-center flex-col">
        <div className="w-12 h-12 bg-[#f8e6e7] rounded-full flex items-center justify-center">
          <HiOutlineExclamationTriangle color="red" size={24} />
        </div>

        <div className="text-center mt-4">
          <Text variant="h3">{title}</Text>
        </div>

        <div className="mt-2 text-gray-600 text-center">{content}</div>

        <div className="flex justify-between mt-6 w-full gap-x-8">
          <Button
            className="!bg-white !h-[40px] !rounded-full w-full"
            onClick={closeModal}
          >
            <Text>{cancelText}</Text>
          </Button>
          {onConfirm && (
            <Button
              customColor={confirmButtonColor}
              className="!h-[40px] !rounded-full w-full"
              onClick={onConfirm}
              loading={isLoading}
            >
              <Text color="white">{confirmText}</Text>
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
