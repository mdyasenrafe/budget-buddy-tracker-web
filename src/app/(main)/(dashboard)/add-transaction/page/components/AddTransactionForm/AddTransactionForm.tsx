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
import { getCategoryOptions } from "@/utils";

export const AddTransactionForm: React.FC = () => {
  const transactionTypes = useMemo(() => ["Income", "Expense"], []);
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<string>("Income");

  const incomeCategories = useAppSelector(getIncomeCategories);
  const expenseCategories = useAppSelector(getExpenseCategories);
  const isLoading = useAppSelector(getCateogryLoadingState);

  const categoryOptions = useMemo(
    () =>
      getCategoryOptions(
        selectedTransactionType,
        incomeCategories,
        expenseCategories
      ),
    [selectedTransactionType, incomeCategories, expenseCategories]
  );

  const handleTransactionTypeSelect = useCallback((type: string) => {
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
