import React, { useCallback } from "react";
import { TCreateCardPayload } from "@/redux/features/card";
import { formatExpireDate } from "@/utils/formatExpireDate";
import { useCreateCardMutation } from "@/redux/features/card";
import { toast } from "sonner";
import { TCardFormValues } from "@/schema";
import { CardFormWrapper } from "@/components/organism";

export const AddCardForm: React.FC = () => {
  const [createCard, { isLoading }] = useCreateCardMutation();

  const handleSubmit = useCallback(async (data: TCardFormValues) => {
    const formattedExpireDate = formatExpireDate(data.expireDate);
    const payload: TCreateCardPayload = {
      ...data,
      totalBalance: Number(data.totalBalance),
      expireDate: formattedExpireDate,
    };

    try {
      await createCard(payload).unwrap();
      toast.success("Card added successfully! 🎉");
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(`Failed to add card: ${errorMessage}`);
    }
  }, []);

  return (
    <CardFormWrapper
      onSubmit={handleSubmit}
      submitButtonText="Add Card"
      isLoading={isLoading}
    />
  );
};
