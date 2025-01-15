import React from "react";
import { Text } from "@/components/atoms";

type ChartCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  className,
}) => (
  <div className={`border w-full rounded-lg ${className}`}>
    <div className="mb-6 border-b p-4">
      <Text variant="h4">{title}</Text>
    </div>
    <div className="p-4">{children}</div>
  </div>
);
