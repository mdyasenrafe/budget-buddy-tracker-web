import React from "react";
import { Text } from "@/components/atoms";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";

type ChartCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
};

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  className,
  loading = false,
}) => (
  <div className={`border w-full rounded-lg ${className}`}>
    <div className="mb-6 border-b p-4">
      <Text variant="h4">{title}</Text>
    </div>
    {loading ? <LoadingSpinner /> : <div className="p-4">{children}</div>}
  </div>
);
