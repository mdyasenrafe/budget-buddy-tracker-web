"use client";

import React, { useCallback } from "react";
import { TCreateCardPayload } from "@/redux/features/card";
import { formatExpireDate } from "@/utils/formatExpireDate";
import { TCardFormValues } from "@/schema";
import { CardFormWrapper } from "@/components/organism";

export const EditCardForm = () => {
  const handleSubmit = useCallback(async (data: TCardFormValues) => {
    const formattedExpireDate = formatExpireDate(data.expireDate);
    const payload: TCreateCardPayload = {
      ...data,
      totalBalance: Number(data.totalBalance),
      expireDate: formattedExpireDate,
    };

    console.log("Edit card payload:", payload);
  }, []);

  return (
    <CardFormWrapper onSubmit={handleSubmit} submitButtonText="Update Card" />
  );
};
