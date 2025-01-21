"use client";

import { DatePicker, DatePickerProps, Form } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { Text } from "../../atoms";
import dayjs from "dayjs";

type FormDatePickerProps = {
  label: string;
  name: string;
} & DatePickerProps;

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  name,
  ...props
}) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <Form.Item
            label={
              <Text variant="p3" className="!font-semibold">
                {label}
              </Text>
            }
          >
            <DatePicker
              {...field}
              {...props}
              style={{ width: "100%" }}
              size={"large"}
              className={`font-poppins text-[14px] `}
              value={field.value ? dayjs(field.value) : null}
            />
            {error && (
              <Text variant={"p5"} className="mt-2 !text-red-500">
                {error.message}
              </Text>
            )}
          </Form.Item>
        );
      }}
    />
  );
};
