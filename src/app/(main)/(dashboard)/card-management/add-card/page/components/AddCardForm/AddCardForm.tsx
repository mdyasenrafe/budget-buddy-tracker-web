"use client";

import { Button, Text } from "@/components/atoms";
import {
  FormDatePicker,
  FormInput,
  FormSelect,
  FormWrapper,
} from "@/components/form";
import { bankList } from "@/constant";
import {
  TCreateCardPayload,
  useCreateCardMutation,
} from "@/redux/features/card";
import { TCardFormValues, addCardSchema } from "@/schema";
import { formatExpireDate } from "@/utils/formatExpireDate";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export const AddCardForm = () => {
  // states
  const [isMounted, setIsMounted] = useState(false);
  // hooks
  const [createCard, { isLoading }] = useCreateCardMutation();

  // Format bank options
  const bankOptions = useMemo(
    () =>
      bankList.map((bank) => ({
        label: bank.BankName,
        value: bank.BankName,
      })),
    []
  );

  const handleSubmit = useCallback(async (data: TCardFormValues) => {
    const formattedExpireDate = formatExpireDate(data?.expireDate);
    const payload: TCreateCardPayload = {
      ...data,
      totalBalance: Number(data?.totalBalance),
      expireDate: formattedExpireDate,
    };
    try {
      const res = await createCard(payload).unwrap();
      toast.success("Card added successfully! 🎉");
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(`Failed to add card: ${errorMessage}`);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  const disablePastDates = (currentDate: Dayjs | null): boolean => {
    return !!currentDate && currentDate.isBefore(dayjs().startOf("day"));
  };

  return (
    <FormWrapper onSubmit={handleSubmit} resolver={zodResolver(addCardSchema)}>
      <FormInput
        name="accountHolderName"
        label="Cardholder Name"
        placeholder="Enter the name on your card"
      />
      <FormInput
        name="last4Digits"
        label="Card Last 4 Digits"
        placeholder="Enter the last 4 digits of your card"
      />
      <FormInput
        name="totalBalance"
        label="Current Balance"
        placeholder="Enter your card's current balance"
        type="number"
      />
      <FormSelect
        name="bankName"
        label="Bank Name"
        options={bankOptions}
        showSearch={true}
        placeholder="Select your bank"
      />
      <FormDatePicker
        name="expireDate"
        label="Card Expiry Date"
        picker="month"
        placeholder="Select card expiry date"
        disabledDate={disablePastDates}
      />
      <Text variant="p4" className="text-gray-500 my-4 w-full">
        <strong>Note:</strong> We only use this information to help you manage
        your finances. Please don’t share sensitive details like your PIN, CVC,
        or full card number.
      </Text>
      {isMounted && (
        <Button
          htmlType="submit"
          customColor="primary"
          className="w-full !h-[44px] hover:bg-primary-dark transition duration-300 mt-4"
          disabled={isLoading}
          loading={isLoading}
        >
          <Text className="text-white" variant="p3">
            Add Card
          </Text>
        </Button>
      )}
    </FormWrapper>
  );
};
