"use client";

import { Form, Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { Text } from "../../atoms";
import { TextAreaProps } from "antd/es/input";

type TFormTextAreaProps = {
  name: string;
  label?: string;
} & TextAreaProps;

export const FormTextArea: React.FC<TFormTextAreaProps> = ({
  name,
  label,
  ...props
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={
              <Text variant="p3" className="!font-semibold">
                {label}
              </Text>
            }
          >
            <Input.TextArea
              {...field}
              {...props}
              id={name}
              size="large"
              maxLength={2000}
              className="font-poppins text-[14px]"
            />
            {error && (
              <Text variant={"p5"} className="mt-2" color="red">
                {error.message}
              </Text>
            )}
          </Form.Item>
        )}
      />
    </div>
  );
};
