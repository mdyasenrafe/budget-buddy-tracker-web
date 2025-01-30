import React from "react";
import { Text } from "@/components/atoms";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";

type ChartCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  clickableTextProps?: {
    text: string;
    onClick: () => void;
  };
};

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  className = "",
  loading = false,
  clickableTextProps,
}) => (
  <div className={`border w-full rounded-lg ${className}`}>
    <div className="mb-6 border-b p-4 flex justify-between items-center">
      <Text variant="h4">{title}</Text>

      {clickableTextProps && (
        <Text
          className="text-primary hover:underline cursor-pointer"
          variant="p4"
          onClick={clickableTextProps.onClick}
        >
          {clickableTextProps.text}
        </Text>
      )}
    </div>

    {loading ? <LoadingSpinner /> : <div className="p-4">{children}</div>}
  </div>
);
