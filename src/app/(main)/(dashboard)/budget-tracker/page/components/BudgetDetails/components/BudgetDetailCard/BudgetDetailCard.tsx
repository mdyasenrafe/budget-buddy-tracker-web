import React from "react";
import { Text } from "@/components/atoms";
import { TBudgetDeailsCard } from "../..";

type BudgetDetailCardProps = TBudgetDeailsCard;

export const BudgetDetailCard: React.FC<BudgetDetailCardProps> = ({
  label,
  value,
  className = "",
}) => (
  <div className="border w-full p-3 rounded-lg shadow-md">
    <Text className="!text-gray-400 text-sm" variant="p5">
      {label}
    </Text>
    <Text variant="h3" className={className}>
      ৳{value}
    </Text>
  </div>
);
