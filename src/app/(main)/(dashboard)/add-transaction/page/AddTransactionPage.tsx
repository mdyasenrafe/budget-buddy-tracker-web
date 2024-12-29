"use client";

import React, { useState } from "react";
import { Button, Text } from "@/components/atoms";
import {
  FormInput,
  FormSelect,
  FormTextArea,
  FormWrapper,
} from "@/components/form";
import { SectionHeader } from "@/components/molecules";
import { useAppSelector } from "@/redux";
import {
  getExpenseCategories,
  getIncomeCategories,
} from "@/redux/features/category";

export const AddTransactionPage = () => {
  // Options for transaction type
  const transactionTypes = ["Income", "Expense"];

  const [selectedTransactionType, setSelectedTransactionType] =
    useState<string>("Income");

  const incomeCategories = useAppSelector(getIncomeCategories)?.map(
    (category) => ({
      value: category?.value,
      label: category?.label,
    })
  );

  const expenseCategories = useAppSelector(getExpenseCategories)?.map(
    (category) => ({
      value: category?.value,
      label: category?.label,
    })
  );

  const handleTransactionTypeSelect = (type: string) => {
    setSelectedTransactionType(type);
  };

  // Handle form submission
  const handleSubmit = () => {};

  return (
    <div className="p-6">
      <SectionHeader
        title="Add Transaction"
        description="Keep track of where your money goes by adding transactions. It helps you stay organized and make better financial decisions."
      />

      <div className="p-6 border rounded-lg shadow-lg bg-[#ecf4e9] mt-6 max-w-[900px] w-full mx-auto">
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
                customColor={
                  selectedTransactionType === type ? "primary" : "white"
                }
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

          <FormInput name="title" type="text" label="Title" />

          <FormSelect
            name="category"
            label="Category"
            options={
              selectedTransactionType === "Income"
                ? incomeCategories
                : expenseCategories
            }
            showSearch
            placeholder="Select Categories"
          />

          <FormTextArea name="description" label="Description" />
        </FormWrapper>
      </div>
    </div>
  );
};
