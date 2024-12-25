import React from "react";
import { Text } from "@/components/atoms";
import { AuthHeader } from "@/components/molecules";

export const SigninHeader: React.FC = () => {
  return (
    <React.Fragment>
      <AuthHeader />
      <div className="my-6">
        <Text variant="h2" className="text-gray-800 mt-4">
          Sign In
        </Text>
        <Text variant="p3" className="text-gray-500 mt-2">
          Welcome back! Log in to your account and start managing your budgets
          with ease.
        </Text>
      </div>
    </React.Fragment>
  );
};
