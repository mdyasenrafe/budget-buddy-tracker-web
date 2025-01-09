"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Button, Text } from "@/components/atoms";
import {
  FormDatePicker,
  FormInput,
  FormSelect,
  FormTextArea,
  FormUpload,
  FormWrapper,
} from "@/components/form";
import { useAppSelector } from "@/redux";
import {
  getCateogryLoadingState,
  getExpenseCategories,
  getIncomeCategories,
} from "@/redux/features/category";
import { formatCardSelectOptions, getCategoryOptions } from "@/utils";
import { TCard } from "@/redux/features/cardOverview";
import { useGetCardsQuery } from "@/redux/features/card";

const transactionTypes = ["Income", "Expense"] as const;
type TTransactionType = (typeof transactionTypes)[number];

export const AddTransactionForm: React.FC = () => {
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<TTransactionType>("Income");

  const incomeCategories = useAppSelector(getIncomeCategories);
  const expenseCategories = useAppSelector(getExpenseCategories);

  const isLoading = useAppSelector(getCateogryLoadingState);
  // api hooks
  const { data: cardsData, isLoading: isCardLoading } = useGetCardsQuery();

  const categoryOptions = useMemo(
    () =>
      getCategoryOptions(
        incomeCategories,
        expenseCategories,
        selectedTransactionType
      ),
    [selectedTransactionType, incomeCategories, expenseCategories]
  );
  const cardOptions = useMemo(
    () => formatCardSelectOptions(cardsData?.data as TCard[]),
    [cardsData, isCardLoading]
  );

  const handleTransactionTypeSelect = useCallback((type: TTransactionType) => {
    setSelectedTransactionType(type);
  }, []);

  const handleSubmit = useCallback(() => {
    const formData = {};
  }, []);

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Text variant="p3" className="!font-semibold !mb-3">
        Transaction Type
      </Text>
      <div className="flex gap-4 mb-6">
        {transactionTypes.map((type) => (
          <Button
            key={type}
            onClick={() => handleTransactionTypeSelect(type)}
            className="w-[50%] !h-[44px] text"
            customColor={selectedTransactionType === type ? "primary" : "white"}
          >
            <Text
              variant="p3"
              color={selectedTransactionType === type ? "white" : "primary"}
            >
              {type}
            </Text>
          </Button>
        ))}
      </div>

      <FormInput
        name="title"
        type="text"
        label="Title"
        placeholder="Enter transaction title (e.g., Salary, Rent)"
      />

      <FormSelect
        name="category"
        label="Category"
        options={categoryOptions}
        showSearch
        placeholder={`Select ${
          selectedTransactionType === "Income" ? "income" : "expense"
        } category`}
        loading={isLoading}
      />

      <FormSelect
        name="card"
        label="Available Cards"
        options={cardOptions}
        showSearch
        placeholder="Select a payment card"
        loading={isCardLoading}
      />

      <FormDatePicker
        name="date"
        label="Transaction Date"
        placeholder="Select the date of the transaction"
      />

      <FormTextArea
        name="description"
        label="Description"
        autoSize={{ minRows: 2, maxRows: 3 }}
        placeholder="Add a brief description"
      />
      <FormUpload
        name="photo"
        label={`Upload ${
          selectedTransactionType === "Income" ? "proof of income" : "receipt"
        }`}
      />
    </FormWrapper>
  );
};
