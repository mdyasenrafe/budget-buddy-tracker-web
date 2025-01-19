"use client";

import { BudgetForm } from "@/components/organism";
import { TCardFormValues, TCreateBudgetFormData } from "@/schema";
import React, { useCallback } from "react";

export const EditBudgetForm = () => {
  const handleSubmit = useCallback(async (data: TCreateBudgetFormData) => {
    console.log("Edit card payload:", data);
  }, []);

  return (
    <BudgetForm onSubmit={handleSubmit} submitButtonText="Update Budget" />
  );
};
