import { Button, Text } from "@/components/atoms";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export const EmptyBudgetState: React.FC = () => {
  const router = useRouter();

  const handleAddCardRedirect = () => {
    router.push("/budget-tracker/add-budget");
  };

  return (
    <div className="mt-10 flex flex-col items-center border py-5 rounded-lg mb-10">
      <div className="text-center">
        <Text variant="h3" className="text-gray-600">
          No Budgets Found
        </Text>
        <Text variant="p3" className="text-gray-500 mt-2">
          You haven't created any budgets yet. Click below to get started and
          gain insights into your spending and savings.
        </Text>
      </div>
      <Button
        customColor="primary"
        className="!h-[48px] mt-4"
        icon={<FaPlus color="white" />}
        onClick={handleAddCardRedirect}
      >
        <Text variant="p4" className="font-semibold text-white">
          Add New Budget
        </Text>
      </Button>
    </div>
  );
};
