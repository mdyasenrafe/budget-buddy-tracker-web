// components/molecules/SigninFooter.tsx
import React from "react";
import { Text } from "@/components/atoms";
import Link from "next/link";

export const SigninFooter: React.FC = () => {
  return (
    <div className="text-center mt-4">
      <Link href="/signup" className="!flex justify-center">
        <Text variant="p4" className="text-gray-600">
          Don’t have an account?{" "}
          <span className="text-primary underline cursor-pointer">Sign Up</span>
        </Text>
      </Link>
    </div>
  );
};
