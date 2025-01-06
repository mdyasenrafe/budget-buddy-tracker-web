import { Text } from "@/components/atoms";
import { TCard } from "@/redux/features/cardOverview";
import { formatCardNumber } from "@/utils";
import React from "react";

interface CardOverviewProps {
  activeCard: TCard;
  showHeaderBankName?: boolean;
}

export const CardOverview: React.FC<CardOverviewProps> = ({
  activeCard,
  showHeaderBankName = false,
}) => {
  return (
    <div>
      {showHeaderBankName && (
        <div className="border py-2 rounded-md flex items-center justify-center mt-6 lg:mt-0">
          <Text variant="h3">{activeCard.bankName}</Text>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <div className=" bg-primary text-white rounded-lg px-4 shadow-lg w-full max-w-[400px] py-6">
          <div className="flex justify-between items-center">
            <Text variant="p2" color="white" className="font-medium">
              {activeCard.bankName}
            </Text>
          </div>

          <div className="mt-6">
            <div>
              <Text variant="h3" color="white">
                ৳{activeCard?.totalBalance}
              </Text>
            </div>
          </div>

          <div className="flex justify-between mt-4 items-center">
            <div>
              <Text
                className="!font-semibold text-grey"
                variant="p4"
                color="white"
              >
                Card Number
              </Text>
              <Text variant="h3" color="white">
                {formatCardNumber(activeCard.last4Digits)}
              </Text>
            </div>
            <div>
              <Text
                className="!font-semibold text-grey"
                variant="p5"
                color="white"
              >
                EXP:
              </Text>
              <Text variant="h5" className="!font-bold" color="white">
                {activeCard.expireDate}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
