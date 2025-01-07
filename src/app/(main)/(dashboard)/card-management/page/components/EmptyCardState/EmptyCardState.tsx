import { Button, Text } from "@/components/atoms";
import { FaPlus } from "react-icons/fa";

export const EmptyCardState: React.FC = () => (
  <div className="mt-10 flex flex-col items-center border py-5 rounded-lg">
    <div className="text-center">
      <Text variant="h3" className="text-gray-600">
        No Card Selected
      </Text>
      <Text variant="p3" className="text-gray-500 mt-2">
        Select a card to view detailed insights about your spending, income, and
        trends.
      </Text>
    </div>
    <Button
      customColor="primary"
      className="!h-[48px]"
      icon={<FaPlus color="white" />}
    >
      <Text variant="p4" className="font-semibold text-white">
        Add New Card
      </Text>
    </Button>
  </div>
);
