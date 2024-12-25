import React from "react";
import { FormInput, FormWrapper } from "@/components/form";
import { Button, Text } from "@/components/atoms";
import { SubmitHandler } from "react-hook-form";
import { SignInFormFields } from "../..";

type SigninFormProps = {
  onSubmit: SubmitHandler<SignInFormFields>;
  isLoading: boolean;
};

export const SigninForm: React.FC<SigninFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  return (
    <FormWrapper onSubmit={onSubmit}>
      <FormInput name="email" label="Email" type="email" />
      <FormInput name="password" label="Password" type="password" />
      <Button
        htmlType="submit"
        customColor="primary"
        className="w-full !h-[44px] hover:bg-primary-dark transition duration-300 mt-4"
        loading={isLoading}
      >
        <Text className="text-white" variant="p3">
          Sign In
        </Text>
      </Button>
    </FormWrapper>
  );
};
