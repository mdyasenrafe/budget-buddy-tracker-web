import React from "react";
import { Text } from "@/components/atoms";
import Image from "next/image";

export const AuthHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/assets/images/logo.png"
        alt="Budget Buddy Tracker Logo"
        width={50}
        height={50}
      />
      <Text variant="h5" className="text-gray-800 ml-2">
        Budget Buddy Tracker
      </Text>
    </div>
  );
};
