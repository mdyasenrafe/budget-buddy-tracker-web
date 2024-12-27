"use client";

import React from "react";
import { Modal } from "@/components";
import { Button, Text } from "@/components/atoms";
import { FormInput, FormWrapper } from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardOverviewModalSchema } from "@/schema";
import {
  TCardOverviewPayload,
  useCreateCardOverviewMutation,
} from "@/redux/features/cardOverview";

import { toast } from "sonner";

type CardModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

type CardModalFormValues = {
  totalBalance: string;
};

export const CardModal: React.FC<CardModalProps> = ({ isOpen, closeModal }) => {
  const [createCardOverview, { isLoading }] = useCreateCardOverviewMutation();

  const handleFormSubmit = async (data: CardModalFormValues) => {
    try {
      const payload: TCardOverviewPayload = {
        totalBalance: Number(data.totalBalance),
      };
      await createCardOverview(payload).unwrap();
      toast.success("Card overview created successfully!");
      closeModal();
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Failed to create the card overview. Please try again."
      );
    }
  };

  return (
    <Modal
      isModalOpen={isOpen}
      closeModal={closeModal}
      title="Set Your Initial Balance"
    >
      <Text className="text-sm text-gray-600 mb-4">
        To start tracking your transactions, enter your initial account balance
        to keep your records accurate.
      </Text>
      <div className="my-4">
        <FormWrapper
          onSubmit={handleFormSubmit}
          resolver={zodResolver(cardOverviewModalSchema)}
        >
          <FormInput
            name="totalBalance"
            label="Initial Balance"
            placeholder="Enter your account balance"
            type="number"
          />

          <Button
            htmlType="submit"
            customColor="primary"
            className="w-full py-2 text-lg"
            loading={isLoading}
          >
            {isLoading ? "Saving..." : "Save Balance"}
          </Button>
        </FormWrapper>
      </div>
    </Modal>
  );
};
