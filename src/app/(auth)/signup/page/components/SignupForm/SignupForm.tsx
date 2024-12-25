import React from "react";
import { FormInput, FormUpload, FormWrapper } from "@/components/form";
import { Button, Text } from "@/components/atoms";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import { signupSchema } from "@/schema";

type SignupFormProps = {
  onSubmit: SubmitHandler<any>;
  isLoading: boolean;
};

export const SignupForm: React.FC<SignupFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  return (
    <FormWrapper onSubmit={onSubmit} resolver={zodResolver(signupSchema)}>
      <FormInput name="name" label="Name" placeholder="Type your Name" />
      <FormInput
        name="email"
        label="Email"
        type="email"
        placeholder="Type your Email"
      />
      <FormInput
        name="password"
        label="Password"
        type="password"
        placeholder="Type your Password"
      />
      <FormUpload name="photo" label="Upload profile picture" />
      <Button
        htmlType="submit"
        customColor="primary"
        className="w-full !h-[44px] hover:bg-primary-dark transition duration-300 mt-4"
        loading={isLoading}
      >
        <Text className="text-white" variant="p3">
          Sign Up
        </Text>
      </Button>
    </FormWrapper>
  );
};
