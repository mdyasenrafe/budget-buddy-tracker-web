"use client";

import React, { useCallback } from "react";
import {
  TCreateCardPayload,
  useEditCardMutation,
  useGetCardByIdQuery,
} from "@/redux/features/card";
import { formatExpireDate } from "@/utils/formatExpireDate";
import { TCardFormValues } from "@/schema";
import { CardFormWrapper } from "@/components/organism";
import { useGetBudgetByIdQuery } from "@/redux/features/budget";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { TCard } from "@/redux/features/cardOverview";
import dayjs from "dayjs";
import { toast } from "sonner";

type EditCardFormProps = {
  cardId: string;
};

export const EditCardForm: React.FC<EditCardFormProps> = ({ cardId }) => {
  const { data, isLoading } = useGetCardByIdQuery(cardId);
  const [editCard, { isLoading: editLoading }] = useEditCardMutation();

  const handleSubmit = useCallback(async (data: TCardFormValues) => {
    const formattedExpireDate = formatExpireDate(data.expireDate);
    const payload: TCreateCardPayload = {
      ...data,
      totalBalance: Number(data.totalBalance),
      expireDate: formattedExpireDate,
    };
    try {
      editCard({ cardId: cardId, payload: payload });
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to sign up. Please try again."
      );
    }
  }, []);
  const activeCard = data?.data as TCard;

  const initialValues: Partial<TCardFormValues> = {
    accountHolderName: activeCard?.accountHolderName as string,
    last4Digits: activeCard?.last4Digits,
    totalBalance: activeCard?.totalBalance.toString() as string,
    bankName: activeCard?.bankName,
    expireDate: activeCard?.expireDate
      ? dayjs(activeCard.expireDate, "MMM/YY").toDate()
      : undefined,
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <CardFormWrapper
      onSubmit={handleSubmit}
      submitButtonText="Update Card"
      initialValues={initialValues}
      isLoading={editLoading}
    />
  );
};
