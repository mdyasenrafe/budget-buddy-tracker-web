import React, { useMemo } from "react";
import { Button, Text } from "@/components/atoms";
import {
  FormDatePicker,
  FormInput,
  FormSelect,
  FormWrapper,
} from "@/components/form";
import { bankList } from "@/constant";
import { TCardFormValues, addCardSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs, { Dayjs } from "dayjs";

type CardFormProps = {
  onSubmit: (data: TCardFormValues) => Promise<void>;
  initialValues?: Partial<TCardFormValues>;
  submitButtonText: string;
  isLoading?: boolean;
};

export const CardFormWrapper: React.FC<CardFormProps> = ({
  onSubmit,
  initialValues,
  submitButtonText,
  isLoading = false,
}) => {
  // Format bank options
  const bankOptions = useMemo(
    () =>
      bankList.map((bank) => ({
        label: bank.BankName,
        value: bank.BankName,
      })),
    []
  );

  const disablePastDates = (currentDate: Dayjs | null): boolean => {
    return !!currentDate && currentDate.isBefore(dayjs().startOf("day"));
  };

  return (
    <FormWrapper
      onSubmit={onSubmit}
      resolver={zodResolver(addCardSchema)}
      defaultValues={initialValues}
    >
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
      <Button
        htmlType="submit"
        customColor="primary"
        className="w-full !h-[44px] hover:bg-primary-dark transition duration-300 mt-4"
        disabled={isLoading}
        loading={isLoading}
      >
        <Text className="text-white" variant="p3">
          {submitButtonText}
        </Text>
      </Button>
    </FormWrapper>
  );
};
