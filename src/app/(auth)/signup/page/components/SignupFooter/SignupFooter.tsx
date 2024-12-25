import React from "react";
import { Text } from "@/components/atoms";
import Link from "next/link";

export const SignupFooter: React.FC = () => {
  return (
    <div className="text-center mt-4">
      <Link href="/signin" className="!flex justify-center">
        <Text variant="p4" className="text-gray-600">
          Already have an account?{" "}
          <span className="text-primary underline cursor-pointer">Sign In</span>
        </Text>
      </Link>
    </div>
  );
};
