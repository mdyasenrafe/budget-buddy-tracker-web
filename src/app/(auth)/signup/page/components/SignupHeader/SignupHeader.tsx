import React from "react";
import { Text } from "@/components/atoms";
import { AuthHeader } from "@/components/molecules";

export const SignupHeader: React.FC = () => {
  return (
    <div>
      <AuthHeader />
      <div className="my-6">
        <Text variant="h2" className="text-gray-800 mt-4">
          Sign Up
        </Text>
        <Text variant="p3" className="text-gray-500 mt-2">
          Create your account to track expenses, set budgets, and achieve your
          financial goals effortlessly.
        </Text>
      </div>
    </div>
  );
};
