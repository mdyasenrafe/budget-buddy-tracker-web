import { Text } from "@/components/atoms";
import React from "react";

type SectionHeaderProps = {
  title: string;
  description: string;
  maxWidth?: number;
  className?: string;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  maxWidth = 600,
  className = "",
}) => {
  return (
    <div className={`mt-6 ${className}`}>
      <Text variant="h2" className="text-center mb-4 text-black">
        {title}
      </Text>
      <Text
        variant="p4"
        style={{ textAlign: "center", maxWidth: maxWidth, margin: "auto" }}
        className="text-gray-500 pb-1de6"
      >
        {description}
      </Text>
    </div>
  );
};
