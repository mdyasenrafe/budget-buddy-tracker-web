import { Text } from "@/components/atoms";
import { TCard } from "@/redux/features/cardOverview";
import { formatCardNumber } from "@/utils";
import React from "react";
import { CardOverviewDropdown } from "./components";

interface CardOverviewProps {
  activeCard: TCard;
  showHeaderBankName?: boolean;
  selected?: boolean;
  showEdit?: boolean;
}

export const CardOverview: React.FC<CardOverviewProps> = ({
  activeCard,
  showHeaderBankName = false,
  selected = false,
  showEdit = true,
}) => {
  return (
    <div className="h-full w-full">
      {showHeaderBankName && (
        <div className="border py-2 rounded-md flex items-center justify-center mt-6 lg:mt-0">
          <Text variant="h3">{activeCard.bankName}</Text>
        </div>
      )}
      {showEdit && (
        <CardOverviewDropdown selected={selected} activeCard={activeCard} />
      )}
      <div className="flex justify-center mt-4">
        <div
          className={`rounded-lg px-4 shadow-lg w-full max-w-[400px] py-6 h-full ${
            selected ? "bg-primary text-black" : "bg-white text-black"
          }`}
        >
          <div className="flex justify-between items-center">
            <Text
              variant="p2"
              className={`${selected ? "text-white" : "text-black"}`}
            >
              {activeCard.bankName}
            </Text>
          </div>

          <div className="mt-6">
            <div>
              <Text
                variant="h3"
                className={`${selected ? "text-white" : "text-black"}`}
              >
                ৳{activeCard?.totalBalance}
              </Text>
            </div>
          </div>

          <div className="flex justify-between mt-4 items-center">
            <div>
              <Text
                className={`${selected ? "text-white" : "text-black"}`}
                variant="p5"
              >
                Card Number
              </Text>
              <Text
                variant="h4"
                className={`${selected ? "text-white" : "text-black"}`}
              >
                {formatCardNumber(activeCard.last4Digits)}
              </Text>
            </div>
            <div>
              <Text
                className={`${selected ? "text-white" : "text-black"}`}
                variant="p5"
              >
                EXP
              </Text>
              <Text
                variant="h5"
                className={`font-semibold ${
                  selected ? "text-white" : "text-black"
                }`}
              >
                {activeCard.expireDate}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
