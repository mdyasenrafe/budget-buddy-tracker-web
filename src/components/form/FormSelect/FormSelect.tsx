"use client";

import React from "react";
import { Select, Form, SelectProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { Text } from "../../atoms";

export type TOption = { value: string; label: string; disabled?: boolean };

type TFormSelectProps = {
  label: string;
  name: string;
  options: TOption[];
} & SelectProps;

export const FormSelect: React.FC<TFormSelectProps> = React.forwardRef(
  ({ name, label, options, ...props }, ref) => {
    const { control } = useFormContext();
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item
              label={
                <Text variant="p3" className="!font-semibold">
                  {label}
                </Text>
              }
            >
              <Select
                style={{ width: "100%", fontSize: 14 }}
                {...props}
                {...field}
                ref={ref as any}
                options={options}
                size="large"
                allowClear
                className={`font-poppins text-[14px] ${
                  error && "border-red-500"
                }`}
                value={field.value || undefined}
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
  }
);

FormSelect.displayName = "FormSelect";
