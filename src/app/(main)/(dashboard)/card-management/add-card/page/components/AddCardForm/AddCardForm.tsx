"use client";

import { Button, Text } from "@/components/atoms";
import {
  FormDatePicker,
  FormInput,
  FormSelect,
  FormWrapper,
} from "@/components/form";
import { bankList } from "@/constant";
import { TCreateCardPayload } from "@/redux/features/card";
import { addCardSchema } from "@/schema";
import { formatExpireDate } from "@/utils/formatExpireDate";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useMemo, useState } from "react";

export const AddCardForm = () => {
  // states
  const [isMounted, setIsMounted] = useState(false);

  // Format bank options
  const bankOptions = useMemo(
    () =>
      bankList.map((bank) => ({
        label: bank.BankName,
        value: bank.BankName,
      })),
    []
  );

  const handleSubmit = useCallback((data: TCreateCardPayload) => {
    const formattedExpireDate = formatExpireDate(data?.expireDate);
    console.log(formattedExpireDate);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

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
        >
          <Text className="text-white" variant="p3">
            Add Card
          </Text>
        </Button>
      )}
    </FormWrapper>
  );
};
