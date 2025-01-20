import { SectionHeader } from "@/components/molecules";
import React from "react";
import { EditBudgetForm } from "./components";

type Props = {
  budgetId: string;
};

export const EditBudgetPage: React.FC<Props> = ({ budgetId }) => {
  return (
    <div className="pt-10 pb-32 lg:pb-10">
      <SectionHeader
        title="Edit Budget"
        description="Update your budget details, including name, category, and monthly spending limits. This helps you stay on top of your finances effortlessly."
      />

      <div className="p-6 border rounded-lg shadow-lg bg-[#ecf4e9] mt-6 max-w-[900px] w-full mx-auto">
        <EditBudgetForm budgetId={budgetId} />
      </div>
    </div>
  );
};
